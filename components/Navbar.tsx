"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
    const { data: session, status } = useSession()
    const [navOpen, setNavOpen] = useState(false)

    if (status === "loading") return null

    return (
        <>

            <nav className='w-full md:px-6 py-4 px-4 text-sm font-medium whitespace-nowrap flex items-center justify-between bg-[#0a0a0a] backdrop-blur-lg text-white border-b border-[#212222]  '>
                <div className='font-bold text-lg'>Tribly</div>
                <div className='md:flex hidden items-center justify-between gap-6'>

                    {status == "authenticated" &&
                        <>

                            <Link href={"/"} className='font-semibold px-4 py-1 flex items-center gap-1 rounded-3xl bg-[#171717] text-white hover:bg-white hover:text-black '>

                                Home
                            </Link>
                            <Link href={"/post"} className='font-semibold px-4 py-1 rounded-3xl bg-[#171717] text-white hover:bg-white hover:text-black'>Add Post</Link>
                            <Link href={"/userpost"} className='font-semibold px-4 py-1 rounded-3xl bg-[#171717] text-white hover:bg-white hover:text-black'>My Posts</Link>
                            <Link href={"/chat"} className='font-semibold px-4 py-1 rounded-3xl bg-[#171717] text-white hover:bg-white hover:text-black '>Chat</Link>
                        </>}

                </div>

                {!session ? <div className='flex items-center md:gap-6 gap-1'>
                    <Link href={"/signup"} className='font-semibold px-4 py-1 rounded-3xl hover:bg-[#171717]'>SignUp</Link>
                    <Link href={"/login"} className='font-semibold px-4 py-1 bg-white text-black hover:bg-white/70 rounded-3xl'>Login</Link>
                </div> : <div className='flex cursor-pointer items-center gap-6'>
                    <Link href={"/profile"} className='font-semibold w-8 h-8 bg-white text-black hidden md:block hover:bg-white/70 rounded-3xl'><img
                        src={session?.user?.image || "profilePlaceholder.svg"}
                        className='w-8 h-8 rounded-full border border-white object-cover object-center'
                        alt="avatar"
                    /></Link>
                    <div onClick={() => signOut()} className='font-semibold px-4 py-1 bg-white text-black hidden md:block hover:bg-white/70 rounded-3xl'>Logout</div>
                    <div onClick={() => setNavOpen(!navOpen)} className='md:hidden'>
                        <img src="newburger.svg" width={30} className='' alt="" />
                    </div>
                </div>}



            </nav>

            <div onClick={() => setNavOpen(false)} className={`fixed ${navOpen ? "translate-y-0" : "-translate-y-full"} md:hidden lg:hidden w-full h-screen bg-black/70 backdrop-blur-lg z-10 top-0 transition-all duration-300 bg-no-repeat`}>
                <div className='flex items-start justify-start flex-col gap-5 p-8'>
                    <h1 className='font-medium text-md w-full text-gray-400 whitespace-nowrap flex items-center justify-between'>Menu <img src="close.svg" className='' width={20} alt="" /></h1>

                    <Link href={"/profile"} className='font-semibold w-12 h-12 bg-white text-black hover:bg-white/70 rounded-3xl'><img
                        src={session?.user?.image || "profilePlaceholder.svg"}
                        className='w-12 h-12 rounded-full border border-white object-cover object-center'
                        alt="avatar"
                    /></Link>

                    <Link href={"/"} className='font-medium px-2 whitespace-nowrap text-4xl text-white'>Home</Link>
                    <Link href={"/post"} className='font-medium px-2 whitespace-nowrap text-4xl text-white'>Add Post</Link>
                    <Link href={"/userpost"} className='font-medium px-2 whitespace-nowrap text-4xl text-white'>My Posts</Link>
                    <Link href={"/chat"} className='font-medium px-2 whitespace-nowrap text-4xl text-white '>Chat</Link>
                    <div onClick={() => signOut()} className=' px-8 py-2 bg-white text-black rounded-full font-medium text-md whitespace-nowrap shadow-lg shadow-white/40'>Logout</div>
                </div>
            </div>
        </>
    )
}

export default Navbar