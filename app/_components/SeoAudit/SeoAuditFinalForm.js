"use client"
import React from 'react'
import Image from 'next/image'
import MonitorImg from '../../../components/Images/Free-seo-audit.png'

const SeoAuditFinalForm = () => {
    return (
        <section id="form" className="py- bg-white overflow-hidden">
            <div className="container mx-auto px-5 md:px-10">
                <div className=''>
                    <button className="px-6 py-2 bg-[#00C853] text-white font-bold text-[18px]  tracking-wide mb-0 text-center ml-25">
                Get Your Free SEO Audit Now
                </button>
                </div>
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-0">
                    
                    {/* Left Side: Monitor Illustration */}
                    <div className="flex-1 w-full flex justify-center lg:justify-start">
                        <div className="relative w-full max-w-[650px] aspect-[16/10] mt-30 ">
                            <Image
                                src={MonitorImg}
                                alt="Free SEO Audit Monitor Illustration"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    </div>

                    {/* Right Side: Form Content */}
                    <div className="flex-1 w-full">
                        
                        <div className="mb-0 text-center lg:text-left">
                            
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#262323] mb-6 leading-tight hidden">
                            Get Your Free SEO Audit Now
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-2xl hidden">
                           Fill out the form below, and our SEO experts will manually review your website to provide a detailed audit and action plan.
                        </p>
                        </div>

                        {/* Form Box */}
                        <div className="bg-[#f9f9f9] p-8 md:p-12 shadow-sm border border-gray-100 -mt-20 max-w-[620px] w-full mx-auto lg:mx-0 md:pt-30">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 gap-6">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="w-full px-5 py-2.5 rounded-[5px] border border-gray-400 focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853] outline-none transition-all text-lg"
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full px-5 py-2.5 rounded-[5px] border border-gray-400 focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853] outline-none transition-all text-lg"
                                        required
                                    />
                                    <input
                                        type="url"
                                        placeholder="Website URL"
                                        className="w-full px-5 py-2.5 rounded-[5px] border border-gray-400 focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853] outline-none transition-all text-lg"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Business Location"
                                        className="w-full px-5 py-2.5 rounded-[5px] border border-gray-400 focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853] outline-none transition-all text-lg"
                                    />
                                    <textarea
                                        placeholder="Optional Message"
                                        rows="4"
                                        className="w-full px-5 py-2.5 rounded-[5px] border border-gray-400 focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853] outline-none transition-all text-lg resize"
                                    ></textarea>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-[#00C853] text-white  text-xl rounded-full hover:bg-[#262323] transition-all duration-300 shadow-xl tracking-widest mt-4"
                                    >
                                        Submit & Get Audit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SeoAuditFinalForm
