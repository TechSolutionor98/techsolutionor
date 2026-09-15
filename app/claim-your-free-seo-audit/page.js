import React from 'react';
import SeoAuditHero from '../_components/SeoAudit/SeoAuditHero';
import SeoAuditContent from '../_components/SeoAudit/SeoAuditContent';
import SeoAuditBenefits from '../_components/SeoAudit/SeoAuditBenefits';
import SeoAuditProcess from '../_components/SeoAudit/SeoAuditProcess';
import SeoAuditSampleReport from '../_components/SeoAudit/SeoAuditSampleReport';
import SeoAuditFAQ from '../_components/SeoAudit/SeoAuditFAQ';
import Newsletter from '../_components/Home/Newsletter/Newsletter';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/claim-your-free-seo-audit', {
    title: 'Claim Your Free SEO Audit | Tech Solutionor',
    description: 'Get a comprehensive free SEO website audit report from Tech Solutionor to uncover technical issues and growth opportunities.',
  });
}

export default async function ClaimFreeSeoAudit() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/claim-your-free-seo-audit');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Claim Free SEO Audit page:', err);
  }

  return (
    <main className="min-h-screen bg-white">
      <CmsJsonLd path="/claim-your-free-seo-audit" />
      <SeoAuditHero cmsContent={cmsContent} />
      <SeoAuditContent />
      <SeoAuditBenefits />
      <SeoAuditProcess />
      <SeoAuditSampleReport />
      <Newsletter />
      <SeoAuditFAQ cmsContent={cmsContent} />
    </main>
  );
}
