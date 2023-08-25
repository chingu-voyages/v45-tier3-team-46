'use client'

import { useState } from 'react'
import AuctionForm from '../../components/AuctionForm'

const itemCondition = ['New', 'Open box', 'Used', 'As Is']

const AddAuction = () => {
  const [submitting, setSubmitting] = useState(false)
  const [itemData, setItemData] = useState({
    title: '',
    buyNowPrice: '',
    startingBid: '',
    currentBid: '',
    description: '',
    pictures: [],
    seller: '',
    soldBy: '',
    purchasedBy: '',
    category: '',
    condition: '',
    createdAt: '',
    updatedAt: '',
    expiresAt: '',
  })

  const listAuctionItem = async (e: any) => {
    e.preventDefault()
    setSubmitting(true)

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
          pictures: itemData.pictures,
          seller: itemData.seller,
          soldBy: itemData.soldBy,
          purchasedBy: itemData.purchasedBy,
          category: itemData.category,
          condition: itemData.condition,
          createdAt: itemData.createdAt,
          updatedAt: itemData.updatedAt,
          expiresAt: itemData.expiresAt,
        }),
      })
      if (response.status !== 200) {
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
