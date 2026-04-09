export const dynamic = 'force-dynamic'
import connectDb from '@/lib/db'
import Post from '@/models/Post';
import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import PostCard from '@/components/PostCard';



const Home = async () => {
  await connectDb();
  // await new Promise(resolve => setTimeout(resolve, 2000))
  const posts = await Post.find().sort({createdAt: -1}).lean();
  const session = await getServerSession(authOptions)

 
  return (
    <div className='my-10 text-white'>


      {/* <div className='max-w-180 p-6 h-screen overflow-x-hidden mx-auto border-gray-400'> */}
      <div className='text-center font-medium text-sm whitespace-nowrap p-4'>
        See Latest Posts
      </div>


      <div className='flex flex-col gap-10 p-3 max-w-200 mx-auto overflow-x-hidden'>
        {posts.map((post) => (
          <PostCard key={post._id.toString()}  post={{
            ...post,
            _id: post._id.toString(),
            likes: post.likes?.map((id: any) => id.toString()) || [],
            comments: post.comments?.map((c: any) => ({ text: c.text })) || [],
            author: post.author?.toString() || "",
        }} userId={session?.user?.id || ""} />
        ))}
      </div>

      {/* </div> */}
    </div>

  )
}

export default Home