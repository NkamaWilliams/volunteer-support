import { TRPCError } from "@trpc/server"
import {z} from "zod"
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"

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
  })
})