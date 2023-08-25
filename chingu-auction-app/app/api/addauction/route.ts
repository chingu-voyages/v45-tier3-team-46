import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    return await postItem(req, res)
  } else if (req.method === 'GET') {
    return await getPostedItems(req, res)
  } else {
    return res
      .status(405)
      .json({ message: 'Method not allowed', success: false })
  }

  async function postItem(req, res) {
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
    } = req.body

    try {
      const newEntry = await prisma.item.create({
        data: {
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
        },
      })
      return res.status(200).json(newEntry, { success: true })
    } catch (error) {
      console.error('Request error', error)
      res
        .status(500)
        .json({ error: 'Error adding auction item', success: false })
    }
  }

  async function getPostedItems(req, res) {
    try {
      const item = await prisma.item.findMany()
      return res.status(200).json(item, { success: true })
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ error: 'Error reading from database', success: false })
    }
  }
}
