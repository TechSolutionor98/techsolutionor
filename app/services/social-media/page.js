import React from 'react'
import SocialMediaBanner from '../../_components/services/SocialMedia/Banner/Banner'
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose'
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures'
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling'
import CommonServices from '@/app/_components/services/common/Services/CommonServices'
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook'
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs'
import CommonFAQ from '@/app/_components/services/common/FAQ/CommonFAQ'
import { generateCmsMetadata } from '@/lib/cms-fetch'
import CmsJsonLd from '@/components/CmsJsonLd'

export async function generateMetadata() {
  return generateCmsMetadata('/services/social-media', {
    title: 'Social Media Marketing & Management Services | Tech Solutionor',
    description: 'Grow your brand reach, audience engagement, and conversions across Facebook, Instagram, LinkedIn, and TikTok with Tech Solutionor.',
  });
}

const page = () => {
  return (
    <div>
      <CmsJsonLd path="/services/social-media" />
      <SocialMediaBanner />
      <CommonWhyChoose serviceKey="social-media" />
      <CommonKeyFeatures serviceKey="social-media" />
      <CommonStruggling serviceKey="social-media" />
      <CommonServices serviceKey="social-media" />
      <TechnologiesBook serviceKey="social-media" bgColor="#FFFFFF" />
      <CommonHireUs serviceKey="social-media" />
      <CommonFAQ serviceKey="social-media" />
    </div>
  )
}

export default page
