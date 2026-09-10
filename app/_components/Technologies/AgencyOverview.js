"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuote } from "@/app/_context/QuoteContext";
import { Search, Sparkles, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

// Icons from Simple Icons & FontAwesome for Next.js, Node.js, TypeScript, Java
import { SiNextdotjs, SiNodedotjs, SiTypescript } from "react-icons/si";
import { FaJava } from "react-icons/fa6";

// Asset Images from components/Images/
import Reactjs from "@/components/Images/react2.png";
import JavaScript from "@/components/Images/JavaScript.png";
import PHP from "@/components/Images/php-1-1.png";
import Laravel from "@/components/Images/Laravel.png";
import Python from "@/components/Images/py2.png";
import Swift from "@/components/Images/swift2.png";
import Wp from "@/components/Images/wpicon2.png";
import Shopfiy from "@/components/Images/shopifyicon2.png";
import Magento from "@/components/Images/magentoicon2.png";
import Flutter from "@/components/Images/Fluttericon-2.png";
import Figma from "@/components/Images/Figmaicon2.png";
import Meta from "@/components/Images/Metaicon2.png";
import GoogleAds from "@/components/Images/Google-Adsicon2.png";
import Net from "@/components/Images/net.png";
import Angular from "@/components/Images/Angularicon2.png";
import CPlus from "@/components/Images/c2.png";
import Go from "@/components/Images/go2.png";

// Comprehensive Technologies Data matching the user's exact requested 21 technologies
const technologiesData = [
  {
    id: "react",
    name: "React.js",
    category: "Frontend & Web",
    scriptTag: "Component Architecture",
    image: Reactjs,
    href: "/technologies/react",
    desc: "Single-page applications and reactive interfaces optimized for high-throughput speed, virtual DOM efficiency, and reusable modular components.",
    buttonText: "EXPLORE REACT",
    badge: "UI LIBRARY",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend & Web",
    scriptTag: "Full-Stack React",
    customIcon: SiNextdotjs,
    href: "/technologies/react",
    desc: "Production-grade server-side rendering, edge caching, automated routing, and zero-latency static site generation for top Core Web Vitals.",
    buttonText: "EXPLORE NEXT.JS",
    badge: "HYBRID FRAMEWORK",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend & Cloud",
    scriptTag: "Event-Driven Runtime",
    customIcon: SiNodedotjs,
    href: "/technologies/javascript",
    desc: "Asynchronous, event-driven JavaScript engine engineered for high-concurrency microservices, streaming pipelines, and real-time WebSocket APIs.",
    buttonText: "SCALE WITH NODE",
    badge: "BACKEND RUNTIME",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Frontend & Web",
    scriptTag: "Universal Web Core",
    image: JavaScript,
    href: "/technologies/javascript",
    desc: "Modern ES6+ powering dynamic client-side interactions, asynchronous API integrations, and universal cross-platform versatility.",
    buttonText: "EXPLORE JS",
    badge: "CORE LANGUAGE",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend & Web",
    scriptTag: "Strict Type Safety",
    customIcon: SiTypescript,
    href: "/technologies/javascript",
    desc: "Statically typed JavaScript preventing runtime exceptions, accelerating refactoring velocity, and enforcing robust enterprise API contracts.",
    buttonText: "LEARN TYPESCRIPT",
    badge: "TYPED JAVASCRIPT",
  },
  {
    id: "python",
    name: "Python",
    category: "Backend & Cloud",
    scriptTag: "AI & Backend Engine",
    image: Python,
    href: "/technologies/python",
    desc: "High-performance APIs with FastAPI and Django, automated data processing pipelines, and enterprise artificial intelligence integrations.",
    buttonText: "EXPLORE PYTHON",
    badge: "AI & GENERAL PURPOSE",
  },
  {
    id: "php",
    name: "PHP",
    category: "Backend & Cloud",
    scriptTag: "Server-Side Foundation",
    image: PHP,
    href: "/technologies/php",
    desc: "Modern PHP 8+ with JIT compilation delivering robust backend microservices, high-traffic portals, and custom enterprise modules.",
    buttonText: "EXPLORE PHP",
    badge: "SERVER SCRIPTING",
  },
  {
    id: "laravel",
    name: "Laravel",
    category: "Backend & Cloud",
    scriptTag: "Clean MVC Framework",
    image: Laravel,
    href: "/technologies/laravel",
    desc: "Enterprise PHP framework featuring Eloquent ORM, automated queued jobs, RESTful API architecture, and rapid agile delivery.",
    buttonText: "EXPLORE LARAVEL",
    badge: "PHP FRAMEWORK",
  },
  {
    id: "wordpress",
    name: "WordPress",
    category: "CMS & Commerce",
    scriptTag: "Headless & Custom CMS",
    image: Wp,
    href: "/technologies/wordpress",
    desc: "Bespoke corporate themes, headless REST/GraphQL architectures, and intuitive editorial controls powering scalable digital publications.",
    buttonText: "EXPLORE WORDPRESS",
    badge: "CMS LEADER",
  },
  {
    id: "shopify",
    name: "Shopify",
    category: "CMS & Commerce",
    scriptTag: "High-Converting Commerce",
    image: Shopfiy,
    href: "/technologies/shopify",
    desc: "Custom Liquid storefronts, headless Shopify Plus architectures, multi-currency checkout, and deep ERP inventory synchronizations.",
    buttonText: "EXPLORE SHOPIFY",
    badge: "E-COMMERCE",
  },
  {
    id: "magento",
    name: "Magento",
    category: "CMS & Commerce",
    scriptTag: "Enterprise Omnichannel",
    image: Magento,
    href: "/technologies/magento",
    desc: "Heavyweight Adobe Commerce platform built for complex B2B and B2C catalogs, multi-tier pricing, and high-volume transactions.",
    buttonText: "EXPLORE MAGENTO",
    badge: "ADOBE COMMERCE",
  },
  {
    id: "dotnet",
    name: ".NET",
    category: "Backend & Cloud",
    scriptTag: "Microsoft Enterprise Suite",
    image: Net,
    href: "/technologies/dotnet",
    desc: "High-performance cross-platform C# microservices, Azure cloud deployments, high-security banking backends, and enterprise systems.",
    buttonText: "EXPLORE .NET",
    badge: "ENTERPRISE CORE",
  },
  {
    id: "angular",
    name: "Angular",
    category: "Frontend & Web",
    scriptTag: "Enterprise TypeScript",
    image: Angular,
    href: "/technologies/angular",
    desc: "Strictly typed Google MVC framework with built-in dependency injection, tailored for mission-critical enterprise web applications.",
    buttonText: "EXPLORE ANGULAR",
    badge: "ENTERPRISE SPA",
  },
  {
    id: "flutter",
    name: "Flutter",
    category: "Mobile Apps",
    scriptTag: "Cross-Platform Native",
    image: Flutter,
    href: "/technologies/flutter",
    desc: "Single codebase compiling to native ARM machine code for iOS and Android, delivering silky 60-120 FPS performance and pixel perfection.",
    buttonText: "EXPLORE FLUTTER",
    badge: "MOBILE ENGINE",
  },
  {
    id: "swift",
    name: "Swift",
    category: "Mobile Apps",
    scriptTag: "Apple Native Mastery",
    image: Swift,
    href: "/technologies/swift",
    desc: "Native iOS, iPadOS, macOS, and watchOS apps engineered with SwiftUI, Combine, and direct hardware API acceleration.",
    buttonText: "EXPLORE SWIFT",
    badge: "APPLE NATIVE",
  },
  {
    id: "java",
    name: "Java",
    category: "Backend & Cloud",
    scriptTag: "Mission-Critical Scale",
    customIcon: FaJava,
    href: "/technologies/software-development",
    desc: "High-concurrency Spring Boot microservices, distributed transaction processing, and enterprise banking architectures.",
    buttonText: "EXPLORE JAVA",
    badge: "ENTERPRISE BACKEND",
  },
  {
    id: "cplus",
    name: "C++",
    category: "Backend & Cloud",
    scriptTag: "Extreme Hardware Speed",
    image: CPlus,
    href: "/technologies/c-plus-plus",
    desc: "Near-metal compiled systems programming for compute-heavy numerical logic, financial algorithms, and zero-latency pipelines.",
    buttonText: "EXPLORE C++",
    badge: "SYSTEMS CODE",
  },
  {
    id: "go",
    name: "Go",
    category: "Backend & Cloud",
    scriptTag: "Sub-Millisecond Concurrency",
    image: Go,
    href: "/technologies/go",
    desc: "Compiled Google systems language utilizing lightweight goroutines for high-throughput cloud microservices and network gateways.",
    buttonText: "EXPLORE GO",
    badge: "SYSTEMS & CLOUD",
  },
  {
    id: "figma",
    name: "Figma",
    category: "Design & MarTech",
    scriptTag: "Design Systems & Tokens",
    image: Figma,
    href: "/technologies/figma",
    desc: "Collaborative design tokens, interactive component libraries, user journeys, and pixel-perfect developer handoff specifications.",
    buttonText: "EXPLORE FIGMA",
    badge: "UI/UX DESIGN",
  },
  {
    id: "googleads",
    name: "Google Ads",
    category: "Design & MarTech",
    scriptTag: "Performance Media",
    image: GoogleAds,
    href: "/technologies/google-ads",
    desc: "High-intent search, display, and YouTube video ad infrastructure with advanced conversion tag architecture and smart automated bidding.",
    buttonText: "EXPLORE GOOGLE ADS",
    badge: "PERFORMANCE ADS",
  },
  {
    id: "meta",
    name: "Meta",
    category: "Design & MarTech",
    scriptTag: "Social Growth & CAPI",
    image: Meta,
    href: "/technologies/meta",
    desc: "Server-side Conversions API (CAPI) implementation, precision pixel retargeting, and scalable paid social acquisition strategies.",
    buttonText: "EXPLORE META",
    badge: "SOCIAL MARTECH",
  },
];

const categories = [
  "All",
  "Frontend & Web",
  "Backend & Cloud",
  "Mobile Apps",
  "CMS & Commerce",
  "Design & MarTech",
];

export default function AgencyOverview() {
  const { openQuote } = useQuote();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedAll, setExpandedAll] = useState(false);

  // Filtered technology items
  const filteredTech = useMemo(() => {
    return technologiesData.filter((tech) => {
      const matchesCategory =
        activeCategory === "All" || tech.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        tech.name.toLowerCase().includes(query) ||
        tech.desc.toLowerCase().includes(query) ||
        tech.category.toLowerCase().includes(query) ||
        tech.scriptTag.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Display initial 9 when "All" is active, or all matching when filtered/expanded
  const displayedTech = useMemo(() => {
    if (activeCategory !== "All" || searchQuery.trim() !== "" || expandedAll) {
      return filteredTech;
    }
    return filteredTech.slice(0, 9);
  }, [filteredTech, activeCategory, searchQuery, expandedAll]);

  return (
    <section
      id="Technologies"
      className="relative w-full bg-[#FFFFFF] text-[#0D0F12] pt-10 sm:pt-14 md:pt-16 pb-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-12 select-none overflow-hidden"
    >
      {/* Import typography fonts & custom theme styles */}
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

      {/* Subtle Warm Grid Texture using #0D0F12 */}
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
              placeholder="Search 21 technologies..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setExpandedAll(true);
              }}
              className="w-full pl-11 pr-4 py-2 bg-[#FFFFFF] rounded-full border-2 border-[#0D0F12] text-xs sm:text-sm text-[#0D0F12] placeholder-[#0D0F12]/50 focus:outline-none focus:border-[#36963D] transition-all shadow-xs"
            />
          </div>
        </div>

        {/* 3-Column Technology Grid (Following the Reference Screenshot Layout) */}
        {displayedTech.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFFFF] rounded-3xl border-2 border-[#0D0F12] p-8">
            <p className="text-[#0D0F12] text-base font-medium mb-4">
              No technologies found matching &quot;{searchQuery}&quot;.
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
            {displayedTech.map((tech) => {
              const CustomIcon = tech.customIcon;

              return (
                <div
                  key={tech.id}
                  className="flex flex-col items-center text-center justify-between group transition-all duration-300"
                >
                  <div className="w-full flex flex-col items-center">
                    
                    {/* 1. Retro-Chic Icon Box in Theme Colors */}
                    <div className="w-full h-[150px] sm:h-[165px] flex items-center justify-center mb-6 relative">
                      <div className="retro-icon-box w-[130px] h-[130px] sm:w-[140px] sm:h-[140px] rounded-[28px] bg-[#FFFFFF] border-3 border-[#0D0F12] flex items-center justify-center p-6 relative transition-all duration-300 group-hover:scale-105">
                        {/* Soft Brand Green Shading Accent in Corner */}
                        <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#36963D]/15 pointer-events-none -z-0" />

                        {/* Tech Logo / Icon */}
                        {tech.image ? (
                          <div className="w-16 h-16 sm:w-18 sm:h-18 relative z-10">
                            <Image
                              src={tech.image}
                              alt={tech.name}
                              fill
                              className="object-contain filter drop-shadow-xs group-hover:rotate-3 transition-transform duration-300"
                            />
                          </div>
                        ) : CustomIcon ? (
                          <CustomIcon className="w-16 h-16 sm:w-18 sm:h-18 text-[#0D0F12] group-hover:text-[#36963D] transition-colors duration-300 z-10" />
                        ) : (
                          <Sparkles className="w-12 h-12 text-[#36963D]" />
                        )}

                        {/* Subtle Retro Pin Accent in Dark #0D0F12 */}
                        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 rounded-full bg-[#0D0F12]" />
                      </div>
                    </div>

                    {/* 2. Cursive Retro Script Category Tag in Brand Green #36963D */}
                    <div className="retro-script-font text-2xl sm:text-3xl text-[#36963D] font-normal tracking-wide mb-1 leading-snug">
                      {tech.scriptTag}
                    </div>

                    {/* 3. Bold Technology Name in Dark #0D0F12 */}
                    <h3
                      className="text-2xl sm:text-[28px] font-black text-[#0D0F12] group-hover:text-[#36963D] transition-colors duration-200 tracking-tight mb-3"
                      style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                    >
                      {tech.name}
                    </h3>

                    {/* 4. Engaging Description Copy in Dark #0D0F12/75 */}
                    <p className="text-sm sm:text-[14.5px] text-[#0D0F12]/75 leading-relaxed max-w-[310px] mx-auto mb-6 font-normal">
                      {tech.desc}
                    </p>
                  </div>

                  {/* 5. Chunky Brand Green Pill Button (#36963D) */}
                  <div className="pt-2 w-full flex flex-col items-center">
                    {tech.href ? (
                      <Link href={tech.href} className="w-full sm:w-auto">
                        <button
                          className="retro-shadow-pill w-full sm:w-auto min-w-[200px] bg-[#36963D] hover:bg-[#2e8234] text-white font-black text-xs sm:text-[13px] uppercase tracking-wider py-3.5 px-7 rounded-full border-2 border-[#0D0F12] transition-all duration-200 cursor-pointer active:scale-95"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {tech.buttonText}
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={openQuote}
                        className="retro-shadow-pill w-full sm:w-auto min-w-[200px] bg-[#36963D] hover:bg-[#2e8234] text-white font-black text-xs sm:text-[13px] uppercase tracking-wider py-3.5 px-7 rounded-full border-2 border-[#0D0F12] transition-all duration-200 cursor-pointer active:scale-95"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {tech.buttonText}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Show More / Show Less Toggle (When Viewing All 21 Items) */}
        {activeCategory === "All" && searchQuery.trim() === "" && (
          <div className="flex justify-center mt-16 sm:mt-20">
            <button
              onClick={() => setExpandedAll(!expandedAll)}
              className="retro-shadow-pill inline-flex items-center gap-3 bg-[#0D0F12] hover:bg-[#36963D] text-white font-black text-sm uppercase tracking-wider px-8 py-4 rounded-full border-2 border-[#0D0F12] transition-all duration-200 cursor-pointer"
            >
              <span>
                {expandedAll ? "Show Less Technologies" : `Explore All ${technologiesData.length} Technologies`}
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
}
