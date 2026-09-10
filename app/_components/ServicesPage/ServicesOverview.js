"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuote } from "@/app/_context/QuoteContext";
import { Search, Sparkles, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

// Service Icons from components/Images/
import Web from "@/components/Images/servicesicon1.png";
import Software from "@/components/Images/servicesicon2.png";
import App from "@/components/Images/servicesicon3.png";
import Ecommerce from "@/components/Images/servicesicon4.png";
import Graphics from "@/components/Images/servicesicon5.png";
import Social from "@/components/Images/servicesicon6.png";
import Digital from "@/components/Images/servicesicon7.png";
import PPC from "@/components/Images/servicesicon8.png";
import Seo from "@/components/Images/servicesicon9.png";
import Content from "@/components/Images/servicesicon10.png";
import Call from "@/components/Images/servicesicon11.png";

// Comprehensive Services Data matching the exact aesthetic of the Technologies section
const servicesData = [
  {
    id: "web-dev",
    name: "Web Development",
    category: "Development",
    scriptTag: "Scalable Web Platforms",
    image: Web,
    href: "/services/web-development",
    desc: "Custom high-performance websites and web applications built with Next.js, React, and Laravel, engineered for speed, high conversion, and seamless user experience.",
    buttonText: "EXPLORE WEB DEV",
    badge: "FULL-STACK WEB",
  },
  {
    id: "software-dev",
    name: "Software Development",
    category: "Development",
    scriptTag: "Enterprise Custom Systems",
    image: Software,
    href: "/services/software-development",
    desc: "Bespoke business automation platforms, SaaS products, cloud microservices, and CRM/ERP integrations built for long-term reliability and commercial scale.",
    buttonText: "EXPLORE SOFTWARE",
    badge: "ENTERPRISE SAAS",
  },
  {
    id: "app-dev",
    name: "App Development",
    category: "Mobile & Apps",
    scriptTag: "iOS & Android Engineering",
    image: App,
    href: "/services/app-development",
    desc: "Native and cross-platform mobile apps engineered with Flutter, Swift, and React Native for fluid UX, offline capability, push notifications, and high security.",
    buttonText: "EXPLORE APP DEV",
    badge: "MOBILE APPS",
  },
  {
    id: "ecommerce-dev",
    name: "E-Commerce Development",
    category: "Ecommerce",
    scriptTag: "High-Converting Storefronts",
    image: Ecommerce,
    href: "/services/ecommerce-development",
    desc: "Turnkey Shopify Plus, Magento, and WooCommerce stores with multi-currency checkout, automated inventory sync, and frictionless buying flows.",
    buttonText: "EXPLORE ECOMMERCE",
    badge: "ONLINE COMMERCE",
  },
  {
    id: "graphic-design",
    name: "Graphics & UI/UX",
    category: "Design & UI/UX",
    scriptTag: "Visual Identity & Systems",
    image: Graphics,
    href: "/services/graphic-design",
    desc: "Human-centered UI/UX prototypes, modern design systems in Figma, corporate brand identities, and marketing graphics that captivate audiences.",
    buttonText: "EXPLORE DESIGN",
    badge: "CREATIVE & UI",
  },
  {
    id: "social-media",
    name: "Social Media Growth",
    category: "Marketing & SEO",
    scriptTag: "Audience Engagement",
    image: Social,
    href: "/services/social-media",
    desc: "Strategic content curation, viral short-form video campaigns, community management, and paid social acceleration across Meta, LinkedIn, and TikTok.",
    buttonText: "EXPLORE SOCIAL",
    badge: "BRAND ADVOCACY",
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    category: "Marketing & SEO",
    scriptTag: "Performance Growth",
    image: Digital,
    href: "/services/digital-marketing",
    desc: "Data-driven omnichannel marketing strategies connecting analytics, conversion funnel optimization, and multi-platform growth campaigns.",
    buttonText: "EXPLORE MARKETING",
    badge: "FULL FUNNEL",
  },
  {
    id: "ppc-amazon",
    name: "PPC & Amazon Ads",
    category: "Marketing & SEO",
    scriptTag: "High-ROI Paid Campaigns",
    image: PPC,
    href: "/services/ppc-amazon-ads",
    desc: "Laser-targeted Google Search & Display ads, Amazon Sponsored Products, and programmatic retargeting delivering maximum ROAS and buyer acquisition.",
    buttonText: "EXPLORE PPC ADS",
    badge: "PAID SEARCH",
  },
  {
    id: "seo",
    name: "Search Engine Optimization",
    category: "Marketing & SEO",
    scriptTag: "Organic Rank & Authority",
    image: Seo,
    href: "/services/search-engine-optimization",
    desc: "Technical SEO audits, high-intent keyword strategies, high-authority backlink architecture, and local Dubai/UAE Google Maps ranking to dominate search results.",
    buttonText: "EXPLORE SEO",
    badge: "ORGANIC REACH",
  },
  {
    id: "content-writing",
    name: "Content Writing",
    category: "Marketing & SEO",
    scriptTag: "Persuasive Copywriting",
    image: Content,
    href: "/services/content-writing",
    desc: "Authoritative long-form blog articles, commercial sales copy, technical documentation, and conversion landing page copy that drives action and trust.",
    buttonText: "EXPLORE CONTENT",
    badge: "EDITORIAL & COPY",
  },
  {
    id: "call-center",
    name: "Call Center & Support",
    category: "Cloud & Support",
    scriptTag: "24/7 Enterprise Care",
    image: Call,
    href: "/services/call-center",
    desc: "Dedicated 24/7 customer support desks, multilingual helpdesk outsourcing, and proactive technical infrastructure maintenance ensuring business continuity.",
    buttonText: "EXPLORE SUPPORT",
    badge: "24/7 RELIABILITY",
  },
];

const categories = [
  "All",
  "Development",
  "Mobile & Apps",
  "Ecommerce",
  "Design & UI/UX",
  "Marketing & SEO",
  "Cloud & Support",
];

const ServicesOverview = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedAll, setExpandedAll] = useState(false);
  const { openQuote } = useQuote();

  // Filter Services by Category and Search Query
  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesCategory =
        activeCategory === "All" || service.category === activeCategory;
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.scriptTag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Display initial 6 or all based on expanded state
  const displayedServices = useMemo(() => {
    if (activeCategory !== "All" || searchQuery.trim() !== "" || expandedAll) {
      return filteredServices;
    }
    return filteredServices.slice(0, 6);
  }, [filteredServices, activeCategory, searchQuery, expandedAll]);

  return (
    <section
      id="Services"
      className="relative w-full bg-[#FFFFFF] text-[#0D0F12] pt-10 sm:pt-14 md:pt-16 pb-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-12 select-none overflow-hidden"
    >
      {/* Import typography fonts & custom theme styles identical to Technologies section */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Pacifico&family=Plus+Jakarta+Sans:wght@700;800;900&display=swap');

        .retro-display-title {
          font-family: 'Outfit', 'Plus Jakarta Sans', sans-serif;
          letter-spacing: -0.03em;
        }

        .retro-script-font {
          font-family: 'Pacifico', 'Caveat', cursive;
        }

        .retro-shadow-pill {
          box-shadow: 0 4px 0 #0D0F12;
        }

        .retro-shadow-pill:hover {
          box-shadow: 0 6px 0 #0D0F12;
          transform: translateY(-2px);
        }

        .retro-shadow-pill:active {
          box-shadow: 0 1px 0 #0D0F12;
          transform: translateY(2px);
        }

        .retro-icon-box {
          box-shadow: 0 4px 0 #0D0F12;
        }

        .retro-icon-box:hover {
          box-shadow: 0 6px 0 #0D0F12;
          transform: translateY(-3px);
        }
      `}</style>

      {/* Subtle Warm Dot Texture using #0D0F12 */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#0D0F12 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#36963D]/10 border border-[#36963D]/30 text-[#36963D] font-mono text-xs uppercase tracking-widest font-bold mb-4 shadow-2xs"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#36963D] animate-pulse" />
            <span>FULL DIGITAL PORTFOLIO</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0D0F12] tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            Tailored Services For <br className="hidden sm:inline" />
            <span className="text-[#36963D]">Measurable Growth</span>
          </h2>

          <p
            className="text-[#475569] text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            From custom architectures to performance growth campaigns, discover our comprehensive range of commercial IT and digital marketing services.
          </p>
        </div>

        {/* Category Tabs & Filter Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-14 sm:mb-16">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setExpandedAll(true);
                  }}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#36963D] text-white border-2 border-[#0D0F12] retro-shadow-pill"
                      : "bg-[#FFFFFF] text-[#0D0F12] hover:bg-[#36963D]/10 border-2 border-[#0D0F12]/30"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Minimalist Search Box */}
          <div className="relative w-full sm:w-[280px]">
            <Search className="w-4 h-4 text-[#0D0F12]/60 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 11+ services..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setExpandedAll(true);
              }}
              className="w-full pl-11 pr-4 py-2 bg-[#FFFFFF] rounded-full border-2 border-[#0D0F12] text-xs sm:text-sm text-[#0D0F12] placeholder-[#0D0F12]/50 focus:outline-none focus:border-[#36963D] transition-all shadow-xs"
            />
          </div>
        </div>

        {/* 3-Column Services Grid (Matching Technologies section layout) */}
        {displayedServices.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFFFF] rounded-3xl border-2 border-[#0D0F12] p-8">
            <p className="text-[#0D0F12] text-base font-medium mb-4">
              No services found matching &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-full bg-[#36963D] text-white text-xs font-bold border-2 border-[#0D0F12] retro-shadow-pill cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-14 lg:gap-16 items-stretch">
            {displayedServices.map((service) => {
              return (
                <div
                  key={service.id}
                  className="flex flex-col items-center text-center justify-between group transition-all duration-300"
                >
                  <div className="w-full flex flex-col items-center">
                    
                    {/* 1. Retro-Chic Icon Box in Theme Colors */}
                    <div className="w-full h-[150px] sm:h-[165px] flex items-center justify-center mb-6 relative">
                      <div className="retro-icon-box w-[130px] h-[130px] sm:w-[140px] sm:h-[140px] rounded-[28px] bg-[#FFFFFF] border-3 border-[#0D0F12] flex items-center justify-center p-6 relative transition-all duration-300 group-hover:scale-105">
                        {/* Soft Brand Green Shading Accent in Corner */}
                        <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#36963D]/15 pointer-events-none -z-0" />

                        {/* Service Icon Image */}
                        <div className="w-16 h-16 sm:w-18 sm:h-18 relative z-10 flex items-center justify-center">
                          <Image
                            src={service.image}
                            alt={service.name}
                            width={72}
                            height={72}
                            className="object-contain filter drop-shadow-xs group-hover:rotate-3 transition-transform duration-300"
                          />
                        </div>

                        {/* Subtle Retro Pin Accent in Dark #0D0F12 */}
                        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 rounded-full bg-[#0D0F12]" />
                      </div>
                    </div>

                    {/* 2. Cursive Retro Script Category Tag in Brand Green #36963D */}
                    <div className="retro-script-font text-2xl sm:text-3xl text-[#36963D] font-normal tracking-wide mb-1 leading-snug">
                      {service.scriptTag}
                    </div>

                    {/* 3. Bold Service Name in Dark #0D0F12 */}
                    <h3
                      className="text-2xl sm:text-[28px] font-black text-[#0D0F12] group-hover:text-[#36963D] transition-colors duration-200 tracking-tight mb-3"
                      style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                    >
                      {service.name}
                    </h3>

                    {/* 4. Engaging Description Copy in Dark #0D0F12/75 */}
                    <p className="text-sm sm:text-[14.5px] text-[#0D0F12]/75 leading-relaxed max-w-[310px] mx-auto mb-6 font-normal">
                      {service.desc}
                    </p>
                  </div>

                  {/* 5. Chunky Brand Green Pill Button (#36963D) */}
                  <div className="pt-2 w-full flex flex-col items-center">
                    {service.href ? (
                      <Link href={service.href} className="w-full sm:w-auto">
                        <button
                          className="retro-shadow-pill w-full sm:w-auto min-w-[200px] bg-[#36963D] hover:bg-[#2e8234] text-white font-black text-xs sm:text-[13px] uppercase tracking-wider py-3.5 px-7 rounded-full border-2 border-[#0D0F12] transition-all duration-200 cursor-pointer active:scale-95"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {service.buttonText}
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={openQuote}
                        className="retro-shadow-pill w-full sm:w-auto min-w-[200px] bg-[#36963D] hover:bg-[#2e8234] text-white font-black text-xs sm:text-[13px] uppercase tracking-wider py-3.5 px-7 rounded-full border-2 border-[#0D0F12] transition-all duration-200 cursor-pointer active:scale-95"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {service.buttonText}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Show More / Show Less Toggle (When Viewing All Items) */}
        {activeCategory === "All" && searchQuery.trim() === "" && (
          <div className="flex justify-center mt-16 sm:mt-20">
            <button
              onClick={() => setExpandedAll(!expandedAll)}
              className="retro-shadow-pill inline-flex items-center gap-3 bg-[#0D0F12] hover:bg-[#36963D] text-white font-black text-sm uppercase tracking-wider px-8 py-4 rounded-full border-2 border-[#0D0F12] transition-all duration-200 cursor-pointer"
            >
              <span>
                {expandedAll
                  ? "Show Less Services"
                  : `Explore All ${servicesData.length} Core Services`}
              </span>
              {expandedAll ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default ServicesOverview;
