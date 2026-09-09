import React from 'react'
import ContentBanner from '../../_components/services/content-writing/Banner/ContentBanner'
import ContentServices from '../../_components/services/content-writing/Services/ContentServices'
import ContentProcess from '../../_components/services/content-writing/Process/ContentProcess'
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook'
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose'
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures'
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling'
import CommonServices from '@/app/_components/services/common/Services/CommonServices'
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs'
import Newsletter from '../../_components/Home/Newsletter/Newsletter'
import ContentFAQ from '../../_components/services/content-writing/FAQ/ContentFAQ'

function page() {
  return (
    <div>
      <ContentBanner />
      <CommonWhyChoose serviceKey="content-writing" />
      <CommonKeyFeatures serviceKey="content-writing" />
      <CommonStruggling serviceKey="content-writing" />
      <CommonServices serviceKey="content-writing" />
      {/* <ContentServices /> */}
      {/* <ContentProcess /> */}
      <TechnologiesBook serviceKey="content-writing" bgColor="#FFFFFF" />
      <CommonHireUs serviceKey="content-writing" />
      {/* <Newsletter /> */}
      <ContentFAQ/>
    </div>
  )
}

export default page
