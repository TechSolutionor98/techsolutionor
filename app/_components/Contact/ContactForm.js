"use client"
import React from 'react';
import Image from 'next/image';
import ContactImg from "../../../components/Images/contactimg1.jpg";

const ContactForm = () => {
    return (
        <section className="bg-white py-10">
            <div className="max-w-[1140px] mx-auto px-5">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-2">

                    {/* Left Side: Text and Image */}
                    <div className="w-full lg:w-[50%] shadow-xl ">
                        <div className="inline-flex items-center gap-2 bg-[#41b349] text-white px-6 py-2  text-sm font-semibold mb-6 shadow-xl">
                            Contact Us
                        </div>
                        <h2 className="text-[#262323] text-[32px] md:text-[38px] font-bold leading-tight tracking-wide mb-8 uppercase">
                            Have a cool project? <br /> Get in touch?
                        </h2>

                        <div className="relative w-full aspect-[4/3] lg:min-h-[550px] overflow-hidden ">
                            <Image
                                src={ContactImg}
                                alt="Get in touch"
                                fill
                                className="object-cover h-[300px] pr-2"
                            />
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="w-full lg:w-[55%] bg-[#F9F9F9] p-8 md:px-8 pt-14   ">
                        <form className="space-y-4 ">
                            <div className="grid grid-cols-1 gap-8 pt-6">
                                <input
                                    type="text"
                                    required
                                    placeholder="Name"
                                    className="w-full px-4 py-2 bg-white border border-[#6d6d6d] rounded-md focus:outline-none "
                                />
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    required
                                    className="w-full px-4 py-3 bg-white border border-[#6d6d6d] rounded-md focus:outline-none "
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    className="w-full px-4 py-3 bg-white border border-[#6d6d6d] rounded-md focus:outline-none "
                                />

                                <select defaultValue="" className="w-full px-4 py-2 bg-white border border-[#6d6d6d] rounded-md focus:outline-none ">
                                    
                                    <option value="" disabled>Select Service</option>
                                    <option value="web">Web Development</option>
                                    <option value="app">App Development</option>
                                    <option value="graphics">Graphics & UI/UX</option>
                                </select>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input
                                        type="text"
                                        placeholder="Select Date"
                                        required
                                        onFocus={(e) => e.target.type = 'date'}
                                        onBlur={(e) => e.target.type = 'text'}
                                        className="w-full px-6 py-4 bg-white border border-[#6d6d6d] rounded-md focus:outline-none  "
                                    />
                                    <select defaultValue="" className="w-full px-4 py-2 bg-white border border-[#6d6d6d] rounded-md focus:outline-none ">
                                        <option value="" disabled>Select Budget</option>
                                        <option value="low">$500 - $1000</option>
                                        <option value="mid">$1000 - $5000</option>
                                        <option value="high">$5000+</option>
                                    </select>
                                </div>

                                <textarea
                                    rows="4"
                                    placeholder="How can we help you? Feel free to get in touch!"
                                    required
                                    className="w-full px-6 py-4 bg-white border border-[#6d6d6d] rounded-md focus:outline-none resize-y"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="ml-35 w-fit bg-[#41b349] hover:bg-[#369c3d] text-white text-[15px] rounded-full font- py-4 px-12  transition-all duration-300 shadow-lg shadow-[#41b349]/20 flex items-center justify-center gap-2 group"
                            >
                                Get In Touch
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactForm;
