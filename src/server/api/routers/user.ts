import {z} from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const userRouter = createTRPCRouter({
  createUser: publicProcedure.input(
    z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email"),
      role: z.enum(["ADMIN", "VOLUNTEER"]),
      password: z.string().min(8, "Password must contain at least 8 elements")
    })
  ).mutation(async ({ctx, input}) => {
    try{
      const newUser = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          role: input.role,
          password: input.password
        }
      })
      return {
        success: true,
        user: newUser
      }
    } catch (err){
      console.log("Problem creating user", err);
      throw new Error("Failed to create user")
    }
  })
})