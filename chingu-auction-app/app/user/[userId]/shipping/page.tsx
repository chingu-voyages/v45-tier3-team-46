import React from 'react'
import ShippingForm from '@/components/ShippingForm'
import Link from 'next/link'

const Shipping = () => {

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Edit Shipping and Billing Details</h1>
      <div>
        <Link href={`./shipping/addaddress`} as="./shipping/addaddress?type=Shipping">
          <h2 className="text-xl font-semibold mb-4">Add a Shipping Address</h2>
        </Link>
      </div>
      <div>
        <Link href={`./shipping/addaddress`} as="./shipping/addaddress?type=Billing">
          <h2 className="text-xl font-semibold mb-4">Add a Billing Address</h2>
        </Link>
      </div>
    </div>
  )
}

export default Shipping
