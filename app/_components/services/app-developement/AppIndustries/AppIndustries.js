"use client";

import React from "react";
import { useQuote } from "@/app/_context/QuoteContext";
import {
  Truck,
  CreditCard,
  ShoppingBag,
  Activity,
  Building2,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";

const industriesData = [
  {
    icon: Truck,
    title: "On-Demand & Delivery Apps",
    desc: "Feature-rich on-demand mobile ecosystems for ride-hailing, food delivery, and courier logistics. Engineered with real-time GPS tracking, intelligent driver dispatch algorithms, dynamic fare calculation, and instant push notifications.",
    features: ["Real-Time GPS Tracking", "Automated Dispatch", "In-App Payments"],
  },
  {
    icon: CreditCard,
    title: "FinTech & Digital Wallet Apps",
    desc: "High-security financial technology applications with banking-grade encryption, biometric authentication (Face ID / Touch ID), PCI-DSS compliance, digital wallet management, instant peer-to-peer transfers, and multi-currency exchange.",
    features: ["Biometric Security", "Digital Wallets", "PCI-DSS Compliant"],
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce & M-Commerce Apps",
    desc: "High-conversion mobile shopping applications designed to maximize sales. Features intuitive catalog navigation, one-click Apple Pay & Google Pay checkout, personalized AI product recommendations, and automated push marketing campaigns.",
    features: ["One-Click Checkout", "Apple / Google Pay", "Loyalty Rewards"],
  },
  {
    icon: Activity,
    title: "Healthcare & Telemedicine Apps",
    desc: "HIPAA-compliant digital health applications connecting patients with medical practitioners. Includes doctor appointment scheduling, encrypted HD video teleconsultations, electronic health records (EHR), and digital e-prescriptions.",
    features: ["HIPAA Compliant", "Video Consultations", "EHR Management"],
  },
  {
    icon: Building2,
    title: "Real Estate & PropTech Apps",
    desc: "Interactive property portals for real estate developers, brokers, and buyers in Dubai and global markets. Features geolocation property maps, 3D interactive virtual tours, direct agent chat, and smart mortgage calculators.",
    features: ["3D Virtual Tours", "Geolocation Search", "Mortgage Calculator"],
  },
  {
    icon: Briefcase,
    title: "Enterprise & Workforce Mobility",
    desc: "Custom internal mobile applications built to streamline field operations, employee workflows, and corporate communications. Featuring offline data synchronization, ERP/CRM integration, role-based access, and corporate SSO.",
    features: ["Offline Data Sync", "ERP/CRM Integration", "Enterprise SSO"],
  },
];

const AppIndustries = () => {
  const { openQuote } = useQuote();

  return (
    <section className="w-full py-16 sm:py-20 md:py-24 bg-white font-sans relative overflow-hidden select-none">
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(#1B4E2C 1px, transparent 1px), linear-gradient(90deg, #1B4E2C 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4E2C]/10 border border-[#1B4E2C]/20 text-[#1B4E2C] font-extrabold text-xs sm:text-sm uppercase tracking-widest mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
            <span>INDUSTRY-FOCUSED APP DEVELOPMENT</span>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#0D0F12] tracking-tight leading-tight"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            Mobile App Solutions For{" "}
            <span className="text-[#41B349]">Every Industry</span>
          </h2>

          <p
            className="text-sm sm:text-base text-[#475569] mt-3 font-normal leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            We engineer industry-tailored mobile applications that solve complex operational challenges, captivate users, and accelerate commercial growth across Dubai, the UAE, and global markets.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
          {industriesData.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                onClick={openQuote}
                className="group rounded-[22px] p-6 sm:p-7 flex flex-col justify-between h-full min-h-[330px] bg-white border-2 border-[#41b349] shadow-[0_4px_18px_rgba(0,0,0,0.05)] hover:bg-[#41b349] hover:border-[#41b349] hover:shadow-[0_12px_32px_rgba(65,179,73,0.32)] hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                {/* Top Section */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#41b349]/10 text-[#1B4E2C] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 group-hover:bg-white group-hover:border-transparent flex items-center justify-center text-gray-400 group-hover:text-[#1B4E2C] transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bold text-[18px] sm:text-[19px] md:text-[20px] mb-3 leading-snug text-[#0D0F12] group-hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13.5px] sm:text-[14px] leading-relaxed font-normal text-[#475569] group-hover:text-white/95 transition-colors duration-300 mb-5">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Tags */}
                <div className="pt-4 border-t border-gray-100 group-hover:border-white/20 transition-colors duration-300 flex flex-wrap gap-1.5">
                  {item.features.map((feat, fIdx) => (
                    <span
                      key={fIdx}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#41B349]/10 text-[#1B4E2C] group-hover:bg-white/20 group-hover:text-white transition-colors duration-300"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AppIndustries;
