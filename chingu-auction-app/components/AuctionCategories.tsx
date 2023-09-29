import { Link } from '@nextui-org/react'

const auctionCategories = [
  'Clothing',
  'Electronics',
  'Food',
  'Used Goods',
  'As Is',
  'Automotive',
  'Shoes',
  'Collectibles',
  'Toys',
  'Jewelry',
  'Home',
]

export function AuctionCategories(props: any) {
  return (
    <div className='w-full text-gray-500 border-black border-2'>
      <div className='mx-auto p-4 pb-8 flex flex-col place-content-center bg-white'>
        <div>
          <h1 className='text-2xl text-center mt-10'>
            Chingu Auction - New, Used, As Is Goods for Sale
          </h1>
        </div>
        <ul className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3'>
          {auctionCategories.map((category: string, index) => (
            <Link key={index} href={`/auctions?${category}`}>
              <li key={index} className='text-lg mx-10'>
                {category}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}
