import React from 'react'
import ShippingForm from '@/components/ShippingForm'
import Link from 'next/link'

const Shipping = () => {

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Edit Shipping and Billing Details</h1>
      <Link href={`./shipping/addaddress`}>
        Add an Address
      </Link>
      <ShippingForm addressType={'Shipping'}/>
      <ShippingForm addressType={'Billing'}/>
    </div>
  )
}

export default Shipping
