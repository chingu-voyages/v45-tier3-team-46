'use client'

import { AuctionCard } from '../components/AuctionCard'

export const AuctionCardList = ({ data }) => {
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
  const filteredData = data.filter(
    (item) => formatDate(item.expiresAt) >= formatDate(new Date())
  )
  const getRandomIndex = Math.floor(Math.random() * data.length)
  const secondIndex = getRandomIndex + 6

  return (
    <div className='grid mb-10 sm:grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3'>
      {filteredData.slice(getRandomIndex, secondIndex).map((listing: any) => (
        <AuctionCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}
