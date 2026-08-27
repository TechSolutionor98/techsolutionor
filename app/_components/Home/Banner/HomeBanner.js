"use client";

import React, { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import BannerImage from '../../../../public/images/services/image.png';
import Image from "next/image";
import Link from "next/link";
import { getCmsVal } from "@/lib/api-helper";

export const defaultHomeHero = {
  title: "Web Development & SEO Services to Grow Your Business",
  description:
    "Serving businesses worldwide with tailored digital solutions,\nwith a strong focus on delivering high-impact results for\ncompanies across the UAE.",
  buttonText: "Get a Free Quote",
  imageUrl: "",
};

const resolveImageUrl = (url) => {
  if (!url) {
    return "";
  }

  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
    return url;
  }
  return `/${url.replace(/^\/+/, "")}`;
};

const HomeBanner = ({ content, cmsContent }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const heroContent = useMemo(
    () => ({ ...defaultHomeHero, ...(content || {}) }),
    [content]
  );

  const rawTitle = heroContent.title?.trim() || defaultHomeHero.title;
  const rawDescription = heroContent.description?.trim() || defaultHomeHero.description;
  const rawButtonText = heroContent.buttonText?.trim() || defaultHomeHero.buttonText;

  const bannerTitle = getCmsVal(cmsContent, rawTitle, "hero");
  const bannerDescription = getCmsVal(cmsContent, rawDescription, "hero");
  const bannerButtonText = getCmsVal(cmsContent, rawButtonText, "hero");
  const heroImageUrl = resolveImageUrl(getCmsVal(cmsContent, heroContent.imageUrl, "hero"));

  const descriptionLines = typeof bannerDescription === 'string' ? bannerDescription.split("\n").filter(Boolean) : [bannerDescription];
  const useDefaultTitleLayout = bannerTitle === defaultHomeHero.title;

  return (
    <div className="relative overflow-hidden ">
      <div className="absolute inset-0 h-[40vh] md:h-[100vh] w-full z-[-1] pointer-events-none">
        <Particles
          id="tsparticles"
          className="w-full h-full"
          init={particlesInit}
          options={{
            background: { color: "#fff" },
            fullScreen: { enable: false },
            particles: {
              color: { value: "#41B349" },
              links: {
                color: "#41B349",
                enable: true,
                opacity: 0.5,
                width: 1.5,
                distance: 160,
              },
              move: {
                enable: true,
                speed: 2.0,
                direction: "none",
                outModes: { default: "out" },
                random: false,
                straight: false,
                attract: { enable: false },
              },
              number: {
                value: 80,
                density: { enable: true, area: 600 },
              },
              opacity: {
                value: 0.5,
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
                repulse: { distance: 2000, duration: 1.2 },
              },
            },
          }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      </div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-2 items-center md:items-start h-[35vh] md:h-[100vh] px-5 md:px-15 pt-2 md:pt-3 bg-transparent">
        <div className="space-y-4 md:space-y-8 md:mt-10 lg:mt-12 md:max-w-[860px]">
          <h1
            className="text-[14px] md:text-[56px] lg:text-[64px] font-[700] text-black leading-tight md:text-left"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {useDefaultTitleLayout ? (
              <>
                <span className="inline-flex items-baseline whitespace-nowrap">
                  Web{" "}
                  <span className="md:bg-[#D9D9D9] md:rounded-[20px] md:px-2 md:ml-2">
                    Development
                  </span>
                </span>
                <br className=" hidden md:flex" />
                & SEO Services to <br className=" hidden md:flex" />
                Grow Your <br /> Business
              </>
            ) : (
              bannerTitle
            )}
          </h1>

          <p className="text-[#262323] text-[15px] md:text-[20px] max-w-[860px] leading-[1.2] -ml-16 -mt-3 text-center">
            {descriptionLines.map((line, index) => (
              <span key={`${line}-${index}`} className="block">
                {line}
              </span>
            ))}
          </p>

          <div className="mt-8">
            <Link href="/claim-your-free-seo-audit">
              <button className="w-fit text-white bg-[#41b349] h-[44px] px-6 rounded-full text-[14px] md:text-[16px] font-semibold leading-none transition hover:text-black hover:bg-white">
                {bannerButtonText}
              </button>
            </Link>
          </div>
        </div>

        <div className=" md:flex justify-center items-center relative md:min-h-[500px] md:mt-0 -mt-5 lg:min-h-[540px]">
          <div
            className="absolute right-0 top-0 h-[250px] w-[200px] md:h-[500px] md:w-[80%] bg-[#41B349] -mt-15 md:mt-0 lg:h-[540px]"
            style={{ borderRadius: "0px 0px 50% 50%" }}
          />

          {heroImageUrl ? (
            <img
              src={heroImageUrl}
              alt="Home hero"
              className="relative z-10 w-[200px] h-[200px] md:w-[460px] md:h-[500px] ml-0 md:ml-30 -mt-10"
              style={{ marginRight: "40px" }}
            />
          ) : (
            <Image
              src={BannerImage}
              alt="Illustration"
              className="relative z-10 w-[200px] h-[200px] md:w-[460px] md:h-[500px] ml-0 md:ml-30 -mt-10"
              style={{ marginRight: "40px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
