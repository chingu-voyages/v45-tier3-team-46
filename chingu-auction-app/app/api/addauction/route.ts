import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// export async function POST(req: Request) {
//   const data = await req.json()
//   console.log(data, '1')
//   const {
//     title,
//     buyNowPrice,
//     startingBid,
//     currentBid,
//     description,
//     pictures,
//     seller,
//     soldBy,
//     purchasedBy,
//     category,
//     condition,
//     createdAt,
//     updatedAt,
//     expiresAt,
//   } = data

//   try {
//     const newEntry = await prisma.item.create({
//       data: {
//         title,
//         buyNowPrice: 12,
//         startingBid,
//         currentBid: 12,
//         description,
//         pictures:  {
//           create: [
//             {
//               url: 'https://example.com/picture1.jpg',
//               altText: 'Picture 1',
//             },
//             {
//               url: 'https://example.com/picture2.jpg',
//               altText: 'Picture 2',
//             },
//           ],
//         },
//         sellerId: 1,
//         soldById: 1,
//         purchasedById: 2,
//         category,
//         condition,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         expiresAt: new Date().toISOString(),
//       },
//     })
//     return NextResponse.json(newEntry, {status: 200 })
//   } catch (error) {
//     console.error('Request error', error)
//     NextResponse
//       .json({ error: 'Error adding auction item', status: 500 })
//   }
// }

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
    //console.log(req.body, '2')
    const {
      title,
      buyNowPrice,
      startingBid,
      currentBid,
      description,
      pictures,
      seller,
      soldBy,
      purchasedBy,
      category,
      condition,
      createdAt,
      updatedAt,
      expiresAt,
    } = await req.json()

    try {
      const newEntry = await prisma.item.create({
        data: {
          title,
          buyNowPrice: 12,
          startingBid,
          currentBid: 12,
          description,
          pictures:  {
            create: [
              {
                url: 'http://example.com/pic1.jpg',
                altText: 'Test pic',
              },
              {
                url: 'http://example.com/pic2.jpg',
                altText: 'Picture 2',
              },
            ],
          },
          sellerId: 2,
          soldById: 2,
          purchasedById: 3,
          category,
          condition,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          expiresAt: new Date().toISOString(),
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