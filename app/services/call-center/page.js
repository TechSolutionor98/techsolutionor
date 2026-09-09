import React from 'react'
import CallCenterBanner from '../../_components/services/call-center/Banner/CallCenterBanner'
import CallCenterOfferings from '../../_components/services/call-center/Offerings/CallCenterOfferings'
import CallCenterConsulting from '../../_components/services/call-center/Consulting/CallCenterConsulting'
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook'
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose'
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures'
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling'
import CommonServices from '@/app/_components/services/common/Services/CommonServices'
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs'
import Newsletter from '../../_components/Home/Newsletter/Newsletter'
import CallCenterFAQ from '../../_components/services/call-center/FAQ/CallCenterFAQ'

function page() {
  return (
    <div>
      <CallCenterBanner />
      <CommonWhyChoose serviceKey="call-center" />
      <CommonKeyFeatures serviceKey="call-center" />
      <CommonStruggling serviceKey="call-center" />
      <CommonServices serviceKey="call-center" />
      {/* <CallCenterOfferings /> */}
      {/* <CallCenterConsulting /> */}
      <TechnologiesBook serviceKey="call-center" bgColor="#FFFFFF" />
      <CommonHireUs serviceKey="call-center" />
      {/* <Newsletter /> */}
      <CallCenterFAQ />
    </div>
  )
}

export default page
