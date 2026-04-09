import { authOptions } from "@/lib/auth";
import connectDb from "@/lib/db";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest, {params}:{params:{id:string}}){
    await connectDb();
    const session = await getServerSession(authOptions)
    if(!session) return NextResponse.json("Unauthorized", {status:401})

    const {id} = await params

    // finding post
    const post = await Post.findById(id)
    if(!post) return NextResponse.json("Post not found", {status:404})
    
    // checking for already liked
    const alreadyLiked = post.likes.includes(session.user.id)

    if(alreadyLiked){
        // unlike
        await Post.findByIdAndUpdate(id , {$pull: {likes: session.user.id}})
        return NextResponse.json("Unliked")
    } else {
        // like
        await Post.findByIdAndUpdate(id , {$push: {likes: session.user.id}})
        return NextResponse.json("Liked")
    }

    

}
