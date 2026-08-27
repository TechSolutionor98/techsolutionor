import React from 'react';
import SeoAuditHero from '../_components/SeoAudit/SeoAuditHero';
import SeoAuditContent from '../_components/SeoAudit/SeoAuditContent';
import SeoAuditBenefits from '../_components/SeoAudit/SeoAuditBenefits';
import SeoAuditProcess from '../_components/SeoAudit/SeoAuditProcess';
import SeoAuditSampleReport from '../_components/SeoAudit/SeoAuditSampleReport';
import SeoAuditFinalForm from '../_components/SeoAudit/SeoAuditFinalForm';
import SeoAuditFAQ from '../_components/SeoAudit/SeoAuditFAQ';
import Newsletter from '../_components/Home/Newsletter/Newsletter';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/claim-your-free-seo-audit', {
    title: 'Claim Your Free SEO Audit | Tech Solutionor',
    description: 'Get a comprehensive free SEO website audit report from Tech Solutionor to uncover technical issues and growth opportunities.',
  });
}

const ClaimFreeSeoAudit = () => {
    return (
        <main className="min-h-screen bg-white">
            <SeoAuditHero />
            <SeoAuditContent />
            <SeoAuditBenefits />
            <SeoAuditProcess />
            <SeoAuditSampleReport />
            <SeoAuditFinalForm />
            <Newsletter />
            <SeoAuditFAQ />
        </main>
    );
};

export default ClaimFreeSeoAudit;
