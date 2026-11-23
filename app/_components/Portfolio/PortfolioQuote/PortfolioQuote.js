'use client';

import React from 'react';
import {
  Layers,
  Gauge,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

const statsData = [
  {
    value: '13+',
    label: 'Verified Case Studies',
    subtext: 'UAE, UK, USA & Global',
    icon: <Layers className="w-4 h-4 text-[#41B349]" />,
  },
  {
    value: '98%',
    label: 'Avg. Performance Score',
    subtext: 'Google Lighthouse & Core Vitals',
    icon: <Gauge className="w-4 h-4 text-[#41B349]" />,
  },
  {
    value: '100%',
    label: 'On-Time Milestone Delivery',
    subtext: 'Agile Engineering Execution',
    icon: <CheckCircle2 className="w-4 h-4 text-[#41B349]" />,
  },
  {
    value: '24/7',
    label: 'Cloud & POS Reliability',
    subtext: 'High-Availability Production SLAs',
    icon: <ShieldCheck className="w-4 h-4 text-[#41B349]" />,
  },
];

const PortfolioQuote = () => {
  return (
    <section className="relative pt-4 sm:pt-8 pb-5 sm:pb-8 bg-[#FBFDFC] text-[#111827] overflow-hidden">
      {/* Background Soft Lighting Orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#41B349]/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* ========================================================
         * ENTERPRISE AUTHORITY STATS MODULE
         * ======================================================== */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-gray-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-4 sm:p-7 lg:p-10 overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 lg:divide-x lg:divide-gray-100">
            {statsData.map((stat, idx) => (
              <div
                key={idx}
                className={`flex flex-col justify-between space-y-2 ${
                  idx > 0 ? 'lg:pl-8' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50/80 border border-emerald-100 flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-gray-400 font-semibold">
                    Verified
                  </span>
                </div>

                <div>
                  <div className="text-xl sm:text-3xl lg:text-[34px] font-display uppercase tracking-tight text-[#0D0F12] leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-sm font-jakarta font-semibold text-gray-800 mt-1 leading-snug">
                    {stat.label}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-jakarta text-gray-500 mt-0.5 leading-tight">
                    {stat.subtext}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioQuote;
