import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { isTemplateExpression } from "typescript"

export async function GET(req: Request) {
  const now = new Date()
  const endedAuctions = await prisma.item.findMany({
    where: {
      expiresAt: {
        lt: now
      },
      auctionEnded: false,
    },
    include: {
      bids: {
        orderBy: {
          bidAmount: 'desc',
        },
      },
    },
  })

  endedAuctions.map(async (auctionItem) => {
    if (auctionItem.bids.length > 0) {
      const highestBid = await prisma.bid.findFirst({
        where: { itemId: auctionItem?.id },
        orderBy: { bidAmount: 'desc' },
      })

      // if any operation fails, they all fail together
      await prisma.$transaction([
        prisma.bid.update({
          where: { id: highestBid?.id },
          data: { won: true }
        }),
        prisma.item.update({
          where: {
            id: auctionItem?.id,
          },
          data: {
            purchasedBy: { 
              connect: { 
                id: highestBid?.bidderId,
              },
            },
            auctionEnded: true,
            sold: true,
            soldPrice: highestBid?.bidAmount,
          }
        }),
        // notification to buyer
        prisma.notification.create({
          data: {
            message: "You have won an auction!",
            item: {
              connect: {
                id: auctionItem?.id,
              },
            },
            user: {
              connect: {
                id: highestBid?.bidderId
              },
            },
          }
        }),
        // notification to seller
        prisma.notification.create({
          data: {
            message: "Your item has been purchased!",
            item: {
              connect: {
                id: auctionItem?.id,
              },
            },
            user: {
              connect: {
                id: auctionItem?.sellerId,
              },
            },
          }
        })
      ])
      
    } else {
      await prisma.item.update({
        where: {
          id: auctionItem.id,
        },
        data: {
          auctionEnded: true,
        }
      })
    }
  })

  return NextResponse.json(endedAuctions, { status: 200 })
}