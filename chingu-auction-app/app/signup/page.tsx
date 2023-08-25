"use client"
import React, { useState } from 'react'
import {signIn} from "next-auth/react"

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

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log(event)
    if (event.currentTarget.getAttribute("name") === "oauth")
      return
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
    // login after signup, redirect to '/' instead of previous page
    if (user) {
      await signIn("credentials", { 
        username: formData.username,
        password: formData.password,
        callbackUrl: '/'
      })
    }
    console.log(user)
  }

  const signUpWithOAuth = async (provider: string) => {
    // change callbackUrl to a "finish signup" page?
    await signIn(provider, { callbackUrl: '/' })
  }

  return (
    <div className="flex-col m-auto sm:shadow-md w-7/8 sm:w-1/2">
      <h1 className="text-2xl text-center mt-24 p-8 mb-3">Register for Chingu Auctions</h1>
      <form className="flex flex-col gap-3 m-10 p-8" onSubmit={handleSignup}>
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
        <button type="submit" className="rounded shadow w-auto bg-blue-300 mt-2 mb-2 p-1 font-medium">
          Sign Up
        </button>
        <button type="button" onClick={() => signUpWithOAuth('google')} name="oauth" className="rounded shadow w-auto bg-blue-300 mb-5 p-1 font-medium">
          Sign up with Google
        </button>
      </form>
    </div>
  )
}

export default SignUp
