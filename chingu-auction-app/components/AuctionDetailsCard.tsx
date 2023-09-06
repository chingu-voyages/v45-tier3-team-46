'use client'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Input,
  Button,
} from '@nextui-org/react'

export default function AuctionDetailsCard({ data }) {
  console.log({ data })
  return (
    <div className='grid grid-cols-2 m-10 gap-8'>
      <div>
        <h1 className='text-lef text-3xl mt-12 mb-6'>{data.title}</h1>
        <Image
          width={600}
          alt={`${data.title} card`}
          src={data.pictures[0].url}
        />
      </div>
      <div>
        <Card className='max-w-[600px]'>
          <CardHeader className='flex gap-3'>
            <div>
              <p className='text-xl font-bold'>Item Details</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Description: {data.description}</p>
          </CardBody>
          <Divider />
          <CardBody>
            <p>Condition: {data.condition}</p>
          </CardBody>
          <Divider />
          <CardBody>
            <p>Category: {data.category}</p>
          </CardBody>
          <Divider />

          <CardBody>
            <p>Seller Name: sellername</p>
          </CardBody>
          <Divider />
          <CardBody>
            <p>Seller Rating: rating</p>
          </CardBody>
          <Divider />
        </Card>
      </div>
      <div>
        <Card className='max-w-[600px]'>
          <CardHeader className='flex gap-3'>
            <div>
              <p className='text-xl font-bold'>Bid Information</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Bid Status</p>
          </CardBody>
          <Divider />
          <CardBody>
            <p>Bid Status</p>
          </CardBody>
          <Divider />
          <CardBody>
            <p>Starting Bid: ${data.startingBid}</p>
          </CardBody>
          <Divider />
          <CardBody>
            <p>Current Bid: ${data.currentBid}</p>
          </CardBody>
          <Divider />
          <CardBody>
            <p>Buy Now Price: ${data.buyNowPrice}</p>
          </CardBody>
          <Divider />
          <CardBody>
            <p>Time Remaining: {data.expiresAt}</p>
          </CardBody>
          <Divider />
          <div>
            <Input type='text' label='$ bid' onChange={() => e.target.value} />
          </div>
          <Button color='primary'>Bid</Button>
        </Card>
      </div>
    </div>
  )
}
