"use client"
import React, { useState } from 'react'
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';
import { useRouter } from 'next/navigation';

 interface IpostCard {
  _id: string;
  uesrId: string;
  likes: string[];
  comments:{text:string}[];
  postId: string;
  image: string;
  title: string;
  hashtags: string[];
  author:string;
}


interface props{
    post:IpostCard;
    userId:string;
}

const PostCard = ({post , userId}:props) => {
    const router = useRouter()

    const [showComments, setShowComments] = useState(false)

    const handleDelete = async () => {
        const confirmed = confirm("Are u sure u want to delete")
        if(!confirmed) return 
        
        await fetch(`/api/posts/${post._id}`, {
            method:"DELETE"
        })
        router.refresh()
    }

    return (
        <div className='min-h-150 bg-[#171717] md:w-110 w-full overflow-x-hidden mx-auto shadow-lg rounded-xl p-4' key={post._id}>
            <img alt='image' className='p-2 w-full bg-black border border-gray-500/50 rounded-md object-cover object-center h-100 text-center' src={post.image ? post.image : "image"}></img>
            <div className=' w-full rounded-md border-white/50 p-2'>
                <div className='flex items-center gap-4'>
                    <LikeButton postId={post._id.toString()} userId={userId|| ""} likes={post.likes?.map((id: any) => id.toString()) || []} />
                    <span className='flex gap-2' onClick={()=>setShowComments(!showComments)}><img src="comment.svg" width={20} alt="" />{post.comments.length}</span>
                    {post.author === userId && <button onClick={handleDelete} className='w-9 hover:bg-red-600 cursor-pointer rounded-full p-2'><img src="delete.svg" alt="" /></button>}
                </div>
                <h1><span className='whitespace-nowrap text-gray-300 font-bold'>{post.title}</span></h1>
                <div>{post.hashtags.map((hashtag) => "#" + hashtag + " ")}</div>
                {showComments && <CommentSection userId={userId} postId={post._id.toString()} comments={post.comments?.map((c: any) => c.text) || []} />}
            </div>
        </div>
    )
}

export default PostCard