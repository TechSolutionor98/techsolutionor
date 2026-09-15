import React from 'react'
import CallCenterBanner from '../../_components/services/call-center/Banner/CallCenterBanner'
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook'
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose'
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures'
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling'
import CommonServices from '@/app/_components/services/common/Services/CommonServices'
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs'
import CallCenterFAQ from '../../_components/services/call-center/FAQ/CallCenterFAQ'
import { generateCmsMetadata } from '@/lib/cms-fetch'
import CmsJsonLd from '@/components/CmsJsonLd'

export async function generateMetadata() {
  return generateCmsMetadata('/services/call-center', {
    title: 'Call Center & BPO Customer Support Services | Tech Solutionor',
    description: 'Inbound and outbound call center solutions, technical support, and customer service outsourcing tailored for business operations.',
  });
}

function page() {
  return (
    <div>
      <CmsJsonLd path="/services/call-center" />
      <CallCenterBanner />
      <CommonWhyChoose serviceKey="call-center" />
      <CommonKeyFeatures serviceKey="call-center" />
      <CommonStruggling serviceKey="call-center" />
      <CommonServices serviceKey="call-center" />
      <TechnologiesBook serviceKey="call-center" bgColor="#FFFFFF" />
      <CommonHireUs serviceKey="call-center" />
      <CallCenterFAQ />
    </div>
  )
}

export default page
