import { NextUIProvider } from '@nextui-org/react'
import { AuctionCard } from '../components/AuctionCard'
import { AuctionCategories } from '../components/AuctionCategories'
import { FeaturedAuctionFeed } from '../components/FeaturedAuctionFeed'
import Link from 'next/link'

export default function Home() {
  return (
    <NextUIProvider>
      <main className=''>
        <div className='p-5'>
          <FeaturedAuctionFeed />
          <AuctionCategories />
        </div>
      </main>
    </NextUIProvider>
  )
}
