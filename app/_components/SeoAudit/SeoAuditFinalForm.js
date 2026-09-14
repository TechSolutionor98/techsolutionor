"use client";

import React, { useState } from "react";
import Image from "next/image";
import MonitorImg from "@/components/Images/Free-seo-audit.png";
import { Send, CheckCircle2, ShieldCheck, Clock, Sparkles } from "lucide-react";

const SeoAuditFinalForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    location: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission / dispatch
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="form" className="py-16 sm:py-20 md:py-24 bg-white select-none overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Split Card */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[40px] border-2 border-[#41B349] p-6 sm:p-10 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Monitor Illustration & Trust Highlights */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-left">
            <div className="relative w-full max-w-[420px] aspect-[16/10] rounded-2xl overflow-hidden p-2 mb-6">
              <Image
                src={MonitorImg}
                alt="Free SEO Audit Monitor Illustration"
                fill
                style={{ objectFit: "contain" }}
                className="filter drop-shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Trust Highlights */}
            <div className="w-full max-w-[400px] space-y-3">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#111827] bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#41B349] shrink-0" />
                <span>100% Free & No-Obligation Manual Review</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#111827] bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5">
                <ShieldCheck className="w-4 h-4 text-[#41B349] shrink-0" />
                <span>Zero Automated Generic Bot Reports</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#111827] bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5">
                <Clock className="w-4 h-4 text-[#41B349] shrink-0" />
                <span>Delivered Directly to Your Email in 24–48 Hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-7 w-full">
            <div className="text-left mb-6">
              <div 
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#36963D]/10 border border-[#36963D]/30 text-[#36963D] font-mono text-xs uppercase tracking-widest font-bold mb-3 shadow-2xs"
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
              >
                <span>CLAIM YOUR AUDIT</span>
              </div>

              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111827] leading-tight mb-2 tracking-tight"
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
              >
                Get Your Free SEO Audit Now
              </h2>

              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-normal">
                Fill out the form below, and our SEO experts will manually review your website to provide a detailed audit and action plan.
              </p>
            </div>

            {submitted ? (
              <div className="bg-[#41B349]/10 border border-[#41B349]/30 rounded-2xl p-6 sm:p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#41B349] mx-auto" />
                <h3 className="text-xl font-bold text-[#111827]">Request Received Successfully!</h3>
                <p className="text-sm text-gray-700 max-w-md mx-auto">
                  Thank you! Our SEO experts have queued your website for a manual comprehensive audit. You will receive your tailored action plan within 24–48 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-full text-xs font-bold text-[#41B349] hover:bg-[#41B349]/15 transition-all"
                >
                  Submit another website
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#41B349] focus:ring-4 focus:ring-[#41B349]/10 outline-none transition-all text-sm bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#41B349] focus:ring-4 focus:ring-[#41B349]/10 outline-none transition-all text-sm bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Website URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      name="website"
                      placeholder="Website URL"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#41B349] focus:ring-4 focus:ring-[#41B349]/10 outline-none transition-all text-sm bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Business Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="Business Location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#41B349] focus:ring-4 focus:ring-[#41B349]/10 outline-none transition-all text-sm bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Optional Message / Target Keywords
                  </label>
                  <textarea
                    name="message"
                    placeholder="Optional Message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#41B349] focus:ring-4 focus:ring-[#41B349]/10 outline-none transition-all text-sm bg-white resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#41B349] hover:bg-[#36963D] text-white font-extrabold text-sm sm:text-base py-4 rounded-full shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer mt-2"
                >
                  {loading ? (
                    <span className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <>
                      <span>Submit & Get Audit</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SeoAuditFinalForm;
