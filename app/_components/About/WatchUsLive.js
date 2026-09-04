"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaArrowRight, FaBolt } from "react-icons/fa";
import { useQuote } from "@/app/_context/QuoteContext";
import InnovationImage from "../../../components/Images/aboutbg1.webp";

const cultureHighlights = [
    "Rigorous Automated CI/CD & Code Quality Audits",
    "Continuous R&D in Generative AI, Cloud & Modern Web",
    "Direct Engineering Collaboration with Zero Bureaucracy",
    "Comprehensive Post-Launch Maintenance & SLA Guarantees",
];

const WatchUsLive = () => {
    const { openQuote } = useQuote();

    return (
        <section className="relative w-full bg-[#0A0D12] py-20 md:py-28 overflow-hidden select-none">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(65,179,73,0.12)_0%,_transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left: Culture Copy */}
                    <div className="lg:col-span-6 space-y-6 text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#41B349]/15 border border-[#41B349]/30 text-[#41B349] font-extrabold text-xs uppercase tracking-widest">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#41B349]" />
                            <span>INNOVATION & ENGINEERING CULTURE</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.2]">
                            A Dynamic Hub Where{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#41B349] via-[#65D46D] to-[#41B349]">
                                Visionary Ideas
                            </span>{" "}
                            Thrive
                        </h2>

                        <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                            At TechSolutionor, our greatest asset is our collective intellect. We pair the strategic oversight of seasoned software architects with the energetic ingenuity of top engineering talent to solve challenges others deem impossible.
                        </p>

                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-normal">
                            We discard slow, bloated agency bureaucracy in favor of tight, agile squads focused squarely on your commercial milestones. Every sprint is deliberate, every milestone measurable.
                        </p>

                        {/* Checklist */}
                        <div className="space-y-3 pt-2">
                            {cultureHighlights.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm sm:text-base font-semibold text-gray-200">
                                    <div className="w-6 h-6 rounded-full bg-[#41B349]/20 flex items-center justify-center shrink-0">
                                        <FaCheckCircle className="text-[#41B349] text-xs" />
                                    </div>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 flex flex-wrap items-center gap-4">
                            <button
                                onClick={openQuote}
                                className="inline-flex items-center gap-2.5 bg-[#41B349] hover:bg-[#369c3d] text-white font-extrabold px-8 py-4 rounded-full text-sm sm:text-base transition-all duration-300 shadow-lg shadow-[#41B349]/25 hover:scale-[1.02] cursor-pointer"
                            >
                                <span>Collaborate With Us</span>
                                <FaArrowRight size={12} />
                            </button>
                            <Link
                                href="/contact-us"
                                className="inline-flex items-center gap-2 text-gray-300 hover:text-white px-5 py-4 rounded-full font-bold text-sm transition-colors duration-200"
                            >
                                <span>Schedule a Call →</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Media Visual Container */}
                    <div className="lg:col-span-6 flex justify-center">
                        <div className="relative w-full max-w-[540px]">
                            {/* Main Visual Image Card */}
                            <div className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-black/80">
                                <Image
                                    src={InnovationImage}
                                    alt="Innovation and Creativity at TechSolutionor"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12] via-transparent to-transparent opacity-80" />

                                {/* Glass Overlay Banner */}
                                <div className="absolute bottom-6 left-6 right-6 bg-[#0A0D12]/90 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl">
                                    <div className="flex items-center gap-3 mb-1.5">
                                        <div className="w-8 h-8 rounded-lg bg-[#41B349]/20 flex items-center justify-center text-[#41B349]">
                                            <FaBolt size={14} />
                                        </div>
                                        <div className="text-sm font-black text-white uppercase tracking-wider">
                                            High-Velocity Engineering
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-300 font-normal leading-relaxed">
                                        Continuous integration and continuous deployment pipelines engineered for speed, safety, and scale.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WatchUsLive;
