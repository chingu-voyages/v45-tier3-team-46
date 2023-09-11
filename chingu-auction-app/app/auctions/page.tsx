'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AuctionCard } from '@/components/AuctionCard'

const AuctionCardList = ({ data, formatDate }) => {
  const filteredData = data.filter(
    (item) => formatDate(item.expiresAt) >= formatDate(new Date())
  )
  console.log({ filteredData })
  return (
    <div className='grid mb-10 sm:grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 m-10'>
      {filteredData.map((listing: any) => (
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

  //date conversion
  const formatDate = (inputDate) => {
    const date = new Date(inputDate)
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const year = date.getFullYear().toString().slice(-2)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}`
    return formattedDate
  }

  useEffect(() => {
    const fetchItemListing = async () => {
      const res = await fetch('/api/auctions')
      const data = await res.json()

      setAuctionListing(data)
    }
    console.log(auctionListing)
    fetchItemListing()
  }, [])

  return (
    <div>
      {/* <h1 className='text-center text-5xl mt-12'>Auction Page</h1>
      {auctionListing.map((listing) => (
        <div>{listing.title}</div>
      ))} */}
      <h1 className='text-center text-5xl mt-12'>Auction Page</h1>
      <AuctionCardList data={auctionListing} formatDate={formatDate} />
    </div>
  )
}
