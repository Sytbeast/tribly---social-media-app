import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDb from '@/lib/db'
import Post from '@/models/Post'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

const page = async () => {
    await connectDb()
    const session = await getServerSession(authOptions)
    const posts = await Post.find({ author: session?.user?.id }).lean().sort({ createdAt: -1 })


    return (
        <div className='my-10 text-white'>


            {posts.length>0? <div className='flex flex-col gap-10 p-3 max-w-200 mx-auto overflow-x-hidden'>
                {posts.map((post) => (
                    <PostCard key={post._id.toString()} post={{
                        ...post,
                        _id: post._id.toString(),
                        likes: post.likes?.map((id: any) => id.toString()) || [],
                        comments: post.comments?.map((c: any) => ({ text: c.text })) || [],
                        author: post.author?.toString() || "",
                    }} userId={session?.user?.id || ""} />
                ))}
            </div>: <div className='text-gray-300 font-bold text-center'>
                No Post Added By You!
                <Link href={'/post'} className='px-4 py-2 mx-4 font-bold rounded-full bg-white text-black'>Add Post</Link>
            </div>}

        </div>
    )
}

export default page