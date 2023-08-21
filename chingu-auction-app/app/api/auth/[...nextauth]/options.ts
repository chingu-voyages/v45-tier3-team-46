import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@auth/prisma-adapter"
import { type Adapter } from "@auth/core/adapters"
import { PrismaClient } from '@prisma/client'
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
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
              username: credentials.username,
            },
          })
                
          const passwordIsCorrect = await bcrypt.compare(credentials?.password, user.password)

          if (passwordIsCorrect && credentials?.username === user.username) {
            console.log(user)
            return user
          } else {
            return null
          }
        } catch(error) {
          console.log(error)
        }
      }
    })
  ],
}