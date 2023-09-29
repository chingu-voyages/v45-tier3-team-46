import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { options } from '../../../auth/[...nextauth]/options'

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: any) {

  const { userId }: { userId: number } = params

  const session = await getServerSession(options)

  if (session?.user?.id !== Number(userId)) {
    return
  }

  try {

    const get_item = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include:

      {
        itemsForSale: {
          include: {
            pictures: true
          }
        },
        itemsPurchased: {
          include: {
            pictures: true
          }
        }
      },
    })

    return NextResponse.json(get_item, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: 'Database Read Error',
      status: 500
    })
  }
}



