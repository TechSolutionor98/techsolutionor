'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Globe,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { portfolioProjects } from './portfolioData';
import {
  CardHeading,
  CardParagraph,
  ButtonText,
} from '@/components/Typography';

const PORTFOLIO_LEGACY_IMAGE_KEYS = {
  grabatoz: ['image_p1'],
  baytal_protein: ['image_p2'],
  clix_pos: ['image_p3'],
  just_appliances: ['image_p4'],
  mubayaa_real_estate: ['image_pmubayaa', 'image_mubayya'],
  optimum_fusion: ['image_poptimumfusion'],
  click_slice: ['image_pclickslice'],
  seen_alif: ['image_pseenalif'],
};

const PORTFOLIO_LEGACY_LOGO_KEYS = {
  grabatoz: ['image_grab'],
  baytal_protein: ['image_protein'],
  clix_pos: ['image_clickpos'],
  just_appliances: ['image_appliances'],
  mubayaa_real_estate: ['image_mubayya'],
  albasit: ['image_albasit'],
  click_slice: ['image_clickslice'],
  crown_excel: ['image_crown'],
  smart_max_it: ['image_smart'],
  osum_enterprises: ['image_traders'],
};

const isValidImageUrl = (val) => {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (trimmed.startsWith('@/')) return false; // Raw code import path string, ignore and use static import
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/') || trimmed.startsWith('data:')) {
    return true;
  }
  return false;
};

const PortfolioProjects = ({ cmsContent }) => {
  const section = cmsContent?.sections?.find(
    (s) =>
      s.sectionId === 'portfolioprojects' ||
      s.sectionName === 'Portfolio Projects' ||
      s.sectionName === 'Portfolio Projects Section'
  );
  const fields = section?.fields || {};

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
            const slugKey = (project.slug || project.name).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

            // 1. Resolve Project Image (CMS image -> legacy CMS image -> static import)
            let resolvedImage = project.image;
            const cmsImgVal = fields[`project_${slugKey}_image`]?.value;
            if (isValidImageUrl(cmsImgVal)) {
              resolvedImage = cmsImgVal.trim();
            } else {
              const legacyImgKeys = PORTFOLIO_LEGACY_IMAGE_KEYS[slugKey] || [];
              for (const lk of legacyImgKeys) {
                if (isValidImageUrl(fields[lk]?.value)) {
                  resolvedImage = fields[lk].value.trim();
                  break;
                }
              }
            }

            // 2. Resolve Project Logo (CMS logo -> legacy CMS logo -> static import)
            let resolvedLogo = project.logo;
            const cmsLogoVal = fields[`project_${slugKey}_logo`]?.value;
            if (isValidImageUrl(cmsLogoVal)) {
              resolvedLogo = cmsLogoVal.trim();
            } else {
              const legacyLogoKeys = PORTFOLIO_LEGACY_LOGO_KEYS[slugKey] || [];
              for (const lk of legacyLogoKeys) {
                if (isValidImageUrl(fields[lk]?.value)) {
                  resolvedLogo = fields[lk].value.trim();
                  break;
                }
              }
            }

            // 3. Resolve Project Name, Description, and Category
            const resolvedName = fields[`project_${slugKey}_name`]?.value?.trim() || project.name;
            const resolvedDescription = fields[`project_${slugKey}_description`]?.value?.trim() || project.description;
            const resolvedCategory = fields[`project_${slugKey}_category`]?.value?.trim() || project.categoryLabel;

            const resolvedProject = {
              ...project,
              name: resolvedName,
              description: resolvedDescription,
              categoryLabel: resolvedCategory,
              image: resolvedImage,
              logo: resolvedLogo,
            };

            return (
              <article
                key={project.id}
                id={`project-${project.slug}`}
                className="relative group scroll-mt-24"
              >
                {/* DESKTOP 3-PART ALTERNATING LAYOUT (lg and above) */}
                <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* PROJECT 1, 3, 5: LEFT IMAGE | CENTER LINE & LABEL | RIGHT CONTENT */}
                  {isOdd ? (
                    <>
                      {/* Left: Project Image (5 cols) */}
                      <div className="lg:col-span-5 h-full">
                        <ProjectImageComponent project={resolvedProject} />
                      </div>

                      {/* Center: Creative Design Node & Line (2 cols) */}
                      <div className="lg:col-span-2 flex flex-col items-center justify-center text-center relative py-4">
                        <CenterConnectorNode />
                      </div>

                      {/* Right: Project Content (5 cols, Equal Height) */}
                      <div className="lg:col-span-5 h-full">
                        <ProjectContentComponent project={resolvedProject} />
                      </div>
                    </>
                  ) : (
                    /* PROJECT 2, 4, 6: LEFT CONTENT | CENTER LINE & LABEL | RIGHT IMAGE */
                    <>
                      {/* Left: Project Content (5 cols, Equal Height) */}
                      <div className="lg:col-span-5 h-full">
                        <ProjectContentComponent project={resolvedProject} />
                      </div>

                      {/* Center: Creative Design Node & Line (2 cols) */}
                      <div className="lg:col-span-2 flex flex-col items-center justify-center text-center relative py-4">
                        <CenterConnectorNode />
                      </div>

                      {/* Right: Project Image (5 cols) */}
                      <div className="lg:col-span-5 h-full">
                        <ProjectImageComponent project={resolvedProject} />
                      </div>
                    </>
                  )}
                </div>

                {/* MOBILE / TABLET STACKED LAYOUT (< lg) */}
                <div className="block lg:hidden space-y-6">
                  {/* Creative Modern Top Accent Divider */}
                  <div className="flex items-center gap-3 py-1">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#41B349]/25 to-[#41B349]/50" />
                    <div className="w-7 h-7 rounded-lg bg-[#F0FDF4] border border-[#41B349]/25 flex items-center justify-center shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#2C9434]" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-[#41B349]/50 via-[#41B349]/25 to-transparent" />
                  </div>

                  {/* Project Image */}
                  <div className="w-full">
                    <ProjectImageComponent project={resolvedProject} />
                  </div>

                  {/* Project Content */}
                  <div className="pt-2">
                    <ProjectContentComponent project={resolvedProject} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------
 * REUSABLE COMPONENT: Center Creative Connector Node
 * Replaces the old "Case Study" label with a sophisticated,
 * glowing emerald focal node and smooth vertical gradients.
 * ------------------------------------------------------------- */
const CenterConnectorNode = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative py-4 select-none pointer-events-none">
      {/* Top Vertical Guide Line */}
      <div className="w-[1.5px] flex-1 bg-gradient-to-b from-transparent via-[#41B349]/25 to-[#41B349]/80 min-h-[48px] relative">
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#41B349]/40 group-hover:bg-[#41B349] group-hover:scale-125 transition-all duration-300" />
      </div>

      {/* Center Decorative Creative Node */}
      <div className="relative my-3 shrink-0 group-hover:scale-110 transition-transform duration-500">
        {/* Soft Ambient Emerald Glow Aura */}
        <div className="absolute inset-0 rounded-2xl bg-[#41B349]/20 blur-md scale-150 pointer-events-none group-hover:bg-[#41B349]/35 transition-all duration-500" />

        {/* Outer Premium White/Glass Container */}
        <div className="relative w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-md border border-[#41B349]/30 shadow-[0_4px_20px_rgba(65,179,73,0.15)] flex items-center justify-center group-hover:border-[#41B349] group-hover:shadow-[0_8px_28px_rgba(65,179,73,0.28)] transition-all duration-500">
          {/* Inner Layered Badge */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F0FDF4] via-white to-[#DCFCE7] flex items-center justify-center border border-[#41B349]/25 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#2C9434] transition-all duration-500 group-hover:rotate-45 group-hover:scale-110" />
          </div>

          {/* Micro Geometric Corner Accents */}
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#41B349]/50 group-hover:bg-[#41B349] transition-colors" />
          <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-[#41B349]/50 group-hover:bg-[#41B349] transition-colors" />
        </div>
      </div>

      {/* Bottom Vertical Guide Line */}
      <div className="w-[1.5px] flex-1 bg-gradient-to-b from-[#41B349]/80 via-[#41B349]/25 to-transparent min-h-[48px] relative">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#41B349]/40 group-hover:bg-[#41B349] group-hover:scale-125 transition-all duration-300" />
      </div>
    </div>
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            unoptimized={typeof project.image === 'string' && !project.image.startsWith('/') && !project.image.includes('res.cloudinary.com')}
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          /* High-End Enterprise Card for projects without full screenshot */
          <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[#FBFDFC] via-white to-[#F0FDF4] relative overflow-hidden font-jakarta">
            {/* Ambient emerald tint */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#41B349]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <span className="px-3 py-1 rounded-full bg-[#41B349]/10 border border-[#41B349]/20 text-[#2C9434] text-xs font-semibold tracking-wider uppercase">
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
                    unoptimized={typeof project.logo === 'string' && !project.logo.startsWith('/') && !project.logo.includes('res.cloudinary.com')}
                    className="max-h-12 w-auto object-contain mx-auto"
                  />
                </div>
              ) : (
                <div className="space-y-1">
                  <CardHeading as="div" size="md" theme="dark" className="text-2xl sm:text-3xl">
                    {project.name}
                  </CardHeading>
                  <div className="text-xs text-[#2C9434] font-semibold tracking-wide uppercase">
                    TechSolutionor Verified Project
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 justify-center relative z-10">
              {project.highlights?.map((hl, hIdx) => (
                <span
                  key={hIdx}
                  className="px-2.5 py-0.5 rounded-full bg-white border border-gray-200 text-[10px] font-semibold text-gray-600 shadow-sm tracking-[-0.01em]"
                >
                  {hl}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer verified badge */}
      <div className="px-4 py-2.5 bg-white border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 shrink-0 font-jakarta">
        <span className="flex items-center gap-1.5 font-medium text-gray-600">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#41B349]" />
          Production Verified
        </span>
        <span className="font-semibold text-[#2C9434]">
          Dubai &amp; Global Delivery
        </span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * REUSABLE COMPONENT: Clean Content Section (Seamless & Borderless)
 * Shows: Project Name, Paragraph Description (max 7 lines clamped with "..."), and "More Details" button.
 * Navigates directly to the project's relevant blog post.
 * ------------------------------------------------------------- */
const ProjectContentComponent = ({ project }) => {
  const blogHref = project.blogUrl || `/blog/${project.slug}`;

  return (
    <div className="flex flex-col justify-center h-full min-h-[390px] lg:min-h-[420px] text-left py-4 px-2 sm:px-6 lg:px-8">
      <div>
        <CardHeading as="h3" size="lg" theme="dark" className="text-2xl sm:text-3xl lg:text-4xl mb-4">
          {project.name}
        </CardHeading>
        <CardParagraph
          size="md"
          theme="slate"
          className="line-clamp-[7]"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 7,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {project.description}
        </CardParagraph>
      </div>

      <div className="pt-6">
        <Link
          href={blogHref}
          className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#41B349] hover:bg-[#389e40] text-white shadow-md shadow-[#41B349]/20 hover:shadow-[#41B349]/35 transition-all duration-300 active:scale-95 cursor-pointer"
        >
          <ButtonText className="text-xs sm:text-sm">More Details</ButtonText>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
};

export default PortfolioProjects;

