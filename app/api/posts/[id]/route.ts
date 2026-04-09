import { authOptions } from "@/lib/auth";
import connectDb from "@/lib/db";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { NextResponse , NextRequest } from "next/server";

export async function DELETE(req:NextRequest, {params}:{params:Promise<{id:string}>}){
    await connectDb();

    const session = await getServerSession(authOptions)
    if(!session) return NextResponse.json("Unauthorized" , {status:401})

    const {id} = await params

    // only owner can delete
    const post = await Post.findById(id)
    if(!post) return NextResponse.json("Post not found", {status:404})

    if(post.author.toString() !== session.user.id){
        return NextResponse.json("forbidden", {status:403})
    }

    await Post.findByIdAndDelete(id)
    return NextResponse.json("Post deleted")
}