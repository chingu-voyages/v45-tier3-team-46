import React from 'react'
import ShippingEditForm from '@/components/ShippingEditForm'

const EditAddress = () => {
  return (
    <div className="flex flex-col space-y-4 items-center">
      <h1 className="mt-4 mb-8 text-3xl">Edit Address</h1>
      <ShippingEditForm />
    </div>
  )
}

export default EditAddress
