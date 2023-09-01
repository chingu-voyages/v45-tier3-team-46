import { getServerSession } from "next-auth"
import { options } from '../../../api/auth/[...nextauth]/options'
import prisma from '@/lib/prisma'

const getAddresses = async (addressType: string) => {
  const session = await getServerSession(options)
  console.log(session?.user?.id, 'shp')
  const userId = session?.user?.id

  try {
    const response = await prisma.user?.findUnique({
      where: { id: userId },
        select: {
          addresses: {
            where: {
              addressType: addressType
            }
          }
      }
    })
    
    return response?.addresses
  } catch (error) {
    console.log(error)
  }

}

export default getAddresses