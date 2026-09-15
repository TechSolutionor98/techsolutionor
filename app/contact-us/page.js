import React from 'react';
import ContactHero from '../_components/Contact/ContactHero';
import ContactForm from '../_components/Contact/ContactForm';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/contact-us', {
    title: 'Contact Us | Tech Solutionor',
    description: 'Get in touch with Tech Solutionor for your web, mobile, and enterprise software engineering requirements.',
  });
}

export default async function ContactUsPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/contact-us');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Contact Us page:', err);
  }

  return (
    <div className="overflow-x-hidden">
      <CmsJsonLd path="/contact-us" />
      <ContactHero cmsContent={cmsContent} />
      <ContactForm cmsContent={cmsContent} />
    </div>
  );
}
