import React from 'react'
import JavaBg from '../../../../components/Images/javabg.jpg'

const JavaBanner = () => {
    return (
        <div
            className='w-full h-[50vh] md:h-[100vh] relative flex items-center justify-center text-white px-5 md:px-0'
            style={{
                backgroundImage: `url(${JavaBg.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>
            <div className="text-area text-white z-10 w-[620px] max-w-full md:absolute left-16 lg:left-24 px-4">
                <h1 className='text-[34px] sm:text-[44px] md:text-[52px] font-bold leading-[1.12] tracking-tight font-sans'>
                    JavaScript: Core <br />
                    Technology for Modern <br />
                    Web Development
                </h1>
                <p className='text-[15px] sm:text-[16px] leading-[26px] mt-6 text-gray-200'>
                    JavaScript is the core of modern web development, enabling dynamic and interactive features across websites. It’s essential for creating responsive, user-friendly interfaces and powering real-time updates and animations.
                </p>
            </div>
        </div>
    )
}

export default JavaBanner
