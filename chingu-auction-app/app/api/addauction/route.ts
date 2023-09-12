import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()


  export const POST = async (req: Request, { params }: any) {

    const {
      title,
      buyNowPrice,
      startingBid,
      description,
      pictures,
      sellerId,
      category,
      condition,
      expiresAt,
    } = await req.json()

    const currentDate = Date.now()
    const endDate = new Date(currentDate + expiresAt)
    console.log(endDate)
  

    try {
      const newEntry = await prisma.item.create({
        data: {
          title,
          buyNowPrice,
          startingBid,
          description,
          pictures: {
            create: pictures.map((pic) => ({ url: pic })), // add altText later
          },
          seller: {
            connect: {
              id: sellerId,
            },
          },
          category,
          condition,
          expiresAt: endDate,
        },
      })
      return NextResponse.json(newEntry, { status: 200 })
    } catch (error) {
      console.error('Request error', error)
      NextResponse.json({ error: 'Error adding auction item', status: 500 })
    }
  }

export const GET = async(req) {
    try {
      const item = await prisma.item.findMany({ include: { pictures: true } })

      return NextResponse.json(item, { status: 200 })
    } catch (error) {
      console.log(error)
      return NextResponse.json({
        error: 'Error reading from database',
        status: 500,
      })
    }
  }


