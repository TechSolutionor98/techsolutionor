import React from 'react'
import Image from 'next/image'
import portfolioBanner from '@/components/Images/portfoliobanner.png'

const PortfolioBanner = () => {
    return (
        <div className='bg-[#00B651] min-h-[500px] flex items-center justify-center pt-15 pb-12 px-6 md:px-30'>
            <div className='max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
                <div className='text-white'>
                    <h1 className='text-3xl md:text-[45px] font-semibold tracking-wide leading-tight uppercase'>
                        Our Portfolio of Digital Projects & Client Success Stories
                    </h1>
                    <p className='mt-6 text-[16px] leading-relaxed text-justify'>
                        Welcome to our portfolio of innovative digital solutions! At TechSolutionor, we specialize in delivering custom software and technology solutions that drive measurable business success. Explore our projects across various industries to see how we combine creativity, technology, and strategic expertise to deliver cutting-edge solutions tailored to each client’s needs.
                    </p>
                    <div className='mt-10 pl-20'>
                        <button className='bg-[#222] text-white px-8 py-3  justify-center flex items-center gap-2 hover:bg-gray-800 transition-colors'>
                            Drop Down <span className='text-xl'>↓</span>
                        </button>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <Image
                        src={portfolioBanner}
                        alt='Our Portfolio'
                        width={600}
                        height={500}
                        className='w-full max-w-[450px] h-auto object-contain'
                        priority
                    />
                </div>
            </div>
        </div>
    )
}

export default PortfolioBanner
