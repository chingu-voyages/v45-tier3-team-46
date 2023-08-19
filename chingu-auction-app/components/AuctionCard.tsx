export function AuctionCard(props) {

  return (
    <>
      <div id="mini-auction-card" className="w-96 bg-red-50 ring-2 ring-offset-4 ring-black ring-offset-blue-100 rounded-md">
        <figure className="h-96 border-black border-2 rounded-t-md p-1">
          <img alt="sample_text" />
        </figure>
        <div id="card-text-section">
          <div id="card-heading-section " className="border-black border-l-2 border-r-2 p-1">
            <span className="flex flex-row justify-between text-xl">
              <h2> {props.itemName}</h2>
              <h3> {props.sellerName}</h3>
            </span>
            <h3> Condition: {props.itemCondition}</h3>
          </div>
          <div id="card-detail-section" className="border-black border-2 rounded-b-md  p-1">

            <span className="flex flex-row justify-between text-lg">
              <h4> Current Bid: {props.currentBid}</h4>
              <h4> Bids: {props.amountBids}</h4>
            </span>
            <h4> Buy It Now: {props.buyPrice}</h4>
            <h4> Time Remaining: <span className="text-red-500">{props.timeLeft}</span></h4>
          </div>
        </div>
      </div>
    </>
  )
}
