"use client"
import React, { useState } from 'react'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string, value: string } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    }

    const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(newUser)
    })

    const user = await response.json()
    console.log(user)
  }

  return (
    <div className="flex-col m-auto sm:shadow-md w-7/8 sm:w-1/2">
      <h1 className="text-2xl text-center mt-24 p-8 mb-3">Register for Chingu Auctions</h1>
      <form className="flex flex-col gap-3 m-10 p-8" onSubmit={handleSubmit}>
        <input
          className="shadow rounded p-2"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          className="shadow rounded p-2"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="shadow rounded p-2"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit" className="rounded shadow w-auto bg-blue-300 mb-5">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUp
