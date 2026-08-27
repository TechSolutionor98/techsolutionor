"use client"
import React from 'react'

const HireUsForm = () => {
    return (
        <section className="py-20 px-6 bg-[#fcfcfc]">
            <div className="max-w-[1280px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-[#41B349] text-[40px] md:text-[45px] font-bold mb-6">Hire Us</h2>
                    <p className="text-[#555] max-w-[850px]  mx-auto text-[16px] leading-relaxed">
                        We thrive on new challenges and are always open to working on existing new projects. We have a passion for creativity and a dedication to excellence that drives us to deliver outstanding results every time. Let&apos;s team up and bring your project to the next level.
                    </p>
                </div>

                <form className="max-w-[900px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-full px-4 py-2  border-1 border-[#41B349]   text-gray-700 bg-white"
                        />
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full px-4 py-2  border-1 border-[#41B349]  text-gray-700 bg-white"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <input
                            type="tel"
                            placeholder="Phone"
                            className="w-full px-4 py-2  border-1 border-[#41B349] text-gray-700 bg-white"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2  border-1 border-[#41B349] text-gray-700 bg-white"
                        />
                    </div>

                    <div className="mb-6">
                        <select className="w-full px-4 py-2 border-1 border-[#41b349] text-gray-500 bg-white ">
                            <option value="">Select Service</option>
                            <option value="app">App Development</option>
                            <option value="web">Web Development</option>
                            <option value="graphics">Graphics Designing</option>
                            <option value="marketing">Digital Marketing</option>
                        </select>
                    </div>

                    <div className="mb-8">
                        <textarea
                            rows="6"
                            placeholder="Additional Details"
                            className="w-full px-6 py-4  border-1 border-[#41B349] text-gray-700 bg-white resize-none"
                        ></textarea>
                    </div>

                    <div>
                        <button
                            type="button"
                            className="bg-[#41B349]  text-white px-6 py-1.5 text-lg font-semibold "
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default HireUsForm
