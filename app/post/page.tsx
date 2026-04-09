"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Post = () => {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [hashtags, setHashtags] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!file) {
            setError("file is required")
            return
        }
        if (!title) {
            setError("Title is required")
            return
        }
        setLoading(true)

        try {
            const formData = new FormData()
            formData.append("file", file)

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData
            })
            const uploadData = await uploadRes.json()
            const imageUrl = uploadData.secure_url


            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    hashtags: hashtags.split(" "),
                    image: imageUrl
                })

            })

            if (res.ok) {
                setTitle("")
                setHashtags("")
                setFile(null)
                setSuccess("Post Created!")
            }
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            router.push("/")
        }

    }

    return (
        <div className='md:p-10 p-6 relative'>

            <form onSubmit={handleSubmit} className='max-w-110 mx-auto border rounded-lg shadow-lg border-gray-300/50 text-sm font-medium whitespace-nowrap text-white bg-[#171717] flex flex-col p-8 gap-4' action="">
                <h1 className='text-center text-2xl font-medium whitespace-nowrap '>Create New Post</h1>

                <h2 className='font-semibold text-lg '>Select Files</h2>
                <input
                    type="file"
                    onChange={(e) => { setFile(e.target.files?.[0] || null); setError(""); setSuccess("") }}
                    className='file:font-bold rounded-lg border-dashed text-white border px-4 py-2'
                />

                <h2 className='font-semibold text-lg '>Add Title</h2>
                <input
                    value={title}
                    onChange={(e) => { setTitle(e.target.value); setError(""); setSuccess("") }}
                    type="text"
                    placeholder='Enter Title'
                    className='border rounded-md px-4 py-2 outline-none border-gray-500' />

                <h2 className='font-semibold text-lg '>Add Hashtags</h2>
                <input
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                    type="text"
                    placeholder='#post #like'
                    className='border rounded-md px-4 py-2 outline-none border-gray-500' />

                {error && <div className='text-red-600 text-center font-semibold'>{error}</div>}
                {success && <div className={`text-green-600 text-center font-semibold`}>{success}</div>}

                <button disabled={loading} type='submit' className='font-bold bg-white px-4 py-2 rounded-lg text-black hover:bg-white/70'>{loading ? "Loading..." : "Create Post"}</button>
            </form>
        </div>
    )
}

export default Post