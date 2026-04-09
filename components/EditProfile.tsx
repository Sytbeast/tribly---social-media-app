"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

interface userProps {
  _id: string;
  name: string;
  email: string;
  bio: string;
  avatar: string
}

const EditProfile = ({ user }: { user: userProps }) => {
  const router = useRouter()

  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)

  const [name, setName] = useState<string>(user.name)
  const [bio, setBio] = useState<string>(user.bio)


  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const userId = user._id

    try {
      setLoading(true)
      let avatarUrl = user.avatar

      if(file){
        const formData = new FormData()
        formData.append("file", file)

        const uploadRes = await fetch("/api/upload", {
          method:"POST",
          body:formData
        })

        const uploadData = await uploadRes.json()
        avatarUrl = uploadData.secure_url
      }

      const res = await fetch(`/api/users/${userId}`, {
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({name , bio , avatar:avatarUrl})
      })

      const data = await res.json()

      if(!res.ok){
        setError(data)
        return
      }
      if(res.ok){
        router.push("/profile")
      }

    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }

  }

  return (
    <div className='md:p-10 p-6'>
      <Link href={"/profile"} className='text-white flex gap-2 text-sm font-medium cursor-pointer my-3 '><img src="arrow.svg" width={15} alt="" />back</Link>
      <form onSubmit={handleSubmit} className='max-w-110 text-sm font-medium whitespace-nowrap mx-auto border rounded-lg shadow-lg border-gray-300/50 text-white bg-[#171717] flex flex-col p-8 gap-4' action="">
        <h1 className='text-center font-bold text-2xl'>Edit Profile</h1>

        <h2 className='font-semibold text-lg'>Username</h2>
        <input
          value={name}
          onChange={(e) => { setName(e.target.value); setError("") }}
          type="text"
          placeholder='Enter Username'
          className='border rounded-md px-4 py-2 outline-none border-gray-500' />

        <h2 className='font-semibold text-lg'>Set Bio</h2>

        <input
          value={bio}
          onChange={(e) => { setBio(e.target.value); setError("") }}
          type="text"
          placeholder='Enter Bio'
          className='border rounded-md px-4 py-2 outline-none border-gray-500' />

        <h2 className='font-semibold text-lg'>Upload Avatar</h2>

        <input
          type="file"
          accept='image/*'
          onChange={(e) => { setFile(e.target.files?.[0] || null); setError("") }}
          className='border rounded-md px-4 py-2 outline-none border-gray-500' />

        {error && <div className='text-red-600 text-center font-semibold'>{error}</div>}
        <button disabled={loading} type='submit' className='font-bold bg-white px-4 py-2 rounded-lg text-black hover:bg-white/70'>{loading ? "Loading..." : "Edit Profile"}</button>
      </form>
    </div>
  )
}

export default EditProfile