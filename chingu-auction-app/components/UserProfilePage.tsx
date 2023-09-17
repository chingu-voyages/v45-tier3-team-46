'use client'
import { getSession, useSession } from 'next-auth/react'
import { Tabs, Tab } from '@nextui-org/tabs'
import { getServerSession } from 'next-auth'
import { options } from '../app//api/auth/[...nextauth]/options'
import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Input } from '@nextui-org/input'
import { useEffect, useState } from 'react'
import { Item } from '../app/utils/types'
import { useParams } from 'next/navigation'
function ItemCard(props: any) {
  return (
    <Card
      className='w-72 h-72 mt-1 mb-5'
      shadow='sm'
      isPressable
      onPress={() => console.log('pressed')}
    >
      <CardBody className='overflow-visible p-0'>
        <Image
          shadow='sm'
          radius='lg'
          width='100%'
          height='100%'
          alt={props?.title}
          className='w-full object-cover h-48'
          src={props?.img}
        />
      </CardBody>
      <CardFooter className='text-small justify-between'>
        <b>{props?.title}</b>
        <p className='text-default-500'>{props?.price}</p>
      </CardFooter>
    </Card>
  )
}

export function UserProfilePage(props: any) {
  const { data: session } = useSession()
  const { userId } = useParams()
  const [items, setItems] = useState([])
  const tab_card_style = 'grid grid-cols-1 lg:grid-cols-3  md:grid-cols-2 gap-3'

  useEffect(() => {
    const fetch_data = async () => {
      const data = await fetch(`/api/user/${userId}/profile`)
      const items = await data.json()
      return items
    }

    const returned_items = fetch_data()
    returned_items.then((values) => setItems(values))
  }, [])

  const items_purchased = items.filter((item: Item) => item.purchasedById)
  const items_sold = items.filter((item: Item) => item.sold)
  const items_on_sale = items.filter((item: Item) => item.sellerId)

  return (
    <div className='flex w-11/12 flex-col items-center mx-auto mt-2'>
      <Tabs aria-label='options'>
        <Tab key='details' title='Details'>
          <Card>
            <CardBody>
              <Input
                isReadOnly
                type='text'
                label='Username'
                variant='bordered'
                defaultValue={
                  session?.user?.name !== null ? session?.user?.name : ''
                }
                className='max-w-xs mb-1'
              />

              <Input
                isReadOnly
                type='email'
                label='Email'
                variant='bordered'
                defaultValue={
                  session?.user?.email !== null ? session?.user?.email : ''
                }
                className='max-w-xs mb-1'
              />

              <Input
                isReadOnly
                type='password'
                label='Password'
                variant='bordered'
                defaultValue='******'
                className='max-w-xs mb-1'
              />

              <Input
                isReadOnly
                type='text'
                label='User Address'
                variant='bordered'
                defaultValue='Mommys House'
                className='max-w-xs mb-1'
              />
            </CardBody>
          </Card>
        </Tab>
        <Tab key='items-for-sale' title='Items for Sale'>
          {items.length === 0 ? (
            'No Items For Sale'
          ) : (
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3'>
              {items_on_sale.map((item: Item, index) => {
                return (
                  <ItemCard
                    key={index}
                    title={item.title}
                    price={item.buyNowPrice}
                    img={item.pictures[0].url}
                  />
                )
              })}
            </div>
          )}
        </Tab>
        <Tab key='items-sold' title='Items Sold'>
          {items.length === 0 ? (
            'No Items Sold'
          ) : (
            <div className='grid grid-cols-1 lg:grid-cols-3  md:grid-cols-2 gap-3'>
              {items_sold.map((item: Item, index) => {
                return (
                  <ItemCard
                    key={index}
                    title={item.title}
                    price={item.buyNowPrice}
                    img={item.pictures[0].url}
                  />
                )
              })}
            </div>
          )}
        </Tab>
        <Tab key='items-purchased' title='Items Purchased'>
          {items.length === 0 ? (
            'No Items Purchased'
          ) : (
            <div className='grid grid-cols-1 lg:grid-cols-3  md:grid-cols-2  gap-3'>
              {items_purchased.map((item: Item, index) => {
                return (
                  <ItemCard
                    key={index}
                    title={item.title}
                    price={item.buyNowPrice}
                    img={item.pictures[0].url}
                  />
                )
              })}
            </div>
          )}
        </Tab>
      </Tabs>
    </div>
  )
}
