import React from 'react'
import DigitalMarketingBanner from '../../_components/services/digital-marketing/Banner/DigitalMarketingBanner'
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook'
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose'
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures'
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling'
import CommonServices from '@/app/_components/services/common/Services/CommonServices'
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs'
import FAQ from '../../_components/services/digital-marketing/FAQ/FAQ'
import { generateCmsMetadata } from '@/lib/cms-fetch'
import CmsJsonLd from '@/components/CmsJsonLd'

export async function generateMetadata() {
  return generateCmsMetadata('/services/digital-marketing', {
    title: 'Digital Marketing & Growth Solutions | Tech Solutionor',
    description: 'Data-driven digital marketing solutions covering search engine marketing, social growth, and multi-channel campaigns.',
  });
}

const page = () => {
  return (
    <div>
      <CmsJsonLd path="/services/digital-marketing" />
      <DigitalMarketingBanner />
      <CommonWhyChoose serviceKey="digital-marketing" />
      <CommonKeyFeatures serviceKey="digital-marketing" />
      <CommonStruggling serviceKey="digital-marketing" />
      <CommonServices serviceKey="digital-marketing" />
      <TechnologiesBook serviceKey="digital-marketing" bgColor="#FFFFFF" />
      <CommonHireUs serviceKey="digital-marketing" />
      <FAQ />
    </div>
  )
}

export default page
