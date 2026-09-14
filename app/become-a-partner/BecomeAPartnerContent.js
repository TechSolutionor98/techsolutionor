"use client";

import React from "react";
import Link from "next/link";
import {
  Handshake,
  Users,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Code2,
  Share2,
  Building2,
  ShieldCheck,
  Zap,
  DollarSign,
  Layers,
  Headphones,
  Mail,
  Clock,
  Sparkles
} from "lucide-react";
import Faq from "@/components/Faq/Faq";

export default function BecomeAPartnerContent() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const partnerTracks = [
    {
      id: "referral",
      title: "Agency & Referral Partner",
      badge: "HIGHEST COMMISSIONS",
      icon: <TrendingUp className="w-6 h-6 text-[#36963D]" />,
      summary: "Ideal for creative agencies, consultancies, and independent advisors looking to monetize client opportunities.",
      benefits: [
        "Earn up to 20%–25% commission on closed project contracts",
        "Recurring commissions on retainer & maintenance agreements",
        "Zero delivery overhead — our senior team handles the entire technical lifecycle",
        "Transparent milestone payout reporting & automated wire transfers"
      ]
    },
    {
      id: "white-label",
      title: "White-Label Co-Engineering",
      badge: "SCALE YOUR TEAM",
      icon: <Code2 className="w-6 h-6 text-[#36963D]" />,
      summary: "Expand your technical capacity instantly without hiring overhead. We build under your brand under strict NDAs.",
      benefits: [
        "Senior React, Next.js, Node.js, Laravel, Python & Mobile engineers",
        "100% white-label: your client only sees your agency branding",
        "Direct integration into your Slack, Teams, Jira, or ClickUp workflows",
        "Predictable sprint pricing with flexible dedicated team allocations"
      ]
    },
    {
      id: "technology",
      title: "Technology & Cloud Integration",
      badge: "ECOSYSTEM EXPANSION",
      icon: <Share2 className="w-6 h-6 text-[#36963D]" />,
      summary: "For SaaS providers, cloud vendors, and CRM/ERP platforms seeking vetted implementation partners.",
      benefits: [
        "Expert API integrations, custom middleware, and cloud migrations",
        "Joint go-to-market initiatives, case studies, and co-marketing",
        "Dedicated pre-sales technical architects to assist your enterprise deals",
        "Bilateral referral flow: we recommend your platform to our clients"
      ]
    },
    {
      id: "reseller",
      title: "Regional Reseller & Channel Partner",
      badge: "ENTERPRISE DISTRIBUTION",
      icon: <Building2 className="w-6 h-6 text-[#36963D]" />,
      summary: "Distribute Tech Solutionor’s proprietary software solutions, POS systems, and custom tech suites in your region.",
      benefits: [
        "Generous wholesale margins & exclusive territory distribution rights",
        "Complete pre-sales kits, pitch decks, and technical documentation",
        "Joint bidding support on government, enterprise, and public tenders",
        "Tier-2 and Tier-3 engineering support direct from our Dubai engineering hub"
      ]
    }
  ];

  const valueProps = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#36963D]" />,
      title: "Ironclad NDA & Client Protection",
      description: "Your clients remain 100% yours. We operate under stringent non-disclosure and non-compete agreements recognized globally and under UAE PDPL law."
    },
    {
      icon: <Zap className="w-6 h-6 text-[#36963D]" />,
      title: "Elite Engineering Standards",
      description: "Clean code architectures, CI/CD automated test suites, and modern tech stacks (Next.js, React, Node.js, Python, Flutter, Swift, Laravel) delivering enterprise-grade performance."
    },
    {
      icon: <Users className="w-6 h-6 text-[#36963D]" />,
      title: "Dedicated Partner Success Director",
      description: "Get direct access to a dedicated senior manager who joins pre-sales discovery calls, crafts technical proposals, and accelerates deal velocity."
    },
    {
      icon: <DollarSign className="w-6 h-6 text-[#36963D]" />,
      title: "Transparent & Guaranteed Payouts",
      description: "No hidden deductions. Payouts are tied directly to agreed project milestones, paid promptly via swift global wire transfer or preferred currency."
    },
    {
      icon: <Layers className="w-6 h-6 text-[#36963D]" />,
      title: "Agile Sprints & Live Staging",
      description: "Weekly sprint demos, transparent kanban boards, and accessible staging environments give you and your clients total visibility at every step."
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#36963D]" />,
      title: "24/7 Global Delivery & Support",
      description: "Headquartered in Dubai, UAE with round-the-clock development and maintenance support spanning North America, Europe, Middle East, and Asia."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Submit Partner Inquiry",
      desc: "Connect with our corporate team with your agency/company overview and preferred partnership model."
    },
    {
      step: "02",
      title: "Discovery Alignment",
      desc: "A strategic briefing with our Partnerships Director to agree on commission tiers, margins, and operating workflows."
    },
    {
      step: "03",
      title: "Onboarding & Mutual NDA",
      desc: "Sign our bilateral NDA and partnership agreement, and receive our partner toolkit, pitch decks, and technical playbooks."
    },
    {
      step: "04",
      title: "Collaborate & Earn",
      desc: "Submit client referrals or kick off white-label sprint deliveries with full confidence and ongoing executive support."
    }
  ];

  const faqs = [
    {
      question: "How are referral commissions structured and paid?",
      answer: "Referral commissions range between 15% and 25% of the total net contract value, depending on project scale and partnership tier. Commissions are paid out in installments directly matching client payment milestones via global bank transfer. For recurring retainer agreements, commissions continue for up to 12 months."
    },
    {
      question: "How does white-label co-engineering work?",
      answer: "Under white-label arrangements, Tech Solutionor acts as your silent, back-office engineering department. Our developers can work using your company email domains, attend client sprint reviews under your brand name, and communicate strictly within your designated Slack or Teams channels. Our brand is never disclosed."
    },
    {
      question: "Are there any fees or minimum commitments to join?",
      answer: "No. Joining the Tech Solutionor Partner Network is 100% free of charge. There are no registration fees, monthly subscription costs, or rigid quotas required to maintain your active partner status."
    },
    {
      question: "What services and technologies can we offer through Tech Solutionor?",
      answer: "Partners have full access to our multi-disciplinary engineering suite, including custom web application development (Next.js, React, Node.js, Laravel), iOS & Android mobile apps (Swift, Kotlin, Flutter), enterprise software & CRM/POS systems, cloud DevOps (AWS, GCP, Azure), UI/UX product design, and technical SEO & digital marketing."
    },
    {
      question: "Can Tech Solutionor assist with pre-sales client pitches?",
      answer: "Yes! Our senior solutions architects and technical leads are available to join your client discovery sessions, review system requirements, and prepare detailed technical proposals and scopes of work to help you win high-ticket contracts."
    },
    {
      question: "How quickly can we finalize the partnership and start submitting deals?",
      answer: "Most partners are onboarded within 48 hours. Once you submit the application, we hold a brief alignment call, execute mutual NDAs digitally, and you can begin submitting client leads or requesting white-label sprint capacity immediately."
    }
  ];

  return (
    <div className="w-full bg-[#FFFFFF] text-[#111827] min-h-screen">
      
      {/* ========================================================
          1. HERO SECTION (Seamless transition, no separator border)
         ======================================================== */}
      <section className="relative w-full bg-[#FFFFFF] overflow-hidden py-16 sm:py-20 md:py-24">
        {/* Ambient Glow & Dot Pattern */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[420px] bg-[radial-gradient(circle_at_top,_rgba(65,179,73,0.14)_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#41B34912_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/30 text-[#36963D] font-mono text-xs uppercase tracking-widest font-bold mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
            <Handshake className="w-3.5 h-3.5 text-[#41B349]" />
            <span>GLOBAL PARTNERSHIP NETWORK</span>
          </div>

          {/* Main Headline */}
          <h1 
            className="text-3xl sm:text-5xl md:text-6xl font-black text-[#111827] tracking-tight leading-[1.14] mb-6"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            Scale Faster, Earn More With Our <br className="hidden sm:inline" />
            <span className="text-[#41B349]">Strategic Technology Partnership</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal mb-8">
            Collaborate with <strong>Tech Solutionor</strong> to expand your technical delivery capacity, monetize high-value enterprise referrals, or deliver white-label custom software, web apps, and digital solutions with guaranteed quality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <button
              onClick={() => scrollTo("partner-inquiries")}
              className="bg-[#36963D] hover:bg-[#2d8033] text-white px-8 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5 group"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo("partner-tracks")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-7 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer"
            >
              Explore Partner Tracks
            </button>
          </div>

          {/* Key Metric Highlight Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto text-left">
            <div className="bg-white/80 rounded-2xl p-5 border border-gray-200/90 shadow-2xs backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-[#36963D] mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Up to 25%
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">Referral Commission</p>
              <p className="text-[11px] text-gray-500 mt-0.5">High-margin payouts on closed contracts</p>
            </div>

            <div className="bg-white/80 rounded-2xl p-5 border border-gray-200/90 shadow-2xs backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-[#111827] mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                100%
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">White-Label Delivery</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Strict NDAs &amp; client confidentiality</p>
            </div>

            <div className="bg-white/80 rounded-2xl p-5 border border-gray-200/90 shadow-2xs backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-[#111827] mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                48 Hours
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">Rapid Onboarding</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Quick NDA &amp; immediate project kickoff</p>
            </div>

            <div className="bg-white/80 rounded-2xl p-5 border border-gray-200/90 shadow-2xs backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-[#36963D] mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                UAE &amp; Global
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">International Reach</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Dubai HQ with worldwide coverage</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. PARTNERSHIP TRACKS / MODELS
         ======================================================== */}
      <section id="partner-tracks" className="w-full py-16 sm:py-20 md:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#41B349]/10 text-[#36963D] font-mono text-xs uppercase tracking-wider font-bold mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>TAILORED COLLABORATION</span>
            </div>
            <h2 
              className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-4"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              Choose the Partnership Model That Fits You
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Whether you want to refer enterprise deals, expand your agency’s development capacity under your own brand, or resell proprietary software, we have a structured program built for your growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {partnerTracks.map((track) => (
              <div 
                key={track.id}
                className="bg-white rounded-3xl p-7 sm:p-9 border border-gray-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md hover:border-[#41B349]/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#41B349]/10 flex items-center justify-center">
                      {track.icon}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-[11px] font-bold tracking-wide uppercase">
                      {track.badge}
                    </span>
                  </div>

                  <h3 
                    className="text-xl sm:text-2xl font-bold text-gray-900 mb-3"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {track.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {track.summary}
                  </p>

                  <div className="space-y-3 mb-8">
                    {track.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#36963D] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-[13.5px] text-gray-700 leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => scrollTo("partner-inquiries")}
                  className="w-full py-3 px-5 rounded-xl border border-gray-200 hover:border-[#36963D] hover:bg-[#41B349]/5 text-gray-900 hover:text-[#36963D] font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Inquire About This Track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          3. WHY PARTNER WITH TECH SOLUTIONOR (Value Props)
         ======================================================== */}
      <section className="w-full py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#41B349]/10 text-[#36963D] font-mono text-xs uppercase tracking-wider font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE TECH SOLUTIONOR ADVANTAGE</span>
            </div>
            <h2 
              className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-4"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              Why Top Agencies &amp; Consultancies Partner With Us
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We treat our partners as true business allies. From transparent financial terms to elite engineering execution, our platform is built to make your partnership frictionless and profitable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {valueProps.map((vp, index) => (
              <div 
                key={index}
                className="bg-gray-50/60 rounded-3xl p-6 sm:p-7 border border-gray-200/80 hover:bg-white hover:border-[#41B349]/40 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-2xs border border-gray-100 flex items-center justify-center mb-5">
                  {vp.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {vp.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {vp.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          4. HOW IT WORKS (4-STEP ONBOARDING)
         ======================================================== */}
      <section className="w-full py-16 sm:py-20 md:py-24 bg-gray-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#41B349]/10 text-[#36963D] font-mono text-xs uppercase tracking-wider font-bold mb-3">
              <Clock className="w-3.5 h-3.5" />
              <span>FAST &amp; FRICTIONLESS</span>
            </div>
            <h2 
              className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-4"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              How Our Partnership Works
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Get up and running in 4 clear, transparent steps. From application to kickoff in under 48 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-2xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#41B349]/15 text-[#36963D] font-mono text-lg font-black flex items-center justify-center mb-5">
                    {st.step}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                    {st.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          5. FREQUENTLY ASKED QUESTIONS (Matching Home/Site FAQ UI)
         ======================================================== */}
      <Faq title="Frequently Asked Questions (FAQs)" faqs={faqs} />

      {/* ========================================================
          6. DIRECT SUPPORT & CTA BOX
         ======================================================== */}
      <section id="partner-inquiries" className="w-full py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0D0F12] border border-gray-800 text-white rounded-3xl p-8 sm:p-12 md:p-14 relative overflow-hidden shadow-xl">
            {/* Top Glowing Green Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#41B349] to-transparent opacity-90" />
            
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#41B349] font-mono text-xs uppercase tracking-wider font-bold mb-4">
                <Mail className="w-3.5 h-3.5" />
                <span>DIRECT PARTNERSHIP INQUIRIES</span>
              </div>

              <h2 
                className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4"
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
              >
                Ready to Grow Together with Tech Solutionor?
              </h2>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
                Connect directly with our corporate team in Dubai or schedule a strategic briefing to discuss bespoke partner models and commercial opportunities.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="mailto:info@techsolutionor.com"
                  className="inline-flex items-center gap-2.5 bg-[#41B349] hover:bg-[#36963D] text-white px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg hover:scale-105"
                >
                  <Mail className="w-4 h-4" />
                  <span>info@techsolutionor.com</span>
                </a>

                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-200"
                >
                  <span>Contact Page</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
