'use client'
import React from 'react'
import Link from 'next/link'
// import {Tabs} from "@nextui-org/tabs"
// import {Tab} from "@nextui-org/tabs"
// import {Card} from "@nextui-org/card"
// import {CardBody} from "@nextui-org/card"
// import {Button} from "@nextui-org/button"
import {Tabs, Tab, Card, CardBody, Button, Chip} from "@nextui-org/react"

const Addresses = ({addresses, type}) => {
//   const {userId} = useParams()

  console.log(addresses)
  //const billingAddresses = fetch()
  const tabsJSX = addresses?.map((address, index) => (
    <Tab 
      key={`address${index}`} 
      title={index === 0 ? `Default` : `Address ${index+1}`}>
    <Card className="w-64">
      <CardBody>
        <p>{address.street1}</p>
        <p>{address.street2}</p>
        <p>{address.city}, {address.state} {address.zip}</p>
      </CardBody>
    <Link href={`./shipping/editaddress`} as={`./shipping/editaddress?id=${address.id}`}>
      <Chip color="primary" className="w-1/10 mb-0">Edit Address</Chip>
    </Link>
    </Card>
    </Tab>
  ))

  return (
      <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        {tabsJSX}
      </Tabs>
      <div className="flex ">
      <Link href={`./shipping/addaddress`} as={`./shipping/addaddress?type=${type}`}>
        <Button color="primary" className="w-1/10 mb-8 mr-4">Add Address</Button>
      </Link>
      </div>
    </div>  
  )
}

export default Addresses