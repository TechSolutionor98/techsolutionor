"use client";

import { useEffect } from "react";
import { useQuote } from "@/app/_context/QuoteContext";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { AISpotlight } from "@/components/sections/AISpotlight";
import { Safety } from "@/components/sections/Safety";
import { Agencies } from "@/components/sections/Agencies";
import { Team } from "@/components/sections/Team";
import { FAQ, FinalCTA, Footer, Pricing, Security } from "@/components/sections/Closing";

export default function WAMarketingPage() {
  const { openQuote } = useQuote();

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#book-demo") {
      openQuote();
    }
    const handleHashChange = () => {
      if (window.location.hash === "#book-demo") {
        openQuote();
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [openQuote]);

  return (
    <>
      <Header />
      <main id="main">
        <div id="top" />
        <Hero />
        <TrustStrip />
        <ProblemSolution />
        <HowItWorks />
        <Features />
        <AISpotlight />
        <Safety />
        <Agencies />
        <Team />
        <Security />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
