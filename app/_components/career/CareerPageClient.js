"use client";

import React from "react";
import CareerHero from "./CareerHero";
import JobApplicationForm from "./JobApplicationForm";
import Newsletter from "../Home/Newsletter/Newsletter";
import CareerFAQ from "./CareerFAQ";

export default function CareerPageClient() {
  return (
    <div className="overflow-x-hidden bg-white text-[#0D0F12]">
      {/* 1. Hero Section */}
      <CareerHero />

      {/* 2. Submit Your Application Form */}
      <JobApplicationForm />

      {/* 3. Hire Us Section (Exact component from Technologies page) */}
      <Newsletter />

      {/* 4. Frequently Asked Questions (Exact component from Technologies page) */}
      <CareerFAQ />
    </div>
  );
}
