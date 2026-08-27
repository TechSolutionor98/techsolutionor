import React from 'react'
import CallCenterBanner from '../../_components/services/call-center/Banner/CallCenterBanner'
import CallCenterOfferings from '../../_components/services/call-center/Offerings/CallCenterOfferings'
import CallCenterConsulting from '../../_components/services/call-center/Consulting/CallCenterConsulting'
import Newsletter from '../../_components/Home/Newsletter/Newsletter'
import CallCenterFAQ from '../../_components/services/call-center/FAQ/CallCenterFAQ'

function page() {
  return (
    <div>
      <CallCenterBanner />
      <CallCenterOfferings />
      <CallCenterConsulting />
      <Newsletter />
      <CallCenterFAQ />
    </div>
  )
}

export default page
