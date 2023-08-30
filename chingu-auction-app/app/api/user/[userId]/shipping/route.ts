import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const {     
    street1,
    street2,
    city,
    state,
    zip,
    addressType,
    userId
  } = await req.json()

  try {
    const newAddress = await prisma.address.create({
      data: {
        street1,
        street2,
        city,
        state,
        zip,
        addressType,
        users: {
            connect: {
                id: Number(userId),
            },
          },
      }
    })
    console.log(newAddress)
    return NextResponse.json(newAddress)
  } catch (error) {
    console.error('Request error', error)
    NextResponse.json({ error: 'Error adding address', status: 500 })
  }
}
