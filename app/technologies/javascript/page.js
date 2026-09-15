import React from 'react'
import JavaBanner from '../../_components/Js/JavaBanner/JavaBanner'
import JsFramework from '../../_components/Js/JsFramework/JsFramework'
import JsCards from '../../_components/Js/JsCards/JsCards'
import JsAdvantages from '../../_components/Js/JsAdvantages/JsAdvantages'
import JsHireUs from '../../_components/Js/HireUs/JsHireUs'
import JsFAQ from '../../_components/Js/JsFAQ/JsFAQ'
import { generateCmsMetadata } from '@/lib/cms-fetch'
import CmsJsonLd from '@/components/CmsJsonLd'

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/javascript', {
    title: 'JavaScript Development Services | Tech Solutionor',
    description: 'Expert JavaScript development solutions for responsive web apps, modern frontends, and robust backend microservices.',
  });
}

const Javascript = () => {
  return (
    <div>
      <CmsJsonLd path="/technologies/javascript" />
      <JavaBanner/>
      <JsFramework/>
      <JsCards/>
      <JsAdvantages/>
      <JsHireUs/>
      <JsFAQ/>
    </div>
  )
}

export default Javascript
