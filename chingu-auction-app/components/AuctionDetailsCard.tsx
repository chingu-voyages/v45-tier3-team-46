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
    <div>
      <div className='grid grid-cols-1 md:grid-cols-5 m-10 gap-8'>
        <div className='border md:col-span-3'>
          <h1 className='text-lef text-3xl mt-12 mb-6 text-center'>
            {data.title}
          </h1>
          <Image
            width={600}
            alt={`${data.title} card`}
            src={data.pictures[0].url}
            className='p-5 rounded'
          />
        </div>
        <div className='border md:col-start-4 col-span-2'>
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
      </div>
      <div className='grid grid-cols-1 md:grid-cols-5 m-10 gap-8'>
        <div className='sm:col-start-2 col-span-3'>
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
              <p>Starting Bid: ${data.startingBid}</p>
            </CardBody>
            <Divider />
            <CardBody>
              <p>Current Bid: ${data.currentBid}</p>
            </CardBody>
            <Divider />
            <CardBody className='flex flex-row justify-between items-center'>
              <p>Buy Now Price: ${data.buyNowPrice}</p>
              <Button color='secondary'> Buy Now</Button>
            </CardBody>
            <Divider />
            <CardBody>
              <p>Time Remaining: {data.expiresAt}</p>
            </CardBody>
            <Divider />
            <div>
              <Input
                type='text'
                label='$ bid'
                onChange={() => e.target.value}
              />
            </div>
            <Button color='primary'>Bid</Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
