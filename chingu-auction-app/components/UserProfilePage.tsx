import { useSession } from "next-auth/react"
import { Tabs, Tab } from "@nextui-org/tabs";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image"
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";

function ItemCard(props: any) {
  return (

    <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
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
  const p_style = "mb-1 p-1 border-b-2 border-purple-400 rounded-md"

  return (
    <div className="flex w-3/12 flex-col mx-auto">
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

        {/* TODO make this into a seperate component*/}

        <Tab key="items-for-sale" title="Items for Sale" >
          <Card >
            <CardBody>
              <ItemCard />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="items-sold" title="Items Sold" >
          <Card >
            <CardBody>
              <ItemCard />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="items-purchased" title="Items Purchased" >
          <Card >
            <CardBody>
              <ItemCard />
            </CardBody>
          </Card>
        </Tab>
      </Tabs >
    </div >


  )
}
