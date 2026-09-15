import React from 'react'
import WebDevBanner from '../../_components/services/web-developement/Banner/WebDevBanner'
import WebWhyChoose from '../../_components/services/web-developement/WhyChoose/WebWhyChoose'
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures'
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling'
import WebServices from '@/app/_components/services/web-developement/Services/WebServices'
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook'
import WebHireUs from '../../_components/services/web-developement/HireUs/WebHireUs'
import WebFAQ from '../../_components/services/web-developement/FAQ/WebFAQ'
import { generateCmsMetadata } from '@/lib/cms-fetch'
import CmsJsonLd from '@/components/CmsJsonLd'

export async function generateMetadata() {
  return generateCmsMetadata('/services/web-development', {
    title: 'Custom Web Development Services | Tech Solutionor',
    description: 'Expert web development services using cutting-edge modern technologies to build high-performance web applications.',
  });
}

const page = () => {
  return (
    <div>
      <CmsJsonLd path="/services/web-development" />
      <WebDevBanner />
      <WebWhyChoose />
      <CommonKeyFeatures serviceKey="web-development" />
      <CommonStruggling serviceKey="web-development" />
      <WebServices />
      <TechnologiesBook serviceKey="web-development" bgColor="#FFFFFF" />
      <WebHireUs />
      <WebFAQ />
    </div>
  )
}

export default page
