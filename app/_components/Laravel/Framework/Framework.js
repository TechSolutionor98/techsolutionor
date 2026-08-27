import React from 'react'
import LaravelIcon from '../../../../components/Images/laravalicon.png'
import Image from 'next/image'

const Framework = () => {
    return (
        <section className='w-full bg-[#ffff] -mb-20'>
            <div className='mx-auto flex w-full max-w-[1600px] flex-col items-center gap-10 px-6 py-14 md:flex-row md:items-center md:gap-8 md:px-12 md:py-[78px] lg:px-16'>
                <div className='flex w-full justify-center md:w-[40%] md:justify-center'>
                    <Image
                        src={LaravelIcon}
                        alt='Laravel Icon'
                        width={260}
                        height={260}
                        className='h-[260px] w-[260px] object-contain md:h-[260px] md:w-[260px]'
                    />
                </div>

                <div className='w-full md:w-[60%] md:pr-4 lg:pr-10'>
                    <h1 className='text-[28px] font-[700] leading-[1.25] text-[#1f1f1f]'>
                        Elegant and Expressive PHP Framework
                    </h1>
                    <p className='mt-8 text-[16px] leading-[2] text-justify text-[#1f1f1f]'>
                        Laravel is a powerful and elegant PHP framework built for developing modern, secure, and scalable web applications. With its expressive syntax and rich set of built-in tools, Laravel simplifies tasks like routing, authentication, caching, and database management, allowing developers to focus on building feature-rich and high-performance applications efficiently.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Framework
