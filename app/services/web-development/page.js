import React from 'react'
import WebDevBanner from '../../_components/services/web-developement/Banner/WebDevBanner'
import Struggling from '../../_components/services/web-developement/Struggling/Struggling'
import HowDoWeResults from '../../_components/services/web-developement/HowDoWeResults/HowDoWeResults'
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook'
import WebWhyChoose from '../../_components/services/web-developement/WhyChoose/WebWhyChoose'
import WebHireUs from '../../_components/services/web-developement/HireUs/WebHireUs'
import WebFAQ from '../../_components/services/web-developement/FAQ/WebFAQ'

const page = () => {
  return (
    <div>
      <WebDevBanner />
      <Struggling />
      <HowDoWeResults />
      <TechnologiesBook serviceKey="web-development" bgColor="#FFFFFF" />
      <WebWhyChoose />
      <WebHireUs />
      <WebFAQ />
    </div>
  )
}

export default page
