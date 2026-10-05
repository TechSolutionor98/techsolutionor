"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuote } from "@/app/_context/QuoteContext";
import { getCmsVal } from "@/lib/api-helper";
import {
  SectionBadge,
  SectionHeading,
  HighlightWord,
  SectionParagraph,
  CardHeading,
  CardParagraph,
  ButtonText,
} from "@/components/Typography";

// 5-Star Arched Crown Component matching the Lead Generation section styling
function StarArc({ color = "#41B349" }) {
  return (
    <div className="flex justify-center items-end h-6 -mb-1 select-none pointer-events-none">
      <svg viewBox="0 0 100 32" className="w-16 sm:w-20 h-6 overflow-visible">
        {/* Star 1 */}
        <polygon
          points="0,-4 1.2,-1.2 4.2,-1.2 1.8,0.7 2.7,3.6 0,1.8 -2.7,3.6 -1.8,0.7 -4.2,-1.2 -1.2,-1.2"
          transform="translate(16, 22) scale(1.15)"
          fill={color}
        />
        {/* Star 2 */}
        <polygon
          points="0,-4 1.2,-1.2 4.2,-1.2 1.8,0.7 2.7,3.6 0,1.8 -2.7,3.6 -1.8,0.7 -4.2,-1.2 -1.2,-1.2"
          transform="translate(33, 13) scale(1.15)"
          fill={color}
        />
        {/* Star 3 (Apex) */}
        <polygon
          points="0,-4 1.2,-1.2 4.2,-1.2 1.8,0.7 2.7,3.6 0,1.8 -2.7,3.6 -1.8,0.7 -4.2,-1.2 -1.2,-1.2"
          transform="translate(50, 8) scale(1.25)"
          fill={color}
        />
        {/* Star 4 */}
        <polygon
          points="0,-4 1.2,-1.2 4.2,-1.2 1.8,0.7 2.7,3.6 0,1.8 -2.7,3.6 -1.8,0.7 -4.2,-1.2 -1.2,-1.2"
          transform="translate(67, 13) scale(1.15)"
          fill={color}
        />
        {/* Star 5 */}
        <polygon
          points="0,-4 1.2,-1.2 4.2,-1.2 1.8,0.7 2.7,3.6 0,1.8 -2.7,3.6 -1.8,0.7 -4.2,-1.2 -1.2,-1.2"
          transform="translate(84, 22) scale(1.15)"
          fill={color}
        />
      </svg>
    </div>
  );
}

// 6 Real-World, Industry-Standard Web Development Process Steps
const webDevelopmentSteps = [
  {
    id: "step-1",
    stepNumber: "01",
    phaseTag: "PHASE 01 // SCOPING & BLUEPRINT",
    duration: "1–2 WEEKS",
    tabLabel: "Discovery",
    headline: (
      <>
        Work with senior web<br />
        architects you can trust
      </>
    ),
    description:
      "We begin with deep technical discovery to align with your business goals, target audience, and operational workflows. We assess system integrations, map the information architecture, define database schemas, and formulate a clear sprint roadmap.",
    features: [
      {
        title: "Requirements Engineering (SRS)",
        desc: "Stakeholder discovery workshops to map business logic and user stories.",
      },
      {
        title: "System Architecture Blueprint",
        desc: "Database schema, micro-frontend structure, and cloud infrastructure mapping.",
      },
      {
        title: "Technology Stack Selection",
        desc: "Evaluating and locking modern frameworks (Next.js, React, Node.js, Laravel, PostgreSQL).",
      },
      {
        title: "Milestone Delivery Roadmap",
        desc: "Bi-weekly sprint timeline with transparent deliverables and review gates.",
      },
    ],
    ctaText: "Plan Your Technical Blueprint",
  },
  {
    id: "step-2",
    stepNumber: "02",
    phaseTag: "PHASE 02 // UX/UI PROTOTYPING",
    duration: "2–3 WEEKS",
    tabLabel: "UI/UX Design",
    headline: (
      <>
        Craft intuitive web<br />
        experiences built to convert
      </>
    ),
    description:
      "Our UI/UX team transforms wireframes into intuitive, conversion-focused digital experiences. We create a scalable design system with consistent typography, components, and color hierarchy, validating interactive prototypes before any code is written.",
    features: [
      {
        title: "Information Architecture & Wireframes",
        desc: "Low-fidelity structural blueprints and intuitive conversion paths.",
      },
      {
        title: "Responsive UI Component Library",
        desc: "Scalable design system with typography, colors, and reusable tokens.",
      },
      {
        title: "Clickable Figma Prototype",
        desc: "High-fidelity interactive prototype for stakeholder review prior to coding.",
      },
      {
        title: "Accessibility Compliance (WCAG 2.1)",
        desc: "Accessible color contrast, keyboard navigation, and responsive layouts.",
      },
    ],
    ctaText: "Explore UI/UX Design System",
  },
  {
    id: "step-3",
    stepNumber: "03",
    phaseTag: "PHASE 03 // AGILE ENGINEERING",
    duration: "4–8 WEEKS",
    tabLabel: "Engineering",
    headline: (
      <>
        Engineer clean, scalable<br />
        full-stack web architecture
      </>
    ),
    description:
      "We build your web application in iterative 2-week agile sprints. Frontend engineers develop responsive, accessible interfaces, while backend engineers build resilient RESTful/GraphQL APIs, microservices, and database pipelines using clean, maintainable code.",
    features: [
      {
        title: "Component-Driven Frontend",
        desc: "Clean modular engineering with Next.js/React, TypeScript, and semantic HTML.",
      },
      {
        title: "Secure RESTful & GraphQL APIs",
        desc: "Robust microservices, authentication pipelines, and CRM/ERP integrations.",
      },
      {
        title: "Headless CMS Architecture",
        desc: "Flexible content management for effortless publishing and CMS governance.",
      },
      {
        title: "Bi-Weekly Staging Deployments",
        desc: "Live demonstration environments to review progress at the end of every sprint.",
      },
    ],
    ctaText: "Review Agile Sprint Process",
  },
  {
    id: "step-4",
    stepNumber: "04",
    phaseTag: "PHASE 04 // QA & OPTIMIZATION",
    duration: "1–2 WEEKS",
    tabLabel: "QA & Testing",
    headline: (
      <>
        Deliver rock-solid stability<br />
        and sub-second speed
      </>
    ),
    description:
      "Before production, our QA engineers execute exhaustive automated and manual testing suites. We audit cross-browser compatibility, resolve edge-case bugs, perform security penetration assessments, and optimize Core Web Vitals for blazing page load speeds.",
    features: [
      {
        title: "Cross-Browser & Device Testing",
        desc: "Pixel-perfect fidelity across Chrome, Safari, Firefox, iOS, and Android.",
      },
      {
        title: "Core Web Vitals Optimization",
        desc: "Sub-second load times engineered to score 90+ on Google PageSpeed Insights.",
      },
      {
        title: "OWASP Security Audits",
        desc: "Data encryption, vulnerability testing, CSRF/XSS protection, and secure headers.",
      },
      {
        title: "Technical SEO & Schema",
        desc: "Canonical URLs, Open Graph tags, XML sitemap generation, and clean semantic markup.",
      },
    ],
    ctaText: "Audit Quality & Performance Standards",
  },
  {
    id: "step-5",
    stepNumber: "05",
    phaseTag: "PHASE 05 // DEPLOYMENT & GO-LIVE",
    duration: "1 WEEK",
    tabLabel: "Deployment",
    headline: (
      <>
        Execute seamless, zero-downtime<br />
        production cutovers
      </>
    ),
    description:
      "We orchestrate a seamless production rollout utilizing automated CI/CD deployment pipelines. We configure enterprise cloud infrastructure, SSL encryption, global CDN edge caching, and domain DNS routing with real-time error logging.",
    features: [
      {
        title: "Automated CI/CD Pipelines",
        desc: "Automated builds, unit testing, and deployment to AWS, Vercel, or cloud servers.",
      },
      {
        title: "SSL & Global CDN Edge Caching",
        desc: "Cloudflare enterprise security, DDoS mitigation, and global edge caching.",
      },
      {
        title: "Domain DNS & Search Console",
        desc: "DNS cutover, Google Search Console verification, and search index submission.",
      },
      {
        title: "Zero-Downtime Production Cutover",
        desc: "Flawless transition without interrupting existing user sessions or traffic.",
      },
    ],
    ctaText: "Explore Deployment & Cloud Infrastructure",
  },
  {
    id: "step-6",
    stepNumber: "06",
    phaseTag: "PHASE 06 // SLA & CONTINUOUS SCALE",
    duration: "ONGOING",
    tabLabel: "24/7 Support",
    headline: (
      <>
        Protect your investment with<br />
        round-the-clock maintenance
      </>
    ),
    description:
      "Our partnership extends far beyond launch. We provide 24/7 server health monitoring, scheduled security patches, performance benchmarks, and proactive maintenance. We analyze real user analytics to iteratively enhance conversion rates and scale capacity.",
    features: [
      {
        title: "24/7 SLA Technical Support",
        desc: "Round-the-clock uptime monitoring, instant incident response, and bug fixes.",
      },
      {
        title: "Routine Security & Dependency Patches",
        desc: "Proactive package upgrades, security audits, and daily automated cloud backups.",
      },
      {
        title: "Performance Benchmarking",
        desc: "Continuous Core Web Vitals tracking and server database query optimization.",
      },
      {
        title: "Conversion Rate Optimization (CRO)",
        desc: "User session analytics, heatmap tracking, and iterative UI refinements.",
      },
    ],
    ctaText: "View SLA & Maintenance Plans",
  },
];

export default function WebProcess({ cmsContent }) {
  const { openQuote } = useQuote();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const defaultBadge = "AGILE METHODOLOGY • END-TO-END DELIVERY";
  const defaultTitle = "Our Web Development";
  const defaultHighlight = "Process";

  const badge = getCmsVal(cmsContent, defaultBadge, "webprocess");
  const title = getCmsVal(cmsContent, defaultTitle, "webprocess");
  const highlight = getCmsVal(cmsContent, defaultHighlight, "webprocess");

  const currentStep = webDevelopmentSteps[activeStepIndex] || webDevelopmentSteps[0];

  return (
    <section
      id="web-development-process"
      className="w-full py-16 sm:py-20 md:py-28 bg-white relative overflow-hidden border-b border-gray-100 select-none"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Pill Badge & Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="mb-3">
            <SectionBadge variant="light">
              {badge}
            </SectionBadge>
          </div>

          <SectionHeading
            as="h2"
            size="section"
            theme="dark"
            className="text-center"
          >
            {title} <HighlightWord>{highlight}</HighlightWord>
          </SectionHeading>
        </div>

        {/* 2-Column Exact Layout Matching the Lead Generation Market Scope Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: 3-Column Staggered Mosaic Grid with 6 Process Step Boxes     */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 items-end max-w-[540px] mx-auto lg:mx-0">
              
              {/* COLUMN 1: Step 01 & Step 04 */}
              <div className="flex flex-col">
                {/* 5-Star Arc Header */}
                <StarArc color="#41B349" />
                
                {/* Specialist Avatar */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-md mx-auto -mb-3 relative z-10 overflow-hidden bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=140&auto=format&fit=crop&q=80"
                    alt="Web Solutions Architect"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Stack of Process Boxes in Column 1 */}
                <div className="space-y-2.5 sm:space-y-3.5">
                  
                  {/* BOX 1: Step 01 - Discovery & Blueprint */}
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex(0)}
                    className={`w-full aspect-square rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs transition-all duration-300 cursor-pointer relative group text-[#1A1A1A] ${
                      activeStepIndex === 0
                        ? "bg-[#EAE4F5] ring-3 ring-[#41B349] ring-offset-2 scale-105 shadow-md"
                        : "bg-[#EAE4F5] hover:scale-102 hover:shadow-sm"
                    }`}
                  >
                    {/* Active Step Indicator Pill */}
                    {activeStepIndex === 0 && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-[#1B4E2C] text-white text-[9px] font-black uppercase font-mono tracking-wider shadow-2xs">
                        ACTIVE
                      </span>
                    )}

                    <svg viewBox="0 0 100 100" fill="none" className="w-11 h-11 sm:w-14 sm:h-14 text-[#1A1A1A]">
                      {/* Technical Compass / Blueprint Helmet */}
                      <path
                        d="M22 62 C20 40 32 20 52 20 C72 20 82 36 82 56 C82 72 70 82 50 82 C34 82 24 74 22 62 Z"
                        stroke="currentColor"
                        strokeWidth="5"
                        fill="#FFFFFF"
                      />
                      <path
                        d="M26 48 C34 42 66 42 76 48 C78 58 74 66 60 66 C42 66 28 62 26 48 Z"
                        fill="currentColor"
                      />
                      <text
                        x="50"
                        y="38"
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="8"
                        fontWeight="900"
                        fontFamily="sans-serif"
                      >
                        STEP 01
                      </text>
                      <path d="M30 76 Q 50 72 70 76" stroke="currentColor" strokeWidth="2.5" fill="none" />
                    </svg>

                    <div className="mt-2 text-center">
                      <span className="block text-[11px] sm:text-xs font-display uppercase tracking-tight text-[#0D0F12]">
                        Discovery
                      </span>
                      <span className="block text-[9px] sm:text-[10px] font-jakarta text-gray-600 font-semibold tracking-wide">
                        Architecture
                      </span>
                    </div>
                  </button>

                  {/* BOX 4: Step 04 - QA & Security */}
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex(3)}
                    className={`w-full aspect-square rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs transition-all duration-300 cursor-pointer relative group text-[#1A1A1A] ${
                      activeStepIndex === 3
                        ? "bg-[#ECEEEF] ring-3 ring-[#41B349] ring-offset-2 scale-105 shadow-md"
                        : "bg-[#ECEEEF] hover:scale-102 hover:shadow-sm"
                    }`}
                  >
                    {activeStepIndex === 3 && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-[#1B4E2C] text-white text-[9px] font-black uppercase font-mono tracking-wider shadow-2xs">
                        ACTIVE
                      </span>
                    )}

                    <svg viewBox="0 0 100 100" fill="none" className="w-11 h-11 sm:w-14 sm:h-14 text-[#1A1A1A]">
                      {/* Shield with Audit Checkmark */}
                      <path
                        d="M50 18 L76 28 V52 C76 68 64 80 50 86 C36 80 24 68 24 52 V28 Z"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="#FFFFFF"
                      />
                      <path
                        d="M40 50 L47 57 L62 42"
                        stroke="#41B349"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <text
                        x="50"
                        y="72"
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="7"
                        fontWeight="900"
                        letterSpacing="0.5"
                      >
                        STEP 04
                      </text>
                    </svg>

                    <div className="mt-2 text-center">
                      <span className="block text-[11px] sm:text-xs font-display uppercase tracking-tight text-[#0D0F12]">
                        QA &amp; Audit
                      </span>
                      <span className="block text-[9px] sm:text-[10px] font-jakarta text-gray-600 font-semibold tracking-wide">
                        Security &amp; Speed
                      </span>
                    </div>
                  </button>

                </div>

                {/* Subtitle Caption */}
                <div className="text-[11px] sm:text-xs text-gray-500 italic text-center mt-2.5 font-jakarta select-none">
                  by Web Solutions Architect
                </div>
              </div>

              {/* COLUMN 2: Step 02 & Step 05 (Shifted Higher with -mt-6 sm:-mt-8) */}
              <div className="flex flex-col -mt-6 sm:-mt-8">
                {/* 5-Star Arc Header */}
                <StarArc color="#41B349" />
                
                {/* Specialist Avatar */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-md mx-auto -mb-3 relative z-10 overflow-hidden bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=140&auto=format&fit=crop&q=80"
                    alt="Lead UI/UX Engineer"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Stack of Process Boxes in Column 2 */}
                <div className="space-y-2.5 sm:space-y-3.5">
                  
                  {/* BOX 2: Step 02 - UX/UI Design */}
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex(1)}
                    className={`w-full aspect-square rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs transition-all duration-300 cursor-pointer relative group text-[#3B332A] ${
                      activeStepIndex === 1
                        ? "bg-[#F7F4EB] ring-3 ring-[#41B349] ring-offset-2 scale-105 shadow-md"
                        : "bg-[#F7F4EB] hover:scale-102 hover:shadow-sm"
                    }`}
                  >
                    {activeStepIndex === 1 && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-[#1B4E2C] text-white text-[9px] font-black uppercase font-mono tracking-wider shadow-2xs">
                        ACTIVE
                      </span>
                    )}

                    <svg viewBox="0 0 100 100" fill="none" className="w-11 h-11 sm:w-14 sm:h-14 text-[#3B332A]">
                      {/* Sunburst & UI Geometry */}
                      <path
                        d="M50 16 L50 24 M32 22 L37 28 M68 22 L63 28 M22 36 L29 38 M78 36 L71 38"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <rect x="26" y="44" width="48" height="26" rx="4" stroke="currentColor" strokeWidth="3" fill="#FFFFFF" />
                      <line x1="26" y1="52" x2="74" y2="52" stroke="currentColor" strokeWidth="2" />
                      <circle cx="32" cy="48" r="1.5" fill="#41B349" />
                      <circle cx="38" cy="48" r="1.5" fill="#E85038" />
                      <circle cx="44" cy="48" r="1.5" fill="#FBBF24" />
                      <text
                        x="50"
                        y="64"
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="7"
                        fontWeight="900"
                        letterSpacing="0.5"
                      >
                        STEP 02
                      </text>
                    </svg>

                    <div className="mt-2 text-center">
                      <span className="block text-[11px] sm:text-xs font-display uppercase tracking-tight text-[#0D0F12]">
                        UI/UX Design
                      </span>
                      <span className="block text-[9px] sm:text-[10px] font-jakarta text-gray-600 font-semibold tracking-wide">
                        Figma Prototype
                      </span>
                    </div>
                  </button>

                  {/* BOX 5: Step 05 - Deployment */}
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex(4)}
                    className={`w-full aspect-square rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs transition-all duration-300 cursor-pointer relative group text-white ${
                      activeStepIndex === 4
                        ? "bg-gradient-to-tr from-[#2E8B35] to-[#41B349] ring-3 ring-[#1B4E2C] ring-offset-2 scale-105 shadow-md"
                        : "bg-gradient-to-tr from-[#2E8B35] to-[#41B349] hover:scale-102 hover:shadow-sm"
                    }`}
                  >
                    {activeStepIndex === 4 && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-white text-[#1B4E2C] text-[9px] font-black uppercase font-mono tracking-wider shadow-2xs">
                        ACTIVE
                      </span>
                    )}

                    <svg viewBox="0 0 100 100" fill="none" className="w-11 h-11 sm:w-14 sm:h-14 text-white">
                      {/* Rocket Cutout / Cloud Deployment */}
                      <path
                        d="M50 20 C42 32 38 48 38 62 L48 58 L50 68 L52 58 L62 62 C62 48 58 32 50 20 Z"
                        fill="#FFFFFF"
                      />
                      <circle cx="50" cy="40" r="3.5" fill="#2E8B35" />
                      <path d="M38 62 L28 72 L36 72 Z" fill="#FFFFFF" opacity="0.8" />
                      <path d="M62 62 L72 72 L64 72 Z" fill="#FFFFFF" opacity="0.8" />
                      <text
                        x="50"
                        y="84"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="7"
                        fontWeight="900"
                        letterSpacing="0.5"
                      >
                        STEP 05
                      </text>
                    </svg>

                    <div className="mt-2 text-center">
                      <span className="block text-[11px] sm:text-xs font-display uppercase tracking-tight text-white">
                        Deployment
                      </span>
                      <span className="block text-[9px] sm:text-[10px] font-jakarta text-white/90 font-semibold tracking-wide">
                        Zero Downtime
                      </span>
                    </div>
                  </button>

                </div>

                {/* Subtitle Caption */}
                <div className="text-[11px] sm:text-xs text-gray-500 italic text-center mt-2.5 font-jakarta select-none">
                  by UI/UX Creative Lead
                </div>
              </div>

              {/* COLUMN 3: Step 03 & Step 06 */}
              <div className="flex flex-col">
                {/* 5-Star Arc Header */}
                <StarArc color="#41B349" />
                
                {/* Specialist Avatar */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-md mx-auto -mb-3 relative z-10 overflow-hidden bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=140&auto=format&fit=crop&q=80"
                    alt="Principal Full-Stack Engineer"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Stack of Process Boxes in Column 3 */}
                <div className="space-y-2.5 sm:space-y-3.5">
                  
                  {/* BOX 3: Step 03 - Engineering */}
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex(2)}
                    className={`w-full aspect-square rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs transition-all duration-300 cursor-pointer relative group text-white ${
                      activeStepIndex === 2
                        ? "bg-[#1853DB] ring-3 ring-[#41B349] ring-offset-2 scale-105 shadow-md"
                        : "bg-[#1853DB] hover:scale-102 hover:shadow-sm"
                    }`}
                  >
                    {activeStepIndex === 2 && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-white text-[#1853DB] text-[9px] font-black uppercase font-mono tracking-wider shadow-2xs">
                        ACTIVE
                      </span>
                    )}

                    <svg viewBox="0 0 100 100" fill="none" className="w-11 h-11 sm:w-14 sm:h-14 text-white">
                      {/* Code Brackets & Tech Gate */}
                      <path d="M34 32 L20 50 L34 68" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M66 32 L80 50 L66 68" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="56" y1="28" x2="44" y2="72" stroke="#41B349" strokeWidth="5" strokeLinecap="round" />
                      <text
                        x="50"
                        y="86"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="7"
                        fontWeight="900"
                        letterSpacing="0.5"
                      >
                        STEP 03
                      </text>
                    </svg>

                    <div className="mt-2 text-center">
                      <span className="block text-[11px] sm:text-xs font-display uppercase tracking-tight text-white">
                        Engineering
                      </span>
                      <span className="block text-[9px] sm:text-[10px] font-jakarta text-white/90 font-semibold tracking-wide">
                        Agile Sprints
                      </span>
                    </div>
                  </button>

                  {/* BOX 6: Step 06 - 24/7 SLA Support */}
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex(5)}
                    className={`w-full aspect-square rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs transition-all duration-300 cursor-pointer relative group text-white ${
                      activeStepIndex === 5
                        ? "bg-[#1E1F24] ring-3 ring-[#41B349] ring-offset-2 scale-105 shadow-md"
                        : "bg-[#1E1F24] hover:scale-102 hover:shadow-sm"
                    }`}
                  >
                    {activeStepIndex === 5 && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-[#41B349] text-white text-[9px] font-black uppercase font-mono tracking-wider shadow-2xs">
                        ACTIVE
                      </span>
                    )}

                    <div className="text-center">
                      <div className="text-sm sm:text-base font-black tracking-tight leading-none text-white font-sans">
                        24<span className="text-[#41B349] inline-block animate-pulse">/</span>7
                      </div>
                      <div className="text-[10px] sm:text-xs font-black tracking-tight leading-none text-gray-300 font-sans mt-1">
                        SUPPORT
                      </div>
                    </div>

                    <div className="mt-2 text-center">
                      <span className="block text-[11px] sm:text-xs font-display uppercase tracking-tight text-white">
                        Maintenance
                      </span>
                      <span className="block text-[9px] sm:text-[10px] font-jakarta text-gray-400 font-semibold tracking-wide">
                        Continuous SLA
                      </span>
                    </div>
                  </button>

                </div>

                {/* Subtitle Caption */}
                <div className="text-[11px] sm:text-xs text-gray-500 italic text-center mt-2.5 font-jakarta select-none">
                  by Principal Engineer Lead
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Step Content, Headline, Underline Bar, & Action             */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 max-w-[620px] text-left">
            
            {/* Dynamic Step Content with Smooth Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {/* Main Headline (Styled with Web Dev Green Theme #1B4E2C) */}
                <CardHeading
                  as="h3"
                  size="lg"
                  className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-display uppercase tracking-tight text-[#1B4E2C] leading-[1.14]"
                >
                  {currentStep.headline}
                </CardHeading>

                {/* Signature Underline Bar matching the reference Lead Generation section */}
                <div className="w-12 h-1 bg-[#41B349] rounded-full my-3.5 sm:my-4" />

                {/* Description Paragraph */}
                <SectionParagraph
                  size="sm"
                  theme="slate"
                  className="text-xs sm:text-[13.5px] leading-relaxed mb-4 sm:mb-4.5 font-normal"
                >
                  {currentStep.description}
                </SectionParagraph>

                {/* Tactical Deliverable Pillars */}
                <div className="space-y-2 mb-5 sm:mb-6">
                  {currentStep.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 font-jakarta text-xs sm:text-[13px] text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#41B349] shrink-0 mt-0.5" />
                      <span className="leading-snug">
                        <strong className="text-gray-900 font-semibold">{feat.title}: </strong>
                        <span className="text-[#475569]">{feat.desc}</span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Call to Action Link with Arrow matching reference */}
                <button
                  type="button"
                  onClick={openQuote}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#0D0F12] hover:text-[#41B349] transition-colors cursor-pointer group"
                >
                  <ButtonText className="text-xs sm:text-sm font-semibold">{currentStep.ctaText}</ButtonText>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#41B349] group-hover:translate-x-1.5 transition-transform" />
                </button>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
