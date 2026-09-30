"use client";

import React from "react";
import { useQuote } from "@/app/_context/QuoteContext";
import {
  Globe,
  Layers,
  ShoppingCart,
  Cpu,
  Smartphone,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const servicesData = [
  {
    icon: Cpu,
    title: "Custom Web Applications & SaaS",
    desc: "We engineer scalable, high-throughput cloud web applications, bespoke client portals, and multi-tenant SaaS platforms. Built with modern micro-frontend architectures, automated workflows, and robust business logic tailored for commercial growth.",
    tags: ["React & Next.js", "Cloud SaaS", "Real-Time APIs"],
  },
  {
    icon: Globe,
    title: "Enterprise & Corporate Websites",
    desc: "High-authority, multilingual corporate web portals designed to establish industry dominance, elevate executive brand presence, and engage global stakeholders. Engineered for uncompromising enterprise security, compliance, and effortless CMS governance.",
    tags: ["Brand Authority", "Multi-Language", "Enterprise Security"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce & Digital Commerce Platforms",
    desc: "Bespoke digital storefronts and B2B/B2C trade portals built for high conversion. We deliver frictionless checkout pipelines, secure multi-currency payment gateways, automated inventory synchronization, and omnichannel customer experiences.",
    tags: ["Headless Commerce", "Payment Gateways", "Conversion Focused"],
  },
  {
    icon: Layers,
    title: "Full-Stack & API-Driven Architecture",
    desc: "Decoupled web platforms powered by resilient RESTful and GraphQL APIs, headless content management systems, and microservices. We ensure seamless interoperability between your website, ERPs, CRMs, and third-party enterprise tools.",
    tags: ["Headless CMS", "GraphQL & REST", "ERP/CRM Integration"],
  },
  {
    icon: Smartphone,
    title: "Progressive Web Apps (PWA) & Responsive Web",
    desc: "Mobile-first, cross-device web experiences that deliver app-like performance directly in the browser. Featuring instant load speeds, offline access capabilities, push notifications, and fluid responsive layouts optimized for all screen sizes.",
    tags: ["PWA Capabilities", "Mobile-First UX", "Offline Storage"],
  },
  {
    icon: ShieldCheck,
    title: "Web Modernization, Speed & 24/7 Support",
    desc: "Transform legacy web systems into modern, lightning-fast digital assets. We provide Core Web Vitals optimization, cloud refactoring, automated security audits, zero-downtime deployments, and dedicated round-the-clock technical support.",
    tags: ["Core Web Vitals", "Security Audits", "24/7 SLA Support"],
  },
];

const WebServices = () => {
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
            <span>FULL-CYCLE WEB ENGINEERING</span>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#0D0F12] tracking-tight leading-tight"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            Our Web Development <span className="text-[#41B349]">Services</span>
          </h2>

          <p
            className="text-sm sm:text-base text-[#475569] mt-3 font-normal leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            From high-performance custom web applications to scalable corporate platforms, we build secure, conversion-driven digital systems tailored for enterprises in Dubai and globally.
          </p>
        </div>

        {/* 6-Card Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
          {servicesData.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <div
                key={idx}
                onClick={openQuote}
                className="group relative rounded-[28px] pt-9 pb-10 px-6 sm:px-8 flex flex-col items-center text-center h-full min-h-[350px] bg-white border-t-[3.5px] border-t-[#41B349] border-x-0 border-b-0 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(65,179,73,0.22)] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer overflow-hidden [isolation:isolate]"
              >
                {/* Bottom-to-Top Hover Fill Overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-[#2E8B35] to-[#41B349] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none z-0" 
                />

                {/* Card Content */}
                <div className="relative z-10 flex flex-col items-center w-full h-full">
                  {/* Centered Circular Icon Badge */}
                  <div className="w-[74px] h-[74px] sm:w-[80px] sm:h-[80px] rounded-full bg-[#41B349] text-white group-hover:bg-white group-hover:text-[#41B349] flex items-center justify-center mb-6 sm:mb-7 shadow-[0_8px_20px_rgba(65,179,73,0.28)] group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-all duration-500 ease-out">
                    {IconComponent ? (
                      <IconComponent className="w-8 h-8 sm:w-9 sm:h-9 transition-colors duration-500" />
                    ) : null}
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bold text-[19px] sm:text-[21px] mb-3.5 leading-snug text-[#0D0F12] group-hover:text-white transition-colors duration-400"
                    style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p 
                    className="text-[14px] sm:text-[14.5px] leading-[1.7] font-normal text-[#475569] group-hover:text-white/95 transition-colors duration-400"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {service.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WebServices;
