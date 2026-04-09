import connectDb from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req:NextRequest, {params}:{params:{id:string}}){
    await connectDb();

    const { id } = await params

    const user = await User.findById(id)
    if(!user) return NextResponse.json("User not found", {status:404})
    
    const { name , bio , avatar} = await req.json()
    
    const updatedUser = await User.findByIdAndUpdate(id , {
        name,
        bio,
        ...(avatar && {avatar})
    }, {new:true})
    
    return NextResponse.json("User Updated", {status:200})


}