import React from 'react';
import MetaBanner from '../../_components/Meta/MetaBanner/JavaBanner';
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose';
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures';
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling';
import CommonServices from '@/app/_components/services/common/Services/CommonServices';
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook';
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs';
import MetaFAQ from '../../_components/Meta/MetaFAQ/MetaFAQ';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/services/meta', {
    title: 'Meta Ads Management & Social Advertising Services | TechSolutionor',
    description: 'Premier Meta advertising services across Facebook and Instagram. Drive high ROAS, scalable audience targeting, and revenue growth.',
  });
}

export default async function MetaPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/services/meta');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Meta page:', err);
  }

  return (
    <div className="bg-white w-full">
      <CmsJsonLd path="/services/meta" />
      <MetaBanner cmsContent={cmsContent} />
      <CommonWhyChoose serviceKey="meta" cmsContent={cmsContent} />
      <CommonKeyFeatures serviceKey="meta" cmsContent={cmsContent} />
      <CommonStruggling serviceKey="meta" cmsContent={cmsContent} />
      <CommonServices serviceKey="meta" cmsContent={cmsContent} />
      <TechnologiesBook serviceKey="meta" bgColor="#FFFFFF" cmsContent={cmsContent} />
      <CommonHireUs serviceKey="meta" cmsContent={cmsContent} />
      <MetaFAQ cmsContent={cmsContent} />
    </div>
  );
}

