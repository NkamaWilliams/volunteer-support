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
      throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Failed to create event!"})
    }
  }),

  getEvent: publicProcedure.input(
    z.object({
      id: z.string()
    })
  ).query(async ({ctx, input}) => {
    try{
      const event = ctx.db.opportunity.findUniqueOrThrow({
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
  })
})