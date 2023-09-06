'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
// import {Tabs} from "@nextui-org/tabs"
// import {Tab} from "@nextui-org/tabs"
// import {Card} from "@nextui-org/card"
// import {CardBody} from "@nextui-org/card"
// import {Button} from "@nextui-org/button"
import {Tabs, Tab, Card, CardBody, Button, Chip} from "@nextui-org/react"

const ShippingAddresses = ({addresses, type}) => {
  const {userId} = useParams()
  const [addressList, setAddressList] = useState(addresses)

  const deleteAddress = async (addressId) => {
    console.log(addressId)
    try {
      const response = await fetch(`/api/user/${userId}/shipping`, {
        method: 'DELETE',
        body: JSON.stringify({
            addressId
        })
      })
      console.log(response.status)
      if (response.status === 204)
        setAddressList(prevAddresses => 
          prevAddresses.filter(address => address.id !== addressId))
    } catch (error) {
      console.log(error)
    }
  }
  
  const tabsJSX = addressList?.map((address, index) => (
    <Tab 
      key={`address${index}`} 
      title={index === 0 ? `Default` : `Address ${index+1}`}>
    <Card className='w-64'>
      <CardBody className='mb-4'>
        <p>{address.street1}</p>
        <p>{address.street2}</p>
        <p>{address.city}, {address.state} {address.zip}</p>
      </CardBody>
    <div className='flex mb-2'>
      <Link className='ml-5 text-blue-500 hover:underline'
        href={`./shipping/editaddress`} as={`./shipping/editaddress?id=${address.id}`}
      >
        Edit |&nbsp;
      </Link>
      <button className='text-blue-500 hover:underline'
        onClick={() => deleteAddress(address.id)}
      >
        Delete 
      </button>
    </div>
    </Card>
    </Tab>
  ))

  return (
    <div className='flex w-full flex-col'>
      <Tabs aria-label="Options">
        {tabsJSX}
      </Tabs>
      <div className='flex '>
      {addressList?.length < 3 &&    // hide Add button if there are already 3 addresses
        <Link href={`./shipping/addaddress`} as={`./shipping/addaddress?type=${type}`}>
          <Button color='primary' className='w-1/10 mb-8 mr-4'>Add Address</Button>
        </Link>
      }
      </div>
    </div>  
  )
}

export default ShippingAddresses