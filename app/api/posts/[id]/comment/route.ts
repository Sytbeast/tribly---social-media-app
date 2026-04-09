import { authOptions } from "@/lib/auth";
import connectDb from "@/lib/db";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";


export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    await connectDb();
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json("Unauthorized", { status: 401 })

    const { id } = await params

    // finding post
    const post = await Post.findById(id)
    if (!post) return NextResponse.json("Post not found", { status: 404 })

    const { text } = await req.json()
    if (!text) return NextResponse.json("Comment is empty", { status: 400 })

    // adding comment to post
    await Post.findByIdAndUpdate(id, {
        $push: {
            comments: {
                text,
                author: session.user.id
            }
        }
    })

    return NextResponse.json("comment added", {status:201})



}