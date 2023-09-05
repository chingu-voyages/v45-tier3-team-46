import React from 'react'
import Addresses from '@/components/Addresses'
import Link from 'next/link'
import getAddresses from './getAddresses'

const Shipping = async () => {
  const shippingAddresses = await getAddresses('Shipping')
  const billingAddresses = await getAddresses('Billing')
  console.log('page.tsx addresses', shippingAddresses, billingAddresses)

  return (
    <div className='grid'>
      <h1 className="text-3xl md:text-center font-semibold my-8 mx-10">Edit Shipping and Billing Details</h1>
      <div className='flex flex-col md:flex-row justify-center'>
        <div className='mx-10'>
          <h2 className="text-lg font-semibold mb-4">Shipping Addresses</h2>
          <Addresses addresses={shippingAddresses} type={'Shipping'}/>
        </div>
        <div className='mx-10'>
          <Link href={`./shipping/addaddress`} as="./shipping/addaddress?type=Billing">
            <h2 className="text-lg font-semibold mb-4">Billing Addresses</h2>
          </Link>
          <Addresses addresses={billingAddresses} type={'Billing'}/>
        </div>
      </div>
    </div>
  )
}

export default Shipping
