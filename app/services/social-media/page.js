import React from 'react'
import SocialMediaBanner from '../../_components/services/SocialMedia/Banner/Banner'
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose'
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures'
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling'
import CommonServices from '@/app/_components/services/common/Services/CommonServices'
import SocialMediaGrowth from '../../_components/services/SocialMedia/SocialMediaGrowth/SocialMediaGrowth'
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook'
import CardsSection from '../../_components/services/SocialMedia/CardsSection/CardsSection'
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs'
import HireUs from '@/app/_components/services/eCommerce-developement/HireUs/HireUs'
import CommonFAQ from '@/app/_components/services/common/FAQ/CommonFAQ'

const page = () => {
  return (
    <div>
      <SocialMediaBanner />
      <CommonWhyChoose serviceKey="social-media" />
      <CommonKeyFeatures serviceKey="social-media" />
      <CommonStruggling serviceKey="social-media" />
      <CommonServices serviceKey="social-media" />
      {/* <SocialMediaGrowth /> */}
      <TechnologiesBook serviceKey="social-media" bgColor="#FFFFFF" />
      <CommonHireUs serviceKey="social-media" />
      {/* <HireUs
        badge="AMPLIFY YOUR SOCIAL REACH"
        line1="Ready to scale your brand across social platforms?"
        line2="Partner with Tech Solutionor for data-driven creative campaigns that convert."
      /> */}
      {/* <CardsSection /> */}
      <CommonFAQ serviceKey="social-media" />
    </div>
  )
}

export default page
