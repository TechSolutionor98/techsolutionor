"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Database,
  UserCheck,
  Layers,
  FileText,
  Cookie,
  BarChart3,
  Server,
  Share2,
  Lock,
  Clock,
  CheckCircle2,
  ExternalLink,
  Users,
  Globe,
  RefreshCw,
  Mail,
  ChevronRight,
  ShieldCheck,
  Info,
  Building
} from "lucide-react";
import { getCmsVal } from "@/lib/api-helper";

const sections = [
  { id: "introduction", title: "1. Introduction", icon: Shield },
  { id: "information-we-collect", title: "2. Information We Collect", icon: Database },
  { id: "personal-information", title: "3. Personal Information", icon: UserCheck },
  { id: "how-we-collect", title: "4. How We Collect Information", icon: Layers },
  { id: "how-we-use", title: "5. How We Use Your Information", icon: FileText },
  { id: "cookies-tracking", title: "6. Cookies & Tracking Technologies", icon: Cookie },
  { id: "website-analytics", title: "7. Website Analytics", icon: BarChart3 },
  { id: "third-party-services", title: "8. Third-Party Services", icon: Server },
  { id: "data-sharing", title: "9. Data Sharing & Disclosure", icon: Share2 },
  { id: "data-security", title: "10. Data Security", icon: Lock },
  { id: "data-retention", title: "11. Data Retention", icon: Clock },
  { id: "user-rights", title: "12. User Rights & Choices", icon: CheckCircle2 },
  { id: "third-party-links", title: "13. Third-Party Links", icon: ExternalLink },
  { id: "childrens-privacy", title: "14. Children's Privacy", icon: Users },
  { id: "international-transfers", title: "15. International Data Transfers", icon: Globe },
  { id: "policy-updates", title: "16. Updates to This Privacy Policy", icon: RefreshCw },
  { id: "contact-information", title: "17. Contact Information", icon: Mail },
];

export default function PrivacyPolicyContent({ cmsContent }) {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] text-[#111827] min-h-screen">
      {/* Hero Header Section */}
      <section className="relative w-full bg-[#FFFFFF] overflow-hidden py-16 sm:py-20 md:py-24">
        {/* Ambient Top Glow & Dot Pattern */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle_at_top,_rgba(65,179,73,0.12)_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#41B34912_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/30 text-[#36963D] font-mono text-xs uppercase tracking-widest font-bold mb-6 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#41B349]" />
            <span>{getCmsVal(cmsContent, "LEGAL & DATA PRIVACY", "privacyhero")}</span>
          </div>

          {/* Main Title */}
          <h1 
            className="text-3xl sm:text-5xl md:text-6xl font-black text-[#111827] tracking-tight leading-[1.15] mb-6"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {getCmsVal(cmsContent, "Privacy Policy", "privacyhero")}
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
            {getCmsVal(
              cmsContent,
              "At Tech Solutionor, protecting your privacy and ensuring the integrity of your personal and business data is a cornerstone of our software engineering and digital services. This policy transparently explains what data we collect, how we handle it, and how your rights are safeguarded.",
              "privacyhero"
            )}
          </p>
        </div>
      </section>

      {/* Main Content Area with Sticky Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Sticky Table of Contents Sidebar (Desktop) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 hidden lg:block">
            <div className="bg-gray-50/80 border border-gray-200/90 rounded-3xl p-6 shadow-2xs backdrop-blur-sm">
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-gray-200">
                <div className="w-8 h-8 rounded-lg bg-[#41B349]/15 text-[#36963D] flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-900">Table of Contents</h2>
                  <p className="text-[11px] text-gray-500">Jump to any section</p>
                </div>
              </div>

              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#41B349] text-white font-bold shadow-xs shadow-[#41B349]/20"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate pr-2">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white" : "text-gray-400"}`} />
                        <span className="truncate">{sec.title}</span>
                      </div>
                      <ChevronRight className={`w-3 h-3 shrink-0 ${isActive ? "text-white" : "text-gray-300"}`} />
                    </button>
                  );
                })}
              </nav>

              {/* Quick Contact Box in Sidebar */}
              <div className="mt-6 bg-white/70 rounded-2xl p-4 border border-gray-200/80 text-xs">
                <p className="font-bold text-gray-900 mb-1">Privacy Questions?</p>
                <p className="text-gray-600 text-[11.5px] leading-relaxed mb-3">
                  Our Data Protection team is here to help with any compliance or access inquiries.
                </p>
                <a
                  href="mailto:info@techsolutionor.com"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#36963D] hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>info@techsolutionor.com</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Privacy Policy Detailed Articles (Right Side) */}
          <main className="lg:col-span-8 space-y-12 sm:space-y-14">
            
            {/* Section 1: Introduction */}
            <article id="introduction" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  1. Introduction
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Welcome to <strong>Tech Solutionor</strong> (“Tech Solutionor”, “Company”, “we”, “our”, or “us”). We are an international technology and software engineering consultancy headquartered in the United Arab Emirates, offering bespoke web applications, mobile engineering, enterprise systems, cloud architecture, and data-driven digital growth strategies worldwide.
                </p>
                <p>
                  This Privacy Policy delineates how Tech Solutionor collects, utilizes, safeguards, discloses, and processes information gathered through our official website (<Link href="/" className="text-[#36963D] font-semibold hover:underline">https://techsolutionor.com</Link>), subdomains, client collaboration portals, contact forms, interactive quote calculators, SEO audit tools, and career portals.
                </p>
                <p>
                  By accessing our website, engaging with our technical resources, submitting inquiries, or procuring our services, you acknowledge that you have read, understood, and agreed to the practices described in this Privacy Policy. If you disagree with any terms within this policy, please refrain from using our digital platforms or submitting your personal information.
                </p>

                {/* Important Callout */}
                <div className="flex items-start gap-3 p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-[#1e4a2d]">
                  <Info className="w-5 h-5 text-[#41B349] shrink-0 mt-0.5" />
                  <p>
                    <strong>Compliance Commitment:</strong> Tech Solutionor adheres to applicable data protection and consumer privacy frameworks, including the <em>UAE Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection (PDPL)</em>, the European Union <em>General Data Protection Regulation (GDPR)</em>, the <em>California Consumer Privacy Act (CCPA)</em>, and internationally accepted fair information practices.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 2: Information We Collect */}
            <article id="information-we-collect" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  2. Information We Collect
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Depending on how you interact with our website and digital services, we gather information across three fundamental categories:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <p className="font-bold text-gray-900 text-sm mb-1.5">Direct Submissions</p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Information you willingly provide when completing contact forms, requesting free SEO audits, booking discovery calls, or submitting job applications.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <p className="font-bold text-gray-900 text-sm mb-1.5">Automated Telemetry</p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Technical data collected seamlessly via cookies, server logs, web beacons, and analytics tools regarding your device and browser interactions.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <p className="font-bold text-gray-900 text-sm mb-1.5">Authorized Third Parties</p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Data derived from public business registries, professional referral networks (e.g. LinkedIn), or authorized payment confirmation channels.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 3: Personal Information */}
            <article id="personal-information" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  3. Personal Information
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Personal Information refers to any details that identify, relate to, describe, or can be reasonably linked to an identifiable individual. The specific personal data points we may process include:
                </p>

                <ul className="space-y-2.5 pt-1">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Contact &amp; Identification Data:</strong> Full name, professional email address, telephone/mobile numbers, corporate name, physical address, country, and city.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Project &amp; Commercial Scope:</strong> Target website URLs (submitted for technical SEO audits), project goals, estimated budget tier, implementation deadlines, tech-stack preferences, and custom scope messages.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Recruitment &amp; Career Details:</strong> Resumes/CVs, cover letters, portfolio links (GitHub, Behance, Dribbble, personal websites), professional certifications, employment history, and references submitted through our Career Portal.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Communication Records:</strong> Transcripts of inquiries, meeting bookings via our interactive calendar widget, support messages, feedback responses, and email exchanges.</span>
                  </li>
                </ul>

                <p className="text-xs text-gray-500 italic pt-2">
                  * Note: Tech Solutionor does not intentionally collect sensitive categories of personal data, such as racial or ethnic origins, political opinions, religious beliefs, genetic information, biometric data, or health records. Please refrain from submitting such data through general inquiry forms.
                </p>
              </div>
            </article>

            {/* Section 4: How We Collect Information */}
            <article id="how-we-collect" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  4. How We Collect Information
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  We employ standard, ethical, and secure collection methods across our platforms:
                </p>

                <div className="space-y-3 pt-1">
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">1. Online Forms &amp; Modals</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      When you submit our <em>Contact Us Form</em>, trigger the <em>Get A Quote</em> modal, register for our <em>Newsletter</em>, apply for job positions via the <em>Careers Page</em>, or request specialized digital assessments.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">2. Interactive Discovery &amp; Calendar Scheduling</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      When you book consultation slots through our interactive calendar scheduling widget or join technical discovery calls with our engineering leads.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">3. Automated Browsing &amp; Technical Cookies</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      As you navigate techsolutionor.com, technical server logs automatically record your IP address, browser type, referral URLs, operating system, and timestamped page visits.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 5: How We Use Your Information */}
            <article id="how-we-use" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  5. How We Use Your Information
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Tech Solutionor processes your information strictly for legitimate commercial, operational, and contractual objectives, including:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="p-3.5 rounded-xl border border-gray-100 bg-white shadow-2xs">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Engineering &amp; Service Delivery</p>
                    <p className="text-xs text-gray-500">To design, architect, code, test, deploy, and maintain custom web, mobile, and enterprise software solutions.</p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-gray-100 bg-white shadow-2xs">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Client Consultation &amp; Proposals</p>
                    <p className="text-xs text-gray-500">To evaluate requirements, calculate accurate quotes, formulate technical specifications, and draft project milestone agreements.</p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-gray-100 bg-white shadow-2xs">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Technical SEO Audit Generation</p>
                    <p className="text-xs text-gray-500">To crawl and evaluate submitted domains, identify technical flaws, and compile bespoke action plans for website owners.</p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-gray-100 bg-white shadow-2xs">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Talent Acquisition &amp; Hiring</p>
                    <p className="text-xs text-gray-500">To review job applications, verify professional credentials, interview software engineers, and process hiring workflows.</p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-gray-100 bg-white shadow-2xs">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Administrative Communications</p>
                    <p className="text-xs text-gray-500">To send billing statements, service notifications, security alerts, and essential technical updates regarding active contracts.</p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-gray-100 bg-white shadow-2xs">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Security &amp; Fraud Prevention</p>
                    <p className="text-xs text-gray-500">To detect malicious traffic, prevent DDoS attacks, mitigate spam form abuse, and maintain overall platform stability.</p>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 6: Cookies and Tracking Technologies */}
            <article id="cookies-tracking" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <Cookie className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  6. Cookies and Tracking Technologies
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Our website uses cookies (small text files saved on your device) and comparable tracking mechanisms (such as web beacons and local storage tokens) to guarantee website functionality and evaluate browsing trends.
                </p>

                {/* Cookie Table */}
                <div className="overflow-x-auto border border-gray-200 rounded-2xl mt-2">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-800 font-bold">
                      <tr>
                        <th className="px-4 py-3">Cookie Category</th>
                        <th className="px-4 py-3">Core Purpose</th>
                        <th className="px-4 py-3">Opt-Out Option</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-gray-900">Essential Cookies</td>
                        <td className="px-4 py-3 text-gray-600">Strictly required for site navigation, CSRF protection, session integrity, and load balancing.</td>
                        <td className="px-4 py-3 text-gray-400 italic">Mandatory</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-gray-900">Performance &amp; Analytics</td>
                        <td className="px-4 py-3 text-gray-600">Measures aggregate site visits, page loading speeds, bounce rates, and user flows to enhance site UX.</td>
                        <td className="px-4 py-3 text-[#36963D] font-medium">Configurable via Browser</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-gray-900">Functionality Cookies</td>
                        <td className="px-4 py-3 text-gray-600">Remembers user preferences such as preferred language, currency, or previously submitted form drafts.</td>
                        <td className="px-4 py-3 text-[#36963D] font-medium">Configurable via Browser</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-gray-900">Marketing &amp; Attribution</td>
                        <td className="px-4 py-3 text-gray-600">Assesses marketing campaign reach from search and social platforms (e.g. Google Ads, LinkedIn).</td>
                        <td className="px-4 py-3 text-[#36963D] font-medium">Configurable via Browser</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-gray-500 pt-1">
                  <strong>How to Manage Cookies:</strong> You can manage or disable cookies at any time directly through your web browser settings (Chrome, Firefox, Safari, Edge). Please note that disabling essential cookies may impact the performance and visual rendering of certain features on our site.
                </p>
              </div>
            </article>

            {/* Section 7: Website Analytics */}
            <article id="website-analytics" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  7. Website Analytics
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  We utilize reputable third-party analytics services, such as <strong>Google Analytics</strong>, to gain deeper insight into audience interactions, popular technology pages, and regional traffic distributions.
                </p>
                <p>
                  These services capture pseudo-anonymized metrics such as browser type, device category, screen resolution, operating system, network location (city/country level), and navigation paths. We configure analytics providers to employ IP masking/anonymization where feasible. Analytics reports are evaluated solely in the aggregate and are never combined with personal contact submissions to identify individual users.
                </p>
              </div>
            </article>

            {/* Section 8: Third-Party Services */}
            <article id="third-party-services" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <Server className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  8. Third-Party Services
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  To deliver modern, resilient, and enterprise-grade software services, Tech Solutionor collaborates with vetted third-party vendors and cloud infrastructure partners:
                </p>

                <ul className="space-y-2 pt-1">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Cloud Hosting &amp; CDN Providers:</strong> Scalable server infrastructure, content delivery networks (e.g. AWS, Vercel, Cloudflare) that ensure fast, encrypted page delivery worldwide.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Transactional Email &amp; Communications:</strong> Secure SMTP relay services that transmit inquiry confirmations, audit notifications, and system receipts.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Database &amp; Storage Infrastructure:</strong> Enterprise-grade database clusters (e.g. MongoDB Atlas) hosted in secure data centers featuring automated backups and encryption-at-rest.</span>
                  </li>
                </ul>

                <p className="text-xs text-gray-500 pt-1">
                  All authorized sub-processors are legally bound by strict confidentiality terms and Data Processing Addendums (DPAs) requiring them to safeguard information in compliance with international privacy laws.
                </p>
              </div>
            </article>

            {/* Section 9: Data Sharing and Disclosure */}
            <article id="data-sharing" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <Share2 className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  9. Data Sharing and Disclosure
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                {/* Highlight Badge */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl">
                  <p className="font-bold text-gray-900 text-sm mb-1 text-[#36963D]">
                    Our Absolute Guarantee:
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    <strong>Tech Solutionor does not sell, rent, lease, trade, or monetize your personal information to any third parties for advertising or commercial exploitation.</strong>
                  </p>
                </div>

                <p>
                  We only disclose personal data under strictly controlled circumstances:
                </p>

                <ul className="space-y-2 pt-1">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Contracted Service Providers:</strong> Trusted technical partners acting on our direct behalf under strict non-disclosure obligations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Corporate Transitions:</strong> In the event of a merger, acquisition, divestiture, or transfer of company assets, client and business records may transition subject to equivalent privacy commitments.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Statutory &amp; Legal Compliance:</strong> When required by enforceable judicial warrants, court summons, regulatory audits, or statutory mandates issued by competent UAE or international law enforcement.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Protection of Vital Rights:</strong> To defend Tech Solutionor against legal liability, investigate fraudulent misuse, or safeguard the vital safety of individuals.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Section 10: Data Security */}
            <article id="data-security" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  10. Data Security
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  As an engineering agency, data integrity and cybersecurity are intrinsic to our operational culture. We employ a defense-in-depth security posture comprising:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/50">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm mb-1">TLS 1.3 / SSL Encryption</p>
                    <p className="text-xs text-gray-500">Every byte transmitted between your browser and our servers is encrypted using modern HTTPS protocols.</p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/50">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Encrypted Database Storage</p>
                    <p className="text-xs text-gray-500">Form entries, career applications, and audit logs are housed in databases with automated encryption-at-rest.</p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/50">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Strict Access Controls (RBAC)</p>
                    <p className="text-xs text-gray-500">Administrative tools require multi-factor authentication (MFA) and least-privilege role boundaries.</p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/50">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Active Monitoring &amp; WAF</p>
                    <p className="text-xs text-gray-500">Web Application Firewalls continuously inspect traffic to neutralize SQL injections, XSS, and brute force vectors.</p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 italic pt-1">
                  While we implement robust commercial standards to safeguard information, no electronic transmission over the internet can be guaranteed 100% immune from compromise. Users are encouraged to practice sound digital hygiene when transmitting information online.
                </p>
              </div>
            </article>

            {/* Section 11: Data Retention */}
            <article id="data-retention" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  11. Data Retention
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Tech Solutionor retains personal information only for the duration essential to fulfill the explicit purposes outlined in this Privacy Policy:
                </p>

                <ul className="space-y-2 pt-1">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>General Inquiries &amp; Quote Requests:</strong> Retained for up to 24 months to assist in subsequent project discussions and historical service continuity.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Active Client Project Records:</strong> Maintained throughout the lifespan of the commercial engagement plus statutory tax and accounting retention horizons (typically 5–7 years).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Career Applications:</strong> Retained for up to 12 months for prospective openings, unless the applicant requests earlier deletion.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Server Access Logs:</strong> Automatically rotated, archived, and permanently purged on a 90-day rolling cycle.</span>
                  </li>
                </ul>

                <p className="text-xs text-gray-500 pt-1">
                  When retention criteria expire, data is securely wiped or irreversibly de-identified using cryptographic sanitization methods.
                </p>
              </div>
            </article>

            {/* Section 12: User Rights and Choices */}
            <article id="user-rights" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  12. User Rights and Choices
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Regardless of your physical location, Tech Solutionor respects your data sovereignty. Under international frameworks (including UAE PDPL, EU GDPR, and CCPA), you may exercise the following rights:
                </p>

                <div className="space-y-2.5 pt-1">
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#41B349] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-900 text-xs sm:text-sm">Right to Access / Know: </span>
                      <span className="text-xs text-gray-600">You may request confirmation of whether we process your data and obtain a verifiable copy.</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#41B349] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-900 text-xs sm:text-sm">Right to Rectification: </span>
                      <span className="text-xs text-gray-600">You may demand corrections to inaccurate, out-of-date, or incomplete records.</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#41B349] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-900 text-xs sm:text-sm">Right to Erasure (&ldquo;Be Forgotten&rdquo;): </span>
                      <span className="text-xs text-gray-600">You may request permanent deletion of your personal records where no statutory justification for retention persists.</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#41B349] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-900 text-xs sm:text-sm">Right to Data Portability: </span>
                      <span className="text-xs text-gray-600">You may request your information in a structured, commonly utilized, machine-readable format (e.g. JSON or CSV).</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#41B349] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-900 text-xs sm:text-sm">Right to Withdraw Consent: </span>
                      <span className="text-xs text-gray-600">You can withdraw marketing or newsletter consent at any time using the &ldquo;Unsubscribe&rdquo; link in emails.</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs sm:text-sm text-[#1b4e2c]">
                  <p>
                    <strong>Exercising Your Rights:</strong> To submit a verifiable data subject request, please contact our Privacy Team at{" "}
                    <a href="mailto:info@techsolutionor.com" className="font-bold underline text-[#36963D]">
                      info@techsolutionor.com
                    </a>. We respond to all authentic requests within <strong>30 days</strong> without fee.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 13: Third-Party Links */}
            <article id="third-party-links" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  13. Third-Party Links
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Our website may feature links to external websites, third-party frameworks, client case studies, technology documentation, and official social media accounts (e.g., LinkedIn, GitHub, YouTube, Instagram, X).
                </p>
                <p>
                  Tech Solutionor does not oversee, endorse, or exercise control over the privacy architectures or editorial content of third-party domains. When navigating away from techsolutionor.com, we strongly advise examining the distinct privacy policies of every external website you visit.
                </p>
              </div>
            </article>

            {/* Section 14: Children's Privacy */}
            <article id="childrens-privacy" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  14. Children&apos;s Privacy
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Tech Solutionor&apos;s digital offerings, technological solutions, and website portals are engineered exclusively for commercial enterprises, working professionals, and individuals of legal contracting age.
                </p>
                <p>
                  We do not knowingly collect, solicit, or maintain personal information from children under the age of <strong>16</strong> (or under 13 where local law specifies). If we discover that personal information belonging to a minor has been submitted inadvertently, we take prompt measures to permanently excise such records from our database environments.
                </p>
              </div>
            </article>

            {/* Section 15: International Data Transfers */}
            <article id="international-transfers" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  15. International Data Transfers
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Tech Solutionor serves clients and operates engineering teams across the United Arab Emirates, North America, Europe, the United Kingdom, Australia, and Asia. Consequently, personal data collected by us may be routed, transferred, stored, and processed outside your jurisdiction of origin.
                </p>
                <p>
                  Whenever cross-border transfers occur, Tech Solutionor implements sanctioned legal mechanisms—including <strong>Standard Contractual Clauses (SCCs)</strong> recognized by the European Commission, equivalency determinations, and statutory transfer permits under UAE PDPL—ensuring your personal data enjoys an equivalent standard of protection globally.
                </p>
              </div>
            </article>

            {/* Section 16: Updates to This Privacy Policy */}
            <article id="policy-updates" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  16. Updates to This Privacy Policy
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  We may periodically revise and amend this Privacy Policy to reflect modifications in our software services, regulatory updates, or technological evolutions.
                </p>
                <p>
                  Any revisions become effective immediately upon being published on this page. In the event of material policy adjustments, we will provide conspicuous notices across our homepage or communicate updates directly via email to registered clients.
                </p>
              </div>
            </article>

            {/* Section 17: Contact Information */}
            <article id="contact-information" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  17. Contact Information
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  If you have inquiries, clarifications, or complaints regarding this Privacy Policy, or if you wish to exercise your data subject rights, please communicate directly with our dedicated Data Protection Officer:
                </p>

                {/* Contact Card */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2 text-gray-900 font-bold text-base">
                    <Building className="w-5 h-5 text-[#41B349]" />
                    <span>Tech Solutionor</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-700 pt-1">
                    <div>
                      <p className="font-semibold text-gray-900">Privacy Inquiries Email:</p>
                      <a href="mailto:info@techsolutionor.com" className="text-[#36963D] hover:underline font-medium">
                        info@techsolutionor.com
                      </a>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">General Support &amp; Sales:</p>
                      <a href="mailto:info@techsolutionor.com" className="text-[#36963D] hover:underline font-medium">
                        info@techsolutionor.com
                      </a>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">Corporate Headquarters:</p>
                      <p className="text-gray-600">Dubai, United Arab Emirates</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">Website:</p>
                      <Link href="/" className="text-[#36963D] hover:underline font-medium">
                        https://techsolutionor.com
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 bg-[#41B349] hover:bg-[#36963D] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <span>Contact Us Directly</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/terms-and-conditions"
                    className="inline-flex items-center gap-2 bg-transparent text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300"
                  >
                    <span>Review Terms &amp; Conditions</span>
                  </Link>
                </div>
              </div>
            </article>

          </main>
        </div>
      </div>
    </div>
  );
}
