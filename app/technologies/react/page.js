import React from 'react'
import ReactBanner from '../../_components/React/ReactBanner/ReactBanner'
import ReactFrameworks from '../../_components/React/ReactFrameworks/Framework'
import ReactCards from '../../_components/React/ReactCards/ReactCards'
import ReactAdvantages from '../../_components/React/ReactAdvantages/ReactAdvantages'
import ReactHireUs from '../../_components/React/HireUs/ReactHireUs'
import ReactFAQ from '../../_components/React/ReactFAQ/ReactFAQ'
import { generateCmsMetadata } from '@/lib/cms-fetch'
import CmsJsonLd from '@/components/CmsJsonLd'

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/react', {
    title: 'React.js Development Services | Tech Solutionor',
    description: 'Expert React.js development services for dynamic, fast-loading, and interactive single page applications.',
  });
}

const Reactjs = () => {
  return (
    <div>
      <CmsJsonLd path="/technologies/react" />
      <ReactBanner/>
      <ReactFrameworks/>
      <ReactCards/>
      <ReactAdvantages/>
      <ReactHireUs/>
      <ReactFAQ/>
    </div>
  )
}

export default Reactjs
