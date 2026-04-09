import React from 'react'

const Skeleton = () => {
    return (
        <div className='h-150 bg-[#171717] md:w-110 w-full overflow-x-hidden mx-auto shadow-lg rounded-xl p-4 hover:shadow-black/50'>
            <div className='flex flex-col gap-4 animate-pulse transition-all duration-300'>
                <div className='bg-[#313131] h-100 rounded-md'></div>
                <div className='bg-[#313131] h-10 rounded-md'></div>
                <div className='bg-[#313131] w-[70%] h-5 rounded-md'></div>
            </div>
        </div>
    )
}

export default Skeleton