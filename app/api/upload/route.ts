import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const data = await req.formData()
    const file = data.get("file") as File

    if(!file) return NextResponse.json("No file", {status:400})

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise((resolve, reject)=>{
        cloudinary.uploader.upload_stream(
            {folder:"tribly"},
            (error , result) => {
                if(error) reject(error)
                else resolve(result)
            }
        ).end(buffer)
    })

    return NextResponse.json(result)
}