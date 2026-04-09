"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()


    if (!name) {
      setError("Username is Required")
      return
    }
    if (!email) {
      setError("Email is Required")
      return
    }
    if (!password) {
      setError("Password is Required")
      return
    }


    setLoading(true)

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()


      setName("")
      setEmail("")
      setPassword("")
      setLoading(false)
      if(!res?.ok){
        setError(data)
      }
      if (res?.ok) {
        router.push("/login")
      }


    } catch (error) {
      console.log(error)
    }


  }

  return (
    <div className='md:p-10 p-6'>
      <form onSubmit={handleSubmit} className='max-w-110 text-sm font-medium whitespace-nowrap mx-auto border rounded-lg shadow-lg border-gray-300/50 text-white bg-[#171717] flex flex-col p-8 gap-4' action="">
        <h1 className='text-center font-bold text-2xl'>SignUp</h1>

        <h2 className='font-semibold text-lg'>Username</h2>
        <input
          value={name}
          onChange={(e) => {setName(e.target.value); setError("")}}
          type="text"
          placeholder='Enter Username'
          className='border rounded-md px-4 py-2 outline-none border-gray-500' />

        <h2 className='font-semibold text-lg'>Email</h2>

        <input
          value={email}
          onChange={(e) => {setEmail(e.target.value); setError("")}}
          type="email"
          placeholder='example@email.com'
          className='border rounded-md px-4 py-2 outline-none border-gray-500' />

        <h2 className='font-semibold text-lg'>Password</h2>

        <input
          value={password}
          onChange={(e) => {setPassword(e.target.value); setError("")}}
          type="password"
          min={8}
          placeholder='Enter password'
          className='border rounded-md px-4 py-2 outline-none border-gray-500' />

        {error && <div className='text-red-600 text-center font-semibold'>{error}</div>}
        <button disabled={loading} type='submit' className='font-bold bg-white px-4 py-2 rounded-lg text-black hover:bg-white/70'>{loading ? "Loading..." : "Submit"}</button>
      </form>
    </div>
  )
}

export default page