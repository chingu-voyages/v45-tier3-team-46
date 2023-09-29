import { notFound } from 'next/navigation'
import AuctionDetailsCard from '@/components/AuctionDetailsCard'

async function getData(id) {
  const res = await fetch(
    ` https://chingu-auction.vercel.app/api/auctions/${Number(id)}`,
    {
      cache: 'no-store',
    }
  )

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
