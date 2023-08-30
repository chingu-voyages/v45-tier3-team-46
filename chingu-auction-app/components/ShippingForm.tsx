'use client'
import React from 'react'
import { useState } from 'react'
import { useParams } from 'next/navigation'

const ShippingForm = ({ addressType }) => {
  const [addresses, setAddresses] = useState([])
  const [formData, setFormData] = useState({
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    addressType: '',
  })

  const {userId} = useParams()
  console.log(userId)

  const addAddress = () => {
      setAddresses([...addresses, {}])
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string, value: string } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log(formData)
    try {
        const response = await fetch(`/api/shipping`, {
          method: 'POST',
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
      <h3 className='text-xl font-semibold mb-4'>{addressType} Addresses</h3>
      {addresses.map((address, index) => (
        <div key={index} className="mb-2">
          <button
            onClick={() => setAddresses(addresses.filter((_, i) => i !== index))}
            className='text-red-600 hover:text-red-800'
          >
            -
          </button>
          <div className='mt-4 p-4 bg-gray-100 rounded-lg grid grid-cols-1'>
            <h3 className='text-lg font-medium mb-2'>Address {index + 1}</h3>
            <form className='grid grid-cols-1'>
              <div className="mt-2">
                <label htmlFor={`street${index}`} className='block mb-1'>
                  Street 1
                </label>
                <input
                  type='text'
                  id={`street1${index}`}
                  name={'street1'}
                  value={formData.street1}
                  onChange={handleChange}
                  className='block text-sm font-semibold leading-6 text-gray-900'
                />
                <label htmlFor={`street${index}`} className="block mb-1">
                  Street 2
                </label>
                <input
                  type='text'
                  id={`street2${index}`}
                  name={'street2'}
                  value={formData.street2}
                  onChange={handleChange}
                  className='block text-sm font-semibold leading-6 text-gray-900'
                />
                <label htmlFor={`city${index}`} className="block mb-1">
                  City
                </label>
                <input
                  type='text'
                  id={`city${index}`}
                  name={'city'}
                  value={formData.city}
                  onChange={handleChange}
                  className='block text-sm font-semibold leading-6 text-gray-900'
                />
                <label htmlFor={`city${index}`} className='block mb-1'>
                  State
                </label>
                <input
                  type='text'
                  id={`state${index}`}
                  name={'state'}
                  value={formData.state}
                  onChange={handleChange}
                  className='block text-sm font-semibold leading-6 text-gray-900'
                />
                <label htmlFor={`city${index}`} className='block mb-1'>
                  Zip
                </label>
                <input
                  type='text'
                  id={`zip${index}`}
                  name={'zip'}
                  value={formData.zip}
                  onChange={handleChange}
                  className='block text-sm font-semibold leading-6 text-gray-900'
                />
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      ))}
      <button
        onClick={addAddress}
        className='text-gray-600 hover:text-gray-800'
      >
        +
      </button>
    </div>
  )
}

export default ShippingForm