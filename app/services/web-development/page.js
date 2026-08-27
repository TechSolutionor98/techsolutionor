import React from 'react'
import WebDevBanner from '../../_components/services/web-developement/Banner/WebDevBanner'
import Strategy from '../../_components/services/web-developement/Strategy/Strategy'
import Struggling from '../../_components/services/web-developement/Struggling/Struggling'
import TechnoligesWeUse from '../../_components/services/web-developement/TechnoligesWeUse/TechnoligesWeUse'
import HowDoWeResults from '../../_components/services/web-developement/HowDoWeResults/HowDoWeResults'
import WebWhyChoose from '../../_components/services/web-developement/WhyChoose/WebWhyChoose'
import WebHireUs from '../../_components/services/web-developement/HireUs/WebHireUs'
import WebFAQ from '../../_components/services/web-developement/FAQ/WebFAQ'

const page = () => {
  return (
    <div>
      <WebDevBanner/>
      <Strategy/>
      <Struggling/>
      <HowDoWeResults/>
      <TechnoligesWeUse/>
      <WebWhyChoose/>
      <WebHireUs/>
      <WebFAQ/>
    </div>
  )
}

export default page
