'use client'
import { useSession } from 'next-auth/react'
import { Tabs, Tab } from '@nextui-org/tabs'
import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Input } from '@nextui-org/input'
import { useEffect, useState } from 'react'
import { Item, User } from '../app/utils/types'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'


function ItemCard(props: any) {

  const router = useRouter()
  return (
    <Card className="w-72 h-72 mt-1 mb-5" shadow="sm" isPressable onPress={() => router.push(`/auctions/${props.id}`)}>
      <CardBody className="overflow-visible p-0">
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

export function UserProfilePage() {
  const { data: session } = useSession()
  const { userId } = useParams()
  const [user, setUser] = useState([])
  const tab_card_style = "grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3"

  useEffect(() => {
    const fetch_data = async () => {
      const data = await fetch(`/api/user/${userId}/profile`)
      const user = await data.json()
      console.log(user, "hee")
      setUser(user)
    }

    fetch_data()
  }, [])

  const items_purchased = user?.itemsPurchased?.filter((item: Item) => item.purchasedById)
  const items_sold = user?.itemsForSale?.filter((item: Item) => item.sold)
  const items_on_sale = user?.itemsForSale?.filter((item: Item) => item.sellerId)

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
                placeholder={
                  session?.user?.email !== null ? session?.user?.email : ''
                }
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
        <Tab key="items-for-sale" title="Items for Sale" >

          {items_on_sale === undefined ? "Loading" : items_on_sale?.length === 0 ? "No Items For Sale" : <div className={`${tab_card_style}`}>
            {items_on_sale.map((item: Item, index: number) => {
              return (
                <ItemCard key={index} id={item.id} title={item.title} price={item.buyNowPrice} img={item.pictures === undefined ? "No Picture Avaliable" : item.pictures[0]?.url} />)
            })}
          </div>}
        </Tab>
        <Tab key="items-sold" title="Items Sold" >
          {items_sold === undefined ? "Loading" : items_sold?.length === 0 ? "No Items Sold" : <div className={`${tab_card_style}`}>
            {items_sold.map((item: Item, index: number) => {
              return (
                <ItemCard key={index} id={item.id} title={item.title} price={item.buyNowPrice} img={item.pictures === undefined ? "No Picture Avaliable" : item.pictures[0]?.url} />
              )
            })}
          </div>}

        </Tab>
        <Tab key="items-purchased" title="Items Purchased" >
          {items_purchased === undefined ? "Loading" : items_purchased?.length === 0 ? "No Items Purchased" : <div className={`${tab_card_style}`}>
            {items_purchased.map((item: Item, index: number) => {
              return (
                <ItemCard key={index} id={item.id} title={item.title} price={item.buyNowPrice} img={item.pictures === undefined ? "No Picture Avaliable" : item.pictures[0]?.url} />
              )
            })}
          </div>}
        </Tab>
      </Tabs>
    </div >
  )
}
