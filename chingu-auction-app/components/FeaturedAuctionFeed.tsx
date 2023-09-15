'use client'

import { useState, useEffect } from 'react'
import { AuctionCard } from '../components/AuctionCard'
import { Input } from '@nextui-org/react'
import { SearchIcon } from '../public/assets/icons/SearchIcon'
import { AuctionCardList } from '../components/AuctionCardList'

export const FeaturedAuctionFeed = (props: any) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [auctionListing, setAuctionListing] = useState([])

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
    <section className='mt-10 mx-auto w-full max-w-3xl flex justify-center items-center flex-col gap-2'>
      <div className='w-[340px] h-[240px] px-8 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg'>
        <Input
          label='Search'
          isClearable
          radius='lg'
          classNames={{
            label: 'text-black/50 dark:text-white/90',
            input: [
              'bg-transparent',
              'text-black/90 dark:text-white/90',
              'placeholder:text-default-700/50 dark:placeholder:text-white/60',
            ],
            innerWrapper: 'bg-transparent',
            inputWrapper: [
              'shadow-xl',
              'bg-default-200/50',
              'dark:bg-default/60',
              'backdrop-blur-xl',
              'backdrop-saturate-200',
              'hover:bg-default-200/70',
              'dark:hover:bg-default/70',
              'group-data-[focused=true]:bg-default-200/50',
              'dark:group-data-[focused=true]:bg-default/60',
              '!cursor-text',
            ],
          }}
          placeholder='Type to search...'
          startContent={
            <SearchIcon className='text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0' />
          }
        />
      </div>

      <div>
        <h1 className='text-4xl text-center my-10'>Featured Auctions</h1>
      </div>
      <AuctionCardList data={auctionListing} />
      {/* </div> */}
    </section>
  )
}
