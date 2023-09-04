// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import { useCountdown } from "@/app/hooks/useCountdoun";

// type Props = {};

// const testItem: any = {
//   id: 1,
//   title: "Size 10 - Jordan 1 Retro OG High UNC Toe",
//   buyNowPrice: 140,
//   startingBid: 120,
//   currentBid: 0,
//   description: `Elevate your sneaker game with these Jordan 1 Retro OG High UNC Toe sneakers. The blue colorway with the iconic Jordan logo and high top design make for a stylish and versatile addition to any outfit. Perfect for athletic performance or casual wear, these sneakers are a must-have for any sneaker enthusiast.

//     Crafted with the highest quality materials and attention to detail, these sneakers are designed to provide maximum comfort and support. With a release year of 2023, these sneakers are sure to turn heads and attract attention. Don't miss out on the opportunity to own a piece of sneaker history.`,
//   pictures: ["https://i.ebayimg.com/images/g/hWwAAOSwMmNku~4H/s-l1600.jpg"],
//   seller: { userName: "Some User Name" },
//   category: "Shoes",
//   condition: "used",
//   expiresAt: new Date("Aug 25 2023 12:00:00"),
// };

// const TempHeader = () => {
//   return <div className="border-b-2 h-20 w-full">temp header</div>;
// };

// const TempFooter = () => {
//   return (
//     <div className="border-t-2 h-16 bottom-0 absolute w-full">temp footer</div>
//   );
// };

// export default function AuctionPage({}: Props) {
//   const router = useRouter();

//   console.log(router.query);

//   const [newBid, setNewBid] = useState<number>();

//   const [days, hours, minutes, seconds] = useCountdown(testItem.expiresAt);

//   const handleBuyNow = () => {
//     console.log("bough it now");

//     //some kinda request to purchase item
//   };

//   const handlePlaceBid = () => {
//     console.log("Place New Bid clicked");

//     //request to submit a new bid
//   };

//   return (
//     <>
//       <TempHeader />
//       <div className="flex flex-col p-3 lg:flex-row">
//         <div className="">
//           <h1 className="text-center">{testItem.title}</h1>
//           {testItem.pictures.map((imgSrc: string) => (
//             <img key={imgSrc} src={imgSrc} alt="product-image" />
//           ))}
//         </div>
//         <div className="text-center lg:w-1/2">
//           <p>Seller: {testItem.seller.userName}</p>
//           <div>
//             <h1>Time Remaining</h1>
//             <p>{`Days: ${days}, Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`}</p>
//           </div>
//           <div className="flex justify-around w-full ">
//             <h1>Buy It Now: ${testItem.buyNowPrice}</h1>
//             <button className="border" onClick={handleBuyNow}>
//               Buy Now
//             </button>
//           </div>
//           <div className="flex flex-col items-center">
//             <h1>
//               {!testItem.currentBid || testItem.currentBid == 0
//                 ? `Starting Bid: $${testItem.startingBid}`
//                 : `Current Bid: ${testItem.currentBid}`}
//             </h1>
//             <label>
//               Your Bid:
//               <input type="text" className="border" />
//             </label>
//             <button className="border" onClick={handlePlaceBid}>
//               Place Bid
//             </button>
//           </div>
//           <p>{testItem.description}</p>
//         </div>
//       </div>
//     </>
//   );
// }

// /*
// export async function getServerSideProps(context: any) {
//   const {auctionId} = context.query;

//   console.log(auctionId);

//   return {
//     props: {
//       auctionId
//     },
//   };
// }

// */
'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function AuctionsDetail({ listing }: Props) {
  // const { data: session } = useSession()
  const searchParams = useSearchParams()
  const itemId = Number(searchParams.get('id'))
  const [listingItem, setListingItem] = useState([])

  useEffect(() => {
    const fetchListingItem = async () => {
      const res = await fetch(`/api/auctions/${itemId}`)
      const data = await res.json()

      setListingItem({
        title: data.title,
        buyNowPrice: data.buyNowPrice,
        startingBid: data.startingBid,
        currentBid: data.currentBid,
      })
    }
    console.log(listingItem)
    if (itemId) fetchListingItem()
  }, [itemId])
  return (
    <div>
      <h1 className='text-center text-5xl mt-12'>Auction Details Page</h1>
      <p>{listingItem.title}</p>
    </div>
  )
}
