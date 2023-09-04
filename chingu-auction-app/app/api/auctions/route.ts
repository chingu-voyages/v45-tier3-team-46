import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req, { params }) {
  try {
    const item = await prisma.item.findMany({
      include: { pictures: true },
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
