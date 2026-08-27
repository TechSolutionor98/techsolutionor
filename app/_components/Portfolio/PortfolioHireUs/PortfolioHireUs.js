import React from 'react'
import Link from 'next/link'

const PortfolioHireUs = () => {
    return (
        <div className='bg-[#00B651] py-20 px-6 md:px-20 text-center text-white'>
            <div className='max-w-4xl mx-auto'>
                <h2 className='text-3xl md:text-5xl font-bold mb-6'>
                    READY TO SCALE YOUR DIGITAL PRESENCE?
                </h2>
                <p className='text-xl mb-10'>
                    Hire the TechSolutionor team to handle your project.
                </p>
                <Link href='/hire-us' className='bg-white text-[#00B651] px-10 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition-all inline-block'>
                    Hire Us
                </Link>
            </div>
        </div>
    )
}

export default PortfolioHireUs
