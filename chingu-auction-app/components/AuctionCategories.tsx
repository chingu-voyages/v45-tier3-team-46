import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Link,
} from '@nextui-org/react'

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
    <div className='w-full md:h-screen text-gray-500'>
      <div className='mx-auto p-4 flex flex-col justify-center items-center w-full h-full bg-slate-200'>
        <div>
          <h1 className='text-2xl text-center mt-10'>
            Chingu Auction - New, Used, As Is Goods for Sale
          </h1>
        </div>
        <ul className='grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3'>
          {auctionCategories.map((category: string) => (
            <Link href={`/auctions?${category}`}>
              <li className='text-lg mx-10'>{category}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}
