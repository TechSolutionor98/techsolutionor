"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaCheckCircle, FaSpinner, FaPaperPlane, FaChevronLeft, FaChevronRight, FaArrowRight, FaArrowLeft, FaEnvelopeOpenText, FaEdit } from 'react-icons/fa';
import { getCmsVal } from "@/lib/api-helper";
import getInTouchImg from '@/components/Images/getintouch.png';

const COUNTRY_DIAL_CODES = [
    { name: "United Arab Emirates", code: "+971", minDigits: 9, maxDigits: 9, sample: "50 123 4567" },
    { name: "Saudi Arabia", code: "+966", minDigits: 9, maxDigits: 9, sample: "50 123 4567" },
    { name: "Qatar", code: "+974", minDigits: 8, maxDigits: 8, sample: "3312 3456" },
    { name: "Oman", code: "+968", minDigits: 8, maxDigits: 8, sample: "9123 4567" },
    { name: "Kuwait", code: "+965", minDigits: 8, maxDigits: 8, sample: "9123 4567" },
    { name: "Bahrain", code: "+973", minDigits: 8, maxDigits: 8, sample: "3912 3456" },
    { name: "United States", code: "+1", minDigits: 10, maxDigits: 10, sample: "202 555 0123" },
    { name: "United Kingdom", code: "+44", minDigits: 10, maxDigits: 10, sample: "7911 123456" },
    { name: "Canada", code: "+1", minDigits: 10, maxDigits: 10, sample: "416 555 0123" },
    { name: "Australia", code: "+61", minDigits: 9, maxDigits: 9, sample: "412 345 678" },
    { name: "Pakistan", code: "+92", minDigits: 10, maxDigits: 10, sample: "300 1234567" },
    { name: "India", code: "+91", minDigits: 10, maxDigits: 10, sample: "98765 43210" },
    { name: "Germany", code: "+49", minDigits: 10, maxDigits: 11, sample: "151 12345678" },
    { name: "France", code: "+33", minDigits: 9, maxDigits: 9, sample: "6 12 34 56 78" },
    { name: "Singapore", code: "+65", minDigits: 8, maxDigits: 8, sample: "9123 4567" },
    { name: "Other Country", code: "+", minDigits: 7, maxDigits: 15, sample: "12345678" }
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

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const DAY_NAMES_SHORT = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const GetInTouch = ({ cmsContent }) => {
    // Dynamic Date Setup & Past Restrictions
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [currentDate, setCurrentDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDay, setSelectedDay] = useState(today.getDate());
    
    // Step State: 1: Calendar, 2: Personal Info, 3: Email OTP Verification, 4: Project Details
    const [step, setStep] = useState(1); 

    // Form Data State
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        email: '',
        service: '',
        budget: '',
        message: ''
    });

    // Phone Digits State (Separate from locked country code)
    const [phoneDigits, setPhoneDigits] = useState('');

    // OTP State
    const [otpCode, setOtpCode] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    // Selected country object
    const selectedCountryObj = COUNTRY_DIAL_CODES.find(c => c.name === formData.country);

    // Resend OTP Countdown Timer
    useEffect(() => {
        if (resendCooldown <= 0) return;
        const timer = setInterval(() => {
            setResendCooldown(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [resendCooldown]);

    // Calendar Calculations
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const isPrevMonthDisabled = year < today.getFullYear() || (year === today.getFullYear() && month <= today.getMonth());

    const handlePrevMonth = () => {
        if (!isPrevMonthDisabled) {
            setCurrentDate(new Date(year, month - 1, 1));
        }
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (status.message) setStatus({ type: '', message: '' });
    };

    // Handle Country selection & adjust phone digits length if necessary
    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        const countryObj = COUNTRY_DIAL_CODES.find(c => c.name === selectedCountry);

        setFormData(prev => ({
            ...prev,
            country: selectedCountry
        }));

        if (countryObj && phoneDigits) {
            setPhoneDigits(phoneDigits.slice(0, countryObj.maxDigits));
        }

        if (status.message) setStatus({ type: '', message: '' });
    };

    const formatOrdinal = (d) => {
        if (d > 3 && d < 21) return d + 'th';
        switch (d % 10) {
            case 1: return d + 'st';
            case 2: return d + 'nd';
            case 3: return d + 'rd';
            default: return d + 'th';
        }
    };

    const getSelectedDayOfWeekShort = () => {
        const d = new Date(year, month, selectedDay);
        return DAY_NAMES_SHORT[d.getDay()];
    };

    const formattedSelectedDateString = `${getSelectedDayOfWeekShort()} ${formatOrdinal(selectedDay)} ${MONTH_NAMES[month].slice(0, 3)} ${year}`;

    // Step 1 -> Step 2
    const goToStep2 = (dayToSelect = selectedDay) => {
        if (!dayToSelect) {
            setStatus({ type: 'error', message: 'Please select a date from the calendar.' });
            return;
        }
        
        const checkDate = new Date(year, month, dayToSelect);
        checkDate.setHours(0, 0, 0, 0);
        if (checkDate < today) {
            setStatus({ type: 'error', message: 'You cannot select a past date.' });
            return;
        }

        setSelectedDay(dayToSelect);
        setStatus({ type: '', message: '' });
        setStep(2);
    };

    // Validate Step 2 & Send OTP -> Step 3
    const handleSendOtp = async (isResend = false) => {
        // Name Validation
        const trimmedName = formData.name.trim();
        if (!trimmedName || trimmedName.length < 2) {
            setStatus({ type: 'error', message: 'Please enter your Full Name (at least 2 characters).' });
            return;
        }

        // Country Validation
        if (!formData.country || !selectedCountryObj) {
            setStatus({ type: 'error', message: 'Please select your Country first.' });
            return;
        }

        // Phone Number Digits & Exact Length Validation
        const cleanPhoneDigits = phoneDigits.replace(/[^0-9]/g, '');
        if (!cleanPhoneDigits) {
            setStatus({ type: 'error', message: 'Please enter your Phone Number.' });
            return;
        }

        const { minDigits, maxDigits, name, code } = selectedCountryObj;
        if (minDigits === maxDigits) {
            if (cleanPhoneDigits.length !== maxDigits) {
                setStatus({ 
                    type: 'error', 
                    message: `Phone number for ${name} must contain exactly ${maxDigits} digits (excluding country code ${code}).` 
                });
                return;
            }
        } else {
            if (cleanPhoneDigits.length < minDigits || cleanPhoneDigits.length > maxDigits) {
                setStatus({ 
                    type: 'error', 
                    message: `Phone number for ${name} must contain between ${minDigits} and ${maxDigits} digits.` 
                });
                return;
            }
        }

        // Email Format Validation
        const emailVal = (formData.email || '').trim().toLowerCase();
        const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailVal || !EMAIL_REGEX.test(emailVal)) {
            setStatus({ type: 'error', message: 'Please enter a valid Email Address (e.g. name@domain.com).' });
            return;
        }

        setSendingOtp(true);
        setStatus({ type: '', message: '' });

        try {
            const res = await fetch('/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailVal })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to send verification code.');
            }

            setStatus({
                type: 'success',
                message: isResend ? 'A new 6-digit code has been sent to your email.' : 'Verification code sent to your email address.'
            });
            setResendCooldown(30);
            if (!isResend) {
                setStep(3);
            }
        } catch (err) {
            console.error('Send OTP error:', err);
            setStatus({ type: 'error', message: err.message || 'Error sending OTP. Please try again.' });
        } finally {
            setSendingOtp(false);
        }
    };

    // Verify OTP & Move Step 3 -> Step 4
    const handleVerifyOtp = async () => {
        const cleanOtp = otpCode.replace(/[^0-9]/g, '');
        if (!cleanOtp || cleanOtp.length !== 6) {
            setStatus({ type: 'error', message: 'Please enter the complete 6-digit verification code.' });
            return;
        }

        setVerifyingOtp(true);
        setStatus({ type: '', message: '' });

        try {
            const res = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: formData.email.trim().toLowerCase(),
                    otp: cleanOtp 
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Invalid verification code. Please check and try again.');
            }

            setOtpVerified(true);
            setStatus({
                type: 'success',
                message: 'Email verified successfully!'
            });
            
            setTimeout(() => {
                setStatus({ type: '', message: '' });
                setStep(4);
            }, 600);

        } catch (err) {
            console.error('Verify OTP error:', err);
            setStatus({ type: 'error', message: err.message || 'Verification failed. Please try again.' });
        } finally {
            setVerifyingOtp(false);
        }
    };

    // Final Booking Submission Validation & Execution
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Step 4 Required Fields Validation
        if (!formData.service) {
            setStatus({ type: 'error', message: 'Please select a Service Required.' });
            return;
        }
        if (!formData.budget) {
            setStatus({ type: 'error', message: 'Please select an Estimated Budget.' });
            return;
        }

        setLoading(true);
        setStatus({ type: '', message: '' });

        const fullPhoneNumber = selectedCountryObj ? `${selectedCountryObj.code} ${phoneDigits}` : phoneDigits;

        try {
            const res = await fetch('/api/contact-submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    country: formData.country,
                    phone: fullPhoneNumber.trim(),
                    email: formData.email.trim().toLowerCase(),
                    serviceRequired: formData.service,
                    budget: formData.budget,
                    preferredDate: formattedSelectedDateString,
                    message: (formData.message || '').trim(),
                    emailVerified: otpVerified,
                    source: 'Get In Touch Multi-Step Booking'
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to submit booking');
            }

            setStatus({
                type: 'success',
                message: 'Thank you! Your booking request has been submitted successfully. We will get in touch with you shortly.'
            });

            // Reset Form & Return to Step 1 after success
            setFormData({
                name: '',
                country: '',
                email: '',
                service: '',
                budget: '',
                message: ''
            });
            setPhoneDigits('');
            setOtpCode('');
            setOtpVerified(false);

            setTimeout(() => {
                setStep(1);
            }, 3500);

        } catch (err) {
            console.error('Booking submission error:', err);
            setStatus({
                type: 'error',
                message: err.message || 'Something went wrong. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    const sectionSubtitle = getCmsVal(
        cmsContent, 
        "Have a project in mind or looking to scale your digital capabilities? Connect with our technology experts at Tech Solutionor to discuss custom web, software, and IT solutions tailored to your business goals.", 
        "getintouch"
    );

    return (
        <section id="get-in-touch" className="relative overflow-hidden bg-[#171717] py-12 md:py-16 text-white select-none">
            {/* Background Glow Accents */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#41B349]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#41B349]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* Left Column: Heading, Subtitle & Illustration */}
                    <div className="lg:col-span-5 flex flex-col items-start justify-center text-left">
                        <h2 
                            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight mb-2 sm:mb-3"
                            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                        >
                            <span>GET IN </span>
                            <span className="text-[#41B349]">TOUCH</span>
                        </h2>

                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md font-medium">
                            {sectionSubtitle}
                        </p>

                        <div className="mt-5 sm:mt-6 w-full max-w-[240px] sm:max-w-[280px]">
                            <Image
                                src={getInTouchImg}
                                alt="Get In Touch"
                                priority
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>

                    {/* Right Column: Calendar & Booking Card */}
                    <div className="lg:col-span-7 flex justify-center lg:justify-end w-full">
                        <div className="relative w-full max-w-[460px] bg-[#171717] rounded-3xl p-6 sm:p-7 border-2 border-white shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
                            
                            {/* Status Banner */}
                            {status.message && (
                                <div className={`mb-4 p-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 ${
                                    status.type === 'success' 
                                        ? 'bg-green-950/90 border border-green-500/50 text-green-300' 
                                        : 'bg-red-950/90 border border-red-500/50 text-red-300'
                                }`}>
                                    {status.type === 'success' ? (
                                        <FaCheckCircle className="text-green-400 text-lg flex-shrink-0" />
                                    ) : (
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-400 flex-shrink-0" />
                                    )}
                                    <span>{status.message}</span>
                                </div>
                            )}

                            {/* ================= STEP 1: CALENDAR (SELECT DATE) ================= */}
                            {step === 1 && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-4"
                                >
                                    {/* Month Navigation */}
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                                            <span>{MONTH_NAMES[month]}</span>
                                            <span className="text-gray-400 font-normal">{year}</span>
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                type="button" 
                                                disabled={isPrevMonthDisabled}
                                                onClick={handlePrevMonth}
                                                className={`p-2 rounded-xl bg-white/5 transition ${
                                                    isPrevMonthDisabled 
                                                        ? 'opacity-20 cursor-not-allowed text-gray-500' 
                                                        : 'hover:bg-white/10 text-gray-300 hover:text-white cursor-pointer'
                                                }`}
                                            >
                                                <FaChevronLeft size={12} />
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={handleNextMonth}
                                                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition cursor-pointer"
                                            >
                                                <FaChevronRight size={12} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Days of Week Header */}
                                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-black text-gray-400 uppercase tracking-widest pb-2 border-b border-white/15">
                                        {DAY_NAMES_SHORT.map(d => (
                                            <div key={d} className="py-0.5">{d}</div>
                                        ))}
                                    </div>

                                    {/* Calendar Days Grid */}
                                    <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                                        {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                                            <div key={`blank-${idx}`} className="h-10 sm:h-11" />
                                        ))}

                                        {Array.from({ length: daysInMonth }).map((_, idx) => {
                                            const dayNum = idx + 1;
                                            const cellDate = new Date(year, month, dayNum);
                                            cellDate.setHours(0, 0, 0, 0);

                                            const isPast = cellDate < today;
                                            const isSelected = selectedDay === dayNum && !isPast;

                                            return (
                                                <button
                                                    key={`day-${dayNum}`}
                                                    type="button"
                                                    disabled={isPast}
                                                    onClick={() => !isPast && setSelectedDay(dayNum)}
                                                    className={`h-10 sm:h-11 rounded-xl text-sm font-bold flex flex-col items-center justify-center relative transition-all ${
                                                        isPast
                                                            ? 'text-gray-600 opacity-25 cursor-not-allowed bg-transparent'
                                                            : isSelected 
                                                                ? 'bg-white text-black font-black shadow-xl scale-105 z-10 cursor-pointer' 
                                                                : 'bg-[#2A2E35] hover:bg-[#3B424E] text-white cursor-pointer'
                                                    }`}
                                                >
                                                    <span>{dayNum}</span>
                                                    {isSelected && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-black mt-0.5" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Next Button */}
                                    {selectedDay && (
                                        <div className="pt-3 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => goToStep2()}
                                                className="bg-[#41B349] hover:bg-[#369c3d] text-white px-7 py-3 rounded-full font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-[#41B349]/30 hover:scale-[1.02] cursor-pointer"
                                            >
                                                <span>Next</span>
                                                <FaArrowRight size={12} />
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* ================= STEP 2: PERSONAL DETAILS ================= */}
                            {step === 2 && (
                                <motion.div 
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-4"
                                >
                                    <div className="mb-2">
                                        <h3 className="text-xl font-black text-white tracking-tight">
                                            Enter Your Details
                                        </h3>
                                        <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                                            Selected Date: <span className="text-[#FFC700] font-bold">{formattedSelectedDateString}</span>
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                                            Full Name <span className="text-[#41B349]">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            required
                                            className="w-full h-11 bg-white rounded-xl px-4 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41B349] transition shadow-xs"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                                                Country <span className="text-[#41B349]">*</span>
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleCountryChange}
                                                    className="w-full h-11 bg-white rounded-xl px-4 pr-10 text-gray-800 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#41B349] transition shadow-xs cursor-pointer"
                                                >
                                                    <option value="">Select your Country</option>
                                                    {COUNTRY_DIAL_CODES.map((c) => (
                                                        <option key={c.name} value={c.name}>{c.name} ({c.code})</option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                    <FaChevronDown size={11} />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                                                Phone Number <span className="text-[#41B349]">*</span>
                                            </label>
                                            <div className="relative flex items-center">
                                                {/* Uneditable Country Dial Code Badge */}
                                                {selectedCountryObj?.code && (
                                                    <div className="bg-gray-100 border-r border-gray-300 text-gray-900 font-extrabold text-xs sm:text-sm px-3 h-11 flex items-center justify-center rounded-l-xl select-none flex-shrink-0">
                                                        {selectedCountryObj.code}
                                                    </div>
                                                )}
                                                <input
                                                    type="tel"
                                                    name="phoneDigits"
                                                    value={phoneDigits}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/[^0-9]/g, '');
                                                        const max = selectedCountryObj?.maxDigits || 15;
                                                        setPhoneDigits(val.slice(0, max));
                                                        if (status.message) setStatus({ type: '', message: '' });
                                                    }}
                                                    disabled={!formData.country}
                                                    maxLength={selectedCountryObj?.maxDigits || 15}
                                                    placeholder={
                                                        !formData.country 
                                                            ? "Select country first *" 
                                                            : `Enter ${selectedCountryObj?.minDigits === selectedCountryObj?.maxDigits ? `${selectedCountryObj?.maxDigits} digits` : 'phone number'}`
                                                    }
                                                    required
                                                    className={`w-full h-11 text-sm transition shadow-xs ${
                                                        selectedCountryObj?.code ? 'rounded-r-xl px-3' : 'rounded-xl px-4'
                                                    } ${
                                                        !formData.country 
                                                            ? 'bg-gray-200/80 text-gray-500 cursor-not-allowed opacity-70 placeholder-gray-500' 
                                                            : 'bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41B349]'
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                                            Email Address <span className="text-[#41B349]">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email || ''}
                                            onChange={handleChange}
                                            placeholder="name@company.com"
                                            required
                                            className="w-full h-11 bg-white rounded-xl px-4 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41B349] transition shadow-xs"
                                        />
                                    </div>

                                    {/* Navigation Buttons: Back & Send OTP Next */}
                                    <div className="pt-2 flex items-center justify-between gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
                                        >
                                            <FaArrowLeft size={11} />
                                            <span>Back</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleSendOtp(false)}
                                            disabled={sendingOtp}
                                            className="bg-[#41B349] hover:bg-[#369c3d] text-white px-7 py-2.5 rounded-full font-extrabold text-xs sm:text-sm flex items-center gap-2 transition shadow-lg shadow-[#41B349]/30 disabled:opacity-60 cursor-pointer"
                                        >
                                            {sendingOtp ? (
                                                <>
                                                    <FaSpinner className="animate-spin" />
                                                    <span>Sending Code...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Next</span>
                                                    <FaArrowRight size={12} />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* ================= STEP 3: EMAIL VERIFICATION (OTP) ================= */}
                            {step === 3 && (
                                <motion.div 
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-4 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center pt-2">
                                        <div className="w-14 h-14 rounded-2xl bg-[#41B349]/15 border border-[#41B349]/30 flex items-center justify-center text-[#41B349] mb-3">
                                            <FaEnvelopeOpenText size={26} />
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                                            Verify Your Email
                                        </h3>
                                        <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-xs leading-relaxed">
                                            We sent a 6-digit verification code to:
                                        </p>
                                        <div className="flex items-center justify-center gap-2 mt-1 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                                            <span className="text-[#FFC700] font-bold text-xs sm:text-sm">{formData.email}</span>
                                            <button 
                                                type="button"
                                                onClick={() => setStep(2)}
                                                className="text-gray-400 hover:text-white transition cursor-pointer"
                                                title="Edit Email"
                                            >
                                                <FaEdit size={12} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* 6-Digit Code Input */}
                                    <div className="py-2">
                                        <input
                                            type="text"
                                            maxLength={6}
                                            value={otpCode}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/[^0-9]/g, '');
                                                setOtpCode(val);
                                                if (status.message) setStatus({ type: '', message: '' });
                                            }}
                                            placeholder="• • • • • •"
                                            className="w-full max-w-[260px] mx-auto h-12 bg-white rounded-2xl text-center text-gray-900 text-xl font-extrabold tracking-[0.4em] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41B349] shadow-md"
                                        />
                                    </div>

                                    {/* Resend Timer */}
                                    <div className="text-xs text-gray-400">
                                        Didn't receive the code?{' '}
                                        {resendCooldown > 0 ? (
                                            <span className="text-gray-500 font-semibold">Resend code in {resendCooldown}s</span>
                                        ) : (
                                            <button
                                                type="button"
                                                disabled={sendingOtp}
                                                onClick={() => handleSendOtp(true)}
                                                className="text-[#41B349] font-bold hover:underline cursor-pointer disabled:opacity-50"
                                            >
                                                Resend Code
                                            </button>
                                        )}
                                    </div>

                                    {/* Navigation Buttons: Back & Verify Code */}
                                    <div className="pt-3 flex items-center justify-between gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
                                        >
                                            <FaArrowLeft size={11} />
                                            <span>Back</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleVerifyOtp}
                                            disabled={verifyingOtp || otpCode.length !== 6}
                                            className="bg-[#41B349] hover:bg-[#369c3d] text-white px-7 py-2.5 rounded-full font-extrabold text-xs sm:text-sm flex items-center gap-2 transition shadow-lg shadow-[#41B349]/30 disabled:opacity-50 cursor-pointer"
                                        >
                                            {verifyingOtp ? (
                                                <>
                                                    <FaSpinner className="animate-spin" />
                                                    <span>Verifying...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Verify & Proceed</span>
                                                    <FaArrowRight size={12} />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* ================= STEP 4: FINAL BOOKING DETAILS ================= */}
                            {step === 4 && (
                                <motion.div 
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-4"
                                >
                                    <div className="mb-2">
                                        <h3 className="text-xl font-black text-white tracking-tight">
                                            Project Details
                                        </h3>
                                        <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                                            Almost done! Provide your service & budget preferences.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                                                Service Required <span className="text-[#41B349]">*</span>
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="service"
                                                    value={formData.service}
                                                    onChange={handleChange}
                                                    className="w-full h-11 bg-white rounded-xl px-4 pr-10 text-gray-800 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#41B349] transition shadow-xs cursor-pointer"
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
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                                                Estimated Budget <span className="text-[#41B349]">*</span>
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="budget"
                                                    value={formData.budget}
                                                    onChange={handleChange}
                                                    className="w-full h-11 bg-white rounded-xl px-4 pr-10 text-gray-800 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#41B349] transition shadow-xs cursor-pointer"
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
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                                            Message / Additional Notes
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us about your project requirements..."
                                            rows={3}
                                            className="w-full bg-white rounded-xl p-3.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41B349] transition shadow-xs resize-none"
                                        ></textarea>
                                    </div>

                                    {/* Navigation Buttons: Back & Submit */}
                                    <div className="pt-2 flex items-center justify-between gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setStep(3)}
                                            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
                                        >
                                            <FaArrowLeft size={11} />
                                            <span>Back</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className="bg-[#41B349] hover:bg-[#369c3d] text-white px-8 py-3 rounded-full font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#41B349]/30 disabled:opacity-60 cursor-pointer"
                                        >
                                            {loading ? (
                                                <>
                                                    <FaSpinner className="animate-spin" />
                                                    <span>Submitting...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Submit Booking</span>
                                                    <FaPaperPlane size={12} />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default GetInTouch;
