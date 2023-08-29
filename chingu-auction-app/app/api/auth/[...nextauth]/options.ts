import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@auth/prisma-adapter"
import { type Adapter } from "@auth/core/adapters"
import { PrismaClient } from '@prisma/client'
const bcrypt = require('bcrypt')
import { randomUUID } from "crypto"

const prisma = new PrismaClient()
const maxAge = 30 * 24 * 60 * 60

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GitHubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "Enter username"
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Enter password"
        }
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              username: credentials?.username,
            },
          })
                
          const passwordIsCorrect = await bcrypt.compare(credentials?.password, user?.password)

          if (!passwordIsCorrect || !(credentials?.username === user?.username)) {
            console.log(user, 'user not found in db')
            return null
          }

          const token = randomUUID()
          await prisma.session.create({
            data: {
              userId: user?.id,
              expires: new Date(Date.now() + maxAge * 1000),
              sessionToken: token,
           }
          })
          return {
            id: user?.id,
            username: user?.username,
            email: user?.email,
            name: user?.name,
            image: user?.image,
            sessionToken: token,
          }
        } catch(error) {
          console.log(error)
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: maxAge, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    // temporary solution
    async jwt({ token, user }: any) {
      if (user) {
        // add user properties to token that are needed in the session callback
        token.userId = user.id
        token.sessionToken = user.sessionToken
        token.username = user.username
      }
      if (token?.sessionToken) {
        const session = await prisma.session.findFirst({
          where: {
            sessionToken: token.sessionToken,
          },
          include: {
            user: true,
          }
        })
        if (!session) {
          return null
        }
      }
      console.log(token, 'test')
      return token
    },
    // manually create Session db entry for OAuth
    async signIn({ user, account, profile }) {
      try {
        if (account?.type === 'oauth'){
          const token = randomUUID()
          await prisma.session.create({
            data: {
              userId: user.id,
              expires: new Date(Date.now() + maxAge * 1000),
              sessionToken: token,
            }
          })
          console.log(user)
          user.sessionToken = token
        }
      } catch (error) {
        console.log(error)
      }
      return true
    },
    session: ({ session, token }) => ({
        ...session,
        user: {
            ...session.user,
            id: token?.userId,
            username: token?.username
        },
    }),
  },
  pages: {
    signIn: '/login'  // redirect to custom login page instead of default
  }
}