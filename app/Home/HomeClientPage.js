'use client';

import HomeBanner from "../_components/Home/Banner/HomeBanner";
import WhatWeDo from "../_components/Home/WhatWeDo/WhatWeDo";
import GoodServices from "../_components/Home/GoodServices/GoodServices";
import ServicesWeOffer from "../_components/Home/ServicesWeOffer/ServicesWeOffer";
import Projects from "../_components/Home/Projects/Projects";
import Technology from "../_components/Home/Technology/Technology";
import Newsletter from "../_components/Home/Newsletter/Newsletter";
import Testimonials from "../_components/Home/Testimonials/Testimonials";
import ChallengeAccepted from "../_components/Home/ChallengeAccepted/ChallengeAccepted";
import Counter from "../_components/Home/Counter/Counter";

export default function HomeClientPage({ cmsData, fallbackContent }) {
  const homeContent = fallbackContent || {};

  return (
    <div className="bg-[#FFFFFF]">
      <HomeBanner content={homeContent.hero} cmsContent={cmsData?.content} />
      <WhatWeDo content={homeContent.whatWeDo} cmsContent={cmsData?.content} />
      <GoodServices content={homeContent.goodServices} cmsContent={cmsData?.content} />
      <ServicesWeOffer content={homeContent.servicesWeOffer} cmsContent={cmsData?.content} />
      <Projects content={homeContent.projects} cmsContent={cmsData?.content} />
      <Technology content={homeContent.technology} cmsContent={cmsData?.content} />
      <Newsletter content={homeContent.newsletter} cmsContent={cmsData?.content} />
      <Testimonials content={homeContent.testimonials} cmsContent={cmsData?.content} />
      <ChallengeAccepted content={homeContent.challengeAccepted} cmsContent={cmsData?.content} />
      <Counter content={homeContent.counter} cmsContent={cmsData?.content} />
    </div>
  );
}
