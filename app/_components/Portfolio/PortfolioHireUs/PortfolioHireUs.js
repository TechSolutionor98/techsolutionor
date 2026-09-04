import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const PortfolioHireUs = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#41B349] text-white overflow-hidden">
      {/* Soft light accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Turn Your Vision Into Reality</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
          Ready to Scale Your Digital Presence with TechSolutionor?
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto font-medium leading-relaxed">
          Partner with our team of elite developers, UI/UX designers, and technology experts to build your next high-converting digital product.
        </p>

        {/* Feature proofs */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-white/95 pt-2 pb-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Dedicated Full-Stack Team</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-white" />
            <span>Fast Turnaround &amp; 95+ PageSpeed</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>Enterprise Security &amp; NDA Protected</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/hire-us"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-white text-[#41B349] font-black text-base shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
          >
            <span>Hire Our Tech Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black/15 hover:bg-black/25 border border-white/40 text-white font-bold text-base backdrop-blur-sm transition-all duration-300"
          >
            <span>Request Free Consultation</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHireUs;
