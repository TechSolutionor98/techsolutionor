import React from 'react'
import WebDevBanner from '../../_components/services/web-developement/Banner/WebDevBanner'
import WebWhyChoose from '../../_components/services/web-developement/WhyChoose/WebWhyChoose'
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures'
import Struggling from '../../_components/services/web-developement/Struggling/Struggling'
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook'
import WebHireUs from '../../_components/services/web-developement/HireUs/WebHireUs'
import WebFAQ from '../../_components/services/web-developement/FAQ/WebFAQ'

const page = () => {
  return (
    <div>
      <WebDevBanner />
      <WebWhyChoose />
      <CommonKeyFeatures serviceKey="web-development" />
      <Struggling />
      <TechnologiesBook serviceKey="web-development" bgColor="#FFFFFF" />
      <WebHireUs />
      <WebFAQ />
    </div>
  )
}

export default page
