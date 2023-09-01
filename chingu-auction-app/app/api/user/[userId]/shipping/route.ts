import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

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

// export async function GET(req: Request) {
//   // const cookieStore = cookies()
//   // const cookieToDecode = cookieStore.get('userCookie')
//   // console.log(cookieToDecode)
//   const session = await getServerSession(options)
//   // const { user } = session
//   console.log('get addresses', session)
//   const userBillingAddresses = await prisma.user.findUnique({
//     where: { id: 11 },
//     select: {
//       addresses: {
//         where: {
//           addressType: "Billing"
//         }
//       }
//     }
//   })
//   console.log(' addresses', userBillingAddresses)
//   return NextResponse.json(userBillingAddresses)
// }