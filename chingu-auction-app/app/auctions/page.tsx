'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AuctionCard } from '@/components/AuctionCard'

const AuctionCardList = ({ data }) => {
  return (
    <div className='grid mb-10 sm:grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 m-10'>
      {data.map((listing: any) => (
        <AuctionCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}

export default function Auctions(props: any) {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const itemId = Number(searchParams.get('id'))
  const [auctionListing, setAuctionListing] = useState([])
  console.log('this is listing')

  useEffect(() => {
    const fetchItemListing = async () => {
      const res = await fetch('/api/auctions')
      const data = await res.json()

      setAuctionListing(data)
    }
    console.log(auctionListing)
    fetchItemListing()
  }, [])

  console.log('page', { auctionListing })
  return (
    <div>
      {/* <h1 className='text-center text-5xl mt-12'>Auction Page</h1>
      {auctionListing.map((listing) => (
        <div>{listing.title}</div>
      ))} */}
      <h1 className='text-center text-5xl mt-12'>Auction Page</h1>
      <AuctionCardList data={auctionListing} />
    </div>
  )
}
