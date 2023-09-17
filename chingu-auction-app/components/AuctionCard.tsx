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
            src={listing?.pictures[0]?.url}
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
          <p className='text-red-500'>
            Ending At: {formatDate(listing.expiresAt)}
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}
