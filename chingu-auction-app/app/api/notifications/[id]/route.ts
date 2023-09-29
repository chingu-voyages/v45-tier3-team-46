import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { options } from '../../auth/[...nextauth]/options'

export async function GET(req: Request, { params }: any) {
  console.log(params)
  const { id } = params
  try {
    const notification = await prisma.notification.findUnique({
      where: { id: Number(id) },
    })

    await prisma.notification.update({
      where: {
        id: Number(id),
      },
      data: {
        read: true,
      }
    })
    console.log(notification)
    
    return NextResponse.json(notification, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: 'Error reading from database',
      status: 500,
    })
  }
}