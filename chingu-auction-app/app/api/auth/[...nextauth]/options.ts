import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google"
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
//   session: {
//     strategy: 'jwt',
//     user: {
//         id: 'id',
//         username: 'username',
//         email: 'email',
//     }
//   },
//   callbacks: {
//     async jwt({ token, account, profile }) {
//         // Persist the OAuth access_token and or the user id to the token right after signin
//         if (account) {
//           token.username = account.access_token
//           token.id = profile.id
//         }
//         return token
//       },
//     async session({ session, token, user }) {
//       // Send properties to the client, like an access_token and user id from a provider.
//       session.user.name = token.username
//       session.user.id = token.id
      
//       return session
//     }
//   },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
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
        console.log(user, 'test1')
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
    async signIn({ user, account }) {
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