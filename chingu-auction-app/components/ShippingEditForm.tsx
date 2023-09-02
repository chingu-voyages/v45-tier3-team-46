'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Input, Button } from "@nextui-org/react"
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const ShippingEditForm = () => {
    const [addressToEdit, setAddressToEdit] = useState({})
    const searchParams = useSearchParams()
    const addressId = Number(searchParams.get('id'))
  console.log(addressId)

  const [formData, setFormData] = useState({
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    addressType: '',
  })

  const {userId} = useParams()
  useEffect(() => {
    async function getAddressToEdit() {
        const response = await fetch(`/api/user/${userId}/shipping`)
        const addresses = await response.json()
        const address = addresses.find(address => address.id === addressId)
        setAddressToEdit(address)
        
        setFormData({
            street1: address.street1,
            street2: address.street2,
            city: address.city,
            state: address.state,
            zip: address.zip,
            addressType: address.addressType,
          })
    }
    
    getAddressToEdit()
    console.log(addressToEdit)
}, [])

console.log(addressToEdit)
  
  //console.log(userId, search)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string, value: string } = event.target
    console.log(formData)
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log(formData)
    try {
        const response = await fetch(`/api/user/${userId}/shipping`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            street1: formData.street1,
            street2: formData.street2,
            city: formData.city,
            state: formData.state,
            zip: Number(formData.zip),
            addressType: addressType,
            userId: Number(userId)
          })
        })
        console.log(response)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div>
    {Object.keys(addressToEdit).length > 0 && (
      <form className="grid grid-cols-2 gap-4 max-w-xl mx-auto" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="street1" className="block text-sm font-medium text-gray-700">Street 1</label>
          <Input type="text" id="street1" name="street1" value={formData.street1} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label htmlFor="street2" className="block text-sm font-medium text-gray-700">Street 2</label>
          <Input type="text" id="street2" name="street2" value={formData.street2} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <Input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
          <Input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip</label>
          <Input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} className="mt-1" />
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <Button color="primary" className="w-full mt-2" type="submit">
            Update Address
          </Button>
          <Link href={`../shipping`}>
            <Button color="danger" className="w-full mt-2">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
      )}
    </div>
  )
}

export default ShippingEditForm