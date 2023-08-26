import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function handler(
  req: Request
) {
  if (req.method === 'POST') {
    console.log(req.body, '1')
    return await postItem(req)
  } else if (req.method === 'GET') {
    return await getPostedItems(req)
  } else {
    return NextResponse
      .json({ message: 'Method not allowed', status: 405 })
  }

  async function postItem(req: any) {
    
    const {
      title,
      buyNowPrice,
      startingBid,
      currentBid,
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
          buyNowPrice: 12,
          startingBid,
          currentBid: 12,
          description,
          pictures:  {
            create: pictures.map((pic) => ({ url: pic }))   // add altText later 
          },
          seller: {
            connect: { 
              id: sellerId 
            }
          },
          category: "Electronics",
          condition,
          expiresAt: endDate,
        },
      })
      return NextResponse.json(newEntry, {status: 200 })
    } catch (error) {
      console.error('Request error', error)
      NextResponse
        .json({ error: 'Error adding auction item', status: 500 })
    }
  }

  async function getPostedItems(req) {
    try {
      const item = await prisma.item.findMany()
      return NextResponse.json(item, { status: 200 })
    } catch (error) {
      console.log(error)
      return NextResponse
        .json({ error: 'Error reading from database', status: 500 })
    }
  }
}

export { handler as GET, handler as POST }