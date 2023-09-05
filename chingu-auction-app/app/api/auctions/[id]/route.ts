import { IdentificationIcon } from '@heroicons/react/24/outline'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: any) {
  console.log(params)
  const { id } = params
  try {
    const item = await prisma.item.findUnique({
      where: { id: Number(id) },
    })
    return NextResponse.json(item, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: 'Error reading from database',
      status: 500,
    })
  }
}
