import React from "react";

// Reusable vector SVG icons with stroke="currentColor" for seamless color inversion (#1B4E2C <-> #FFFFFF)
export const icons = {
  // Mobile / App
  mobile: (
    <svg className="w-full h-full transition-colors duration-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="20" y="10" width="24" height="44" rx="6" />
      <line x1="28" y1="16" x2="36" y2="16" />
      <circle cx="32" cy="47" r="2" fill="currentColor" />
    </svg>
  ),
  // Architecture / System
  system: (
    <svg className="w-full h-full transition-colors duration-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="14" width="36" height="14" rx="2" />
      <rect x="14" y="36" width="36" height="14" rx="2" />
      <line x1="24" y1="28" x2="24" y2="36" />
      <line x1="40" y1="28" x2="40" y2="36" />
      <circle cx="20" cy="21" r="1.5" fill="currentColor" />
      <circle cx="20" cy="43" r="1.5" fill="currentColor" />
    </svg>
  ),
  // Agile Sprint / Rocket
  rocket: (
    <svg className="w-full h-full transition-colors duration-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 10s10 4 12 16l-8 8-8-8c2-12 4-16 4-16z" />
      <path d="M28 26l-8 4v8l8-2" />
      <path d="M36 26l8 4v8l-8-2" />
      <circle cx="32" cy="22" r="3" fill="currentColor" />
      <path d="M29 42l3 12 3-12" />
    </svg>
  ),
  // Transparent Pricing / Shield Check
  shieldCheck: (
    <svg className="w-full h-full transition-colors duration-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 12l16 6v14c0 12-8 20-16 24-8-4-16-12-16-24V18l16-6z" />
      <path d="M24 32l6 6 12-12" strokeWidth="2.6" />
    </svg>
  ),
  // 24/7 Support
  support247: (
    <svg className="w-full h-full transition-colors duration-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M46 32a14 14 0 1 1-4.1-9.9" />
      <path d="M42 16l4 6.1-6.1 1" />
      <path d="M18 32a14 14 0 0 1 4.1-9.9" />
      <path d="M22 26l-4-6.1 6.1-1" />
      <text x="32" y="36" textAnchor="middle" fontSize="11" fontWeight="900" fill="currentColor" stroke="none" fontFamily="sans-serif">
        24/7
      </text>
    </svg>
  ),
  // Growth / Chart
  chartGrowth: (
    <svg className="w-full h-full transition-colors duration-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="24" width="28" height="18" rx="2" />
      <path d="M14 44h36" />
      <path d="M23 37l4-4 4 2 6-7" />
      <path d="M33 28h4v4" />
      <circle cx="43" cy="20" r="4" />
      <path d="M43 14v2M43 24v2M37 20h2M47 20h2" />
    </svg>
  ),
  // Ecommerce / Shopping Cart
  cart: (
    <svg className="w-full h-full transition-colors duration-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="26" cy="48" r="4" fill="currentColor" />
      <circle cx="44" cy="48" r="4" fill="currentColor" />
      <path d="M14 18h8l5 22h20l6-16H25" />
    </svg>
  ),
  // Graphic Design / Palette & Pen
  palette: (
    <svg className="w-full h-full transition-colors duration-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 14c-11 0-20 8-20 18 0 6 4 10 9 10 2.5 0 4-1.5 5-2.5 1-1 2-2 4-2h2c6 0 10-4 10-10 0-7.5-4.5-13.5-10-13.5z" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
      <circle cx="32" cy="22" r="2" fill="currentColor" />
      <circle cx="40" cy="26" r="2" fill="currentColor" />
      <circle cx="26" cy="32" r="2" fill="currentColor" />
    </svg>
  ),
  // Social Media / Network Nodes
  network: (
    <svg className="w-full h-full transition-colors duration-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="20" r="6" />
      <circle cx="18" cy="44" r="6" />
      <circle cx="46" cy="44" r="6" />
      <line x1="28" y1="25" x2="22" y2="39" />
      <line x1="36" y1="25" x2="42" y2="39" />
      <line x1="24" y1="44" x2="40" y2="44" strokeDasharray="3 3" />
    </svg>
  ),
  // Target / Bullseye (Digital Marketing / Ads)
  target: (
    <svg className="w-full h-full transition-colors duration-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="32" r="18" />
      <circle cx="32" cy="32" r="11" />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
      <line x1="32" y1="8" x2="32" y2="14" />
      <line x1="32" y1="50" x2="32" y2="56" />
      <line x1="8" y1="32" x2="14" y2="32" />
      <line x1="50" y1="32" x2="56" y2="32" />
    </svg>
  ),
  // Search / SEO Magnifier
  searchEngine: (
    <svg className="w-full h-full transition-colors duration-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="29" cy="29" r="13" />
      <line x1="39" y1="39" x2="51" y2="51" strokeWidth="3" />
      <path d="M23 29h12M29 23v12" strokeWidth="1.8" />
    </svg>
  ),
  // Content / Pen & Document
  penDoc: (
    <svg className="w-full h-full transition-colors duration-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 14h20l10 10v26H18V14z" />
      <path d="M38 14v10h10" />
      <line x1="24" y1="30" x2="34" y2="30" />
      <line x1="24" y1="36" x2="40" y2="36" />
      <line x1="24" y1="42" x2="36" y2="42" />
    </svg>
  ),
  // Headset / Call Center
  headset: (
    <svg className="w-full h-full transition-colors duration-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 36v-8a14 14 0 0 1 28 0v8" />
      <rect x="14" y="34" width="8" height="14" rx="4" fill="currentColor" fillOpacity="0.1" />
      <rect x="42" y="34" width="8" height="14" rx="4" fill="currentColor" fillOpacity="0.1" />
      <path d="M46 44v4a6 6 0 0 1-6 6h-6" />
      <circle cx="32" cy="54" r="2" fill="currentColor" />
    </svg>
  ),
  // Dedicated Developers / Handshake & Code
  developers: (
    <svg className="w-full h-full transition-colors duration-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="18" r="8" />
      <path d="M26 18h4M34 18h4" />
      <circle cx="28" cy="18" r="1.5" fill="currentColor" />
      <circle cx="36" cy="18" r="1.5" fill="currentColor" />
      <path d="M18 36c0-6 6-10 14-10s14 4 14 10" />
      <rect x="20" y="36" width="24" height="14" rx="2" />
      <path d="M16 50h32" />
      <path d="M27 41l-2 2 2 2M37 41l2 2-2 2M33 40l-2 6" strokeWidth="1.8" />
    </svg>
  ),
  // Fast & Agile Delivery
  fastAgile: (
    <svg className="w-full h-full transition-colors duration-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="20" y="24" width="24" height="18" rx="2" />
      <path d="M44 30h7l5 6v6h-12v-12z" />
      <circle cx="28" cy="44" r="4" />
      <circle cx="48" cy="44" r="4" />
      <path d="M12 28h5M9 33h6M12 38h5" />
      <circle cx="32" cy="33" r="4" />
      <path d="M32 31v2h2" />
    </svg>
  ),
  // Solutions
  solutions: (
    <svg className="w-full h-full transition-colors duration-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="22" width="28" height="20" rx="2" />
      <path d="M28 42v5M36 42v5M24 47h16" />
      <path d="M32 10a7 7 0 0 0-5 11.9c1.2 1.3 2 2.6 2 4.1h6c0-1.5.8-2.8 2-4.1A7 7 0 0 0 32 10z" />
      <path d="M30 29h4" />
      <circle cx="25" cy="32" r="2.5" />
      <circle cx="39" cy="32" r="2.5" />
    </svg>
  ),
};

export const servicesWhyChooseData = {
  // 1. App Development
  "app-development": {
    subtitle: "Engineered for high performance, intuitive mobile UX, and scalable app architectures.",
    items: [
      {
        id: 0,
        title: "Expert App Developers",
        desc: "Specialized iOS, Android, and cross-platform mobile engineers building responsive, fluid apps adhering to strict platform design guidelines.",
        icon: icons.mobile,
      },
      {
        id: 1,
        title: "Tailored Mobile Architecture",
        desc: "Custom backend architectures, offline-first data sync, and enterprise-grade encryption crafted specifically for your user base.",
        icon: icons.solutions,
      },
      {
        id: 2,
        title: "Rapid Sprint Delivery",
        desc: "Our agile mobile sprint cycle delivers reliable MVP launches and progressive feature rollouts with zero compromise on stability.",
        icon: icons.fastAgile,
      },
      {
        id: 3,
        title: "Clear Milestone Pricing",
        desc: "Transparent development roadmaps and fixed-milestone pricing ensure complete budgetary predictability without surprise fees.",
        icon: icons.shieldCheck,
      },
      {
        id: 4,
        title: "24/7 SLA & Maintenance",
        desc: "Round-the-clock crash analytics, proactive security patch management, and immediate adaptation for new OS releases.",
        icon: icons.support247,
      },
      {
        id: 5,
        title: "Proven Retention & Growth",
        desc: "Apps engineered to minimize friction, elevate user retention rates, and power measurable commercial engagement.",
        icon: icons.chartGrowth,
      },
    ],
  },

  // 2. Software Development
  "software-development": {
    subtitle: "Custom enterprise software, microservices, and secure SaaS ecosystems built to scale.",
    items: [
      {
        id: 0,
        title: "Enterprise System Architects",
        desc: "Senior software engineers specializing in domain-driven design, high-concurrency platforms, and secure multi-tenant SaaS structures.",
        icon: icons.developers,
      },
      {
        id: 1,
        title: "Custom Business Platforms",
        desc: "Bespoke internal tools, automated operational workflows, and ERP/CRM systems designed to overcome your specific industry bottlenecks.",
        icon: icons.system,
      },
      {
        id: 2,
        title: "Agile CI/CD Delivery",
        desc: "Automated test suites, continuous deployment pipelines, and zero-downtime releases ensuring swift, dependable software rollouts.",
        icon: icons.rocket,
      },
      {
        id: 3,
        title: "Predictable Value Pricing",
        desc: "Transparent project scoping and clear hourly or milestone rates with zero hidden licensing or operational markups.",
        icon: icons.shieldCheck,
      },
      {
        id: 4,
        title: "Dedicated DevOps Support",
        desc: "24/7 infrastructure observability, cloud server load balancing, and rapid emergency troubleshooting for uninterrupted workflows.",
        icon: icons.support247,
      },
      {
        id: 5,
        title: "Scalable Long-Term Growth",
        desc: "Modular architectures built to handle exponential transaction volumes and adapt effortlessly to future corporate expansion.",
        icon: icons.chartGrowth,
      },
    ],
  },

  // 3. Ecommerce Development
  "ecommerce-development": {
    subtitle: "High-converting online stores engineered for blazing speed, security, and global sales.",
    items: [
      {
        id: 0,
        title: "Ecommerce Specialists",
        desc: "Mastery across Shopify Plus, Magento, WooCommerce, and Headless architectures built for rapid catalog navigation and high conversions.",
        icon: icons.cart,
      },
      {
        id: 1,
        title: "Conversion-First UX",
        desc: "Frictionless checkout paths, one-click payment gateways, personalized product recommendations, and mobile-optimized interfaces.",
        icon: icons.solutions,
      },
      {
        id: 2,
        title: "Agile Omnichannel Launch",
        desc: "Rapid store deployment with turnkey POS synchronization, multi-currency pricing, and real-time inventory management integration.",
        icon: icons.fastAgile,
      },
      {
        id: 3,
        title: "Honest & Transparent Rates",
        desc: "Competitive ecommerce engineering packages with zero hidden transactional fees or unexpected platform markup costs.",
        icon: icons.shieldCheck,
      },
      {
        id: 4,
        title: "24/7 Store Reliability",
        desc: "99.99% uptime monitoring, peak Black Friday / holiday traffic readiness, and constant payment gateway transaction verification.",
        icon: icons.support247,
      },
      {
        id: 5,
        title: "Proven Revenue Scaling",
        desc: "Optimized sales funnels and automated cart recovery workflows designed to maximize average order value (AOV) and lifetime value.",
        icon: icons.chartGrowth,
      },
    ],
  },

  // 4. Graphic Design & UI/UX
  "graphic-design": {
    subtitle: "Award-winning visual identities, design systems, and conversion-focused digital interfaces.",
    items: [
      {
        id: 0,
        title: "Elite Creative Designers",
        desc: "Multidisciplinary visual artists and UX researchers crafting human-centered brand identities and modern user interfaces.",
        icon: icons.palette,
      },
      {
        id: 1,
        title: "Bespoke Brand Systems",
        desc: "End-to-end brand guidelines, typography systems, vector iconography, and marketing assets tailored to your unique brand voice.",
        icon: icons.solutions,
      },
      {
        id: 2,
        title: "Rapid Interactive Prototypes",
        desc: "Interactive Figma wireframes and clickable design prototypes allowing rapid user testing and seamless developer handoff.",
        icon: icons.rocket,
      },
      {
        id: 3,
        title: "Clear Tiered Pricing",
        desc: "Predictable design packages with complete asset ownership, vector source files, and unlimited milestone iterations.",
        icon: icons.shieldCheck,
      },
      {
        id: 4,
        title: "Continuous Creative Care",
        desc: "Ongoing graphic support for seasonal promotions, social marketing toolkits, and marketing collateral updates whenever needed.",
        icon: icons.support247,
      },
      {
        id: 5,
        title: "Elevated Market Perception",
        desc: "Polished, premium visuals engineered to establish client trust, elevate brand authority, and boost digital conversion rates.",
        icon: icons.chartGrowth,
      },
    ],
  },

  // 5. Social Media
  "social-media": {
    subtitle: "Data-driven social media growth, viral content creation, and active community engagement.",
    items: [
      {
        id: 0,
        title: "Strategic Social Planners",
        desc: "Dedicated social analysts and creative directors crafting platform-specific strategies across Instagram, TikTok, LinkedIn, and Meta.",
        icon: icons.network,
      },
      {
        id: 1,
        title: "Viral High-Impact Content",
        desc: "Professional short-form video editing, carousel storytelling, and persuasive copywriting engineered for peak algorithm engagement.",
        icon: icons.solutions,
      },
      {
        id: 2,
        title: "Agile Trend Execution",
        desc: "Rapid trend hijacking and dynamic weekly content calendars designed to keep your brand at the forefront of social feeds.",
        icon: icons.fastAgile,
      },
      {
        id: 3,
        title: "Transparent Ad Spend",
        desc: "Clear management fee structures with 100% transparent ad spend reporting and real-time social performance dashboard tracking.",
        icon: icons.shieldCheck,
      },
      {
        id: 4,
        title: "24/7 Community Care",
        desc: "Active comment moderation, instant direct message customer responses, and proactive reputation management around the clock.",
        icon: icons.support247,
      },
      {
        id: 5,
        title: "Measurable Audience Growth",
        desc: "Sustainable follower acquisition, high engagement ratios, and strategic social funnels driving traffic directly into sales.",
        icon: icons.chartGrowth,
      },
    ],
  },

  // 6. Digital Marketing
  "digital-marketing": {
    subtitle: "Full-funnel digital marketing strategies driving qualified leads, traffic, and high ROI.",
    items: [
      {
        id: 0,
        title: "Growth Marketing Veterans",
        desc: "Full-funnel growth marketers combining organic outreach, paid acquisition, email automation, and CRO for maximum velocity.",
        icon: icons.target,
      },
      {
        id: 1,
        title: "Custom Growth Blueprints",
        desc: "Multi-channel marketing plans tailored precisely to your target customer acquisition cost (CAC) and customer lifetime value.",
        icon: icons.solutions,
      },
      {
        id: 2,
        title: "Rapid Performance Sprints",
        desc: "Continuous A/B testing of creative angles, ad copy, and high-converting landing pages to optimize conversion funnels fast.",
        icon: icons.rocket,
      },
      {
        id: 3,
        title: "Direct Attribution & ROI",
        desc: "Transparent conversion tracking and attribution models with zero ad budget markups, showing exact return on marketing investment.",
        icon: icons.shieldCheck,
      },
      {
        id: 4,
        title: "24/7 Campaign Optimization",
        desc: "Automated budget guardrails, continuous bid adjustment, and fraud prevention to protect your digital spend 24/7.",
        icon: icons.support247,
      },
      {
        id: 5,
        title: "Scalable Revenue Impact",
        desc: "Data-backed expansion strategies designed to scale customer volume predictably while lowering blended acquisition expenses.",
        icon: icons.chartGrowth,
      },
    ],
  },

  // 7. PPC & Amazon Ads
  "ppc-amazon-ads": {
    subtitle: "Precision pay-per-click advertising, Amazon DSP, and maximized return on ad spend.",
    items: [
      {
        id: 0,
        title: "Certified Ad Specialists",
        desc: "Google Premier Partners and Amazon Advertising certified managers with hands-on experience managing 7-figure ad budgets.",
        icon: icons.target,
      },
      {
        id: 1,
        title: "Precision Keyword Targeting",
        desc: "Negative keyword hygiene, high-intent phrase harvesting, and Amazon ASIN conquesting to dominate top search placements.",
        icon: icons.solutions,
      },
      {
        id: 2,
        title: "Algorithmic Bid Scaling",
        desc: "Smart dayparting, algorithmic bid adjustments, and rapid ad variant testing to continually drive down Cost Per Click (CPC).",
        icon: icons.fastAgile,
      },
      {
        id: 3,
        title: "Transparent Spend Audits",
        desc: "Real-time looker studio dashboards with itemized cost metrics, exact ROAS calculation, and full ad account ownership.",
        icon: icons.shieldCheck,
      },
      {
        id: 4,
        title: "Continuous Budget Guardrails",
        desc: "24/7 monitoring to prevent budget overspending, capture sudden demand surges, and safeguard your Amazon buy box.",
        icon: icons.support247,
      },
      {
        id: 5,
        title: "Maximized ROAS & Profits",
        desc: "Campaign architectures engineered to increase overall TACoS efficiency, boost organic search halo, and maximize net profit.",
        icon: icons.chartGrowth,
      },
    ],
  },

  // 8. Search Engine Optimization
  "search-engine-optimization": {
    subtitle: "Technical SEO, organic search dominance, and high-authority link strategies that rank.",
    items: [
      {
        id: 0,
        title: "Technical SEO Engineers",
        desc: "Deep technical auditing focusing on Core Web Vitals, rich schema architecture, crawl budget efficiency, and clean indexation.",
        icon: icons.searchEngine,
      },
      {
        id: 1,
        title: "Custom Ranking Blueprints",
        desc: "Comprehensive topical authority mapping, search intent clustering, and competitor content gap analysis for your industry.",
        icon: icons.solutions,
      },
      {
        id: 2,
        title: "Agile On-Page Sprints",
        desc: "Swift on-page optimization, content velocity execution, and internal linking improvements that drive immediate ranking signals.",
        icon: icons.rocket,
      },
      {
        id: 3,
        title: "Transparent Ranking Reports",
        desc: "100% white-hat organic techniques with transparent keyword position tracking, search impressions, and organic lead metrics.",
        icon: icons.shieldCheck,
      },
      {
        id: 4,
        title: "Proactive Algorithm Defense",
        desc: "Continuous monitoring for Google core updates, backlink health maintenance, and rapid algorithm shift remediation.",
        icon: icons.support247,
      },
      {
        id: 5,
        title: "Sustained Inbound Growth",
        desc: "Evergreen search rankings engineered to attract high-intent commercial organic visitors and compound compounding inbound leads.",
        icon: icons.chartGrowth,
      },
    ],
  },

  // 9. Content Writing
  "content-writing": {
    subtitle: "Compelling SEO copywriting, thought leadership, and storytelling that converts readers.",
    items: [
      {
        id: 0,
        title: "Specialized Copywriters",
        desc: "Professional copywriters and industry subject-matter experts creating original, authoritative, and fact-checked written content.",
        icon: icons.penDoc,
      },
      {
        id: 1,
        title: "Bespoke Brand Voice",
        desc: "Tailored editorial tone, structured style guides, and persuasive messaging aligned directly with your target audience persona.",
        icon: icons.solutions,
      },
      {
        id: 2,
        title: "Rapid Editorial Turnaround",
        desc: "Strict editorial calendar delivery, structured batch writing workflows, and fast revision cycles to keep content flowing.",
        icon: icons.fastAgile,
      },
      {
        id: 3,
        title: "Transparent Per-Word Rates",
        desc: "Straightforward transparent project pricing, 100% plagiarism-free content guarantee, and full intellectual property transfer.",
        icon: icons.shieldCheck,
      },
      {
        id: 4,
        title: "Ongoing Content Refreshes",
        desc: "Regular content auditing, historical optimization, and seasonal copy revisions to ensure your copy remains fresh and relevant.",
        icon: icons.support247,
      },
      {
        id: 5,
        title: "High Conversion Engagement",
        desc: "Engaging copy optimized for readability, dwell time, organic click-through rates, and seamless user conversion action.",
        icon: icons.chartGrowth,
      },
    ],
  },

  // 10. Call Center
  "call-center": {
    subtitle: "Omnichannel customer support, bilingual agents, and 24/7 dedicated inbound/outbound solutions.",
    items: [
      {
        id: 0,
        title: "Certified Support Agents",
        desc: "Experienced, empathetic bilingual professionals rigorously trained in active listening, conflict resolution, and brand representation.",
        icon: icons.headset,
      },
      {
        id: 1,
        title: "Customized CRM Workflows",
        desc: "Seamless integration with Zendesk, HubSpot, Freshdesk, and VoIP platforms tailored to your standard operating procedures.",
        icon: icons.solutions,
      },
      {
        id: 2,
        title: "Rapid Agent Deployment",
        desc: "Swift onboarding and flexible seasonal scaling to handle sudden ticket surges, holiday rushes, and promotional campaigns.",
        icon: icons.rocket,
      },
      {
        id: 3,
        title: "Transparent Seat Pricing",
        desc: "Predictable hourly or per-seat models with clear Service Level Agreements (SLAs) and zero hidden telecommunication surcharges.",
        icon: icons.shieldCheck,
      },
      {
        id: 4,
        title: "24/7/365 Uninterrupted Uptime",
        desc: "Redundant telecom infrastructure, continuous shift handovers, and failover routing ensuring your customers are never left waiting.",
        icon: icons.support247,
      },
      {
        id: 5,
        title: "Industry-Leading CSAT Scores",
        desc: "Rapid first-call resolution and sub-60-second response times engineered to elevate customer satisfaction and brand loyalty.",
        icon: icons.chartGrowth,
      },
    ],
  },

  // 11. Hire Us
  "hire-us": {
    subtitle: "Dedicated tech teams, senior software engineers, and flexible resource scaling on demand.",
    items: [
      {
        id: 0,
        title: "Top 3% Vetted Engineers",
        desc: "Senior developers, UI/UX designers, and DevOps engineers screened through stringent technical and problem-solving benchmarks.",
        icon: icons.developers,
      },
      {
        id: 1,
        title: "Tailored Staffing Models",
        desc: "Flexible team structures ranging from dedicated single-resource augmentation to fully self-managed product development pods.",
        icon: icons.solutions,
      },
      {
        id: 2,
        title: "48-Hour Rapid Onboarding",
        desc: "Rapid developer matching and sprint integration within 48 hours to eliminate recruitment friction and accelerate time-to-market.",
        icon: icons.rocket,
      },
      {
        id: 3,
        title: "Transparent Hiring Contracts",
        desc: "Simple monthly billing with zero recruitment overheads, zero hidden exit fees, and full intellectual property security.",
        icon: icons.shieldCheck,
      },
      {
        id: 4,
        title: "Direct Daily Collaboration",
        desc: "Full time-zone alignment, daily standups, and direct access via Slack, Teams, and Jira as an integrated extension of your team.",
        icon: icons.support247,
      },
      {
        id: 5,
        title: "Guaranteed Sprint Output",
        desc: "High velocity, clean maintainable code delivery, and rigorous QA accountability to consistently meet corporate milestones.",
        icon: icons.chartGrowth,
      },
    ],
  },
};

export default servicesWhyChooseData;
