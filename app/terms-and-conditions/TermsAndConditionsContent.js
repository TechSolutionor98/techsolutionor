"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Layers,
  Globe,
  UserCheck,
  Send,
  Shield,
  FileCode,
  ExternalLink,
  CreditCard,
  Lock,
  AlertTriangle,
  AlertCircle,
  ShieldAlert,
  XCircle,
  RefreshCw,
  Scale,
  Mail,
  Building,
  ChevronRight
} from "lucide-react";

const sections = [
  { id: "introduction", title: "1. Introduction", icon: FileText },
  { id: "acceptance-of-terms", title: "2. Acceptance of Terms", icon: CheckCircle2 },
  { id: "about-our-services", title: "3. About Our Services", icon: Layers },
  { id: "use-of-the-website", title: "4. Use of the Website", icon: Globe },
  { id: "user-responsibilities", title: "5. User Responsibilities", icon: UserCheck },
  { id: "service-requests", title: "6. Service Requests & Communications", icon: Send },
  { id: "intellectual-property", title: "7. Intellectual Property Rights", icon: Shield },
  { id: "website-content", title: "8. Website Content", icon: FileCode },
  { id: "third-party-links", title: "9. Third-Party Links & Services", icon: ExternalLink },
  { id: "payments-and-fees", title: "10. Payments & Service Fees", icon: CreditCard },
  { id: "privacy-data-protection", title: "11. Privacy & Data Protection", icon: Lock },
  { id: "limitation-of-liability", title: "12. Limitation of Liability", icon: AlertTriangle },
  { id: "disclaimer-of-warranties", title: "13. Disclaimer of Warranties", icon: AlertCircle },
  { id: "indemnification", title: "14. Indemnification", icon: ShieldAlert },
  { id: "termination", title: "15. Termination", icon: XCircle },
  { id: "changes-to-terms", title: "16. Changes to These Terms", icon: RefreshCw },
  { id: "governing-law", title: "17. Governing Law & Jurisdiction", icon: Scale },
  { id: "contact-information", title: "18. Contact Information", icon: Mail },
];

export default function TermsAndConditionsContent() {
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
            <Scale className="w-4 h-4 text-[#41B349]" />
            <span>TERMS OF ENGAGEMENT &amp; SERVICE</span>
          </div>

          {/* Main Title */}
          <h1 
            className="text-3xl sm:text-5xl md:text-6xl font-black text-[#111827] tracking-tight leading-[1.15] mb-6"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            Terms &amp; <span className="text-[#41B349]">Conditions</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
            These Terms and Conditions govern your access to and use of <strong>Tech Solutionor</strong>&apos;s website, software engineering services, technical consultations, SEO audits, and digital solutions. Please review them carefully.
          </p>
        </div>
      </section>

      {/* Main Content Layout with Sticky Sidebar */}
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
                  <h2 className="text-sm font-bold text-gray-900">Terms Outline</h2>
                  <p className="text-[11px] text-gray-500">Jump directly to a clause</p>
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
                <p className="font-bold text-gray-900 mb-1">Contractual Inquiry?</p>
                <p className="text-gray-600 text-[11.5px] leading-relaxed mb-3">
                  Questions regarding commercial terms, MSAs, or enterprise agreements?
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

          {/* Terms Articles (Right Side) */}
          <main className="lg:col-span-8 space-y-12 sm:space-y-14">
            
            {/* Section 1: Introduction */}
            <article id="introduction" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
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
                  These Terms and Conditions (“Terms”, “Agreement”) constitute a legally binding agreement between you (“User”, “Client”, “you”, or “your”) and <strong>Tech Solutionor</strong> (“Tech Solutionor”, “Company”, “we”, “us”, or “our”), governing your access to and use of our website (<Link href="/" className="text-[#36963D] font-semibold hover:underline">https://techsolutionor.com</Link>), subdomains, client collaboration hubs, and related IT and software engineering services.
                </p>
                <p>
                  Tech Solutionor operates as an international technology engineering and digital transformation consultancy incorporated in the United Arab Emirates, delivering custom web and mobile software development, enterprise cloud architectures, UI/UX engineering, search engine optimization (SEO) audits, digital marketing, and technological staffing solutions across the UAE, GCC, North America, Europe, Australia, and worldwide.
                </p>
              </div>
            </article>

            {/* Section 2: Acceptance of Terms */}
            <article id="acceptance-of-terms" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  2. Acceptance of Terms
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  By accessing, browsing, submitting inquiries through, or utilizing any portion of this website, you explicitly confirm that you are at least 18 years of age, possess the legal capacity to enter into binding agreements, and unequivocally accept these Terms and our <Link href="/privacy-policy" className="text-[#36963D] font-semibold hover:underline">Privacy Policy</Link>.
                </p>
                <p>
                  If you are using this website or engaging services on behalf of a corporation, partnership, or other legal entity, you represent and warrant that you hold full legal authorization to bind that entity to these Terms. If you do not accept these Terms in their entirety, you must terminate your access to our website immediately.
                </p>
              </div>
            </article>

            {/* Section 3: About Our Services */}
            <article id="about-our-services" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  3. About Our Services
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Tech Solutionor delivers high-performance technology capabilities across diverse specializations:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/50">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Web Application Engineering</p>
                    <p className="text-xs text-gray-500">Custom web development using modern stacks (Laravel, React, Next.js, Python, PHP, Node.js, Vue).</p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/50">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Native &amp; Cross-Platform Mobile</p>
                    <p className="text-xs text-gray-500">Scalable mobile apps for iOS (Swift) and Android (Kotlin), alongside Flutter and React Native cross-platform codebases.</p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/50">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm mb-1">E-Commerce &amp; POS Solutions</p>
                    <p className="text-xs text-gray-500">Custom Point of Sale (POS) engineering and storefront implementations (Shopify, Magento, custom headless commerce).</p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/50">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm mb-1">SEO &amp; Growth Marketing</p>
                    <p className="text-xs text-gray-500">Technical SEO site audits, competitor intelligence, search intent alignment, and high-ROI digital marketing.</p>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-[#1e4a2d] mt-2">
                  <p>
                    <strong>Master Agreements Prevail:</strong> While browsing this website is governed by these Terms, formal commercial software development engagements are additionally governed by individual project agreements, such as signed Master Services Agreements (MSAs), Statements of Work (SOWs), and Service Level Agreements (SLAs). In the event of a conflict between these Terms and a mutually executed SOW, the specific terms of the executed SOW shall take precedence.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 4: Use of the Website */}
            <article id="use-of-the-website" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  4. Use of the Website
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  You are granted a non-exclusive, non-transferable, revocable license to access and use our website strictly in accordance with these Terms for legitimate business evaluation and informational purposes.
                </p>

                <p className="font-bold text-gray-900 text-sm pt-1">Prohibited Conduct:</p>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                    <span><strong>Automated Scraping:</strong> Using bots, spiders, crawlers, scrapers, or programmatic data extraction tools without express written permission.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                    <span><strong>System Penetration:</strong> Attempting to probe, scan, or breach the vulnerability of any network, system, server, or database connected to Tech Solutionor.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                    <span><strong>Malicious Code:</strong> Knowingly transmitting viruses, worms, trojans, ransomware, or code intended to corrupt or impede platform operations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                    <span><strong>Impersonation &amp; Spam:</strong> Impersonating Tech Solutionor staff, forging email headers, or spamming interactive contact forms or quote request endpoints.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Section 5: User Responsibilities */}
            <article id="user-responsibilities" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  5. User Responsibilities
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  As a user of our website and services, you agree to:
                </p>

                <ul className="space-y-2 pt-1">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Accurate Information:</strong> Furnish authentic, accurate, current, and verifiable information in all inquiry forms, quote requests, and job application submissions.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Domain Ownership Representation:</strong> When requesting a website audit, you warrant that you are the verified owner, authorized employee, or designated technical consultant of the submitted domain.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Access Credential Security:</strong> Safeguard any client dashboard, repository, or communication portal credentials issued by Tech Solutionor and promptly report unauthorized access.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Section 6: Service Requests and Communications */}
            <article id="service-requests" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <Send className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  6. Service Requests and Communications
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  When you submit an inquiry through our <em>Contact Us</em> form, trigger the <em>Get A Quote</em> modal, schedule a meeting via our calendar widget, or apply for an opening, the submission constitutes a preliminary request for proposal or consultation—not a binding contract to provide services.
                </p>
                <p>
                  Tech Solutionor reserves the unilateral right to accept, decline, or prioritize any project inquiry based on technical feasibility, operational bandwidth, and contractual terms. By providing your email and phone number, you consent to receive direct communications regarding your request. You may opt out of promotional newsletters at any time.
                </p>
              </div>
            </article>

            {/* Section 7: Intellectual Property Rights */}
            <article id="intellectual-property" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  7. Intellectual Property Rights
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl">
                  <p className="font-bold text-gray-900 text-sm mb-1">Tech Solutionor Proprietary Assets:</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    All website architecture, source code, visual components, UI designs, animations, logos, trademarks, copywriting, diagrams, and underlying methodologies are the exclusive intellectual property of Tech Solutionor and protected by UAE copyright, trademark, and international IP conventions.
                  </p>
                </div>

                <p className="font-bold text-gray-900 text-sm pt-1">Client Custom Deliverables:</p>
                <p>
                  Unless otherwise specified in a mutually signed Statement of Work (SOW):
                </p>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Custom Code &amp; Brand Assets:</strong> Upon full and final settlement of all agreed project milestones and invoices, all bespoke code, custom designs, and database schemas crafted specifically for the client are assigned to the client.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Pre-Existing Frameworks:</strong> Tech Solutionor retains all rights to its pre-existing development toolkits, boilerplates, and reusable modular libraries, granting the client a perpetual, non-exclusive license to utilize them within the delivered software.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Section 8: Website Content */}
            <article id="website-content" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <FileCode className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  8. Website Content
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Articles, case studies, technology stacks, blog posts, and technical benchmarks published on our site are provided for general informational and educational purposes. While we strive to maintain technical accuracy and up-to-date documentation, we make no guarantees that all content is free of typographical oversights, deprecated API references, or evolving third-party library shifts.
                </p>
                <p>
                  Showcased client projects and case studies demonstrate historical technical implementations and do not constitute ongoing public endorsements or warranties of specific future commercial performance.
                </p>
              </div>
            </article>

            {/* Section 9: Third-Party Links and Services */}
            <article id="third-party-links" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  9. Third-Party Links and Services
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Our site may contain links to external third-party software platforms, cloud providers, open-source repositories (e.g. GitHub), or professional social networks (LinkedIn, YouTube, X).
                </p>
                <p>
                  Tech Solutionor does not oversee, endorse, or assume responsibility for the accuracy, policies, or practices of third-party platforms. When following external links, you do so at your own discretion and are subject to the terms and privacy conditions of the destination site.
                </p>
              </div>
            </article>

            {/* Section 10: Payments and Service Fees */}
            <article id="payments-and-fees" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  10. Payments and Service Fees, where applicable
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Commercial parameters for custom software engineering and digital services are structured under formal contractual agreements:
                </p>

                <ul className="space-y-2 pt-1">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Invoicing &amp; Milestones:</strong> Projects are invoiced according to the payment schedules, milestone approvals, or retainer frequencies defined in the executed SOW.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Currency &amp; Taxes:</strong> All pricing is quoted in UAE Dirhams (AED) or US Dollars (USD) unless agreed otherwise. Invoices are subject to applicable Value Added Tax (VAT) as mandated by UAE Federal Tax Authority (FTA) regulations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span><strong>Delinquent Accounts:</strong> Tech Solutionor reserves the right to pause active development sprints, staging server access, or production deployments if milestone invoices remain overdue past contractual grace periods.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Section 11: Privacy and Data Protection */}
            <article id="privacy-data-protection" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  11. Privacy and Data Protection
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Your privacy is of vital importance. The collection, use, retention, and processing of personal information submitted through our website is governed strictly by our <Link href="/privacy-policy" className="text-[#36963D] font-semibold hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference.
                </p>
                <p>
                  We implement robust technical and organizational security controls (including TLS 1.3 encryption and restricted role-based database access) to protect information against unauthorized disclosure, alteration, or destruction.
                </p>
              </div>
            </article>

            {/* Section 12: Limitation of Liability */}
            <article id="limitation-of-liability" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  12. Limitation of Liability
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed">
                  <p className="font-bold mb-1">Crucial Liability Cap:</p>
                  <p>
                    To the maximum extent permitted under applicable law, Tech Solutionor, its executives, engineers, contractors, and affiliates shall not be liable for any indirect, incidental, consequential, special, punitive, or exemplary damages—including but not limited to loss of profits, commercial revenue, anticipated savings, data corruption, downtime costs, or loss of business reputation—arising out of or related to your use of this website or reliance on digital materials.
                  </p>
                </div>

                <p>
                  In all events, Tech Solutionor&apos;s total cumulative liability arising from any claim related to website browsing or pre-contractual discussions shall be strictly capped at <strong>$100 USD</strong> (or the equivalent in AED). For active client engagements, liability caps are governed strictly by the liability provisions specified in the signed Master Services Agreement.
                </p>
              </div>
            </article>

            {/* Section 13: Disclaimer of Warranties */}
            <article id="disclaimer-of-warranties" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  13. Disclaimer of Warranties
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  This website and all informational assets are provided strictly on an <strong>&ldquo;as is&rdquo;</strong> and <strong>&ldquo;as available&rdquo;</strong> basis without warranties of any nature, whether express, statutory, or implied, including warranties of merchantability, fitness for a particular commercial purpose, or non-infringement.
                </p>
                <p>
                  Tech Solutionor does not guarantee that website functions will operate uninterrupted or error-free, that defects will be instantly corrected, or that the server infrastructure is entirely impervious to malicious cyberattacks or server downtime outside our reasonable control.
                </p>
                <p className="text-xs text-gray-500 italic">
                  * SEO &amp; Digital Marketing Disclaimer: While Tech Solutionor applies best-in-class industry methodologies, search engine rankings and advertising algorithms are governed entirely by independent third parties (such as Google, Microsoft, Meta, and Apple). Tech Solutionor makes no representation or warranty guaranteeing specific rank positions, traffic surges, or algorithmic outcomes.
                </p>
              </div>
            </article>

            {/* Section 14: Indemnification */}
            <article id="indemnification" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  14. Indemnification
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  You agree to defend, indemnify, and hold harmless Tech Solutionor, its officers, directors, software developers, agents, and licensors from and against any claims, liabilities, damages, judgments, awards, losses, costs, and expenses (including reasonable legal and attorney fees) arising from:
                </p>

                <ul className="space-y-2 pt-1 text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span>Your willful breach of any provision within these Terms &amp; Conditions.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span>Any materials, intellectual property, credentials, or domain access supplied by you that infringe upon third-party copyrights, trademarks, or trade secrets.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] mt-2 shrink-0" />
                    <span>Any unlawful, defamatory, or fraudulent activity conducted through your interaction with our platforms.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Section 15: Termination */}
            <article id="termination" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <XCircle className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  15. Termination
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Tech Solutionor reserves the right, in its sole discretion and without prior notice or liability, to suspend, restrict, or terminate your access to all or part of our website or consultative channels for any conduct that we determine violates these Terms, harms our brand reputation, or infringes on the rights of others.
                </p>
                <p>
                  Provisions that by their nature should survive termination shall survive, including Intellectual Property Rights, Limitation of Liability, Disclaimer of Warranties, Indemnification, and Governing Law.
                </p>
              </div>
            </article>

            {/* Section 16: Changes to These Terms */}
            <article id="changes-to-terms" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  16. Changes to These Terms
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  We reserve the right to revise or update these Terms &amp; Conditions periodically to align with legislative adjustments, technological advancements, or changes in our operational procedures.
                </p>
                <p>
                  Any updates take effect immediately upon being posted on this page. Your continued use of the website following published changes signifies your agreement to the revised Terms.
                </p>
              </div>
            </article>

            {/* Section 17: Governing Law and Jurisdiction */}
            <article id="governing-law" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  17. Governing Law and Jurisdiction
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  These Terms &amp; Conditions, and any disputes or claims arising out of or in connection with them or their subject matter, shall be governed by and construed in accordance with the laws of the <strong>Emirate of Dubai and the applicable Federal Laws of the United Arab Emirates</strong>, without giving effect to any conflict of law principles.
                </p>

                <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-[#1e4a2d]">
                  <p className="font-bold mb-1">Dispute Resolution Procedure:</p>
                  <p>
                    In the event of any controversy or dispute, the parties shall first endeavor in good faith to resolve the matter through amicable bilateral negotiations for a period of thirty (30) business days. If unresolved, the dispute shall be submitted to the exclusive jurisdiction of the competent courts of <strong>Dubai, United Arab Emirates</strong>.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 18: Contact Information */}
            <article id="contact-information" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  18. Contact Information
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  If you have questions, feedback, or legal notices concerning these Terms &amp; Conditions, please reach out to our legal and commercial team:
                </p>

                {/* Contact Card */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2 text-gray-900 font-bold text-base">
                    <Building className="w-5 h-5 text-[#41B349]" />
                    <span>Tech Solutionor</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-700 pt-1">
                    <div>
                      <p className="font-semibold text-gray-900">Legal &amp; Contract Inquiries:</p>
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
                      <p className="font-semibold text-gray-900">Headquarters:</p>
                      <p className="text-gray-600">Dubai, United Arab Emirates</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">Official Website:</p>
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
                    href="/privacy-policy"
                    className="inline-flex items-center gap-2 bg-transparent text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300"
                  >
                    <span>Read Privacy Policy</span>
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
