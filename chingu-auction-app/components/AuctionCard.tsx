import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";

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
        <Image
          alt='Card background'
          className='object-cover rounded-xl'
          src='https://images.unsplash.com/photo-1693592681357-ae8543a48d28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
          // src={listing.pictures}
          width={270}
        />
        <Divider />
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
