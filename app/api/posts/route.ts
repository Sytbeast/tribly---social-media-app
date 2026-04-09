import { authOptions } from "@/lib/auth";
import connectDb from "@/lib/db";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { NextRequest , NextResponse } from "next/server";

export async function POST(req:NextRequest){
    await connectDb()
    const session = await getServerSession(authOptions)
    if(!session) return NextResponse.json("Unauthorized", {status:401})

    const {title , image , hashtags} = await req.json()

    if(!title) return NextResponse.json("Title is Empty")
    // if(!image) return NextResponse.json("Image is Empty")

    const post = await Post.create({
        title,
        image,
        hashtags,
        author:session.user.id
    })

    return NextResponse.json("Post created successfully")

}

export async function GET(){
    await connectDb()

    const post = await Post.find()

    return NextResponse.json(post)
}
