"use client";

import React, { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import BannerImage from "../../../../public/images/services/image.png";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { getCmsVal } from "@/lib/api-helper";

export const defaultHomeHero = {
  badge: "",
  title: "Digital Marketing Agency in Dubai – Web Development & SEO Services for Business Growth",
  description:
    "Serving businesses across the world, with a strong focus on helping companies in Dubai and the UAE grow through smart digital solutions.",
  buttonText: "Get a Free Quote",
};

const HomeBanner = ({ content, cmsContent }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const heroContent = useMemo(
    () => ({ ...defaultHomeHero, ...(content || {}) }),
    [content]
  );

  const rawBadge = heroContent.badge?.trim() || "";
  const rawTitle = heroContent.title?.trim() || defaultHomeHero.title;
  const rawDescription = heroContent.description?.trim() || defaultHomeHero.description;
  const rawButtonText = heroContent.buttonText?.trim() || defaultHomeHero.buttonText;

  const bannerBadge = getCmsVal(cmsContent, rawBadge, "homebanner") || getCmsVal(cmsContent, rawBadge, "hero");
  const bannerTitle = getCmsVal(cmsContent, rawTitle, "homebanner") || getCmsVal(cmsContent, rawTitle, "hero");
  const bannerDescription = getCmsVal(cmsContent, rawDescription, "homebanner") || getCmsVal(cmsContent, rawDescription, "hero");
  const bannerButtonText = getCmsVal(cmsContent, rawButtonText, "homebanner") || getCmsVal(cmsContent, rawButtonText, "hero");

  const cmsImageVal = getCmsVal(cmsContent, BannerImage, "homebanner") || getCmsVal(cmsContent, BannerImage, "hero");
  const isRemoteImage = typeof cmsImageVal === "string" && (cmsImageVal.startsWith("http") || cmsImageVal.startsWith("/"));

  const descriptionLines = typeof bannerDescription === "string" 
    ? bannerDescription.split("\n").filter(Boolean) 
    : [bannerDescription];

  return (
    <section className="relative overflow-hidden w-full min-h-[72vh] lg:min-h-[78vh] flex items-center justify-center bg-white">
      {/* Background Particles */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Particles
          id="tsparticles"
          className="w-full h-full"
          init={particlesInit}
          options={{
            background: { color: "#ffffff" },
            fullScreen: { enable: false },
            particles: {
              color: { value: "#41B349" },
              links: {
                color: "#41B349",
                enable: true,
                opacity: 0.28,
                width: 1.2,
                distance: 150,
              },
              move: {
                enable: true,
                speed: 1.6,
                direction: "none",
                outModes: { default: "out" },
                random: false,
                straight: false,
                attract: { enable: false },
              },
              number: {
                value: 60,
                density: { enable: true, area: 800 },
              },
              opacity: {
                value: 0.4,
                random: false,
              },
              shape: { type: "circle" },
              size: {
                value: 3,
                random: true,
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                onClick: { enable: false },
              },
              modes: {
                repulse: { distance: 180, duration: 0.8 },
              },
            },
          }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-8 sm:pt-10 md:pt-12 lg:pt-10 pb-8 sm:pb-10 md:pb-12 lg:pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Heading, Subtitle & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-3.5 md:space-y-4">
          {/* Main Headline */}
          <h1
            className="text-3xl sm:text-4xl md:text-[38px] lg:text-[42px] xl:text-[46px] font-extrabold text-[#111111] leading-[1.18] tracking-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {bannerTitle === defaultHomeHero.title ? (
              <>
                <span className="block text-[#111111]">
                  Digital Marketing Agency in Dubai <span className="text-[#41B349] font-medium">–</span>
                </span>
                <span className="block mt-1 sm:mt-1.5">
                  Web Development &amp; <span className="text-[#41B349]">SEO Services</span>
                </span>
                <span className="block mt-0.5 sm:mt-1 text-[#111111]">
                  for Business Growth
                </span>
              </>
            ) : (
              bannerTitle
            )}
          </h1>

          {/* Description */}
          <div className="text-[#4B5563] text-sm sm:text-base md:text-[16px] leading-relaxed max-w-xl font-normal space-y-1">
            {descriptionLines.map((line, index) => (
              <p key={`${line}-${index}`}>
                {line}
              </p>
            ))}
          </div>

          {/* CTA Action */}
          <div className="pt-1.5 sm:pt-2">
            <Link href="/claim-your-free-seo-audit" className="inline-block group">
              <button className="inline-flex items-center justify-center gap-3 bg-[#41B349] hover:bg-[#34953c] text-white text-[15px] sm:text-[16px] font-bold px-7 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg shadow-[#41B349]/25 hover:shadow-xl hover:shadow-[#41B349]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer">
                <span>{bannerButtonText}</span>
                <FaArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Column: Clean Hero Image (Without any green background shapes/circles) */}
        <div className="lg:col-span-5 flex justify-center items-center relative mt-4 lg:mt-0">
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-[480px] flex items-center justify-center">
            {isRemoteImage ? (
              <img
                src={cmsImageVal}
                alt="Digital Marketing & Web Development Services"
                className="w-full h-auto max-h-[400px] lg:max-h-[440px] object-contain drop-shadow-xl select-none"
              />
            ) : (
              <Image
                src={BannerImage}
                alt="Digital Marketing & Web Development Services"
                priority
                className="w-full h-auto max-h-[400px] lg:max-h-[440px] object-contain drop-shadow-xl select-none"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
