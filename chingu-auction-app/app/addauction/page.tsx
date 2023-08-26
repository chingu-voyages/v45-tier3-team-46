'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import AuctionForm from '../../components/AuctionForm'

const itemCondition = ['New', 'Open box', 'Used', 'As Is']

const AddAuction = (props) => {
  const { data: session } = useSession()
  console.log(session.user.id)

  const [submitting, setSubmitting] = useState(false)
  const [itemData, setItemData] = useState({
    title: '',
    buyNowPrice: '',
    startingBid: '',
    currentBid: '',
    description: '',
    pictures: [],
    sellerId: '',
    soldById: '',
    purchasedById: '',
    category: '',
    condition: '',
    createdAt: '',
    updatedAt: '',
    expiresAt: '',
  })

  const listAuctionItem = async (e: any) => {
    e.preventDefault()
    setSubmitting(true)

    // End auction expiresAt days from now
    const auctionLength: number = itemData.expiresAt * 24 * 60 * 60 * 1000

    try {
      const response = await fetch('/api/addauction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: itemData.title,
          buyNowPrice: itemData.buyNowPrice,
          startingBid: itemData.startingBid,
          currentBid: itemData.currentBid,
          description: itemData.description,
          pictures: [itemData.pictures],
          sellerId: session?.user?.id,
          category: itemData.category,
          condition: itemData.condition,
          expiresAt: auctionLength,
        }),
      })
      if (response.status !== 200) {
        console.log(itemData.title, 'title')
        console.log('Something went wrong')
      } else {
        console.log('Item has been listed successfully')
      }
    } catch (error) {
      console.log('There was an error listing the item', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuctionForm
      type='Add'
      itemData={itemData}
      setItemData={setItemData}
      handleSubmit={listAuctionItem}
    />
  )
}

export default AddAuction
