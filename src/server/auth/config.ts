import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import * as bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "email", type: "email", placeholder: "johndoe@email.com"},
        password: {label: "password", type: "password"}
      },
      async authorize(credentials){
        if (!credentials.email || !credentials.password){
          throw new Error("Email and Password required")
        }
        const email = credentials.email as string
        const password = credentials.password as string
        try {
          const myuser = await db.user.findUniqueOrThrow({
            where: {email}
          })
          const validPassword = await bcrypt.compare(password, myuser.password)
          // const validPassword = password == myuser.password
          if (validPassword){
            console.log("Login Successful")
            return myuser
          }
          return null
        } catch {
          return null
        }
      }
    })
  ],
  adapter: PrismaAdapter(db),
  // callbacks: {
  //   session: ({ session, user }) => ({
  //     ...session,
  //     user: {
  //       ...session.user,
  //       id: user.id,
  //     },
  //   }),
  // },
  session: {strategy: "jwt"},
  callbacks: {
    async jwt({token, user}) {
      if (user){
        token.email = user.email
        token.sub = user.id
        token.name = user.name
      }
      return token
    },
    async session({session, token}){
      session.user.id = token.sub ?? ""
      session.userId = token.sub ?? ""
      session.user.name = token.name ?? ""
      return session
    }
  },
  pages: {
    signIn: "/signin"
  }
} satisfies NextAuthConfig;
