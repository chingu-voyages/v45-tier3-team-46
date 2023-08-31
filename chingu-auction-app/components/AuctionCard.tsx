import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
interface Props {
  itemName: string,
  sellerName: string,
  itemCondition: string,
  currentBid: number,
  amountBids: number,
  buyPrice: number,
  timeLeft: string
}

export function AuctionCard(props: any) {

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold"> {props.sellerName}</p>
        <small className="text-default-500"> Condition {props.itemCondition}</small>
        <h4 className="font-bold text-large">{props.itemName}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
      <CardFooter className="text-medium flex-col items-stretch">
        <div className="flex flex-row justify-between">
          <b>Bid {props.currentBid}</b>
          <p className="text-default-500">{props.amountBids} Bids</p>
        </div>
        <div className="flex flex-row justify-between">
          <b>Buy at {props.buyPrice}</b>
          <p className="text-red-500">{props.timeLeft}</p>
        </div>
      </CardFooter>
    </Card>
  )
}
