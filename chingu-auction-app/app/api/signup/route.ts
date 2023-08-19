// import { prisma } from "@/lib/prisma";
//const bcrypt = require('bcrypt')
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { username, email, password } = await req.json()
  const user = { username, email }

  return NextResponse.json(user)
}