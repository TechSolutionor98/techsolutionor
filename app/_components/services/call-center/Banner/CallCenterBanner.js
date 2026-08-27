import React from 'react'
import Image from 'next/image'
import CallCenterImg from '../../../../../components/Images/callcenterbanner.png'

const CallCenterBanner = () => {
    return (
        <section className="bg-[#004D43] w-full min-h-[400px] flex items-center relative overflow-hidden font-sans">
            {/* Background design elements (curved lines/waves) */}
            {/* <div className="absolute inset-0 z-0 opacity-20">
                <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M0,1000 C300,800 400,900 700,600 C900,400 1000,500 1000,0 L1000,1000 Z" fill="none" stroke="white" strokeWidth="2" />
                    <path d="M0,900 C200,700 300,800 600,500 C800,300 1000,400 1000,0" fill="none" stroke="white" strokeWidth="1" />
                </svg>
            </div> */}

            <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-10 md:py-20 flex flex-col md:flex-row items-center gap-12 lg:gap-13">
                {/* Left Text Content */}
                <div className="w-full md:w-[55%] text-white text-center md:text-left ">
                    <h1 className="text-[32px] sm:text-[40px] lg:text-[40px]  font-bold leading-[1.3] mb-4 uppercase">
                        Professional Call <br />
                        Center & Customer <br />
                        Support Services
                    </h1>

                    <p className="text-gray-200 text-[14px] md:text-[16px] max-w-[600px] mb-10 leading-relaxed">
                        We deliver high-quality customer service designed to meet your business
                        needs and exceed client expectations. Your satisfaction is our top priority,
                        whether you’re serving customers in the UAE or across global markets.
                    </p>

                    <button className="bg-[#41B349] hover:bg-white hover:text-black text-white px-6 py-2  text-[20px] transition-all duration-300 shadow-lg">
                        Get A Quote
                    </button>
                </div>

                {/* Right Image Section */}
                <div className="w-full md:w-[45%] flex justify-center md:justify-end">
                    <div className="relative w-full max-w-[500px] mb-10 ">
                        <Image
                            src={CallCenterImg}
                            alt="Call Center Representation"
                            priority
                            layout="responsive"
                            width={100}
                            height={100}
                            className="object-contain"
                        />
                        {/* 3D floating effect elements could be added here as small absolute icons */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CallCenterBanner
