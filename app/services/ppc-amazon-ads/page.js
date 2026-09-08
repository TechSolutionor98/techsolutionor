import React from 'react'
import Banner from '../../_components/services/ppc-amazon-ads/Banner/AmazonBanner'
import PPCFramework from '../../_components/services/ppc-amazon-ads/Framework/PPCFramework'
import PPCServices from '../../_components/services/ppc-amazon-ads/PPCServices/PPCService'
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook'
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose'
import Newsletter from '../../_components/Home/Newsletter/Newsletter'
import FAQ from '../../_components/services/ppc-amazon-ads/FAQ/FAQ' 
const page = () => {
  return (
    <div>
      <Banner/>
      <CommonWhyChoose serviceKey="ppc-amazon-ads" />
      <PPCFramework/>
      <PPCServices/> 
      <TechnologiesBook serviceKey="ppc-amazon-ads" />
      <Newsletter/>
      <FAQ />
    </div>
  )
}

export default page
