import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { options } from '../../../auth/[...nextauth]/options'

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: any) {

  const { userId } = params

  const session = await getServerSession(options)
  const { user } = session

  if (user.id !== userId)
    return


  try {

    const get_user = await prisma.item.findUnique({
      where: { id: Number(userId) },
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



