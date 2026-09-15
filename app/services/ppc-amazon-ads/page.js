import React from 'react'
import Banner from '../../_components/services/ppc-amazon-ads/Banner/AmazonBanner'
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook'
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose'
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures'
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling'
import CommonServices from '@/app/_components/services/common/Services/CommonServices'
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs'
import FAQ from '../../_components/services/ppc-amazon-ads/FAQ/FAQ' 
import { generateCmsMetadata } from '@/lib/cms-fetch'
import CmsJsonLd from '@/components/CmsJsonLd'

export async function generateMetadata() {
  return generateCmsMetadata('/services/ppc-amazon-ads', {
    title: 'PPC Management & Amazon Advertising Services | Tech Solutionor',
    description: 'High-ROI pay-per-click advertising, Google Ads management, and Amazon sponsored ads campaigns to drive targeted conversions.',
  });
}

const page = () => {
  return (
    <div>
      <CmsJsonLd path="/services/ppc-amazon-ads" />
      <Banner/>
      <CommonWhyChoose serviceKey="ppc-amazon-ads" />
      <CommonKeyFeatures serviceKey="ppc-amazon-ads" />
      <CommonStruggling serviceKey="ppc-amazon-ads" />
      <CommonServices serviceKey="ppc-amazon-ads" />
      <TechnologiesBook serviceKey="ppc-amazon-ads" bgColor="#FFFFFF" />
      <CommonHireUs serviceKey="ppc-amazon-ads" />
      <FAQ />
    </div>
  )
}

export default page
