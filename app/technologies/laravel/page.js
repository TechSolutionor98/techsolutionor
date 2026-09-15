import React from 'react'
import LaravelBanner from '../../_components/Laravel/LaravelBanner/LaravelBanner'
import Framework from '../../_components/Laravel/Framework/Framework'
import LaravelCards from '../../_components/Laravel/LaravelCards/LaravelCards'
import Advantages from '../../_components/Laravel/Advantages/Advantages'
import TechFAQS from '../../_components/Laravel/TechFAQS/TechFAQS'
import { generateCmsMetadata } from '@/lib/cms-fetch'
import CmsJsonLd from '@/components/CmsJsonLd'

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/laravel', {
    title: 'Laravel Development Services | Tech Solutionor',
    description: 'Custom PHP Laravel development services, API integrations, and enterprise web applications built with Laravel framework.',
  });
}

const Laravel = () => {
  return (
    <div>
      <CmsJsonLd path="/technologies/laravel" />
      <LaravelBanner/>
      <Framework/>
      <LaravelCards/>
      <Advantages/>
      <TechFAQS/>
    </div>
  )
}

export default Laravel
