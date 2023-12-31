import { IdentificationIcon } from '@heroicons/react/24/outline'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { options } from '../../auth/[...nextauth]/options'

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: any) {
  console.log(params)
  const { id } = params
  try {
    const item = await prisma.item.findUnique({
      where: { id: Number(id) },
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

// bidding logic
export async function POST(req: Request, { params }: any) {
  const { id } = params
  const bidData = await req.json()
  const session = await getServerSession(options)
  const { user } = session
  console.log(bidData.bidAmount)

  try {
    const item = await prisma.item.findUnique({
      where: { id: Number(id) },
    })

    if (item?.expiresAt?.getTime() <= Date.now()) {
      return NextResponse.json(
        { error: 'Auction has already ended' },
        { status: 500 }
      )
    }

    const highestBid = await prisma.bid.findFirst({
      where: { itemId: item?.id },
      orderBy: { bidAmount: 'desc' },
    })

    if (highestBid?.bidderId === user?.id) {
      return NextResponse.json(
        { error: 'You are already the highest bidder' },
        { status: 500 }
      )
    }

    if (Number(bidData?.bidAmount) < Number(highestBid?.bidAmount) + 0.5) {
      return NextResponse.json({ error: 'Bid too low' }, { status: 500 })
    }

    const newBid = await prisma.bid.create({
      data: {
        bidAmount: Number(bidData?.bidAmount),
        item: {
          connect: { id: item?.id },
        },
        bidder: {
          connect: { id: user?.id },
        },
      },
    })

    console.log(newBid)
    return NextResponse.json(newBid, { status: 200 })
  } catch (error) {
    console.log(error)
  }
}
