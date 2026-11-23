'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Layers,
  Globe,
} from 'lucide-react';
import { portfolioProjects, portfolioCategories } from './portfolioData';
import {
  SectionBadge,
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
  voltaria_global: ['image_pvoltaria'],
  osumfix: ['image_posumfix'],
};

const PORTFOLIO_LEGACY_LOGO_KEYS = {
  grabatoz: ['image_grab'],
  baytal_protein: ['image_protein'],
  clix_pos: ['image_clickpos'],
  just_appliances: ['image_appliances'],
  mubayaa_real_estate: ['image_mubayya'],
  click_slice: ['image_clickslice'],
  crown_excel: ['image_crown'],
  smart_max_it: ['image_smart'],
  osum_enterprises: ['image_traders'],
};

const isValidImageUrl = (val) => {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (trimmed.startsWith('@/')) return false;
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('data:')
  ) {
    return true;
  }
  return false;
};

const getCleanUrl = (project) => {
  if (project.websiteUrl) {
    return project.websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }
  return `${project.slug}.techsolutionor.live`;
};

const PortfolioProjects = ({ cmsContent }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const section = cmsContent?.sections?.find(
    (s) =>
      s.sectionId === 'portfolioprojects' ||
      s.sectionName === 'Portfolio Projects' ||
      s.sectionName === 'Portfolio Projects Section'
  );
  const fields = section?.fields || {};

  // Resolve projects with CMS overrides
  const resolvedProjects = useMemo(() => {
    return portfolioProjects.map((project) => {
      const slugKey = (project.slug || project.name)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');

      // 1. Image
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

      // 2. Logo
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

      // 3. Text fields
      const resolvedName =
        fields[`project_${slugKey}_name`]?.value?.trim() || project.name;
      const resolvedDescription =
        fields[`project_${slugKey}_description`]?.value?.trim() ||
        project.description;
      const resolvedCategory =
        fields[`project_${slugKey}_category`]?.value?.trim() ||
        project.categoryLabel;

      return {
        ...project,
        name: resolvedName,
        description: resolvedDescription,
        categoryLabel: resolvedCategory,
        image: resolvedImage,
        logo: resolvedLogo,
      };
    });
  }, [fields]);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return resolvedProjects;
    return resolvedProjects.filter((p) => p.category === selectedCategory);
  }, [resolvedProjects, selectedCategory]);

  return (
    <section
      id="portfolio-showcase"
      className="relative py-8 sm:py-14 md:py-20 bg-[#FBFDFC] text-[#111827] overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -right-48 w-[650px] h-[650px] bg-[#41B349]/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-[650px] h-[650px] bg-[#41B349]/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#41B34912_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-2">
          <div className="flex justify-center mb-2.5 sm:mb-3">
            <SectionBadge variant="light" icon={<Layers className="w-3.5 h-3.5" />}>
              Featured Client Case Studies
            </SectionBadge>
          </div>
          <h2 className="text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-tight text-[#0D0F12]">
            OUR FEATURED <span className="text-[#41B349] italic">PROJECTS</span>
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base md:text-lg font-jakarta text-[#4A5568] leading-relaxed">
            Explore our verified client solutions engineered for high performance, conversion, and enterprise reliability across the globe.
          </p>
        </div>

        {/* Clean, Elegant Category Filter Pills (No Clutter) */}
        <div className="mb-8 sm:mb-12 px-1">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5">
            {portfolioCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 min-[380px]:px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-jakarta font-medium transition-all duration-300 cursor-pointer select-none active:scale-95 ${
                    isActive
                      ? 'bg-[#0D0F12] text-white shadow-lg shadow-black/15 ring-2 ring-black/10'
                      : 'bg-white text-gray-700 hover:text-[#2C9434] hover:bg-emerald-50/60 border border-gray-200/90 shadow-2xs'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
         * CLEAN CARD GRID: TOP IMAGE + BOTTOM DETAILS
         * ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-8">
          {filteredProjects.map((project) => {
            const cleanUrl = getCleanUrl(project);
            const blogHref = project.blogUrl || `/blog/${project.slug}`;

            return (
              <article
                key={project.id}
                id={`project-${project.slug}`}
                className="group flex flex-col h-full bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 hover:border-[#41B349]/50 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_-10px_rgba(65,179,73,0.18)] transition-all duration-500 overflow-hidden"
              >
                {/* ---------------------------------------------------------
                 * TOP: IMAGE & BROWSER MOCKUP FRAME
                 * --------------------------------------------------------- */}
                <div className="relative overflow-hidden bg-gray-50 border-b border-gray-200/90">
                  {/* Browser Bar */}
                  <div className="flex items-center justify-between px-3 sm:px-3.5 py-2 bg-gray-100/90 border-b border-gray-200 text-xs text-gray-400 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400/80" />
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400/80" />
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400/80" />
                    </div>

                    <div className="flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-md bg-white border border-gray-200 text-[10px] font-mono text-gray-600 truncate max-w-[140px] min-[360px]:max-w-[170px] sm:max-w-[190px] shadow-2xs">
                      <Globe className="w-3 h-3 text-[#41B349] shrink-0" />
                      <span className="truncate">{cleanUrl}</span>
                    </div>

                    <div className="w-5 sm:w-8" />
                  </div>

                  {/* Image Viewport */}
                  <div className="relative h-48 min-[380px]:h-56 sm:h-60 md:h-64 w-full overflow-hidden bg-gray-50 flex items-center justify-center">
                    {project.image ? (
                      <>
                        <Image
                          src={project.image}
                          alt={`${project.name} Portfolio Showcase`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                          unoptimized={
                            typeof project.image === 'string' &&
                            !project.image.startsWith('/') &&
                            !project.image.includes('res.cloudinary.com')
                          }
                          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* Gradient Shadow Overlay */}
                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 via-black/5 to-transparent pointer-events-none" />
                      </>
                    ) : (
                      /* VIP Enterprise Canvas for projects with logo (Crown Excel, Smart Max IT, Osum Enterprises) */
                      <div className="w-full h-full p-5 sm:p-6 flex flex-col justify-between bg-gradient-to-br from-[#0F172A] via-[#111E1F] to-[#064E3B] text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-44 h-44 bg-[#41B349]/20 rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute inset-0 bg-[radial-gradient(#41B34918_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-50" />

                        <div className="flex items-center justify-center relative z-10">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#41B349] font-semibold">
                            Enterprise Cloud Verified
                          </span>
                        </div>

                        <div className="text-center my-auto py-2 relative z-10">
                          {project.logo ? (
                            <div className="inline-block bg-white/95 rounded-2xl p-3 sm:p-4 shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                              <Image
                                src={project.logo}
                                alt={project.name}
                                width={130}
                                height={45}
                                unoptimized={
                                  typeof project.logo === 'string' &&
                                  !project.logo.startsWith('/') &&
                                  !project.logo.includes('res.cloudinary.com')
                                }
                                className="max-h-8 sm:max-h-9 w-auto object-contain mx-auto"
                              />
                            </div>
                          ) : (
                            <span className="text-xl sm:text-2xl font-display uppercase tracking-tight text-white">
                              {project.name}
                            </span>
                          )}
                        </div>

                        <div className="text-center relative z-10">
                          <span className="text-[10px] text-gray-300 font-jakarta">
                            Verified Production Deployment
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* ---------------------------------------------------------
                 * BOTTOM: DETAILS & ACTION BUTTONS (CLEAN & ELEGANT)
                 * --------------------------------------------------------- */}
                <div className="p-4 sm:p-6 lg:p-7 flex flex-col justify-between flex-1 space-y-3.5 sm:space-y-4">
                  <div className="space-y-2">
                    {/* Category Eyebrow */}
                    <div className="text-[11px] font-jakarta font-semibold tracking-wider uppercase text-[#2C9434]">
                      {project.categoryLabel}
                    </div>

                    {/* Project Title */}
                    <h3 className="text-xl sm:text-2xl lg:text-[26px] font-display uppercase tracking-tight text-[#0D0F12] group-hover:text-[#2C9434] transition-colors leading-snug break-words">
                      {project.name}
                    </h3>

                    {/* Description (3 lines clamped, clean & readable) */}
                    <p className="font-jakarta text-xs sm:text-sm text-[#4A5568] leading-relaxed line-clamp-3 pt-0.5">
                      {project.description}
                    </p>
                  </div>

                  {/* Action Row */}
                  <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                    <Link
                      href={blogHref}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-[#41B349] hover:bg-[#389e40] text-white font-jakarta font-semibold text-xs sm:text-sm shadow-md shadow-[#41B349]/20 hover:shadow-[#41B349]/35 transition-all duration-300 active:scale-95 min-h-[42px] cursor-pointer"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
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

export default PortfolioProjects;
