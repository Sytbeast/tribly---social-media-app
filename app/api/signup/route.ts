import connectDb from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    await connectDb();

    const {name , email , password} = await req.json();

    if(!name) return NextResponse.json("Name is Empty");
    if(!email) return NextResponse.json("Email is Empty");
    if(!password) return NextResponse.json("Password is Empty");

    const existingUserName = await User.findOne({name})
    if(existingUserName) return NextResponse.json("Username already Exist", {status:400})
    const existingUser = await User.findOne({email})
    if(existingUser) return NextResponse.json("Email Already Exist", {status: 400})

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password:hashPassword
    })

    return NextResponse.json("User created successfully", {status: 201})
    

}