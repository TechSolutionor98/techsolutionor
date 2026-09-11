"use client";

import React, { useState } from "react";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  Layers,
  Sparkles
} from "lucide-react";

export const jobListings = [
  {
    id: "fs-dev-01",
    title: "Senior Full-Stack Developer",
    department: "Engineering",
    location: "Remote / Hybrid (Dubai & Global)",
    type: "Full-Time",
    experience: "4 - 7 Years",
    summary: "Architect and build high-performance web applications, scalable REST/GraphQL APIs, and microservices using Next.js, Node.js, and cloud ecosystems.",
    skills: ["Next.js", "React", "Node.js", "MongoDB", "TypeScript", "TailwindCSS"],
    badge: "Hot Role 🔥",
  },
  {
    id: "uiux-02",
    title: "Lead UI/UX Product Designer",
    department: "Design",
    location: "Remote / Hybrid",
    type: "Full-Time",
    experience: "3 - 6 Years",
    summary: "Lead end-to-end design systems, high-fidelity wireframes, intuitive user journeys, and interactive prototypes in Figma for web & mobile apps.",
    skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Interaction Design"],
    badge: "Urgent Hiring",
  },
  {
    id: "mobile-03",
    title: "Senior Mobile Engineer (Flutter / React Native)",
    department: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-Time",
    experience: "3 - 5 Years",
    summary: "Develop fluid, cross-platform iOS and Android applications with optimized offline sync, animations, and robust backend integrations.",
    skills: ["Flutter", "Dart", "React Native", "State Management", "App Store Deployment"],
    badge: "Immediate Start",
  },
  {
    id: "devops-04",
    title: "DevOps & Cloud Infrastructure Architect",
    department: "DevOps & QA",
    location: "Remote (Global)",
    type: "Full-Time",
    experience: "4 - 8 Years",
    summary: "Design automated CI/CD pipelines, containerized microservices on Kubernetes, and enterprise cloud infrastructure on AWS & GCP.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux"],
    badge: "Global Remote",
  },
  {
    id: "seo-mkt-05",
    title: "SEO & Digital Growth Strategist",
    department: "Marketing",
    location: "Hybrid / On-site",
    type: "Full-Time",
    experience: "2 - 5 Years",
    summary: "Drive enterprise technical SEO audits, high-impact content optimization, keyword dominance, and performance marketing growth.",
    skills: ["Technical SEO", "Google Analytics 4", "Search Console", "Ahrefs/SEMrush", "Growth Marketing"],
    badge: "Key Growth Role",
  },
  {
    id: "qa-auto-06",
    title: "QA Automation & Reliability Engineer",
    department: "DevOps & QA",
    location: "Remote / Hybrid",
    type: "Full-Time",
    experience: "3 - 5 Years",
    summary: "Build resilient automated testing suites (Playwright/Cypress), end-to-end regression frameworks, and API test suites for enterprise products.",
    skills: ["Cypress", "Playwright", "Jest", "API Automation", "Performance Testing"],
    badge: "Engineering",
  },
];

const categories = [
  "All Openings",
  "Engineering",
  "Design",
  "Marketing",
  "DevOps & QA",
];

export default function OpenPositions({ onSelectRole }) {
  const [activeCategory, setActiveCategory] = useState("All Openings");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = jobListings.filter((job) => {
    const matchesCategory =
      activeCategory === "All Openings" || job.department === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApplyClick = (jobTitle) => {
    if (onSelectRole) {
      onSelectRole(jobTitle);
    }
    const formElement = document.getElementById("application-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="open-positions" className="py-20 bg-[#FBFDFB] relative overflow-hidden border-b border-gray-100">
      {/* Background radial accent */}
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-[#36963D]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-12">
          <div 
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#36963D]/10 border border-[#36963D]/30 text-[#36963D] font-mono text-xs uppercase tracking-widest font-bold mb-4"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            <span>JOIN OUR TEAM</span>
          </div>

          <h2 
            className="text-3xl sm:text-4xl md:text-[42px] font-black tracking-tight text-[#0D0F12] mb-5 leading-tight"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            Available Job <span className="text-[#36963D]">Positions</span>
          </h2>

          <p 
            className="text-[#475569] text-base sm:text-lg leading-relaxed font-normal"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Find your next career chapter. We offer competitive salaries, flexible work arrangements, and an ambitious team pushing the boundaries of digital craft.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10 pb-6 border-b border-gray-200">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#36963D] text-white shadow-sm"
                    : "bg-white text-[#475569] hover:bg-gray-100 border border-gray-200"
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role or skill..."
              className="w-full bg-white border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm text-[#0D0F12] placeholder-gray-400 focus:outline-none focus:border-[#36963D] transition-colors"
            />
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-2xl p-7 shadow-xs hover:shadow-xl hover:border-[#36963D]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-bold text-[#36963D] bg-[#36963D]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      {job.department}
                    </span>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {job.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-xl font-bold text-[#0D0F12] mb-3 group-hover:text-[#36963D] transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {job.title}
                  </h3>

                  {/* Meta: Location, Type, Experience */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748B] mb-4">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#36963D]" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#36963D]" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#36963D]" />
                      {job.experience}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-[#475569] leading-relaxed mb-5">
                    {job.summary}
                  </p>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {job.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-medium text-[#334155] bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Actively Reviewing Applications
                  </span>

                  <button
                    onClick={() => handleApplyClick(job.title)}
                    className="bg-[#36963D] hover:bg-[#2e8234] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-xs hover:shadow-md group-hover:scale-102"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    <span>Apply For This Role</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-gray-200">
              <p className="text-[#64748B] text-base mb-3">No open positions found matching your search.</p>
              <button
                onClick={() => { setActiveCategory("All Openings"); setSearchQuery(""); }}
                className="text-[#36963D] font-bold text-sm hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* General Application Banner */}
        <div className="bg-gradient-to-r from-[#0D0F12] via-[#181A18] to-[#0D0F12] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#36963D]/20 text-[#36963D] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>General Talent Pool</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Don’t see a role that fits your specific profile?
            </h3>
            <p className="text-gray-300 text-sm sm:text-base max-w-[620px]">
              We are constantly seeking exceptional designers, engineers, and digital marketing leaders. Submit a general application and our talent team will review your profile.
            </p>
          </div>

          <button
            onClick={() => handleApplyClick("General Application / Other")}
            className="whitespace-nowrap bg-[#36963D] hover:bg-[#2e8234] text-white px-7 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Submit General Application
          </button>
        </div>
      </div>
    </section>
  );
}
