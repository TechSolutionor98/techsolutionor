"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import ContactImg from "../../../components/Images/contactimg1.jpg";
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
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

        if (!formData.name.trim()) {
            setStatus({ type: 'error', message: 'Please enter your name' });
            return;
        }
        if (!formData.phone.trim()) {
            setStatus({ type: 'error', message: 'Please enter your phone number' });
            return;
        }
        if (!formData.email.trim() || !formData.email.includes('@')) {
            setStatus({ type: 'error', message: 'Please enter a valid email address' });
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
                    phone: formData.phone.trim(),
                    email: formData.email.trim().toLowerCase(),
                    serviceRequired: formData.service,
                    budget: formData.budget,
                    preferredDate: formData.date,
                    message: formData.message.trim(),
                    source: 'Contact Us Form'
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to submit contact form');
            }

            setStatus({
                type: 'success',
                message: 'Thank you! Your message has been sent successfully. We will be in touch soon.'
            });

            setFormData({
                name: '',
                phone: '',
                email: '',
                service: '',
                date: '',
                budget: '',
                message: ''
            });

        } catch (err) {
            console.error('Contact form submission error:', err);
            setStatus({
                type: 'error',
                message: err.message || 'Something went wrong. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-white py-12 md:py-16">
            <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
                <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden flex flex-col lg:flex-row items-stretch">

                    {/* Left Side: Header & Image */}
                    <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/30 text-[#41B349] font-extrabold text-xs uppercase tracking-widest mb-3">
                                <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
                                <span>Contact Us</span>
                            </div>
                            <h2 
                                className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#111827] tracking-tight leading-[1.2] mb-6"
                                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                            >
                                Have a cool project? <br />
                                <span className="text-[#41B349]">Get in touch?</span>
                            </h2>
                        </div>

                        <div className="relative w-full flex-1 min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] rounded-2xl overflow-hidden border border-gray-100">
                            <Image
                                src={ContactImg}
                                alt="Get in touch"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 bg-[#FAFAFA] border-t lg:border-t-0 lg:border-l border-gray-100 flex flex-col justify-center">
                        {status.message && (
                            <div className={`mb-5 p-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 ${
                                status.type === 'success'
                                    ? 'bg-green-50 border border-green-200 text-green-800'
                                    : 'bg-red-50 border border-red-200 text-red-800'
                            }`}>
                                {status.type === 'success' && <FaCheckCircle className="text-green-600 flex-shrink-0" />}
                                <span>{status.message}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Name *"
                                    className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#41B349] focus:border-transparent transition shadow-xs"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone *"
                                    required
                                    className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#41B349] focus:border-transparent transition shadow-xs"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email *"
                                    required
                                    className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#41B349] focus:border-transparent transition shadow-xs"
                                />

                                <div className="relative">
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#41B349] focus:border-transparent transition shadow-xs cursor-pointer"
                                    >
                                        <option value="" disabled>Select Service</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="App Development">App Development</option>
                                        <option value="Software Development">Software Development</option>
                                        <option value="POS Development">POS Development</option>
                                        <option value="Ecommerce Development">Ecommerce Development</option>
                                        <option value="Graphics & UI/UX">Graphics & UI/UX</option>
                                        <option value="Digital Marketing">Digital Marketing</option>
                                        <option value="Search Engine Optimization">Search Engine Optimization</option>
                                    </select>
                                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                                        ▼
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        placeholder="Select Date"
                                        onFocus={(e) => e.target.type = 'date'}
                                        onBlur={(e) => {
                                            if (!e.target.value) e.target.type = 'text';
                                        }}
                                        className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#41B349] focus:border-transparent transition shadow-xs"
                                    />
                                    <div className="relative">
                                        <select
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#41B349] focus:border-transparent transition shadow-xs cursor-pointer"
                                        >
                                            <option value="" disabled>Select Budget</option>
                                            <option value="$100 - $500">$100 - $500</option>
                                            <option value="$500 - $1000">$500 - $1000</option>
                                            <option value="$1000 - $5000">$1000 - $5000</option>
                                            <option value="$5000+">$5000+</option>
                                        </select>
                                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                                            ▼
                                        </div>
                                    </div>
                                </div>

                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="How can we help you? Feel free to get in touch!"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#41B349] focus:border-transparent transition shadow-xs resize-none"
                                ></textarea>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full sm:w-auto bg-[#41b349] hover:bg-[#369c3d] text-white text-sm font-bold py-3.5 px-10 rounded-full transition-all duration-300 shadow-md shadow-[#41b349]/20 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <FaSpinner className="animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <span>Get In Touch</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactForm;
