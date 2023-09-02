'use client'

import { useState, useEffect } from 'react'
import { AuctionCard } from '../components/AuctionCard'

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
export const FeaturedAuctionFeed = (props: any) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [auctionListing, setAuctionListing] = useState([])

  useEffect(() => {
    const fetchItemListing = async () => {
      const res = await fetch('/api/addauction')
      const data = await res.json()

      setAuctionListing(data)
    }
    console.log(auctionListing)
    fetchItemListing()
  }, [])

  return (
    <div className='w-full md:h-screen text-gray-900'>
      <div className='mx-auto p-4 flex flex-col w-full h-full bg-slate-200'>
        <div>
          <h1 className='text-4xl text-center my-10'>Featured Auctions</h1>
        </div>
        <ul className='grid sm:grid-cols-2 md:grid-cols-3 gap-10 mt-3 mx-5'>
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
              data={auctionListing}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
