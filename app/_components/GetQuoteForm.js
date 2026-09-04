"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaTimes, FaChevronDown, FaCheckCircle, FaSpinner, FaChevronLeft, FaChevronRight, FaArrowRight, FaArrowLeft, FaPaperPlane, FaEnvelopeOpenText, FaEdit } from 'react-icons/fa';
import { useQuote } from '../_context/QuoteContext';
import formBg from '@/components/Images/formbg.png';
import ballFrom from '@/components/Images/ballfrom.png';

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

const GetQuoteForm = () => {
    const { isOpen, closeQuote } = useQuote();

    // Multi-Step State: 1: Calendar, 2: Personal Info, 3: Email OTP Verification, 4: Project Details
    const [step, setStep] = useState(1);

    // Dynamic Date Setup & Past Restrictions
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [currentDate, setCurrentDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDay, setSelectedDay] = useState(today.getDate());

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

    // Countdown Timer for OTP
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
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

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

    // Step Navigators
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
                    source: 'Get A Quote Modal'
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to submit quote request');
            }

            setStatus({
                type: 'success',
                message: 'Thank you! Your booking request has been submitted. We will contact you shortly.'
            });

            // Reset form
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
                closeQuote();
                setStep(1);
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

    const modalVariants = {
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
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    {/* Backdrop */}
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

                    {/* Modal Form Container */}
                    <motion.div
                        className="relative w-full max-w-[460px] max-h-[94vh] bg-[#171717] rounded-[24px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] border-2 border-white my-auto z-10"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Background Graphic Asset */}
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                            <Image
                                src={formBg}
                                alt="Form Background"
                                fill
                                className="object-cover object-right"
                                priority
                            />
                        </div>

                        {/* Geometric Accent */}
                        <div className="absolute top-6 right-16 z-0 pointer-events-none select-none opacity-80 hidden sm:block">
                            <Image
                                src={ballFrom}
                                alt="Decoration"
                                width={80}
                                height={80}
                                className="w-[60px] h-auto object-contain"
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

                        {/* Modal Body */}
                        <div className="relative z-10 p-5 sm:p-6 overflow-y-auto max-h-[90vh]">
                            
                            {/* Header */}
                            <div className="mb-3">
                                <h2 className="text-white text-xl sm:text-2xl font-extrabold tracking-wide leading-tight">
                                    Get A Quote
                                </h2>
                            </div>

                            {/* Status Banner */}
                            {status.message && (
                                <div className={`mb-4 p-3 rounded-xl text-xs font-medium flex items-center gap-2.5 ${
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

                            {/* ================= STEP 1: CALENDAR ================= */}
                            {step === 1 && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className="space-y-3.5"
                                >
                                    {/* Month Navigation */}
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                                            <span>{MONTH_NAMES[month]}</span>
                                            <span className="text-[#FFC700] font-normal">{year}</span>
                                        </h3>
                                        <div className="flex items-center gap-1">
                                            <button 
                                                type="button" 
                                                disabled={isPrevMonthDisabled}
                                                onClick={handlePrevMonth}
                                                className={`p-1.5 rounded-lg bg-white/5 transition ${
                                                    isPrevMonthDisabled 
                                                        ? 'opacity-20 cursor-not-allowed text-gray-500' 
                                                        : 'hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer'
                                                }`}
                                            >
                                                <FaChevronLeft size={10} />
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={handleNextMonth}
                                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
                                            >
                                                <FaChevronRight size={10} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Days Header */}
                                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-gray-400 uppercase tracking-wider pb-1 border-b border-white/10">
                                        {DAY_NAMES_SHORT.map(d => (
                                            <div key={d} className="py-0.5">{d}</div>
                                        ))}
                                    </div>

                                    {/* Calendar Days */}
                                    <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                                        {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                                            <div key={`blank-${idx}`} className="h-8" />
                                        ))}

                                        {Array.from({ length: daysInMonth }).map((_, idx) => {
                                            const dayNum = idx + 1;
                                            const cellDate = new Date(year, month, dayNum);
                                            cellDate.setHours(0, 0, 0, 0);

                                            const isPast = cellDate < today;
                                            const isToday = cellDate.getTime() === today.getTime();
                                            const isSelected = selectedDay === dayNum && !isPast;

                                            return (
                                                <button
                                                    key={`day-${dayNum}`}
                                                    type="button"
                                                    disabled={isPast}
                                                    onClick={() => !isPast && setSelectedDay(dayNum)}
                                                    className={`h-8 sm:h-9 rounded-lg text-xs font-bold flex flex-col items-center justify-center relative transition-all ${
                                                        isPast
                                                            ? 'text-white cursor-not-allowed bg-transparent border border-transparent'
                                                            : isSelected 
                                                                ? 'bg-white text-black font-extrabold shadow-md scale-105 z-10 cursor-pointer border border-white' 
                                                                : isToday
                                                                    ? 'bg-[#252930] hover:bg-[#323742] text-white cursor-pointer border border-white'
                                                                    : 'bg-[#252930] hover:bg-[#323742] text-white cursor-pointer border border-transparent'
                                                    }`}
                                                >
                                                    <span>{dayNum}</span>
                                                    {isToday && (
                                                        <span className={`w-1 h-1 rounded-full mt-0.5 border ${isSelected ? 'bg-black border-black' : 'bg-white border-white'}`} />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Next Button */}
                                    {selectedDay && (
                                        <div className="pt-2 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => goToStep2()}
                                                className="bg-[#41B349] hover:bg-[#369c3d] text-white px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-md shadow-[#41B349]/30 cursor-pointer"
                                            >
                                                <span>Next</span>
                                                <FaArrowRight size={11} />
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
                                    className="space-y-3.5"
                                >
                                    <div className="mb-2">
                                        <h3 className="text-lg font-bold text-white tracking-tight">
                                            Personal Details
                                        </h3>
                                        <p className="text-gray-400 text-xs mt-0.5">
                                            Selected Date: <span className="text-[#FFC700] font-bold">{formattedSelectedDateString}</span>
                                        </p>
                                    </div>

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

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="relative">
                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleCountryChange}
                                                className="w-full h-10 bg-white rounded-md px-3.5 pr-10 text-gray-700 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#41B349] transition shadow-xs cursor-pointer"
                                            >
                                                <option value="">Select your Country *</option>
                                                {COUNTRY_DIAL_CODES.map((c) => (
                                                    <option key={c.name} value={c.name}>{c.name} ({c.code})</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                <FaChevronDown size={11} />
                                            </div>
                                        </div>

                                        <div className="relative flex items-center">
                                            {/* Uneditable Country Dial Code Badge */}
                                            {selectedCountryObj?.code && (
                                                <div className="bg-gray-100 border-r border-gray-300 text-gray-900 font-extrabold text-xs px-2.5 h-10 flex items-center justify-center rounded-l-md select-none flex-shrink-0">
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
                                                        ? "Select country *" 
                                                        : `Enter ${selectedCountryObj?.minDigits === selectedCountryObj?.maxDigits ? `${selectedCountryObj?.maxDigits} digits *` : 'phone number *'}`
                                                }
                                                required
                                                className={`w-full h-10 text-sm transition shadow-xs ${
                                                    selectedCountryObj?.code ? 'rounded-r-md px-2.5' : 'rounded-md px-3.5'
                                                } ${
                                                    !formData.country 
                                                        ? 'bg-gray-200/80 text-gray-500 cursor-not-allowed opacity-70 placeholder-gray-500' 
                                                        : 'bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41B349]'
                                                }`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email || ''}
                                            onChange={handleChange}
                                            placeholder="Email Address *"
                                            required
                                            className="w-full h-10 bg-white rounded-md px-3.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41B349] transition shadow-xs"
                                        />
                                    </div>

                                    {/* Navigation Buttons: Back & Send OTP Next */}
                                    <div className="pt-2 flex items-center justify-between gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                                        >
                                            <FaArrowLeft size={11} />
                                            <span>Back</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleSendOtp(false)}
                                            disabled={sendingOtp}
                                            className="bg-[#41B349] hover:bg-[#369c3d] text-white px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-md shadow-[#41B349]/30 disabled:opacity-60 cursor-pointer"
                                        >
                                            {sendingOtp ? (
                                                <>
                                                    <FaSpinner className="animate-spin" />
                                                    <span>Sending Code...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Next</span>
                                                    <FaArrowRight size={11} />
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
                                    className="space-y-3.5 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center pt-1">
                                        <div className="w-12 h-12 rounded-xl bg-[#41B349]/15 border border-[#41B349]/30 flex items-center justify-center text-[#41B349] mb-2">
                                            <FaEnvelopeOpenText size={22} />
                                        </div>
                                        <h3 className="text-lg font-bold text-white tracking-tight">
                                            Verify Your Email
                                        </h3>
                                        <p className="text-gray-300 text-xs mt-0.5 max-w-xs leading-relaxed">
                                            We sent a 6-digit verification code to:
                                        </p>
                                        <div className="flex items-center justify-center gap-1.5 mt-1 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                                            <span className="text-[#FFC700] font-bold text-xs">{formData.email}</span>
                                            <button 
                                                type="button"
                                                onClick={() => setStep(2)}
                                                className="text-gray-400 hover:text-white transition cursor-pointer"
                                                title="Edit Email"
                                            >
                                                <FaEdit size={11} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* 6-Digit Code Input */}
                                    <div className="py-1">
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
                                            className="w-full max-w-[240px] mx-auto h-11 bg-white rounded-xl text-center text-gray-900 text-lg font-extrabold tracking-[0.35em] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41B349] shadow-xs"
                                        />
                                    </div>

                                    {/* Resend Timer */}
                                    <div className="text-[11px] text-gray-400">
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
                                    <div className="pt-2 flex items-center justify-between gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                                        >
                                            <FaArrowLeft size={11} />
                                            <span>Back</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleVerifyOtp}
                                            disabled={verifyingOtp || otpCode.length !== 6}
                                            className="bg-[#41B349] hover:bg-[#369c3d] text-white px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-md shadow-[#41B349]/30 disabled:opacity-50 cursor-pointer"
                                        >
                                            {verifyingOtp ? (
                                                <>
                                                    <FaSpinner className="animate-spin" />
                                                    <span>Verifying...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Verify & Proceed</span>
                                                    <FaArrowRight size={11} />
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
                                    className="space-y-3.5"
                                >
                                    <div className="mb-2">
                                        <h3 className="text-lg font-bold text-white tracking-tight">
                                            Remaining Details
                                        </h3>
                                        <p className="text-gray-400 text-xs mt-0.5">
                                            Select service & budget to complete your quote request.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="relative">
                                            <select
                                                name="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                                className="w-full h-10 bg-white rounded-md px-3.5 pr-10 text-gray-700 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#41B349] transition shadow-xs cursor-pointer"
                                            >
                                                <option value="">Select Service *</option>
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
                                                <option value="">Select Budget *</option>
                                                {BUDGETS.map((b) => (
                                                    <option key={b} value={b}>{b}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                <FaChevronDown size={11} />
                                            </div>
                                        </div>
                                    </div>

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

                                    <div className="pt-2 flex items-center justify-between gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setStep(3)}
                                            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                                        >
                                            <FaArrowLeft size={11} />
                                            <span>Back</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className="bg-[#41B349] hover:bg-[#369c3d] text-white px-7 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md shadow-[#41B349]/30 disabled:opacity-60 cursor-pointer"
                                        >
                                            {loading ? (
                                                <>
                                                    <FaSpinner className="animate-spin" />
                                                    <span>Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Submit Request</span>
                                                    <FaPaperPlane size={12} />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default GetQuoteForm;
