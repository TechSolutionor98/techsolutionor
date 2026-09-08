import React from 'react'
import SocialMediaBanner from '../../_components/services/SocialMedia/Banner/Banner'
import SocialMediaGrowth from '../../_components/services/SocialMedia/SocialMediaGrowth/SocialMediaGrowth'
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook'
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose'
import CardsSection from '../../_components/services/SocialMedia/CardsSection/CardsSection'
const page = () => {
  return (
    <div>
      <SocialMediaBanner />
      <SocialMediaGrowth />
      <TechnologiesBook serviceKey="social-media" />
      <CommonWhyChoose serviceKey="social-media" />
      <CardsSection />
    </div>
  )
}

export default page
