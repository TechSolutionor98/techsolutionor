import React from 'react'
import Image from 'next/image'
import leftQuote from '@/components/Images/leftqoute.png'
import rightQuote from '@/components/Images/rightqoute.png'

const PortfolioQuote = () => {
    return (
        <div className='py-5 pt-15 px-6 md:px-20  relative'>
            <div className='max-w-4xl mx-auto relative'>
                <div className='absolute -top-10 -left-10 md:-left-20'>
                    <Image src={leftQuote} alt='quote' width={100} height={100} className='w-15 ' />
                </div>

                <p className='text-xl md:text-[16px] text-center leading-relaxed text-gray-700 px-4'>
                    With a team of skilled developers, designers, and technology experts, we are dedicated to delivering high-quality, client-focused solutions. Our commitment to innovation, excellence, and customer satisfaction ensures that every project we undertake exceeds expectations and achieves real results.
                </p>

                <div className='absolute -bottom-10 -right-10 md:-right-20'>
                    <Image src={rightQuote} alt='quote' width={100} height={100} className='w-16' />
                </div>
            </div>

            <div className='flex justify-center mt-20'>
                <button className='bg-[#00B651] text-white px-2 py-3 text-[18px] shadow-lg shadow-green-200'>
                    Explore Our Work
                </button>
            </div>
        </div>
    )
}

export default PortfolioQuote
