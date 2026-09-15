import React from 'react'
import ContentBanner from '../../_components/services/content-writing/Banner/ContentBanner'
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook'
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose'
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures'
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling'
import CommonServices from '@/app/_components/services/common/Services/CommonServices'
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs'
import ContentFAQ from '../../_components/services/content-writing/FAQ/ContentFAQ'
import { generateCmsMetadata } from '@/lib/cms-fetch'
import CmsJsonLd from '@/components/CmsJsonLd'

export async function generateMetadata() {
  return generateCmsMetadata('/services/content-writing', {
    title: 'Professional SEO Content Writing & Copywriting Services | Tech Solutionor',
    description: 'High-quality SEO articles, copywriting, website content, and technical documentation designed to engage audiences and rank.',
  });
}

function page() {
  return (
    <div>
      <CmsJsonLd path="/services/content-writing" />
      <ContentBanner />
      <CommonWhyChoose serviceKey="content-writing" />
      <CommonKeyFeatures serviceKey="content-writing" />
      <CommonStruggling serviceKey="content-writing" />
      <CommonServices serviceKey="content-writing" />
      <TechnologiesBook serviceKey="content-writing" bgColor="#FFFFFF" />
      <CommonHireUs serviceKey="content-writing" />
      <ContentFAQ />
    </div>
  )
}

export default page
