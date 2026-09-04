"use client";

import React from "react";
import { FaCodeBranch, FaUsers, FaSmileBeam, FaGlobeAmericas } from "react-icons/fa";

const stats = [
    {
        icon: <FaCodeBranch className="text-[#41B349] text-xl" />,
        number: "150+",
        title: "Projects Delivered",
        desc: "High-performance enterprise solutions & scalable applications worldwide.",
    },
    {
        icon: <FaUsers className="text-[#41B349] text-xl" />,
        number: "100+",
        title: "Active Global Clients",
        desc: "Partnering with visionary startups, established brands & institutions.",
    },
    {
        icon: <FaSmileBeam className="text-[#41B349] text-xl" />,
        number: "99%",
        title: "Client Retention Rate",
        desc: "Trusted for transparent communication, speed, and continuous engineering support.",
    },
    {
        icon: <FaGlobeAmericas className="text-[#41B349] text-xl" />,
        number: "10+",
        title: "Years of Craft",
        desc: "A proven decade of continuous technological innovation and team growth.",
    },
];

const AboutStats = () => {
    return (
        <section className="relative w-full bg-[#0B0E14] py-16 sm:py-20 border-y border-white/10 overflow-hidden select-none">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[250px] bg-[#41B349]/10 blur-3xl pointer-events-none rounded-full" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                    {stats.map((item, idx) => (
                        <div
                            key={idx}
                            className="relative flex flex-col items-center lg:items-start text-center lg:text-left p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#41B349]/40 hover:bg-white/[0.06] transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#41B349]/15 border border-[#41B349]/25 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-1">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
                                    {item.number}
                                </span>
                            </div>
                            <h3 className="text-base font-bold text-[#41B349] mb-2 tracking-wide">
                                {item.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutStats;
