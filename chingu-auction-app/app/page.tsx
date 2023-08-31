'use client'
import { NextUIProvider } from '@nextui-org/react'
import { AuctionCard } from '../components/AuctionCard'
import Link from 'next/link'

const sampleAuctions = [
  {
    id: 1,
    itemName: 'sample_name',
    sellerName: 'johnyCash1',
    itemCondition: '5',
    currentBid: '$3.00',
    ammountBids: '20',
    buyPrice: '$5.00',
    timeLeft: '9:45m',
  },
  {
    id: 2,
    itemName: 'sample_name',
    sellerName: 'johnyCash1',
    itemCondition: '5',
    currentBid: '$3.00',
    ammountBids: '20',
    buyPrice: '$5.00',
    timeLeft: '9:45m',
  },
  {
    id: 3,
    itemName: 'sample_name',
    sellerName: 'johnyCash1',
    itemCondition: '5',
    currentBid: '$3.00',
    ammountBids: '20',
    buyPrice: '$5.00',
    timeLeft: '9:45m',
  },
]

const sampleCategories = [
  'cars',
  'shoes',
  'electronics',
  'clothing',
  'toys',
  'tools',
  'accessories',
]

export default function Home() {
  return (
    <NextUIProvider>
      <main className=''>
        <div className='p-5'>
          <div className='w-full flex flex-row justify-between mb-3'>
            <h1 className='font-bold text-4xl'>Recently Created Auctions</h1>
            <button className='border px-3 rounded-md bg-blue-300'>
              All Auctions
            </button>
          </div>
          <div className='flex flex-wrap justify-around'>
            {sampleAuctions.map((auction) => (
              <AuctionCard
                key={auction.id}
                itemName={auction.itemName}
                sellerName={auction.sellerName}
                itemCondition={auction.itemCondition}
                currentBid={auction.currentBid}
                amountBids={auction.ammountBids}
                buyPrice={auction.buyPrice}
                timeLeft={auction.timeLeft}
              />
            ))}
          </div>
          <div className='m-3 w-full border'>
            <h1 className='font-bold text-4xl'>Search By Categories</h1>
            <div className='text-center flex flex-wrap w-full border justify-between'>
              {sampleCategories.map((item: string) => (
                <Link key={item} href={`/auctions?${item}`}>
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </NextUIProvider>
  )
}
