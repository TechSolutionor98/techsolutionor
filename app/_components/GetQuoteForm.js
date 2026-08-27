"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaTimes, FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { useQuote } from '../_context/QuoteContext';
import formBg from '../../components/Images/formbg.png';
import ballFrom from '../../components/Images/ballfrom.png';

const GetQuoteForm = () => {
    const { isOpen, closeQuote } = useQuote();

    const variants = {
        hidden: { opacity: 0, scale: 0.9, y: 50 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 50 }
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-20">
                    {/* Backdrop - Explicitly no blur and darker for contrast */}
                    <motion.div
                        className="absolute inset-0 bg-black/80"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 2 }}
                        onClick={closeQuote}
                    />

                    {/* Form Container */}
                    <motion.div
                        className="relative w-full max-w-[800px] bg-[#0d0d0d] rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/5"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Background Image - Made clearer by removing heavy overlay and increasing opacity */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src={formBg}
                                alt="Background"
                                fill
                                className="object-contain object-cover  mix-blend-overlay"
                                priority
                            />
                        </div>

                        {/* Decoration Image (Ball/Chevron) - Positioned to match screenshot */}
                        <div className="absolute top-25 right-85 z-0 pointer-events-none select-none transform translate-3">
                            <Image
                                src={ballFrom}
                                alt="Decoration"
                                width={600}
                                height={600}
                                className="w-[70px] h-auto object-contain opacity-100"
                            />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={closeQuote}
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-all z-20 p-2 hover:bg-white/10 rounded-full"
                        >
                            <FaTimes size={20} />
                        </button>

                        {/* Content */}
                        <div className="relative z-10 p-10 md:p-14 lg:pr-32">
                            <div className="mb-10">
                                <h2 className="text-white text-[35px] font-bold mb-3 tracking-wide">Get A Quote"</h2>
                                <p className="text-[#41B349] text-[20px] font-semibold">Let's Have A Chat</p>
                            </div>

                            <form className="space-y-4">
                                <div className="grid grid-cols-1 gap-5">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full max-w-[350px] h-11.5 bg-white rounded-[5px] px-6 text-gray-900  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41B349] transition-all shadow-sm"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        className="w-full max-w-[350px] h-11.5 bg-white rounded-[5px] px-6 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41B349] transition-all shadow-sm"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full max-w-[350px] h-11.5 bg-white rounded-[5px] px-6 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41B349] transition-all shadow-sm"
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                                        <div className="relative">
                                            <select className="w-full max-w-[250px] h-11.5 bg-white rounded-[5px] px-6 text-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-[#41B349] transition-all shadow-sm cursor-pointer">
                                                <option  disabled >Select Service</option>
                                                <option value="web">Web Development</option>
                                                <option value="app">App Development</option>
                                                <option value="pos">POS Development</option>
                                                <option value="marketing">Digital Marketing</option>
                                            </select>
                                            <div className="absolute right-17.5 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                                                <FaChevronDown size={12} />
                                            </div>
                                        </div>
                                        <div className="relative right-9 ">
                                            <select className="w-full max-w-[250px] h-11.5 bg-white rounded-[5px] px-6 text-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-[#41B349] transition-all shadow-sm cursor-pointer">
                                                <option value="" disabled selected>Select Budget</option>
                                                <option value="100-500">$100 - $500</option>
                                                <option value="500-1000">$500 - $1000</option>
                                                <option value="1000+">$1000+</option>
                                            </select>
                                            <div className="absolute right-17.5 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                                                <FaChevronDown size={12} />
                                            </div>
                                        </div>
                                    </div>

                                    <textarea
                                        placeholder="Describe your project here..."
                                        rows={5}
                                        className="w-full max-w-[525px] bg-white rounded-[5px] p-6 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#41B349] transition-all shadow-sm resize-none"
                                    ></textarea>
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="bg-[#41B349] text-white px-8 py-3 rounded-full font-bold text-[18px] flex items-center justify-center gap-3 hover:bg-[#41b349]/90  border-2 border-[#41B349] group shadow-lg"
                                    >
                                        Send <FaArrowRight className=" " />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default GetQuoteForm;
