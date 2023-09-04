import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { options } from '../../../auth/[...nextauth]/options'

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

  const session = await getServerSession(options)
  const { user } = session
  console.log('get addresses', user)

  if (user.id !== userId)
    return

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

export async function GET(req: Request) {
  const session = await getServerSession(options)
  const { user } = session
  console.log('get addresses', session)
  
  const userAddresses = await prisma.user.findUnique({
    where: { id: user.id },
    include: { addresses: true }
  })

  console.log('user addresses', userAddresses)
  return NextResponse.json(userAddresses?.addresses)
}

export async function PUT(req: Request, { params }) {
  const session = await getServerSession(options)
  const { user } = session
  const { oldAddressId, newAddress } = await req.json()
  console.log(params, 'params')

  const updatedUser = await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: {
        addresses: {
          disconnect: { id: oldAddressId },
          create: newAddress,
        },
      },
    }),
    prisma.address.deleteMany({
      where: {
        id: oldAddressId,
        users: {
          none: {}
        }
      },
    }),
  ])
  return NextResponse.json(updatedUser)
}

// export async function DELETE(req: Request) {
//   const session = await getServerSession(options)
//   const { user } = session

//   const addressToDelete = await prisma.address
// }