'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  ArrowRight,
  Check,
  Lightbulb,
  AlertTriangle,
  Cpu,
  TrendingUp,
  Zap,
  ShoppingCart,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { portfolioProjects } from './portfolioData';

const PortfolioProjects = () => {
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Close modal on Escape key and handle body scroll locking
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null);
      }
    };
    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalProject]);

  return (
    <section id="portfolio-showcase" className="relative py-16 md:py-24 bg-[#FBFDFC] text-[#111827] overflow-hidden">
      {/* Ambient background soft light glows */}
      <div className="absolute top-1/4 -right-48 w-[600px] h-[600px] bg-[#41B349]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-[600px] h-[600px] bg-[#41B349]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#41B34910_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Alternating Case Studies List: Equal Height & Perfectly Balanced */}
        <div className="space-y-16 sm:space-y-24">
          {portfolioProjects.map((project, index) => {
            const isOdd = index % 2 === 0; // Project 1, 3, 5... (0-indexed)
            const numberFormatted = String(project.id).padStart(2, '0');

            return (
              <article
                key={project.id}
                id={`project-${project.slug}`}
                className="relative group scroll-mt-24"
              >
                {/* DESKTOP 3-PART ALTERNATING LAYOUT (lg and above) */}
                <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* PROJECT 1, 3, 5: LEFT IMAGE | CENTER NUMBER | RIGHT CONTENT */}
                  {isOdd ? (
                    <>
                      {/* Left: Project Image (5 cols) */}
                      <div className="lg:col-span-5 h-full">
                        <ProjectImageComponent project={project} />
                      </div>

                      {/* Center: Number 01, 03... (2 cols) */}
                      <div className="lg:col-span-2 flex flex-col items-center justify-center text-center relative py-4">
                        <div className="w-0.5 flex-1 bg-gradient-to-b from-transparent via-[#41B349]/30 to-[#41B349] mb-3 min-h-[30px]" />
                        <div className="relative group-hover:scale-110 transition-transform duration-300 shrink-0">
                          <span
                            className="text-6xl xl:text-7xl font-black tracking-tighter text-[#41B349] select-none block drop-shadow-sm leading-none"
                            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                          >
                            {numberFormatted}
                          </span>
                          <span className="block text-[10px] font-bold tracking-widest text-[#41B349] uppercase mt-1">
                            Case Study
                          </span>
                        </div>
                        <div className="w-0.5 flex-1 bg-gradient-to-b from-[#41B349] via-[#41B349]/30 to-transparent mt-3 min-h-[30px]" />
                      </div>

                      {/* Right: Project Content (5 cols, Equal Height) */}
                      <div className="lg:col-span-5 h-full">
                        <ProjectContentComponent
                          project={project}
                          onOpenModal={() => setActiveModalProject(project)}
                        />
                      </div>
                    </>
                  ) : (
                    /* PROJECT 2, 4, 6: LEFT CONTENT | CENTER NUMBER | RIGHT IMAGE */
                    <>
                      {/* Left: Project Content (5 cols, Equal Height) */}
                      <div className="lg:col-span-5 h-full">
                        <ProjectContentComponent
                          project={project}
                          onOpenModal={() => setActiveModalProject(project)}
                        />
                      </div>

                      {/* Center: Number 02, 04... (2 cols) */}
                      <div className="lg:col-span-2 flex flex-col items-center justify-center text-center relative py-4">
                        <div className="w-0.5 flex-1 bg-gradient-to-b from-transparent via-[#41B349]/30 to-[#41B349] mb-3 min-h-[30px]" />
                        <div className="relative group-hover:scale-110 transition-transform duration-300 shrink-0">
                          <span
                            className="text-6xl xl:text-7xl font-black tracking-tighter text-[#41B349] select-none block drop-shadow-sm leading-none"
                            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                          >
                            {numberFormatted}
                          </span>
                          <span className="block text-[10px] font-bold tracking-widest text-[#41B349] uppercase mt-1">
                            Case Study
                          </span>
                        </div>
                        <div className="w-0.5 flex-1 bg-gradient-to-b from-[#41B349] via-[#41B349]/30 to-transparent mt-3 min-h-[30px]" />
                      </div>

                      {/* Right: Project Image (5 cols) */}
                      <div className="lg:col-span-5 h-full">
                        <ProjectImageComponent project={project} />
                      </div>
                    </>
                  )}
                </div>

                {/* MOBILE / TABLET STACKED LAYOUT (< lg) */}
                <div className="block lg:hidden space-y-6">
                  {/* Top Badge with Large Center Number */}
                  <div className="flex items-center gap-3 border-b border-gray-200/60 pb-3">
                    <span className="text-4xl sm:text-5xl font-black text-[#41B349] tracking-tight">
                      {numberFormatted}
                    </span>
                    <div className="text-[11px] font-bold tracking-widest text-[#41B349] uppercase">
                      Case Study #{numberFormatted}
                    </div>
                  </div>

                  {/* Project Image */}
                  <div className="w-full">
                    <ProjectImageComponent project={project} />
                  </div>

                  {/* Project Content */}
                  <div className="pt-2">
                    <ProjectContentComponent
                      project={project}
                      onOpenModal={() => setActiveModalProject(project)}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Modern Detail Modal with All Remaining Project Details */}
      {activeModalProject && (
        <ProjectDetailModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
};

/* -------------------------------------------------------------
 * REUSABLE COMPONENT: Project Image Device Frame
 * ------------------------------------------------------------- */
const ProjectImageComponent = ({ project }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group-hover:border-[#41B349]/40 group-hover:shadow-[0_15px_35px_rgba(65,179,73,0.1)] transition-all duration-500 flex flex-col h-full min-h-[390px] lg:min-h-[420px]">
      {/* Browser Top Window Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-xs text-gray-400 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="px-3 py-0.5 rounded-md bg-white border border-gray-200 text-[11px] text-gray-500 font-mono">
          https://{project.slug}.techsolutionor.live
        </div>
        <div className="w-6" />
      </div>

      {/* Main Image or Simulated Interface */}
      <div className="relative flex-1 w-full overflow-hidden bg-gray-50 flex items-center justify-center min-h-[250px]">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} Portfolio Showcase`}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          /* High-End Enterprise Card for projects without full screenshot */
          <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[#FBFDFC] via-white to-[#F0FDF4] relative overflow-hidden">
            {/* Ambient emerald tint */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#41B349]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <span className="px-3 py-1 rounded-full bg-[#41B349]/10 border border-[#41B349]/20 text-[#41B349] text-xs font-bold tracking-wider uppercase">
                {project.categoryLabel}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-gray-400 font-medium">
                <Globe className="w-3.5 h-3.5 text-[#41B349]" />
                {project.location}
              </span>
            </div>

            <div className="text-center my-auto py-4 relative z-10">
              {project.logo ? (
                <div className="inline-block bg-white border border-gray-200/90 rounded-2xl p-3.5 shadow-sm">
                  <Image
                    src={project.logo}
                    alt={project.name}
                    width={180}
                    height={60}
                    className="max-h-12 w-auto object-contain mx-auto"
                  />
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
                    {project.name}
                  </div>
                  <div className="text-xs text-[#41B349] font-bold tracking-wide uppercase">
                    TechSolutionor Verified Project
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 justify-center relative z-10">
              {project.highlights?.map((hl, hIdx) => (
                <span
                  key={hIdx}
                  className="px-2.5 py-0.5 rounded-full bg-white border border-gray-200 text-[10px] font-semibold text-gray-600 shadow-sm"
                >
                  {hl}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer verified badge */}
      <div className="px-4 py-2 bg-white border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 shrink-0">
        <span className="flex items-center gap-1.5 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#41B349]" />
          Production Verified
        </span>
        <span className="font-semibold text-[#41B349]">
          Dubai &amp; Global Delivery
        </span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * REUSABLE COMPONENT: Clean Content Section (Seamless & Borderless)
 * Shows: Project Name, Paragraph Description (max 7 lines clamped with "..."), and "More Details" button.
 * Blends naturally with the main page background (#FBFDFC).
 * ------------------------------------------------------------- */
const ProjectContentComponent = ({ project, onOpenModal }) => {
  return (
    <div className="flex flex-col justify-center h-full min-h-[390px] lg:min-h-[420px] text-left py-4 px-2 sm:px-6 lg:px-8">
      <div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111827] tracking-tight leading-tight mb-4">
          {project.name}
        </h3>
        <p
          className="text-sm sm:text-base text-[#4B5563] leading-relaxed line-clamp-[7]"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 7,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {project.description}
        </p>
      </div>

      <div className="pt-6">
        <button
          onClick={onOpenModal}
          className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#41B349] hover:bg-[#389e40] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#41B349]/20 hover:shadow-[#41B349]/35 transition-all duration-300 active:scale-95 cursor-pointer"
        >
          <span>More Details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * REUSABLE COMPONENT: Modern Project Details Modal
 * Opens on "More Details" click with complete project data:
 * - Full Project Description
 * - Services
 * - The Challenge
 * - The Solution
 * - Tech Stack
 * - Results & Features
 * ------------------------------------------------------------- */
const ProjectDetailModal = ({ project, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden text-left animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Sticky Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-gray-100 bg-[#FBFDFC] shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#41B349]/10 border border-[#41B349]/30 text-[#41B349] text-xs font-black tracking-widest uppercase">
              CASE STUDY #{String(project.id).padStart(2, '0')}
            </span>
            <span className="text-xs text-gray-500 font-medium hidden sm:inline-block">
              {project.categoryLabel} • {project.location}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-[#111827] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body with All Project Details */}
        <div className="p-6 sm:p-8 md:p-10 overflow-y-auto space-y-7">
          {/* Title & Brand Logo */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111827] tracking-tight">
                {project.name}
              </h2>
              <div className="text-xs text-[#41B349] font-bold uppercase tracking-wider mt-1">
                {project.categoryLabel}
              </div>
            </div>

            {project.logo && (
              <div className="h-12 w-32 bg-white border border-gray-200 rounded-xl p-2 flex items-center justify-center shadow-xs shrink-0">
                <Image
                  src={project.logo}
                  alt={project.name}
                  width={120}
                  height={40}
                  className="max-h-8 w-auto object-contain"
                />
              </div>
            )}
          </div>

          {/* Services Delivered */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
              Services
            </div>
            <div className="flex flex-wrap gap-2">
              {project.services.map((service, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-[#1F2937]"
                >
                  <Check className="w-3.5 h-3.5 text-[#41B349]" />
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Full Project Description */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Project Description
            </div>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* The Challenge & The Solution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* The Challenge */}
            <div className="rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] p-5">
              <div className="flex items-center gap-1.5 text-[#B45309] text-xs font-bold uppercase tracking-wider mb-2">
                <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
                <span>The Challenge</span>
              </div>
              <p className="text-xs sm:text-sm text-[#78350F] leading-relaxed font-medium">
                {project.challenge}
              </p>
            </div>

            {/* The Solution */}
            <div className="rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] p-5">
              <div className="flex items-center gap-1.5 text-[#15803D] text-xs font-bold uppercase tracking-wider mb-2">
                <Lightbulb className="w-4 h-4 text-[#41B349] shrink-0" />
                <span>The Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-[#14532D] leading-relaxed font-medium">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#41B349]" />
              <span>Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md bg-[#41B349]/10 border border-[#41B349]/20 text-xs font-bold text-[#41B349]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Results & Features */}
          <div className="rounded-2xl bg-gray-50 border border-gray-200/90 p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#41B349] flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#41B349]" />
              <span>Results &amp; Features</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Performance */}
              <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
                <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-bold uppercase">
                  <Zap className="w-3.5 h-3.5 text-[#41B349]" />
                  <span>Performance</span>
                </div>
                <div className="text-xs sm:text-sm font-black text-[#41B349] mt-1">
                  {project.metrics.performance}
                </div>
              </div>

              {/* Features */}
              <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
                <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-bold uppercase">
                  <ShoppingCart className="w-3.5 h-3.5 text-[#111827]" />
                  <span>Features</span>
                </div>
                <div className="text-xs sm:text-sm font-black text-[#111827] mt-1">
                  {project.metrics.features}
                </div>
              </div>

              {/* Sales */}
              <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
                <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-bold uppercase">
                  <TrendingUp className="w-3.5 h-3.5 text-[#41B349]" />
                  <span>Sales</span>
                </div>
                <div className="text-xs sm:text-sm font-black text-[#41B349] mt-1">
                  {project.metrics.sales}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <Link
            href={`/contact-us?subject=Inquiry regarding project similar to ${encodeURIComponent(project.name)}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#41B349] hover:bg-[#389e40] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#41B349]/20 transition-all duration-300"
          >
            <span>Discuss Similar Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-white hover:bg-gray-100 border border-gray-200 text-xs sm:text-sm font-bold text-gray-700 cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioProjects;
