import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Link,
} from '@nextui-org/react'

interface Props {
  itemName: string
  sellerName: string
  itemCondition: string
  currentBid: number
  amountBids: number
  buyPrice: number
  timeLeft: string
}

export function AuctionCard({ listing }: any) {
  console.log('pictures data', { listing })
  return (

    <Card className='py-4'>
      <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
        <p className='text-tiny uppercase font-bold'>seller</p>
        <small className='text-default-500'>
          Condition {listing.condition}
        </small>
        <h4 className='font-bold text-large'>{listing.title}</h4>
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <Link href={`/auctions/${listing.id}`}>
          <Image
            alt='Card background'
            className='object-cover rounded-xl cursor-pointer'
            src={listing?.pictures[0].url}
            width={270}
          />
        </Link>

      </CardBody>
      <CardFooter className='text-medium flex-col items-stretch'>
        <div className='flex flex-row justify-between'>
          <b>Current Bid: ${listing.currentBid}</b>
          <p className='text-default-500'> Bids</p>
        </div>
        <div className='flex flex-row justify-between'>
          <b>Buy Now Price: ${listing.buyNowPrice}</b>
          <p className='text-red-500'>Ending At: {listing.expiresAt}</p>
        </div>

      </CardFooter>
    </Card>
  )
}
