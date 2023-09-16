import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { options } from '../auth/[...nextauth]/options'
import { getSSEWriter } from 'ts-sse'

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(options)
  const { user } = session

  const responseStream = new TransformStream()
  const writer = responseStream.writable.getWriter()
  const encoder = new TextEncoder()

  const sendNewNotifications = async (notifier) => {
    while (true) {
      try {
        const newNotifications = await prisma.notification.findMany({
          where: { 
            user: { 
              id: user?.id 
            }, 
            isNew: true 
          },
          orderBy: { createdAt: 'asc' },
        })

        if (newNotifications.length > 0) {
          notifier.update({ data: newNotifications, event: 'update' })
          console.log(newNotifications, 'notif1')
        } else { console.log('no notifications') }

        await prisma.notification.updateMany({
          where: { 
            id: { 
              in: newNotifications.map((notification) => notification.id) 
            } 
          },
          data: { isNew: false },
        })

        // check only every 100 seconds to stay within Planetscale free tier limits
        await new Promise((resolve) => setTimeout(resolve, 100000))
      } catch (error) {
        console.error('Error sending notifications:', error)
        break 
      }
    }
  }

  sendNewNotifications(getSSEWriter(writer, encoder))

  return new NextResponse(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
