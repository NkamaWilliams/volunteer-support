import { OpportunityStatus, Status } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { TRPCError } from "@trpc/server"
import {z} from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"

export const eventRouter = createTRPCRouter({
  createEvent: protectedProcedure.input(
    z.object({
      title: z.string().max(100, "Title cannot exceed 100 characters"),
      description: z.string().max(255, "Description cannot exceed 255 characters").optional(),
      location: z.string().max(100, "Location cannot exceed 100 characters").optional(),
      date: z.string().date(),
      max_participants: z.number().min(1, "Must have at least 1 volunteer")
    })
  ).mutation(async ({ctx, input}) => {
    try{
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id
        }
      })

      if (user == null || user.role != "ADMIN"){
        throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can create events!" })
      }

      const dueDate = new Date(input.date)
      const event = await ctx.db.opportunity.create({
        data: {
          title: input.title,
          description: input.description,
          location: input.location,
          date: dueDate,
          max_participants: input.max_participants,
          status: "OPEN",
          userId: user.id
        }
      })

      return { success: true, event }
    } catch (err) {
      console.log(err)
      if (err instanceof TRPCError){
        throw err;
      }
      throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Failed to create event!"})
    }
  }),

  getEvent: publicProcedure.input(
    z.object({
      id: z.string()
    })
  ).query(async ({ctx, input}) => {
    try{
      const event = await ctx.db.opportunity.findUniqueOrThrow({
        where: {
          id: input.id
        },
        include: {
          signups: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            }
          }
        }
      })
      return event
    } catch(err) {
      if (err instanceof PrismaClientKnownRequestError && err.code == "P2025") {
        throw new TRPCError({ code: "NOT_FOUND", message: "Event not found!" });
      }
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch event!" });
    }
  }),

  //Used by admins to get events they create
  getMyEvents: protectedProcedure.query(async ({ctx}) => {
    try{
      const userId = ctx.session?.user.id
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User not authenticated" });
      }
      const events = await ctx.db.opportunity.findMany({
        where: {
          userId
        },
        select: {
          id: true,
          title: true,
          date: true,
          location: true,
          status: true
        }
      });
      return events
    } catch(err) {
      if (err instanceof TRPCError){
        throw err;
      }
      throw new TRPCError({code: "NOT_FOUND", message: "Unable to find user's events!"})
    }
  }),

  //Used to get all available events
  getAllEvents: publicProcedure.query(async ({ctx}) => {
    try{
      const userId = ctx.session?.user?.id ?? null
      const events = await ctx.db.opportunity.findMany({
        where: {
          date: {gte: new Date()}
        },
        select: {
          id: true,
          title: true,
          description: true,
          location: true,
          date: true,
          signups: {select: {userId: true}}
        },
      })

      const formattedEvents = events.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        date: event.date,
        applied: event.signups.some(signup => signup.userId === userId) // Check if user signed up
      }));

      return formattedEvents
    } catch (err) {
      if (err instanceof TRPCError){
        throw err;
      }
      throw new TRPCError({code: "NOT_FOUND", message: "Unable to find any event"})
    }
  }),

  //Get events where user has been accepted as a volunteer
  getAcceptedEvents: protectedProcedure.query(async ({ctx}) => {
    const userId = ctx.session.user.id
    try{
      const signups = await ctx.db.signup.findMany({
        where: {
          userId,
          status: Status.CONFIRMED
        },
        include: {
          opportunity: {
            select: {
              id: true,
              title:  true,
              description: true,
              location: true,
              date: true
            }
          }
        }
      })
      const events = signups.map((signup) => {
        const formattedEvent = {
          id: signup.opportunityId,
          title: signup.opportunity.title,
          description: signup.opportunity.description,
          location: signup.opportunity.location,
          date: signup.opportunity.date,
          applied: true
        }
        return formattedEvent
      });
      return events
    } catch (err) {
      if (err instanceof TRPCError){
        throw err;
      }
      throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Something went wrong retrieving data from the database!"})
    }
  }),

  getLatest: publicProcedure.query(async ({ctx}) => {
    try {
      const events = await ctx.db.opportunity.findMany({
        take: 3,
        orderBy: {createdAt: "desc"},
        where: {
          status: OpportunityStatus.OPEN
        }
      });

      return events;
    } catch (err) {
      console.error(err);
      if (err instanceof TRPCError){
        throw err;
      }
      throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message:"An error occured retrieving latest events"});
    }
  }),

  applyToEvent: protectedProcedure.input(
    z.object({
      id: z.string()
    })
  ).mutation(async ({ctx, input}) => {
    try{
      const userExists = await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id
        }
      })

      if (!userExists){
        throw new TRPCError({code: "UNAUTHORIZED", message: "User does not exist"})
      }

      const eventExists = await ctx.db.opportunity.findUnique({
        where: {
          id: input.id
        }
      })

      if (!eventExists){
        throw new TRPCError({code: "BAD_REQUEST", message: "Event does not exist"})
      }

      if (eventExists.date <= new Date()){
        throw new TRPCError({code: "FORBIDDEN", message: "Time for event has passed!"})
      }

      const alreadyApplied = await ctx.db.signup.findFirst({
        where: {
          userId: userExists.id,
          opportunityId: eventExists.id,
        },
      });

      if (alreadyApplied) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "You have already applied for this event.",
        });
      }

      const application = await ctx.db.signup.create({
        data: {
          userId: userExists.id,
          opportunityId: eventExists.id,
          status: Status.PENDING
        }
      })

      return {
        success: true,
        application
      }
    }
    catch(err){
      console.error(err)
      if (err instanceof TRPCError){
        throw err;
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong while applying for the event.",
      });
    }
  }),

  cancelApplication: protectedProcedure.input(
    z.object({
      id: z.string()
    })
  ).mutation(async ({ctx, input}) => {
    try{
      const userExists = await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id
        }
      })

      if (!userExists){
        throw new TRPCError({code: "UNAUTHORIZED", message: "User does not exist"})
      }

      const eventExists = await ctx.db.opportunity.findUnique({
        where: {
          id: input.id
        }
      })

      if (!eventExists){
        throw new TRPCError({code: "BAD_REQUEST", message: "Event does not exist"})
      }

      const alreadyApplied = await ctx.db.signup.findFirst({
        where: {
          userId: userExists.id,
          opportunityId: eventExists.id,
        },
      });

      if (!alreadyApplied) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "You have not applied for this event.",
        });
      }

      const removedApplication = await ctx.db.signup.deleteMany({
        where: {
          userId: userExists.id,
          opportunityId: eventExists.id
        }
      })

      return{
        success: true,
        message: "Removed application successfully",
        application: alreadyApplied
      }
    }
    catch(err) {
      if (err instanceof TRPCError){
        throw err;
      }
      throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Unable to cancel application"})
    }
  }),

  acceptApplication: protectedProcedure.input(
    z.object({
      applicationId: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    try {
      const admin = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id }
      });
  
      if (!admin || admin.role !== "ADMIN") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can accept applications!" });
      }
  
      const application = await ctx.db.signup.findUnique({
        where: { id: input.applicationId },
        include: { opportunity: true }
      });
  
      if (!application) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Application not found!" });
      }

      if (application.status != Status.PENDING) {
        throw new TRPCError({code: "BAD_REQUEST", message: "Application already processed!"})
      }
  
      // Check if event is already full
      const currentConfirmed = await ctx.db.signup.count({
        where: {
          opportunityId: application.opportunityId,
          status: Status.CONFIRMED
        }
      });
  
      if (currentConfirmed >= application.opportunity.max_participants) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Event is already full." });
      }
  
      const updatedApplication = await ctx.db.signup.update({
        where: { id: input.applicationId },
        data: { status: Status.CONFIRMED }
      });
  
      return {
        success: true,
        message: "Application accepted successfully",
        application: updatedApplication
      };
    } catch (err) {
      console.error(err);
      if (err instanceof TRPCError){
        throw err;
      }
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to accept application" });
    }
  }),

  rejectApplication: protectedProcedure.input(
    z.object({
      applicationId: z.string()
    })
  ).mutation(async ({ctx, input}) => {
    try{
      const admin = await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id
        }
      })

      if (!admin || admin.role != "ADMIN"){
        throw new TRPCError({code: "FORBIDDEN", message: "Only admins can reject applications"})
      }

      const application = await ctx.db.signup.findUnique({
        where:{
          id: input.applicationId
        }
      })

      if (!application || application.status == "REJECTED") {
        throw new TRPCError({code: "BAD_REQUEST", message: "Application does not exist or has already been rejected"})
      }

      const updatedApplication = await ctx.db.signup.update({
        where: {
          id: input.applicationId
        },
        data: {
          status: Status.REJECTED
        }
      })

      return {
        success: true,
        message: "Successfully rejected application",
        application: updatedApplication
      }
    }
    catch(err){
      console.error(err)
      if (err instanceof TRPCError){
        throw err;
      }
      throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Failed to reject application"})
    }
  })
})