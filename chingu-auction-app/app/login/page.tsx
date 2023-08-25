"use client"
import React, { useState } from 'react'
import {signIn} from "next-auth/react"

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string, value: string } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()

    await signIn("credentials", { 
        username: formData.username,
        password: formData.password,
        callbackUrl: '/'
    })
  }

  const loginWithOAuth = async (provider: string) => {
    try {
      await signIn(provider, { callbackUrl: '/' })
    } catch (error) {
        // handle OAuthAccountNotLinked error with "You are already 
        // logged in" notification?
        console.log(error)
    }
  }

  return (
    <div className="flex-col m-auto sm:shadow-md w-7/8 sm:w-1/2">
      <h1 className="text-2xl text-center mt-24 p-8 mb-3">Login to Chingu Auctions</h1>
      <form className="flex flex-col gap-3 m-10 p-8" onSubmit={handleLogin}>
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
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit" className="rounded shadow w-auto bg-blue-300 mt-2 mb-2 p-1 font-medium">
          Login
        </button>
        <button type="button" onClick={() => loginWithOAuth('google')} className="rounded shadow w-auto bg-blue-300 mb-2 p-1 font-medium">
            Login with Google
        </button>
        <button type="button" onClick={() => loginWithOAuth('github')} className="rounded shadow w-auto bg-blue-300 mb-2 p-1 font-medium">
            Login with Github
        </button>
      </form>
    </div>
  )
}

export default Login
