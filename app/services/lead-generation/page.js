import React from 'react';
import LeadGenBanner from '@/app/_components/services/lead-generation/Banner/LeadGenBanner';
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose';
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures';
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling';
import CommonServices from '@/app/_components/services/common/Services/CommonServices';
import LeadGenProcessFlow from '@/app/_components/services/lead-generation/Process/LeadGenProcessFlow';
import LocalVsGlobalLeadGen from '@/app/_components/services/lead-generation/MarketScope/LocalVsGlobalLeadGen';
import LeadQualificationAndNurturing from '@/app/_components/services/lead-generation/Qualification/LeadQualificationAndNurturing';
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook';
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs';
import LeadGenFAQ from '@/app/_components/services/lead-generation/FAQ/LeadGenFAQ';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/services/lead-generation', {
    title: 'B2B & B2C Lead Generation Services | Tech Solutionor',
    description: 'Scale your revenue with multi-channel lead generation services covering Email Marketing, WhatsApp, Push Notifications, SEO, Paid Ads, and automated lead nurturing.',
  });
}

export default async function LeadGenerationPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/services/lead-generation');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Lead Generation page:', err);
  }

  return (
    <div className="w-full bg-white">
      <CmsJsonLd path="/services/lead-generation" />

      {/* 1. Hero Section (Reusing CommonServiceHero matching WebDevBanner) */}
      <LeadGenBanner cmsContent={cmsContent} />

      {/* 8. Why Lead Generation Matters (Reusing CommonWhyChoose 6-card sticky-scroll) */}
      <CommonWhyChoose 
        serviceKey="lead-generation" 
        eyebrow="WHY LEAD GENERATION MATTERS"
        titlePrefix="Why Choose Structured"
        titleHighlight="Lead Generation"
        subtitle="Transform unpredictable revenue dry spells into an engineered pipeline of verified, sales-ready decision-makers."
        tagText="LEAD GENERATION"
        cmsContent={cmsContent} 
      />

      {/* Reusable 3-card performance table (Reusing CommonKeyFeatures) */}
      <CommonKeyFeatures 
        serviceKey="lead-generation" 
        title="HOW WE DELIVER RESULTS"
        subtitle="MEASURABLE LEAD PIPELINES."
        columns={["Speed to Lead", "Deliverability", "BANT Quality", "Scalability", "Cost-Effective"]}
        cmsContent={cmsContent} 
      />

      {/* Reusable 4-card arc-scroll challenge cards (Reusing CommonStruggling) */}
      <CommonStruggling serviceKey="lead-generation" cmsContent={cmsContent} />

      {/* 2. Lead Generation Services (7 Core Offerings reusing CommonServices) */}
      <div id="lead-services-section">
        <CommonServices serviceKey="lead-generation" cmsContent={cmsContent} />
      </div>

      {/* 3. Lead Generation Process: Attract → Capture → Engage → Nurture → Qualify → Convert */}
      <LeadGenProcessFlow cmsContent={cmsContent} />

      {/* 4. Local & Global Lead Generation */}
      <LocalVsGlobalLeadGen cmsContent={cmsContent} />

      {/* 5 & 6. Lead Nurturing & Follow-Up Strategy + Lead Qualification & Conversion (BANT) */}
      <LeadQualificationAndNurturing cmsContent={cmsContent} />

      {/* 7. Marketing Channels & CRM Tech Stack Book (Reusing TechnologiesBook 3D turning pages) */}
      <TechnologiesBook serviceKey="lead-generation" bgColor="#FFFFFF" cmsContent={cmsContent} />

      {/* 10. Final CTA Banner (Reusing CommonHireUs) */}
      <CommonHireUs 
        serviceKey="lead-generation" 
        badge="START SCALING YOUR COMMERCIAL PIPELINE"
        line1="Ready to flood your sales calendar with qualified buyers?"
        line2="Hire Tech Solutionor to engineer your lead acquisition pipeline."
        buttonText="Hire Us"
        cmsContent={cmsContent} 
      />

      {/* 9. FAQ Section (Reusing standard Faq component matching WebFAQ) */}
      <LeadGenFAQ cmsContent={cmsContent} />
    </div>
  );
}
