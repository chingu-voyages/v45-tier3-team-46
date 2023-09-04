import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const get_user = await prisma.item.findMany({})
  return NextResponse.json(get_user)
}



