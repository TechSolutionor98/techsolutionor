"use client";

import React from 'react';

const ContactHero = () => {
    return (
        <section className="relative w-full bg-white overflow-hidden py-16 md:py-24 select-none">
            {/* Ambient Emerald Glow for Light Theme */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle_at_top,_rgba(65,179,73,0.12)_0%,_transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#41B34912_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Micro-Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/30 text-[#41B349] font-extrabold text-xs uppercase tracking-widest mb-6 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
                    <span>GET IN TOUCH WITH OUR TEAM</span>
                </div>

                {/* Primary Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] max-w-4xl mx-auto">
                    <span className="text-[#111827] block">
                        Let&apos;s Build Something
                    </span>
                    <span className="text-[#41B349] block mt-1 sm:mt-2">
                        Extraordinary Together
                    </span>
                </h1>

                {/* Description */}
                <p className="mt-6 text-[#4B5563] text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
                    Have a project in mind, an engineering challenge, or looking to scale your digital presence? Reach out to our technology advisors and solution architects in Dubai for a free, transparent consultation.
                </p>
            </div>
        </section>
    );
};

export default ContactHero;



