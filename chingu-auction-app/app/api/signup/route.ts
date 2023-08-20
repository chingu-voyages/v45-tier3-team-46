const bcrypt = require('bcrypt')
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { username, email, password } = await req.json()

  const new_hash = await bcrypt.hash(password, 10)

  const new_user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: new_hash
    }
  })

  console.log(new_user)

  return NextResponse.json(new_user?.username)
}


