"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Sparkles, Clock, ArrowRight } from "lucide-react";
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

// Complete 7-Stage Mobile App Development Process Data
const appProcessData = [
  // Stage 01
  {
    id: "step-1",
    stepNumber: "01",
    phaseTag: "PHASE 01 // 1–2 WEEKS",
    title: "Discovery & Requirements",
    badge: "SCOPING & FEASIBILITY",
    desc: "We begin by deconstructing your product vision into clear, actionable technical specifications. Our mobile architects analyze user personas, evaluate platform-specific constraints (iOS vs. Android), benchmark competitors, and determine API integration feasibility to establish a rock-solid foundation.",
    deliverables: [
      "Software Requirements (SRS)",
      "MVP Prioritization Matrix",
      "Architecture Blueprint",
      "Sprint Delivery Roadmap",
    ],
  },
  // Stage 02
  {
    id: "step-2",
    stepNumber: "02",
    phaseTag: "PHASE 02 // 1–2 WEEKS",
    title: "Product Strategy & Planning",
    badge: "ROADMAP & ARCHITECTURE",
    desc: "We structure your project into iterative 2-week agile sprint cycles with transparent deliverable gates. We define data flow diagrams, third-party service dependencies (payment gateways, push notification servers, analytics), and cloud infrastructure requirements.",
    deliverables: [
      "Agile Product Backlog",
      "Database Schema & Data Flow",
      "Third-Party API Plan",
      "Compliance Checklist",
    ],
  },
  // Stage 03
  {
    id: "step-3",
    stepNumber: "03",
    phaseTag: "PHASE 03 // 2–4 WEEKS",
    title: "UI/UX Design & Prototyping",
    badge: "HUMAN-CENTRIC UX",
    desc: "Following Apple's Human Interface Guidelines (HIG) and Google's Material Design 3, our UI/UX designers create pixel-perfect wireframes, custom design systems, and interactive Figma prototypes that allow you to test every screen and micro-interaction on real devices.",
    deliverables: [
      "Clickable Figma Prototype",
      "Multi-Screen UI Mockups",
      "Mobile Design System Kit",
      "User Journey & Screen Flows",
    ],
  },
  // Stage 04
  {
    id: "step-4",
    stepNumber: "04",
    phaseTag: "PHASE 04 // 6–12 WEEKS",
    title: "Architecture & App Development",
    badge: "FULL-STACK ENGINEERING",
    desc: "Our senior mobile engineers build your application using clean, modular code architecture (MVVM/Clean Architecture). We engineer fluid UI screens, establish local offline caching (SQLite/Realm), integrate biometric authentication, and build high-throughput backend APIs.",
    deliverables: [
      "Clean Modular Codebase",
      "Bi-Weekly TestFlight Builds",
      "Secure REST/GraphQL APIs",
      "Admin Dashboard & CMS",
    ],
  },
  // Stage 05
  {
    id: "step-5",
    stepNumber: "05",
    phaseTag: "PHASE 05 // 2–3 WEEKS",
    title: "Quality Assurance & Testing",
    badge: "MULTI-DEVICE TESTING",
    desc: "A single crash can ruin your App Store rating. Our dedicated QA engineers run your app through automated and manual test suites on a real device farm covering multiple iOS versions, Android fragmentation, network latency conditions, and edge-case battery consumption.",
    deliverables: [
      "QA Bug Matrix & Test Reports",
      "99.9% Crash-Free Session Rate",
      "OWASP Mobile Top 10 Audit",
      "Battery Optimization Report",
    ],
  },
  // Stage 06
  {
    id: "step-6",
    stepNumber: "06",
    phaseTag: "PHASE 06 // 1–2 WEEKS",
    title: "App Store & Google Play Launch",
    badge: "STORE PUBLISHING",
    desc: "Navigating strict submission guidelines of the Apple App Store and Google Play Console requires specialized experience. We prepare all store metadata, privacy disclosures, and in-app purchase setups, managing the review process until your app is approved and live.",
    deliverables: [
      "Approved Store Releases",
      "ASO Keyword & Asset Package",
      "Firebase Crashlytics Setup",
      "Rejection Defense Guarantee",
    ],
  },
  // Stage 07
  {
    id: "step-7",
    stepNumber: "07",
    phaseTag: "PHASE 07 // ONGOING",
    title: "Post-Launch Support & Optimization",
    badge: "SLA MAINTENANCE & GROWTH",
    desc: "Launching is just the beginning. Mobile operating systems update constantly. We provide ongoing 24/7 technical support, monitor user crash reports in real time, analyze retention metrics, and iteratively develop new features to maximize your app's return on investment.",
    deliverables: [
      "24/7 SLA Support Agreement",
      "Immediate OS Version Patches",
      "Performance & Retention Analytics",
      "Quarterly Feature Roadmap",
    ],
  },
  // Stage 08 (Complementary continuous SLA card for 2x2 symmetry)
  {
    id: "step-8",
    stepNumber: "08",
    phaseTag: "CONTINUOUS // ENTERPRISE",
    title: "Enterprise SLA & Cloud Scaling",
    badge: "INFRASTRUCTURE SCALING",
    desc: "Dedicated mobile engineering squads on standby to scale your backend infrastructure, optimize cloud server response times, implement biometric security updates, and ensure uninterrupted commercial uptime for millions of active mobile users.",
    deliverables: [
      "Dedicated Engineering Squad",
      "Real-Time APM Monitoring",
      "Automated Cloud Backups",
      "Fast Incident Resolution",
    ],
  },
];

export default function AppProcess({ cmsContent }) {
  const { openQuote } = useQuote();
  // activePhase: 0 = Steps 01–04, 1 = Steps 05–08
  const [activePhase, setActivePhase] = useState(0);

  const defaultBadge = "MOBILE PRODUCT LIFECYCLE • AGILE SPRINTS";
  const defaultTitle = "Our App Development";
  const defaultHighlight = "Process";

  const badge = getCmsVal(cmsContent, defaultBadge, "appprocess");
  const title = getCmsVal(cmsContent, defaultTitle, "appprocess");
  const highlight = getCmsVal(cmsContent, defaultHighlight, "appprocess");

  // Phase 0: Cards 0 & 1 (Left), Cards 2 & 3 (Right)
  // Phase 1: Cards 4 & 5 (Left), Cards 6 & 7 (Right)
  const leftCards =
    activePhase === 0
      ? [appProcessData[0], appProcessData[1]]
      : [appProcessData[4], appProcessData[5]];

  const rightCards =
    activePhase === 0
      ? [appProcessData[2], appProcessData[3]]
      : [appProcessData[6], appProcessData[7]];

  return (
    <section
      id="app-development-process"
      className="w-full py-8 sm:py-10 md:py-12 bg-[#FFFFFF] text-[#0D0F12] font-sans relative overflow-hidden select-none"
    >
      {/* Ambient Radial Glowing Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-r from-[#41B349]/10 via-[#41B349]/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Subtle Dot Grid Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#0D0F12 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER: Clean Pill Badge & Title                                 */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5">
          <div className="mb-2">
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

        {/* ========================================================================= */}
        {/* TOP PILL BUTTON: Exactly matching the reference design oval CTA          */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
          <button
            type="button"
            onClick={openQuote}
            className="group relative inline-flex items-center gap-2.5 px-5 sm:px-6 py-2 rounded-full bg-[#41B349] hover:bg-[#389e3f] border border-[#41B349] hover:border-[#389e3f] text-white transition-all duration-300 shadow-[0_4px_22px_rgba(65,179,73,0.3)] hover:shadow-[0_6px_28px_rgba(65,179,73,0.45)] hover:scale-[1.02] cursor-pointer"
          >
            <ButtonText className="text-xs sm:text-xs tracking-wide text-white">Talk To A Mobile Specialist</ButtonText>
            <div className="relative z-10 w-5 h-5 rounded-full bg-[#0D0F12] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-all">
              <ArrowUpRight size={13} className="stroke-[2.5]" />
            </div>
          </button>

          {/* Interactive Phase Toggle Tabs */}
          <div className="flex items-center gap-1.5 mt-2.5 p-1 rounded-full bg-[#FFFFFF] border border-[#0D0F12]/15 shadow-xs select-none">
            <button
              type="button"
              onClick={() => setActivePhase(0)}
              className={`px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-jakarta font-semibold tracking-[-0.01em] transition-all duration-300 cursor-pointer ${
                activePhase === 0
                  ? "bg-[#41B349] text-white shadow-[0_0_10px_rgba(65,179,73,0.35)]"
                  : "text-[#0D0F12]/70 hover:text-[#0D0F12]"
              }`}
            >
              Steps 01–04: Scoping &amp; Build
            </button>
            <button
              type="button"
              onClick={() => setActivePhase(1)}
              className={`px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-jakarta font-semibold tracking-[-0.01em] transition-all duration-300 cursor-pointer ${
                activePhase === 1
                  ? "bg-[#41B349] text-white shadow-[0_0_10px_rgba(65,179,73,0.35)]"
                  : "text-[#0D0F12]/70 hover:text-[#0D0F12]"
              }`}
            >
              Steps 05–07: QA, Launch &amp; Scale
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN VISUAL SECTION: Left Cards | Central Circular Hub | Right Cards       */}
        {/* Exactly matching the reference layout structure, spacing & connector lines */}
        {/* ========================================================================= */}
        <div className="relative max-w-[1140px] mx-auto">
          
          {/* DESKTOP SVG CIRCUIT CONNECTOR LINES */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0"
            viewBox="0 0 1140 440"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Top-Left Circuit Connector: Left Card 1 -> Center Ring */}
            <path
              d="M 360 105 L 395 105 L 435 165 L 455 165"
              stroke="rgba(65, 179, 73, 0.45)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <circle cx="360" cy="105" r="3.5" fill="#41B349" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="455" cy="165" r="4" fill="#41B349" />

            {/* Bottom-Left Circuit Connector: Left Card 2 -> Center Ring */}
            <path
              d="M 360 335 L 395 335 L 435 275 L 455 275"
              stroke="rgba(65, 179, 73, 0.45)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <circle cx="360" cy="335" r="3.5" fill="#41B349" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="455" cy="275" r="4" fill="#41B349" />

            {/* Top-Right Circuit Connector: Center Ring -> Right Card 1 */}
            <path
              d="M 685 165 L 705 165 L 745 105 L 780 105"
              stroke="rgba(65, 179, 73, 0.45)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <circle cx="685" cy="165" r="4" fill="#41B349" />
            <circle cx="780" cy="105" r="3.5" fill="#41B349" stroke="#FFFFFF" strokeWidth="1.5" />

            {/* Bottom-Right Circuit Connector: Center Ring -> Right Card 2 */}
            <path
              d="M 685 275 L 705 275 L 745 335 L 780 335"
              stroke="rgba(65, 179, 73, 0.45)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <circle cx="685" cy="275" r="4" fill="#41B349" />
            <circle cx="780" cy="335" r="3.5" fill="#41B349" stroke="#FFFFFF" strokeWidth="1.5" />
          </svg>

          {/* 3-COLUMN RESPONSIVE GRID (LEFT CARDS, CENTER ORB, RIGHT CARDS) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-center">
            
            {/* =================================================================== */}
            {/* LEFT 2 CARDS: Clean White Background with #41B349 Accents           */}
            {/* =================================================================== */}
            <div className="lg:col-span-4 flex flex-col gap-3 sm:gap-3.5 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`left-${activePhase}`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex flex-col gap-3 sm:gap-3.5"
                >
                  {leftCards.map((card, idx) => (
                    <div
                      key={card.id}
                      className="group rounded-[16px] sm:rounded-[18px] bg-[#FFFFFF] border border-[#41B349] p-3.5 sm:p-4.5 shadow-[0_10px_28px_rgba(65,179,73,0.14)] hover:shadow-[0_14px_34px_rgba(65,179,73,0.22)] hover:-translate-y-0.5 transition-all duration-300 text-left relative overflow-hidden"
                    >
                      {/* Top Accent Line */}
                      <div className="absolute top-0 left-5 right-5 h-[2.5px] bg-[#41B349] opacity-100" />

                      {/* Card Title */}
                      <CardHeading
                        as="h3"
                        size="sm"
                        theme="green"
                        className="text-[#41B349] mb-1.5"
                      >
                        {card.title}
                      </CardHeading>

                      {/* Card Description */}
                      <CardParagraph
                        size="xs"
                        theme="slate"
                        className="mb-2.5 leading-relaxed"
                      >
                        {card.desc}
                      </CardParagraph>

                      {/* Deliverables Tags */}
                      <div className="pt-2 border-t border-[#0D0F12]/10 flex flex-wrap gap-1">
                        {card.deliverables.map((del, dIdx) => (
                          <span
                            key={dIdx}
                            className="font-jakarta text-[9.5px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#41B349]/8 hover:bg-[#41B349]/15 border border-[#41B349]/20 text-[#0D0F12]/85 transition-colors"
                          >
                            {del}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* =================================================================== */}
            {/* CENTER CIRCULAR HUB: Glowing Cybernetic Avatar & Concentric Rings   */}
            {/* =================================================================== */}
            <div className="lg:col-span-4 flex items-center justify-center my-1 lg:my-0 z-10">
              <div className="relative flex items-center justify-center">
                
                {/* OUTER DASHED ORBITAL RING */}
                <div className="w-[230px] h-[230px] sm:w-[260px] sm:h-[260px] md:w-[280px] md:h-[280px] rounded-full border border-dashed border-[#41B349]/35 flex items-center justify-center relative p-2.5 animate-[spin_60s_linear_infinite]">
                  {/* Connection Node Dots */}
                  <div className="absolute top-[22%] left-[5%] w-3 h-3 rounded-full bg-[#FFFFFF] border-2 border-[#41B349] shadow-[0_0_6px_rgba(65,179,73,0.5)]" />
                  <div className="absolute bottom-[22%] left-[5%] w-3 h-3 rounded-full bg-[#FFFFFF] border-2 border-[#41B349] shadow-[0_0_6px_rgba(65,179,73,0.5)]" />
                  <div className="absolute top-[22%] right-[5%] w-3 h-3 rounded-full bg-[#FFFFFF] border-2 border-[#41B349] shadow-[0_0_6px_rgba(65,179,73,0.5)]" />
                  <div className="absolute bottom-[22%] right-[5%] w-3 h-3 rounded-full bg-[#FFFFFF] border-2 border-[#41B349] shadow-[0_0_6px_rgba(65,179,73,0.5)]" />
                </div>

                {/* INNER SOLID CIRCULAR FRAME WITH GLOWING GRAPHIC */}
                <div className="absolute w-[180px] h-[180px] sm:w-[205px] sm:h-[205px] md:w-[225px] md:h-[225px] rounded-full overflow-hidden border-2 border-[#41B349] shadow-[0_0_30px_rgba(65,179,73,0.2)] flex items-center justify-center bg-[#FFFFFF]">
                  <Image
                    src="/services/app-process-core.jpg"
                    alt="Mobile Engineering AI Core"
                    width={240}
                    height={240}
                    className="w-full h-full object-cover select-none pointer-events-none scale-105"
                    priority
                  />
                  {/* Glowing Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12]/30 via-transparent to-transparent pointer-events-none" />
                </div>

              </div>
            </div>

            {/* =================================================================== */}
            {/* RIGHT 2 CARDS: Clean White Background with #41B349 Accents          */}
            {/* =================================================================== */}
            <div className="lg:col-span-4 flex flex-col gap-3 sm:gap-3.5 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`right-${activePhase}`}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex flex-col gap-3 sm:gap-3.5"
                >
                  {rightCards.map((card, idx) => (
                    <div
                      key={card.id}
                      className="group rounded-[16px] sm:rounded-[18px] bg-[#FFFFFF] border border-[#41B349] p-3.5 sm:p-4.5 shadow-[0_10px_28px_rgba(65,179,73,0.14)] hover:shadow-[0_14px_34px_rgba(65,179,73,0.22)] hover:-translate-y-0.5 transition-all duration-300 text-left relative overflow-hidden"
                    >
                      {/* Top Accent Line */}
                      <div className="absolute top-0 left-5 right-5 h-[2.5px] bg-[#41B349] opacity-100" />

                      {/* Card Title */}
                      <CardHeading
                        as="h3"
                        size="sm"
                        theme="green"
                        className="text-[#41B349] mb-1.5"
                      >
                        {card.title}
                      </CardHeading>

                      {/* Card Description */}
                      <CardParagraph
                        size="xs"
                        theme="slate"
                        className="mb-2.5 leading-relaxed"
                      >
                        {card.desc}
                      </CardParagraph>

                      {/* Deliverables Tags */}
                      <div className="pt-2 border-t border-[#0D0F12]/10 flex flex-wrap gap-1">
                        {card.deliverables.map((del, dIdx) => (
                          <span
                            key={dIdx}
                            className="font-jakarta text-[9.5px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#41B349]/8 hover:bg-[#41B349]/15 border border-[#41B349]/20 text-[#0D0F12]/85 transition-colors"
                          >
                            {del}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
