import { AuctionCard } from "../components/AuctionCard"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuctionCard itemName="sample_name" sellerName="johnnyCash1" itemCondition="5" currentBid="$3.00" amountBids="20" buyPrice="$5.00" timeLeft="9:45m" />
    </main>
  )
}
