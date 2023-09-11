'use client'

import { AuctionCard } from '../components/AuctionCard'

export const AuctionCardList = ({ data }) => {
  const getRandomIndex = Math.floor(Math.random() * data.length)
  const secondIndex = getRandomIndex + 6

  return (
    <div className='grid mb-10 sm:grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3'>
      {data.slice(getRandomIndex, secondIndex).map((listing: any) => (
        <AuctionCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}
