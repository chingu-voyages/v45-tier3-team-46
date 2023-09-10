import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: any) {

  const { userId } = params

  try {

    const get_user = await prisma.item.findMany({
      // where: { id: Number(userId) },
      include: { pictures: true },
    })

    return NextResponse.json(get_user, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: 'Database Read Error',
      status: 500
    })
  }
}



