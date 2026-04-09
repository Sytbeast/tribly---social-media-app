"use client"
import React, { useState } from 'react'

interface props{
    userId:string;
    comments:string[]
    postId:string;
}

const CommentSection = ({userId , comments = [], postId}: props) => {
    const [allComments , setAllComments] = useState(comments)
    const [text , setText] = useState("")
    const [loading, setLoading] = useState(false)

    const handleComment = async () => {
        if(!text) return

        setLoading(true)
        await fetch(`/api/posts/${postId}/comment`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({text})
        })

        setAllComments([...allComments, text])
        setText("")
        setLoading(false)
    }


  return (
    <div className='mt-2 rounded-md'>
        <div className='flex gap-2 p-2'>
            <input 
            value={text}
            onChange={(e)=>setText(e.target.value)}
            type="text"
            placeholder='add a comment...'
            className='w-full px-2 py-1 outline-none border border-gray-400/50 rounded'
             />
            <button onClick={handleComment} className='px-2 py-1 bg-white rounded-md text-black hover:bg-white/50'>{loading ? "Adding..": "Add"}</button>
        </div>

        <div className='mt-2 rounded-md bg-[#0a0a0a] p-3 flex flex-col gap-3'>
            <p className='text-md font-medium text-gray-100 mb-2'>Comments</p>
            {allComments.map((comment, i)=>(
                <p className='text-sm pl-2 bg-[#212121] rounded py-2 whitespace-nowrap text-gray-300' key={i}>{comment}</p>
            ))}
        </div>
        
    </div>
  )
}

export default CommentSection