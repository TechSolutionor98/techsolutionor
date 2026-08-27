import React from 'react'
import DigitalMarketingBanner from '../../_components/services/digital-marketing/Banner/DigitalMarketingBanner'
import FrameWork from '../../_components/services/digital-marketing/Framework/Framework'
import ServicesDM from '../../_components/services/digital-marketing/Servicesdm/ServicesDM'
import Newsletter from '../../_components/Home/Newsletter/Newsletter'
import FAQ from '../../_components/services/digital-marketing/FAQ/FAQ'
const page = () => {
  return (
    <div>
      <DigitalMarketingBanner />
      <FrameWork />
      <ServicesDM />
      <Newsletter />
      <FAQ />
    </div>
  )
}

export default page
