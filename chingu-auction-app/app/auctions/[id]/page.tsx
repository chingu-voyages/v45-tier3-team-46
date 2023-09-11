// 'use client'

// import { useEffect, useState } from 'react'
// import { useSearchParams, useParams } from 'next/navigation'
// import { useSession } from 'next-auth/react'
// import { AuctionCardList } from '@/components/AuctionCardList'
// import { Input, Button } from "@nextui-org/react"

// export default function AuctionsDetail(props: any, { listing }) {
//   //console.log(listing)
//   const { data: session } = useSession()
//   const params = useParams()
//   const itemId = params.id
//   const [listingItem, setListingItem] = useState([])
//   const [bidAmount, setBidAmount] = useState([])

//   console.log(itemId)

//   useEffect(() => {
//     const fetchListingItem = async () => {
//       const res = await fetch(`/api/auctions/${itemId}`)
//       const data = await res.json()

//       setListingItem(data)
//     }

//     if (itemId) fetchListingItem()
//     console.log(listingItem)
//   }, [itemId])

//   async function placeBid() {
//     try {
//       const response = await fetch(`/api/auctions/${itemId}/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ bidAmount: bidAmount }),
//       })

//       console.log(response)
//       console.log(await response.json())
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <div>
//       <h1 className='text-center text-5xl mt-12'>Auction Details Page</h1>
//       <Input
//         type="text"
//         id="enterBid"
//         name="enterBid"
//         value={bidAmount}
//         onChange={(event) => setBidAmount(event.target.value)}
//         className="mt-1" />
//       <Button
//         color='primary'
//         className='w-1/10 mb-8 mr-4'
//         onClick={placeBid}>Place Bid
//       </Button>
//     </div>
//   )
// }
import { notFound } from 'next/navigation'
import AuctionDetailsCard from '@/components/AuctionDetailsCard'

async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/auctions/${Number(id)}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    return notFound()
  }
  return res.json()
}

export async function generateMetadata({ params }) {
  const post = await getData(params.id)
  return {
    title: post.title,
    description: post.description,
  }
}

const AuctionsDetail = async ({ params }) => {
  const data = await getData(params.id)
  return (
    <div>
      <h1 className='text-center text-5xl mt-12'>Auction Details Page</h1>
      <AuctionDetailsCard data={data} />
    </div>
  )
}

export default AuctionsDetail
