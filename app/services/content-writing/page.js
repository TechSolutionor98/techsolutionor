import React from 'react'
import ContentBanner from '../../_components/services/content-writing/Banner/ContentBanner'
import ContentServices from '../../_components/services/content-writing/Services/ContentServices'
import ContentProcess from '../../_components/services/content-writing/Process/ContentProcess'
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook'
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose'
import Newsletter from '../../_components/Home/Newsletter/Newsletter'
import ContentFAQ from '../../_components/services/content-writing/FAQ/ContentFAQ'

function page() {
  return (
    <div>
    <ContentBanner />
    <ContentServices />
    <ContentProcess />
    <TechnologiesBook serviceKey="content-writing" />
    <CommonWhyChoose serviceKey="content-writing" />
    <Newsletter />
    <ContentFAQ/>
    </div>
  )
}

export default page
