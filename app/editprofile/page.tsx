import EditProfile from '@/components/EditProfile'
import { authOptions } from '@/lib/auth'
import connectDb from '@/lib/db'
import User from '@/models/User'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async() => {
    await connectDb()
    const session = await getServerSession(authOptions)
    const user = await User.findById(session.user.id).lean()

    const serializedUser = {
        _id:user?._id.toString(),
        name:user?.name || "",
        email:user?.email || "",
        bio:user?.bio || "",
        avatar:user?.avatar || "",
    }
    
  return (
    <>
        <EditProfile user={serializedUser} />
    </>
  )
}

export default page