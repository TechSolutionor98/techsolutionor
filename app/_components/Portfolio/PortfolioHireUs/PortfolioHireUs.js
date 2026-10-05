import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import {
  SectionBadge,
  SectionHeading,
  SectionParagraph,
  ButtonText,
} from '@/components/Typography';

const PortfolioHireUs = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#41B349] text-white overflow-hidden">
      {/* Soft light accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
        <div className="flex justify-center">
          <SectionBadge variant="pill" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Turn Your Vision Into Reality
          </SectionBadge>
        </div>

        <SectionHeading as="h2" size="section" theme="light">
          Ready to Scale Your Digital Presence with TechSolutionor?
        </SectionHeading>

        <SectionParagraph size="lg" theme="light" className="max-w-2xl mx-auto text-white/95">
          Partner with our team of elite developers, UI/UX designers, and technology experts to build your next high-converting digital product.
        </SectionParagraph>

        {/* Feature proofs */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-white/95 pt-2 pb-2 font-jakarta tracking-[-0.01em]">
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
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-white text-[#41B349] shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
          >
            <ButtonText className="text-base font-bold">Hire Our Tech Team</ButtonText>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black/15 hover:bg-black/25 border border-white/40 text-white backdrop-blur-sm transition-all duration-300"
          >
            <ButtonText className="text-base font-bold">Request Free Consultation</ButtonText>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHireUs;
