import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center sticky bottom-0 w-full'>
            <div className="logo font-bold text-white text-2xl">
                <span className='text-green-500'>&lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>
            </div>
            <div className='flex items-center justify-center'>
                Create with  <img className='w-8 mx-2 my' src="/icons/heart.svg" alt="" /> by CodeTechManish</div>
        </div>
    )
}

export default Footer
 