'use client'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton
} from "@material-tailwind/react";


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
    <>
      <Card className="w-full max-w-[20rem] shadow-lg border-2 border-black">
        <CardHeader floated={false} color="blue-gray">
          <img
            src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="ui/ux review check"
          />

        </CardHeader>
        <CardBody>
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-medium">
              {props.itemName}
            </Typography>
            <Typography
              color="blue-gray"
              className="flex items-center gap-1.5 font-normal"
            >
              {props.itemCondition}
            </Typography>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              Current Bid {props.currentBid}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              Bids {props.amountBids}
            </Typography>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              Buy {props.buyPrice}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              {props.timeLeft}
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="pt-3">
          <Button className="mb-2" size="lg" fullWidth={true}>
            Bid
          </Button>
          <Button size="lg" fullWidth={true}>Buy</Button>
        </CardFooter>
      </Card>
    </>
  )
}
