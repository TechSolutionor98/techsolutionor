"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaTimes, FaArrowRight, FaChevronDown, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { useQuote } from '../_context/QuoteContext';
import formBg from '@/components/Images/formbg.png';
import ballFrom from '@/components/Images/ballfrom.png';

const COUNTRIES = [
    "United Arab Emirates",
    "Saudi Arabia",
    "Qatar",
    "Oman",
    "Kuwait",
    "Bahrain",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Pakistan",
    "India",
    "Germany",
    "France",
    "Singapore",
    "Other Country"
];

const SERVICES = [
    "Web Development",
    "App Development",
    "Software Development",
    "POS Development",
    "Ecommerce Development",
    "Graphics & UI/UX",
    "Digital Marketing",
    "PPC & Amazon Ads",
    "Search Engine Optimization (SEO)",
    "Content Writing",
    "Call Center",
    "Hire Dedicated Developer"
];

const BUDGETS = [
    "$100 - $500",
    "$500 - $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000+"
];

const GetQuoteForm = () => {
    const { isOpen, closeQuote } = useQuote();

    const [formData, setFormData] = useState({
        name: '',
        country: '',
        phone: '',
        email: '',
        service: '',
        date: '',
        budget: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (status.message) setStatus({ type: '', message: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic client validation
        if (!formData.name.trim()) {
            setStatus({ type: 'error', message: 'Please enter your Full Name' });
            return;
        }
        if (!formData.phone.trim()) {
            setStatus({ type: 'error', message: 'Please enter your Phone Number' });
            return;
        }
        if (!formData.email.trim() || !formData.email.includes('@')) {
            setStatus({ type: 'error', message: 'Please enter a valid Email Address' });
            return;
        }

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const res = await fetch('/api/contact-submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    country: formData.country,
                    phone: formData.phone.trim(),
                    email: formData.email.trim().toLowerCase(),
                    serviceRequired: formData.service,
                    budget: formData.budget,
                    preferredDate: formData.date,
                    message: formData.message.trim(),
                    source: 'Get A Quote Modal'
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to submit quote request');
            }

            setStatus({
                type: 'success',
                message: 'Thank you! Your quote request has been submitted. We will contact you shortly.'
            });

            // Reset form
            setFormData({
                name: '',
                country: '',
                phone: '',
                email: '',
                service: '',
                date: '',
                budget: '',
                message: ''
            });

            // Auto close modal after 3 seconds on success
            setTimeout(() => {
                closeQuote();
                setStatus({ type: '', message: '' });
            }, 3000);

        } catch (err) {
            console.error('Quote submission error:', err);
            setStatus({
                type: 'error',
                message: err.message || 'Something went wrong. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    const variants = {
        hidden: { opacity: 0, scale: 0.95, y: 30 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 30 }
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
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
                    {/* Dark Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/85 backdrop-blur-xs"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.25 }}
                        onClick={() => {
                            if (!loading) {
                                closeQuote();
                                setStatus({ type: '', message: '' });
                            }
                        }}
                    />

                    {/* Form Container */}
                    <motion.div
                        className="relative w-full max-w-[720px] max-h-[94vh] bg-[#111111] rounded-[24px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-white/10 my-auto z-10"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Background Graphic Asset */}
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
                            <Image
                                src={formBg}
                                alt="Form Background"
                                fill
                                className="object-cover object-right"
                                priority
                            />
                        </div>

                        {/* Geometric Ball/Chevron Accent */}
                        <div className="absolute top-8 right-20 sm:right-32 z-0 pointer-events-none select-none opacity-90 hidden sm:block">
                            <Image
                                src={ballFrom}
                                alt="Decoration"
                                width={110}
                                height={110}
                                className="w-[75px] h-auto object-contain"
                            />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => {
                                closeQuote();
                                setStatus({ type: '', message: '' });
                            }}
                            className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10 transition-all z-30 p-2 rounded-full cursor-pointer"
                            aria-label="Close modal"
                        >
                            <FaTimes size={16} />
                        </button>

                        {/* Form Content */}
                        <div className="relative z-10 p-5 sm:p-7 md:p-8">
                            {/* Heading */}
                            <div className="mb-4 sm:mb-5">
                                <h2 className="text-white text-2xl sm:text-[28px] font-extrabold tracking-wide leading-tight">
                                    Get A Quote
                                </h2>
                                <p className="text-[#41B349] text-sm sm:text-base font-semibold mt-0.5">
                                    Let&apos;s Have A Chat
                                </p>
                            </div>

                            {/* Status Message Notification */}
                            {status.message && (
                                <div className={`mb-4 p-3 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-3 ${
                                    status.type === 'success' 
                                        ? 'bg-green-950/80 border border-green-500/50 text-green-300' 
                                        : 'bg-red-950/80 border border-red-500/50 text-red-300'
                                }`}>
                                    {status.type === 'success' ? (
                                        <FaCheckCircle className="text-green-400 text-base flex-shrink-0" />
                                    ) : (
                                        <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                                    )}
                                    <span>{status.message}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-3">
                                {/* 1. Full Name */}
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Full Name *"
                                        required
                                        className="w-full h-10 bg-white rounded-md px-3.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41B349] transition shadow-xs"
                                    />
                                </div>

                                {/* 2. Select Country & Phone */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="relative">
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            className="w-full h-10 bg-white rounded-md px-3.5 pr-10 text-gray-700 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#41B349] transition shadow-xs cursor-pointer"
                                        >
                                            <option value="">Select your Country</option>
                                            {COUNTRIES.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <FaChevronDown size={11} />
                                        </div>
                                    </div>

                                    <div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Phone *"
                                            required
                                            className="w-full h-10 bg-white rounded-md px-3.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41B349] transition shadow-xs"
                                        />
                                    </div>
                                </div>

                                {/* 3. Email */}
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email *"
                                        required
                                        className="w-full h-10 bg-white rounded-md px-3.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41B349] transition shadow-xs"
                                    />
                                </div>

                                {/* 4. Select Service & Select Budget */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="relative">
                                        <select
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full h-10 bg-white rounded-md px-3.5 pr-10 text-gray-700 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#41B349] transition shadow-xs cursor-pointer"
                                        >
                                            <option value="">Select Service</option>
                                            {SERVICES.map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <FaChevronDown size={11} />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <select
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            className="w-full h-10 bg-white rounded-md px-3.5 pr-10 text-gray-700 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#41B349] transition shadow-xs cursor-pointer"
                                        >
                                            <option value="">Select Budget</option>
                                            {BUDGETS.map((b) => (
                                                <option key={b} value={b}>{b}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <FaChevronDown size={11} />
                                        </div>
                                    </div>
                                </div>

                                {/* 5. Select Date */}
                                <div>
                                    <input
                                        type="text"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        placeholder="Select Date"
                                        onFocus={(e) => (e.target.type = 'date')}
                                        onBlur={(e) => {
                                             if (!e.target.value) e.target.type = 'text';
                                        }}
                                        className="w-full h-10 bg-white rounded-md px-3.5 text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41B349] transition shadow-xs"
                                    />
                                </div>

                                {/* 6. Note / Message Textarea */}
                                <div>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Describe your project here..."
                                        rows={3}
                                        className="w-full bg-white rounded-md p-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41B349] transition shadow-xs resize-none"
                                    ></textarea>
                                </div>

                                {/* 7. Submit Pill Button */}
                                <div className="pt-1">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-[#41B349] hover:bg-[#369c3d] text-white px-7 py-2 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-[#41B349]/30 disabled:opacity-60 cursor-pointer"
                                    >
                                        {loading ? (
                                            <>
                                                <FaSpinner className="animate-spin" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send</span>
                                                <FaArrowRight size={13} />
                                            </>
                                        )}
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
