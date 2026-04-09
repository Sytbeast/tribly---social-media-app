"use client"
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    
    const handleSubmit = async(e: React.SyntheticEvent) => {
        e.preventDefault();
        
        if(!email){
            setError("Email is Required")
            return
        }
        if(!password){
            setError("Password is Required")
            return
        }
        
        setLoading(true)
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect:false
            })

            setEmail("")
            setPassword("")
            setLoading(false)

            if(res?.ok){
                router.push("/")
            }else{
                setError("Invalid Email or Password")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='md:p-10 p-6'>
            <form onSubmit={handleSubmit} className='max-w-110 mx-auto border rounded-lg shadow-lg text-sm font-medium whitespace-nowrap border-gray-300/50 text-white bg-[#171717] flex flex-col p-8 gap-4' action="">
                <h1 className='text-center font-bold text-2xl '>Login</h1>

                <h2 className='font-semibold text-lg '>Email</h2>

                <input
                    value={email}
                    onChange={(e) => {setEmail(e.target.value); setError("")}}
                    type="email"
                    placeholder='example@email.com'
                    className='border rounded-md px-4 py-2 outline-none border-gray-300/50' />

                <h2 className='font-semibold text-lg'>Password</h2>

                <input
                    value={password}
                    onChange={(e) =>{ setPassword(e.target.value); setError("")}}
                    type="password"
                    min={8}
                    placeholder='Enter password'
                    className='border rounded-md px-4 py-2 outline-none border-gray-300/50' />
                {error && <div className='text-red-600 text-center font-semibold'>{error}</div>}
                <button disabled={loading} type='submit' className='font-bold bg-white px-4 py-2 rounded-lg text-black hover:bg-white/70'>{loading ? "Loading...":"Submit"}</button>
            </form>
        </div>
    )
}

export default Login