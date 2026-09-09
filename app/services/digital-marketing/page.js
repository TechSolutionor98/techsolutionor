import React from 'react'
import DigitalMarketingBanner from '../../_components/services/digital-marketing/Banner/DigitalMarketingBanner'
import FrameWork from '../../_components/services/digital-marketing/Framework/Framework'
import ServicesDM from '../../_components/services/digital-marketing/Servicesdm/ServicesDM'
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook'
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose'
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures'
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling'
import CommonServices from '@/app/_components/services/common/Services/CommonServices'
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs'
import Newsletter from '../../_components/Home/Newsletter/Newsletter'
import FAQ from '../../_components/services/digital-marketing/FAQ/FAQ'

const page = () => {
  return (
    <div>
      <DigitalMarketingBanner />
      <CommonWhyChoose serviceKey="digital-marketing" />
      <CommonKeyFeatures serviceKey="digital-marketing" />
      <CommonStruggling serviceKey="digital-marketing" />
      <CommonServices serviceKey="digital-marketing" />
      {/* <FrameWork /> */}
      {/* <ServicesDM /> */}
      <TechnologiesBook serviceKey="digital-marketing" bgColor="#FFFFFF" />
      <CommonHireUs serviceKey="digital-marketing" />
      {/* <Newsletter /> */}
      <FAQ />
    </div>
  )
}

export default page
