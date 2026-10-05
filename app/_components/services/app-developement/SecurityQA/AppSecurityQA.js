"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Gauge,
  Smartphone,
  Bug,
  FileCheck,
  Award,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SectionBadge,
  SectionHeading,
  HighlightWord,
  SectionParagraph,
  CardHeading,
  CardParagraph,
} from "@/components/Typography";

/**
 * 8 Industry-Standard Security, Testing & QA Pillars for Mobile Applications
 */
const qaPillarsData = [
  {
    id: "app-api-security",
    category: "security",
    categoryLabel: "Security & Protection",
    step: "01",
    title: "App & API Security",
    icon: ShieldCheck,
    summary:
      "Hardening client apps and cloud endpoints against reverse engineering, code injection, and unauthorized data tampering.",
    description:
      "We implement end-to-end SSL/TLS 1.3 certificate pinning, ProGuard/R8 bytecode obfuscation, anti-tampering runtime integrity checks, and OWASP Mobile Top 10 vulnerability mitigations. Every API interaction is protected with time-limited HMAC signatures and strict rate-limiting to neutralize automated bot scraping and man-in-the-middle exploits.",
    keyPoints: [
      "SSL/TLS 1.3 Certificate Pinning",
      "ProGuard / R8 Bytecode Obfuscation",
      "OWASP Mobile Top 10 Hardened",
      "HMAC & Rate-Limited API Gateways",
    ],
  },
  {
    id: "data-protection-auth",
    category: "security",
    categoryLabel: "Security & Protection",
    step: "02",
    title: "Data Protection & Secure Authentication",
    icon: Lock,
    summary:
      "Safeguarding confidential user data, payment tokens, and device credentials with hardware-level cryptographic isolation.",
    description:
      "User credentials and encryption keys are safeguarded in Apple Secure Enclave (iOS Keychain) and Android Hardware Keystore. Local SQLite data stores are fortified with AES-256 SQLCipher encryption. Authentication is engineered around OAuth 2.0 with PKCE and hardware biometrics (Face ID & BiometricPrompt), featuring auto-invalidated tokens and zero-trust session termination.",
    keyPoints: [
      "Hardware-Backed Keychain & Keystore",
      "AES-256 SQLCipher Local DB Encryption",
      "Biometric Face ID / Touch ID Integration",
      "OAuth 2.0 + PKCE with Auto-Refresh",
    ],
  },
  {
    id: "functional-usability",
    category: "testing",
    categoryLabel: "Testing & Performance",
    step: "03",
    title: "Functional & Usability Testing",
    icon: CheckCircle2,
    summary:
      "Validating complex user journeys, edge cases, offline state transitions, and intuitive gesture navigation.",
    description:
      "Our QA engineers conduct rigorous manual and automated test suites across every primary user workflow—including checkout funnels, account onboarding, push notification triggers, and multi-step forms. We test offline caching mechanisms, optimistic UI state updates, network re-connection recovery, and accessibility standards (WCAG / ADA) to guarantee friction-free UX.",
    keyPoints: [
      "End-to-End User Flow Validation",
      "Offline-Mode Sync & Conflict Resolution",
      "Gesture & Haptic Micro-Interactions",
      "Accessibility (WCAG 2.1 / ADA) Audits",
    ],
  },
  {
    id: "performance-load",
    category: "testing",
    categoryLabel: "Testing & Performance",
    step: "04",
    title: "Performance & Load Testing",
    icon: Gauge,
    summary:
      "Optimizing cold startup times, 60/120 FPS frame stability, low battery consumption, and backend high-concurrency throughput.",
    description:
      "Utilizing Xcode Instruments and Android Profiler, we identify and eliminate memory leaks, excessive garbage collection, and CPU spikes. We benchmark cold app launches to under 1.5 seconds, profile fluid 60/120 FPS scroll rates, and stress-test cloud APIs with simulated spikes exceeding 10,000+ concurrent users under degraded 3G/4G network conditions.",
    keyPoints: [
      "Sub-1.5s Cold Launch Optimization",
      "60 / 120 FPS Fluid Scroll Benchmarking",
      "Memory Leak & CPU Profiling",
      "10k+ Concurrent Backend Stress Testing",
    ],
  },
  {
    id: "device-compatibility",
    category: "testing",
    categoryLabel: "Testing & Performance",
    step: "05",
    title: "Device & OS Compatibility Testing",
    icon: Smartphone,
    summary:
      "Guaranteeing flawless responsive layouts and hardware feature parity across fragmented iOS and Android ecosystems.",
    description:
      "We test on real physical devices across our dedicated mobile test lab, covering Apple iPhones (iPhone 11 through 16 Pro Max, iPadOS) and Android manufacturers (Samsung OneUI, Google Pixel, Xiaomi, OnePlus). We ensure dynamic layouts adapt seamlessly to Dynamic Islands, punch-hole cameras, foldable screens, and multiple OS versions (iOS 15–18+, Android 10–15).",
    keyPoints: [
      "Real Physical Device Matrix (100+ Models)",
      "Dynamic Island, Notches & Foldable Support",
      "Multi-OS Coverage (iOS 15–18+, Android 10–15)",
      "Adaptive Screen Resolutions & DPI Scaling",
    ],
  },
  {
    id: "crash-bug-testing",
    category: "testing",
    categoryLabel: "Testing & Performance",
    step: "06",
    title: "Crash & Bug Testing",
    icon: Bug,
    summary:
      "Uncovering unhandled exceptions, race conditions, and boundary failures to achieve a 99.9% crash-free session benchmark.",
    description:
      "We execute automated chaos testing, UI stress simulations (Monkey Testing), and boundary value analysis to catch race conditions and background memory pressure terminations before release. Real-time telemetry via Firebase Crashlytics and Sentry tracks unhandled exceptions, empowering our development team to maintain zero-crash production health.",
    keyPoints: [
      "99.9% Crash-Free Session SLA",
      "Automated Chaos & Monkey Stress Testing",
      "Firebase Crashlytics & Sentry Telemetry",
      "Background Process & Low-Memory Audits",
    ],
  },
  {
    id: "store-compliance",
    category: "compliance",
    categoryLabel: "Compliance & Launch",
    step: "07",
    title: "App Store & Google Play Compliance",
    icon: FileCheck,
    summary:
      "Navigating Apple HIG and Google Play Developer policies with zero rejections and full regulatory compliance.",
    description:
      "We prepare and review complete submission compliance packages, including Apple Privacy Manifests, App Tracking Transparency (ATT) implementations, GDPR / CCPA data collection disclosures, and In-App Purchase (IAP) entitlement validations. We ensure all app metadata, icon assets, and permission rationales meet store review standards without friction.",
    keyPoints: [
      "Apple App Store & Google Play Guidelines",
      "Privacy Manifests & Tracking Disclosures",
      "In-App Purchases (IAP) & Subscriptions",
      "100% First-Time Store Approval Rate",
    ],
  },
  {
    id: "final-qa-signoff",
    category: "compliance",
    categoryLabel: "Compliance & Launch",
    step: "08",
    title: "Final Quality Assurance & Production Sign-Off",
    icon: Award,
    summary:
      "Staging release builds through private beta channels, stakeholder UAT sign-off, and security clearance for deployment.",
    description:
      "Before public store rollout, production builds undergo closed-loop beta distribution via Apple TestFlight and Google Play Internal Testing. Our team executes a 50-point release verification checklist, reviews end-to-end user acceptance sign-offs with your team, and signs cryptographic deployment builds for seamless, risk-free market release.",
    keyPoints: [
      "Apple TestFlight & Google Play Beta Staging",
      "Stakeholder User Acceptance Testing (UAT)",
      "50-Point Pre-Deployment Release Checklist",
      "Cryptographic Code Signing & Rollout",
    ],
  },
];

// Metric statistics for trust verification
const qualityMetrics = [
  { value: "99.9%", label: "Crash-Free Sessions SLA", sub: "Production Target" },
  { value: "OWASP", label: "Mobile Top 10 Compliant", sub: "Bank-Grade Security" },
  { value: "100+", label: "Physical Devices Tested", sub: "iOS & Android Matrix" },
  { value: "100%", label: "App Store Approval Rate", sub: "Zero-Rejection Guarantee" },
];

export default function AppSecurityQA({ cmsContent }) {
  const [activeTab, setActiveTab] = useState("all");

  const filterTabs = [
    { id: "all", label: "All Pillars", count: 8 },
    { id: "security", label: "Security & Protection", count: 2 },
    { id: "testing", label: "Testing & Performance", count: 4 },
    { id: "compliance", label: "Compliance & QA", count: 2 },
  ];

  const filteredPillars =
    activeTab === "all"
      ? qaPillarsData
      : qaPillarsData.filter((item) => item.category === activeTab);

  return (
    <section
      id="app-security-qa"
      className="w-full py-14 sm:py-18 md:py-20 bg-[#FFFFFF] text-[#0D0F12] font-sans relative overflow-hidden select-none"
    >
      {/* Subtle Radial Glow in Tech Solutionor Green */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-gradient-to-b from-[#41B349]/10 via-[#41B349]/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-gradient-to-t from-[#41B349]/10 via-[#41B349]/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Subtle Architectural Dot Grid Background */}
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
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {/* Top Pill Badge */}
          <div className="mb-3">
            <SectionBadge variant="light">
              ENTERPRISE RELIABILITY &amp; INTEGRITY
            </SectionBadge>
          </div>

          {/* Main Title */}
          <SectionHeading
            as="h2"
            size="section"
            theme="dark"
            className="text-center mb-3 sm:mb-4"
          >
            App Security, Testing &amp;{" "}
            <HighlightWord>Quality Assurance</HighlightWord>
          </SectionHeading>

          {/* Subtitle */}
          <SectionParagraph
            size="md"
            theme="slate"
            className="text-center max-w-2xl mx-auto"
          >
            Every mobile app we build undergoes stringent multi-tier vulnerability testing,
            real-device performance profiling, and regulatory compliance validation. We ensure
            your application is rock-solid, secure, fast, and engineered for high-concurrency production.
          </SectionParagraph>
        </div>

        {/* ========================================================================= */}
        {/* METRICS STATS BAR                                                         */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
          {qualityMetrics.map((metric, mIdx) => (
            <div
              key={mIdx}
              className="bg-[#FFFFFF] rounded-2xl border border-[#41B349]/25 p-3.5 sm:p-4 text-center shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:border-[#41B349] hover:shadow-[0_8px_24px_rgba(65,179,73,0.12)] transition-all duration-300"
            >
              <div
                className="text-2xl sm:text-3xl font-display font-black text-[#41B349] tracking-tight mb-0.5"
              >
                {metric.value}
              </div>
              <div
                className="text-xs sm:text-[12.5px] font-jakarta font-bold text-[#0D0F12] leading-tight"
              >
                {metric.label}
              </div>
              <div className="text-[10px] sm:text-[10.5px] font-jakarta text-[#0D0F12]/55 mt-0.5 font-medium">
                {metric.sub}
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* CATEGORY FILTER TABS                                                      */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 select-none">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-jakarta font-semibold tracking-[-0.01em] transition-all duration-300 cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? "bg-[#41B349] text-white border-[#41B349] shadow-[0_4px_16px_rgba(65,179,73,0.3)]"
                    : "bg-[#FFFFFF] text-[#0D0F12]/75 border-[#0D0F12]/15 hover:border-[#41B349]/60 hover:text-[#0D0F12]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#0D0F12]/8 text-[#0D0F12]/70"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 8-PILLAR CARDS GRID (Spacious 2-Column Responsive Layout)                   */}
        {/* ========================================================================= */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mb-12"
        >
          <AnimatePresence>
            {filteredPillars.map((item) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group rounded-[18px] sm:rounded-[20px] bg-[#FFFFFF] border border-[#41B349] p-4.5 sm:p-5.5 shadow-[0_10px_28px_rgba(65,179,73,0.14)] hover:shadow-[0_14px_34px_rgba(65,179,73,0.22)] hover:-translate-y-0.5 transition-all duration-300 text-left relative overflow-hidden flex flex-col justify-between"
                >
                  {/* Top Accent Line */}
                  <div className="absolute top-0 left-6 right-6 h-[2.5px] bg-[#41B349] opacity-100" />

                  <div>
                    {/* Top Meta Header: Icon + Category Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#41B349]/10 border border-[#41B349]/25 flex items-center justify-center text-[#41B349] group-hover:bg-[#41B349] group-hover:text-white transition-all duration-300 shadow-xs shrink-0">
                          <IconComp size={18} className="stroke-[2.2]" />
                        </div>
                        <span className="text-[10px] sm:text-[10.5px] font-jakarta font-bold uppercase tracking-wider text-[#41B349] bg-[#41B349]/10 px-2 py-0.5 rounded border border-[#41B349]/20">
                          {item.categoryLabel}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono font-black text-[#0D0F12]/40">
                        #{item.step}
                      </span>
                    </div>

                    {/* Card Title */}
                    <CardHeading
                      as="h3"
                      size="sm"
                      theme="green"
                      className="text-[#41B349] mb-1.5 leading-snug"
                    >
                      {item.title}
                    </CardHeading>

                    {/* Summary Hook */}
                    <p
                      className="font-jakarta text-[13px] sm:text-[13.5px] font-semibold text-[#0D0F12] leading-snug mb-2"
                    >
                      {item.summary}
                    </p>

                    {/* Detailed Industry Description */}
                    <CardParagraph
                      size="xs"
                      theme="slate"
                      className="mb-3.5 leading-relaxed"
                    >
                      {item.description}
                    </CardParagraph>
                  </div>

                  {/* Key Safeguards & Deliverables Chips */}
                  <div className="pt-3 border-t border-[#0D0F12]/10 flex flex-wrap gap-1.5 mt-auto">
                    {item.keyPoints.map((kp, kIdx) => (
                      <span
                        key={kIdx}
                        className="inline-flex items-center gap-1 font-jakarta text-[10px] sm:text-[10.5px] font-semibold px-2 py-0.5 rounded bg-[#41B349]/8 hover:bg-[#41B349]/15 border border-[#41B349]/20 text-[#0D0F12]/85 transition-colors"
                      >
                        <Check size={10} className="text-[#41B349] stroke-[3]" />
                        <span>{kp}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
