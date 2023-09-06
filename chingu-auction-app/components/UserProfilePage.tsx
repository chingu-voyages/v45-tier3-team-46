import { useSession } from "next-auth/react"
import { Tabs, Tab } from "@nextui-org/tabs";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image"
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";

interface Picture {
  id: number,
  url: string,
  altText?: string,
  item: Item,
  itemId: number

}

interface User {
  id: number,
  name?: string,
  username?: string,
  password?: string,
  email: string,
  emailVerified: string,
  itemsForSale: Item[]
  // itemsSold     query itemsForSale where sold: true  
  itemsPurchased: Item[]
  // userAddresses   UserAddress[]
  addresses: Address[],
  image?: string,
  accounts: Account[],
  sessions: Session[],
}
interface Account {
  id: string,
  user: User,
  userId: string,
  type: string,
  provider: string
  providerAccountId: string,
  refresh_token?: string,
  access_token?: string,
  expires_at?: number,
  token_type?: string,
  scope?: string,
  id_token?: string,
  session_state?: string

}


interface Address {
  id: number,
  street1: string,
  street2: string,
  city: string,
  state: string,
  zip: string,
  addressType: string,
  users: User[]
}

interface Session {
  id: string,
  sessionToken: string
  user: User,
  userId: number,
  expires: string
}

interface Item {
  id: number,
  title: string,
  buyNowPrice?: number,
  startingBid: number,
  currentBid?: number,
  description: string,
  pictures: Picture[],
  seller: User,
  sellerId: number,
  sold: boolean,
  purchasedBy?: User,
  purchasedById?: number,
  catergory: string,
  condition: string,
  createdAt: string,
  updatedAt: string,
  expiresAt: string

}


function ItemCard(props: any) {
  return (

    <Card className="w-96 mt-1 mb-5" shadow="sm" isPressable onPress={() => console.log("item pressed")}>
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={props.title}
          className="w-full object-cover h-[140px]"
          src={props.img}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{props.title}</b>
        <p className="text-default-500">{props.price}</p>
      </CardFooter>
    </Card>


  )

}

export function UserProfilePage(props: any) {
  const { data: session } = useSession()
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetch_data = async () => {
      const data = await fetch('/api/user/profile')
      const items = await data.json()
      return items
    }

    const returned_items = fetch_data()
    returned_items.then((values) => setItems(values))
  }, [])

  const items_purchased = items.filter((item: Item) => (item.purchasedById))
  const items_sold = items.filter((item: Item) => (item.sold))
  const items_on_sale = items.filter((item: Item) => (item.sellerId))

  return (
    <div className="flex w-5/12 flex-col mx-auto">
      <Tabs aria-label="options">
        <Tab key="details" title="Details">
          <Card>
            <CardBody>
              <Input
                isReadOnly
                type="text"
                label="Username"
                variant="bordered"
                defaultValue={session?.user?.name !== null ? session?.user?.name : ""}
                className="max-w-xs mb-1"
              />

              <Input
                isReadOnly
                type="email"
                label="Email"
                variant="bordered"
                defaultValue={session?.user?.email !== null ? session?.user?.email : ""}
                className="max-w-xs mb-1"
              />

              <Input
                isReadOnly
                type="password"
                label="Password"
                variant="bordered"
                defaultValue="******"
                className="max-w-xs mb-1"
              />


              <Input
                isReadOnly
                type="text"
                label="User Address"
                variant="bordered"
                defaultValue="Mommys House"
                className="max-w-xs mb-1"
              />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="items-for-sale" title="Items for Sale" >
          {items_on_sale.map((item: Item, index) => {
            return (
              <ItemCard key={index} title={item.title} price={item.buyNowPrice} />
            )
          })}

        </Tab>
        <Tab key="items-sold" title="Items Sold" >
          {items_sold.map((item: Item, index) => {
            return (
              <ItemCard key={index} title={item.title} price={item.buyNowPrice} />
            )
          })}

        </Tab>
        <Tab key="items-purchased" title="Items Purchased" >
          {items_purchased.map((item: Item, index) => {
            return (
              <ItemCard key={index} title={item.title} price={item.buyNowPrice} />
            )
          })}
        </Tab>
      </Tabs >
    </div >


  )
}
