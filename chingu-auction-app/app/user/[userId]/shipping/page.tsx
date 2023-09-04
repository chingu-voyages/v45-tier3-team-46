import React from 'react'
import Addresses from '@/components/Addresses'
import Link from 'next/link'
import getAddresses from './getAddresses'

const Shipping = async () => {
  const shippingAddresses = await getAddresses('Shipping')
  const billingAddresses = await getAddresses('Billing')
  console.log('page.tsx addresses', shippingAddresses, billingAddresses)

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className="text-3xl font-semibold mt-8 mb-4">Edit Shipping and Billing Details</h1>
      <div>
        <h2 className="text-lg font-semibold mb-4">Shipping Addresses</h2>
        <Addresses addresses={shippingAddresses} type={'Shipping'}/>
      </div>
      <div>
        <Link href={`./shipping/addaddress`} as="./shipping/addaddress?type=Billing">
          <h2 className="text-lg font-semibold mb-4">Billing Addresses</h2>
        </Link>
        <Addresses addresses={billingAddresses} type={'Billing'}/>
      </div>
    </div>
  )
}

export default Shipping
