"use client";

import React, { useState } from "react";
import { 
  Clock, 
  DollarSign, 
  UserCheck, 
  CheckCircle2, 
  Database, 
  Zap 
} from "lucide-react";
import { getCmsVal } from "@/lib/api-helper";

export default function LeadQualificationAndNurturing({ cmsContent }) {
  const [activeCadenceDay, setActiveCadenceDay] = useState(0);

  const badge = getCmsVal(cmsContent, "INTELLIGENT PIPELINE FILTERING", "leadgen_qualification");
  const heading14 = getCmsVal(cmsContent, "Lead Qualification & Conversion", "leadgen_qualification");
  const heading15 = getCmsVal(cmsContent, "Lead Nurturing & Follow-Up Strategy", "leadgen_qualification");
  const subtitle = getCmsVal(
    cmsContent,
    "Generating inquiries is only half the battle. We implement rigorous BANT qualification protocols and automated multi-touch nurturing cadences so your sales team talks exclusively to verified, high-value decision-makers ready to buy.",
    "leadgen_qualification"
  );

  const bantCriteria = [
    {
      letter: "B",
      name: "Budget",
      label: "Budget Verification",
      icon: DollarSign,
      color: "bg-[#1B4E2C] text-white",
      desc: "We screen prospect purchasing power upfront so your sales reps never waste hours pitching clients who cannot afford your rates."
    },
    {
      letter: "A",
      name: "Authority",
      label: "Decision Maker Identification",
      icon: UserCheck,
      color: "bg-blue-600 text-white",
      desc: "We target and verify primary C-level executives, directors, and budget holders with genuine signing authority."
    },
    {
      letter: "N",
      name: "Need",
      label: "Critical Commercial Need",
      icon: Zap,
      color: "bg-purple-600 text-white",
      desc: "We identify urgent, tangible business pain points that directly align with your specific services and capabilities."
    },
    {
      letter: "T",
      name: "Timeline",
      label: "Purchase Timeline",
      icon: Clock,
      color: "bg-amber-600 text-white",
      desc: "We filter prospects based on their decision urgency (30, 60, or 90 days), prioritizing active buyers over passive researchers."
    },
  ];

  const cadenceSteps = [
    {
      time: "Minute 1",
      channel: "WhatsApp & Instant SMS",
      headline: "Instant Touchpoint & Greeting",
      action: "System immediately sends personalized WhatsApp confirmation with catalog, calendar link, and assigned specialist name.",
      impact: "94% read within 3 minutes; eliminates intent drop-off."
    },
    {
      time: "Day 2",
      channel: "Targeted Inbound Email",
      headline: "Industry Relevant Case Study",
      action: "Sends a tailored case study matching the prospect's exact sector and demonstrating measurable ROI results.",
      impact: "Builds early commercial authority and social proof."
    },
    {
      time: "Day 5",
      channel: "Interactive Content / Demo",
      headline: "Overcoming Top Objections",
      action: "Shares an interactive calculator or short 2-minute video walkthrough answering pricing and onboarding questions.",
      impact: "Pre-emptively neutralizes friction and doubt."
    },
    {
      time: "Day 10",
      channel: "Direct Sales Call / WhatsApp",
      headline: "Executive Consultation Booking",
      action: "Sales representative follows up via phone call or WhatsApp audio note offering a complimentary tailored strategy review.",
      impact: "Converts warm MQL into scheduled sales discovery call."
    },
    {
      time: "Day 18+",
      channel: "Smart Re-Engagement",
      headline: "Automated Lifecycle Reactivation",
      action: "Periodic push notifications and value updates keep cold leads warm until their buying cycle triggers.",
      impact: "Recaptures 18-24% of delayed opportunities."
    }
  ];

  return (
    <section className="w-full py-16 sm:py-20 md:py-24 bg-[#F8FAFC] relative overflow-hidden select-none border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4E2C]/10 border border-[#1B4E2C]/20 text-[#1B4E2C] font-extrabold text-xs sm:text-sm uppercase tracking-widest mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
            <span>{badge}</span>
          </div>

          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#0D0F12] tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {heading14}
          </h2>

          <p 
            className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl mx-auto font-normal"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {subtitle}
          </p>
        </div>

        {/* SECTION 1: BANT Qualification Framework Matrix */}
        <div className="mb-14 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-6 border-b border-gray-200 gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-[#1B4E2C] uppercase">Qualification Architecture</span>
              <h3 
                className="text-xl sm:text-2xl font-black text-[#0D0F12]"
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
              >
                The 4-Pillar BANT Lead Qualification System
              </h3>
            </div>
            <span className="text-xs font-mono text-gray-500 bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shrink-0 self-start sm:self-auto font-medium">
              Only Sales-Ready Leads Delivered
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bantCriteria.map((item) => (
              <div 
                key={item.letter}
                className="bg-white rounded-[22px] p-6 border border-gray-200/90 shadow-[0_4px_18px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center font-black text-lg shadow-sm`}>
                      {item.letter}
                    </div>
                    <span 
                      className="text-xs font-bold text-gray-400 uppercase tracking-wider"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {item.name}
                    </span>
                  </div>
                  <h4 
                    className="text-base font-bold text-[#0D0F12] mb-2"
                    style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.label}
                  </h4>
                  <p 
                    className="text-xs text-[#475569] leading-relaxed font-normal"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Automated Multi-Touch Follow-Up Cadence */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 lg:p-10 border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-gray-100">
            <div>
              <span className="text-xs font-mono font-bold text-[#1B4E2C] uppercase">Automated Follow-Up Sequences</span>
              <h3 
                className="text-xl sm:text-2xl font-black text-[#0D0F12]"
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
              >
                {heading15}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#1B4E2C] bg-[#1B4E2C]/10 px-3.5 py-1.5 rounded-full border border-[#1B4E2C]/20 shrink-0 self-start sm:self-auto">
              <Zap className="w-3.5 h-3.5 text-[#1B4E2C]" />
              <span>Multi-Channel Automation</span>
            </div>
          </div>

          {/* Interactive Cadence Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
            {cadenceSteps.map((step, idx) => (
              <button
                key={step.time}
                type="button"
                onClick={() => setActiveCadenceDay(idx)}
                className={`p-3.5 rounded-[16px] border-2 text-left transition-all cursor-pointer ${
                  activeCadenceDay === idx
                    ? "bg-[#1B4E2C] text-white border-[#1B4E2C] shadow-md"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <div className={`text-[11px] font-mono font-bold ${activeCadenceDay === idx ? "text-emerald-200" : "text-[#1B4E2C]"}`}>
                  {step.time}
                </div>
                <div className="text-xs font-bold truncate mt-0.5">{step.channel}</div>
              </button>
            ))}
          </div>

          {/* Active Cadence Step Details */}
          <div className="bg-gray-50 rounded-[20px] p-6 border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="text-xs font-mono text-gray-500 font-bold mb-1">
                Phase: {cadenceSteps[activeCadenceDay].time} • {cadenceSteps[activeCadenceDay].channel}
              </div>
              <h4 
                className="text-lg font-black text-[#0D0F12] mb-2"
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
              >
                {cadenceSteps[activeCadenceDay].headline}
              </h4>
              <p 
                className="text-[#475569] text-xs sm:text-sm leading-relaxed mb-3 font-normal"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {cadenceSteps[activeCadenceDay].action}
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-[#1B4E2C]">
                <CheckCircle2 className="w-4 h-4 text-[#41B349]" />
                <span>Conversion Impact: {cadenceSteps[activeCadenceDay].impact}</span>
              </div>
            </div>

            <div className="shrink-0 p-4 bg-white rounded-[16px] border border-gray-200 shadow-2xs text-center w-full md:w-56">
              <Database className="w-6 h-6 text-[#1B4E2C] mx-auto mb-1.5" />
              <div className="text-xs font-bold text-gray-900">Live CRM Delivery</div>
              <div className="text-[10px] text-gray-500 font-mono">HubSpot • Salesforce • Zoho</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
