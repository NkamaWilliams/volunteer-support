"use server"
import { signIn } from "~/server/auth";
import { AuthError } from "next-auth";

export async function loginAction(
  prevState: { success?: boolean; error?: string } | null, 
  formData: FormData
){
  try {
    await signIn("credentials", {
      redirect: false,
      email: formData.get("email") as string,
      password: formData.get("password") as string
    }) as string
    console.log("Login successful")
    return {success: true}
  } catch(err) {
    if (err instanceof AuthError){
      console.log(err.message)
    } else {
      console.log(err)
    }
    return {error: "Invalid email or password"}
  }
}