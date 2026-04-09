import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import User from '@/models/User'
import connectDb from '@/lib/db'
import EditProfile from '@/components/EditProfile'
import Link from 'next/link'

const profile = async () => {
    await connectDb()

    const session = await getServerSession(authOptions)
    const user = await User.findById(session?.user?.id).lean()
    return (
        <>
        <div className="w-96 px-6 py-6 mx-auto text-center bg-[#171717] rounded-lg mt-5 xl:px-10">
            <div className="space-y-4 xl:space-y-6">
                <img className="mx-auto object-cover object-center rounded-full h-36 w-36" src={user?.avatar || "profilePlaceholder.svg"} alt="author avatar" />
                <div className="space-y-2">
                    <div className="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
                        <h3 className="text-white">{user?.name}</h3>
                        <p className="text-gray-400/50">{user?.bio || "No Bio Yet"}</p>
                    </div>
                    <div className='w-full flex mt-5 items-center justify-center gap-2'>
                        <Link href={"/userpost"} className='px-4 py-2 rounded-md bg-white text-black hover:bg-white/50 w-full font-medium text-sm'>My Posts</Link>
                        <Link href={"/editprofile"} className='px-4 py-2 rounded-md bg-white text-black hover:bg-white/50 w-full font-medium text-sm'>Edit Profile</Link>
                    </div>
                </div>
            </div>
        </div>
        </>

    )
}

export default profile