"use client"
import React, { useState } from 'react'

interface props {
    postId:string;
    likes:string[];
    userId:string;
}

const LikeButton = ({postId, likes = [] , userId}:props) => {

    const [likeCount, setLikeCount] = useState(likes.length)
    const [isLiked , setIsLiked] = useState(likes.includes(userId))

    const handleLike = async() => {
        const res = await fetch(`/api/posts/${postId}/like`, {
            method: "POST"
        })

        const data = await res.json()
        if(data === "Liked"){
            setLikeCount((l)=> l+1)
            setIsLiked(true)
        }else{
            setLikeCount((l)=> l-1)
            setIsLiked(false)
        }
    }


    return (
        <span onClick={handleLike} className='flex items-center cursor-pointer'>
            <img src={`${isLiked? "liked.svg" : "like.svg"}`} width={30} alt="" className='mx-1 my-1' />
            {likeCount}
        </span>
    )
}

export default LikeButton