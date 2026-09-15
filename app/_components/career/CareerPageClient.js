"use client";

import React from "react";
import CareerHero from "./CareerHero";
import JobApplicationForm from "./JobApplicationForm";
import Newsletter from "../Home/Newsletter/Newsletter";
import CareerFAQ from "./CareerFAQ";

export default function CareerPageClient({ cmsContent }) {
  return (
    <div className="overflow-x-hidden bg-white text-[#0D0F12]">
      {/* 1. Hero Section */}
      <CareerHero cmsContent={cmsContent} />

      {/* 2. Submit Your Application Form */}
      <JobApplicationForm />

      {/* 3. Newsletter Section */}
      <Newsletter />

      {/* 4. Frequently Asked Questions */}
      <CareerFAQ cmsContent={cmsContent} />
    </div>
  );
}
