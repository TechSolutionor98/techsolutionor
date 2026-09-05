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
        <section className="bg-white py-10">
            <div className="max-w-[1140px] mx-auto px-5">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-2">

                    {/* Left Side: Text and Image */}
                    <div className="w-full lg:w-[50%]">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/30 text-[#41B349] font-extrabold text-xs uppercase tracking-widest mb-4">
                            <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
                            <span>Contact Us</span>
                        </div>
                        <h2 
                            className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#111827] tracking-tight leading-[1.15] mb-6"
                            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                        >
                            Have a cool project? <br />
                            <span className="text-[#41B349]">Get in touch?</span>
                        </h2>

                        <div className="relative w-full aspect-[4/3] lg:min-h-[550px] overflow-hidden">
                            <Image
                                src={ContactImg}
                                alt="Get in touch"
                                fill
                                className="object-cover h-[300px] pr-2"
                            />
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="w-full lg:w-[55%] bg-[#F9F9F9] p-8 md:px-8 pt-14">
                        {status.message && (
                            <div className={`mb-6 p-4 rounded-lg text-sm font-medium flex items-center gap-3 ${
                                status.type === 'success'
                                    ? 'bg-green-100 border border-green-300 text-green-800'
                                    : 'bg-red-100 border border-red-300 text-red-800'
                            }`}>
                                {status.type === 'success' && <FaCheckCircle className="text-green-600 flex-shrink-0" />}
                                <span>{status.message}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 gap-8 pt-6">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Name *"
                                    className="w-full px-4 py-2 bg-white border border-[#6d6d6d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#41b349]"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone *"
                                    required
                                    className="w-full px-4 py-3 bg-white border border-[#6d6d6d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#41b349]"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email *"
                                    required
                                    className="w-full px-4 py-3 bg-white border border-[#6d6d6d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#41b349]"
                                />

                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-white border border-[#6d6d6d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#41b349]"
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                        className="w-full px-6 py-4 bg-white border border-[#6d6d6d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#41b349]"
                                    />
                                    <select
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-white border border-[#6d6d6d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#41b349]"
                                    >
                                        <option value="" disabled>Select Budget</option>
                                        <option value="$100 - $500">$100 - $500</option>
                                        <option value="$500 - $1000">$500 - $1000</option>
                                        <option value="$1000 - $5000">$1000 - $5000</option>
                                        <option value="$5000+">$5000+</option>
                                    </select>
                                </div>

                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="How can we help you? Feel free to get in touch!"
                                    className="w-full px-6 py-4 bg-white border border-[#6d6d6d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#41b349] resize-y"
                                ></textarea>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-fit bg-[#41b349] hover:bg-[#369c3d] text-white text-[15px] rounded-full font-semibold py-4 px-12 transition-all duration-300 shadow-lg shadow-[#41b349]/20 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60"
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
