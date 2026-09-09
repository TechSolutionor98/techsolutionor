/**
 * Data Dictionary for Reusable 4-Card Struggling Component across all Services
 *
 * Exact 4 Brand Colors:
 * - Card 0: #FF4646 (Coral Red, text: #FF4646, btnTextColor: #FFFFFF)
 * - Card 1: #417F51 (Forest Green, text: #417F51, btnTextColor: #FFFFFF)
 * - Card 2: #FFB904 (Warm Gold, text: #B47F00, btnTextColor: #111827)
 * - Card 3: #F78B40 (Sunset Orange, text: #E06E22, btnTextColor: #FFFFFF)
 */

export const servicesStrugglingData = {
  // =========================================================================
  // 1. WEB DEVELOPMENT
  // =========================================================================
  "web-development": {
    eyebrow: "PROVEN DEVELOPMENT STRATEGIES",
    titleLine1: "Struggling With Website Performance?",
    titleLine2: "Here’s How Our Web Development Services Help",
    subtitle:
      "As a results-driven website development company in Dubai and across the UAE, we solve real business challenges with scalable, SEO-friendly web solutions.",
    cards: [
      {
        id: 0,
        badge: "CHALLENGE 01 // SEO VISIBILITY",
        title: "Low Organic Traffic & Poor Search Visibility",
        desc: `If your site doesn’t rank for terms like "Web Development Company" or "Web Development Services," your ideal customers are finding your competitors instead. We integrate technical SEO, semantic HTML and lightning-fast architecture to dominate search results, locally and globally.`,
        ctaText: "Audit My SEO Performance →",
        color: "#FF4646",
        textColor: "#FF4646",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 1,
        badge: "CHALLENGE 02 // CONVERSIONS & UX",
        title: "Weak User Engagement & Low Conversions",
        descParts: [
          `High traffic has no value if visitors leave without taking action. Our professional web developers optimize UX, UI and conversion paths to guide users toward leads or purchases. Whether it’s an `,
          { isLink: true, text: "eCommerce website development", href: "/services/ecommerce-development" },
          ` project or a corporate platform, we build sites that convert.`,
        ],
        ctaText: "Optimize My Conversion Rate →",
        color: "#417F51",
        textColor: "#417F51",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 2,
        badge: "CHALLENGE 03 // BRAND IDENTITY",
        title: "Misaligned Brand Identity",
        desc: `Your website is your digital presence. If it looks outdated, it hurts your authority. As a leading web design agency, we craft bespoke web experiences that translate your brand vision into a premium digital identity, establishing you as a leader in the UAE market.`,
        ctaText: "Elevate My Digital Brand →",
        color: "#FFB904",
        textColor: "#B47F00",
        btnTextColor: "#111827",
      },
      {
        id: 3,
        badge: "CHALLENGE 04 // QUALIFIED LEADS",
        title: "Insufficient Qualified Leads",
        desc: `A website should be your best salesperson. If your current site isn’t generating quality leads, our conversion-focused frameworks optimize every touchpoint. From landing page architecture to strategic CTAs, our web design services turn anonymous visitors into loyal clients.`,
        ctaText: "Scale My Lead Generation →",
        color: "#F78B40",
        textColor: "#E06E22",
        btnTextColor: "#FFFFFF",
      },
    ],
  },

  // =========================================================================
  // 2. APP DEVELOPMENT
  // =========================================================================
  "app-development": {
    eyebrow: "CROSS-PLATFORM APP EXCELLENCE",
    titleLine1: "Struggling With Mobile App Performance?",
    titleLine2: "Here’s How Our App Development Services Help",
    subtitle:
      "From frustrating app crashes to poor retention and slow releases, we engineer high-performance iOS and Android mobile applications that users love.",
    cards: [
      {
        id: 0,
        badge: "CHALLENGE 01 // USER CHURN",
        title: "High Uninstalls & Low App Retention",
        desc: "Over 70% of mobile users abandon apps with confusing onboarding or sluggish navigation. We craft frictionless native iOS, Android, and Flutter experiences with instant loading, intuitive gestures, and sticky micro-interactions that keep users returning daily.",
        ctaText: "Boost App Retention →",
        color: "#FF4646",
        textColor: "#FF4646",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 1,
        badge: "CHALLENGE 02 // CRASHES & BUGS",
        title: "Frequent App Crashes & Slow Load Times",
        desc: "Poor memory management and unoptimized API calls destroy app store reviews. Our senior mobile engineers conduct deep profiling, background threading, and offline-first caching architectures to deliver sub-second launches and 99.9% crash-free sessions.",
        ctaText: "Audit App Stability →",
        color: "#417F51",
        textColor: "#417F51",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 2,
        badge: "CHALLENGE 03 // MULTI-PLATFORM SYNC",
        title: "Fragmented iOS & Android Codebases",
        desc: "Maintaining disconnected development teams balloons your project budget and delays releases. We architect unified cross-platform codebases in Flutter and React Native that reduce development overhead by 40% while preserving 100% native fidelity.",
        ctaText: "Unify My Mobile Apps →",
        color: "#FFB904",
        textColor: "#B47F00",
        btnTextColor: "#111827",
      },
      {
        id: 3,
        badge: "CHALLENGE 04 // STORE REJECTIONS",
        title: "App Store Rejections & Compliance Hurdles",
        desc: "Navigating strict Apple App Store and Google Play guidelines can cause months of costly launch delays. We enforce rigorous pre-submission compliance audits, privacy sandbox guidelines, and secure in-app purchase handling for fast first-time approval.",
        ctaText: "Fast-Track App Approval →",
        color: "#F78B40",
        textColor: "#E06E22",
        btnTextColor: "#FFFFFF",
      },
    ],
  },

  // =========================================================================
  // 3. SOFTWARE DEVELOPMENT
  // =========================================================================
  "software-development": {
    eyebrow: "ENTERPRISE SOFTWARE SOLUTIONS",
    titleLine1: "Struggling With Legacy Software Systems?",
    titleLine2: "Here’s How Our Custom Software Services Help",
    subtitle:
      "Overcome technological bottlenecks, disjointed workflows, and costly maintenance with purpose-built enterprise software engineered for long-term scalability.",
    cards: [
      {
        id: 0,
        badge: "CHALLENGE 01 // LEGACY DEBT",
        title: "Crippling Technical Debt & Outdated Stacks",
        desc: "Aging monolithic software slows down your operational efficiency and becomes impossible to scale. We execute phased microservices migration, API modernization, and containerized cloud deployments without disrupting your day-to-day business operations.",
        ctaText: "Modernize My Software →",
        color: "#FF4646",
        textColor: "#FF4646",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 1,
        badge: "CHALLENGE 02 // DISCONNECTED SYSTEMS",
        title: "Siloed Data & Broken Workflow Integrations",
        desc: "When your ERP, CRM, and financial accounting tools operate in silos, teams waste hundreds of hours manually syncing records. We engineer secure middleware pipelines and bidirectional webhooks that synchronize your entire enterprise ecosystem in real time.",
        ctaText: "Integrate My Workflows →",
        color: "#417F51",
        textColor: "#417F51",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 2,
        badge: "CHALLENGE 03 // SECURITY RISKS",
        title: "Compliance Vulnerabilities & Data Leaks",
        desc: "Generic commercial software often lacks the granular permission models required for corporate compliance. We implement zero-trust security, strict role-based access control (RBAC), end-to-end data encryption, and full GDPR/SOC2 readiness.",
        ctaText: "Secure My Enterprise Data →",
        color: "#FFB904",
        textColor: "#B47F00",
        btnTextColor: "#111827",
      },
      {
        id: 3,
        badge: "CHALLENGE 04 // SCALABILITY LIMITS",
        title: "System Freezes Under Heavy User Concurrency",
        desc: "When high traffic spikes cause system freezing, customer trust and revenue drop instantly. We architect distributed database clustering, Redis memory caching, and auto-scaling Kubernetes clusters capable of handling millions of concurrent requests seamlessly.",
        ctaText: "Scale My Infrastructure →",
        color: "#F78B40",
        textColor: "#E06E22",
        btnTextColor: "#FFFFFF",
      },
    ],
  },

  // =========================================================================
  // 4. ECOMMERCE DEVELOPMENT
  // =========================================================================
  "ecommerce-development": {
    eyebrow: "HIGH-CONVERTING COMMERCE SOLUTIONS",
    titleLine1: "Struggling With Low Ecommerce Sales?",
    titleLine2: "Here’s How Our Ecommerce Development Services Help",
    subtitle:
      "Turn window shoppers into recurring buyers with fast checkout funnels, seamless mobile commerce, and high-performance storefronts.",
    cards: [
      {
        id: 0,
        badge: "CHALLENGE 01 // CART ABANDONMENT",
        title: "High Cart Abandonment at Checkout",
        desc: "Complicated checkout forms, hidden fees, and missing local payment options cause up to 70% of shoppers to leave. We implement streamlined 1-click checkouts, local payment gateways (Apple Pay, Tabby, Tamara), and automated recovery sequences.",
        ctaText: "Recover Lost Sales →",
        color: "#FF4646",
        textColor: "#FF4646",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 1,
        badge: "CHALLENGE 02 // SLOW STOREFRONTS",
        title: "Slow Product Catalog & Mobile Lag",
        desc: "Every second of page load delay cuts mobile ecommerce conversions by over 20%. We build ultra-fast headless Shopify, Magento, and WooCommerce stores with Edge CDN caching, instant faceted search, and sub-second catalog navigation.",
        ctaText: "Speed Up My Store →",
        color: "#417F51",
        textColor: "#417F51",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 2,
        badge: "CHALLENGE 03 // LOW ORDER VALUE",
        title: "Stagnant Average Order Value (AOV)",
        desc: "Failing to recommend relevant items at checkout leaves substantial revenue on the table. We engineer personalized AI recommendation engines, dynamic bundle offers, and slide-out cart upsells that consistently increase basket size.",
        ctaText: "Increase Average Order Value →",
        color: "#FFB904",
        textColor: "#B47F00",
        btnTextColor: "#111827",
      },
      {
        id: 3,
        badge: "CHALLENGE 04 // INVENTORY SYNC",
        title: "Inventory Discrepancies & Stockouts",
        desc: "Selling across Amazon, Noon, and your direct storefront without live synchronization creates overselling and customer disputes. We engineer automated omnichannel inventory sync that updates stock levels instantly across all sales channels.",
        ctaText: "Automate Inventory Sync →",
        color: "#F78B40",
        textColor: "#E06E22",
        btnTextColor: "#FFFFFF",
      },
    ],
  },

  // =========================================================================
  // 5. GRAPHIC DESIGN
  // =========================================================================
  "graphic-design": {
    eyebrow: "BRAND IDENTITY & CREATIVE EXCELLENCE",
    titleLine1: "Struggling With Inconsistent Brand Design?",
    titleLine2: "Here’s How Our Graphic Design Services Help",
    subtitle:
      "Stand out in crowded digital and physical markets with distinctive visual identities, precision design tokens, and impactful brand collateral.",
    cards: [
      {
        id: 0,
        badge: "CHALLENGE 01 // BRAND INCONSISTENCY",
        title: "Fragmented Visuals Across Marketing Channels",
        desc: "When social graphics, web pages, packaging, and sales decks look completely different, customer trust deteriorates. We establish comprehensive brand style manuals, standardized typography scales, and unified asset libraries for complete brand harmony.",
        ctaText: "Unify My Brand Identity →",
        color: "#FF4646",
        textColor: "#FF4646",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 1,
        badge: "CHALLENGE 02 // FORGETTABLE BRANDING",
        title: "Generic Logos That Blend Into The Crowd",
        desc: "Stock template logos fail to communicate what makes your company extraordinary. Our senior creative directors design bespoke vector emblems, custom lettering, and versatile visual identities that leave a lasting impression on your target audience.",
        ctaText: "Craft A Signature Logo →",
        color: "#417F51",
        textColor: "#417F51",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 2,
        badge: "CHALLENGE 03 // LOW AD CLICK-THROUGH",
        title: "Ad Creatives That Suffer From Ad Fatigue",
        desc: "Standard ad banners are ignored by audiences accustomed to visual noise. We design high-converting visual advertising sets, thumb-stopping carousel slides, and animated vector assets engineered to capture attention and multiply click-through rates.",
        ctaText: "Boost Ad Creative CTR →",
        color: "#FFB904",
        textColor: "#B47F00",
        btnTextColor: "#111827",
      },
      {
        id: 3,
        badge: "CHALLENGE 04 // AMATEUR COLLATERAL",
        title: "Lack of High-End Corporate Pitch Materials",
        desc: "Poorly formatted pitch decks and marketing collateral undermine your authority during crucial negotiations. We craft investor-grade pitch presentations, corporate brochures, and luxury packaging designs that command respect and close high-ticket deals.",
        ctaText: "Upgrade My Pitch Decks →",
        color: "#F78B40",
        textColor: "#E06E22",
        btnTextColor: "#FFFFFF",
      },
    ],
  },

  // =========================================================================
  // 6. SOCIAL MEDIA
  // =========================================================================
  "social-media": {
    eyebrow: "DATA-DRIVEN SOCIAL GROWTH",
    titleLine1: "Struggling With Low Social Media Reach?",
    titleLine2: "Here’s How Our Social Media Marketing Helps",
    subtitle:
      "Transform vanity follower numbers into active brand advocates and predictable customer acquisition channels across Meta, LinkedIn, TikTok, and Instagram.",
    cards: [
      {
        id: 0,
        badge: "CHALLENGE 01 // VANITY METRICS",
        title: "High Impressions With Zero Business Inquiries",
        desc: "Accumulating passive views that never translate into customer leads is an expensive vanity exercise. We architect conversion-focused social funnels that guide viewers from viral reels directly into lead magnets, direct messages, and booked consultations.",
        ctaText: "Turn Followers Into Leads →",
        color: "#FF4646",
        textColor: "#FF4646",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 1,
        badge: "CHALLENGE 02 // ALGORITHM SUPPRESSION",
        title: "Dwindling Organic Reach On Instagram & LinkedIn",
        desc: "Continual platform algorithm updates suppress ordinary posts unless you master algorithmic triggers. Our strategists deploy high-retention video hooks, shareable carousel frameworks, and active community management that beat platform algorithms consistently.",
        ctaText: "Amplify Organic Reach →",
        color: "#417F51",
        textColor: "#417F51",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 2,
        badge: "CHALLENGE 03 // CONTENT INCONSISTENCY",
        title: "Irregular Posting & Creative Burnout",
        desc: "Scrambling for daily post concepts leads to disjointed branding and irregular publishing schedules. We manage full 30-day editorial calendars, batch-produce high-resolution reels, and automate multi-channel publishing so your brand stays top-of-mind every day.",
        ctaText: "Streamline Content Production →",
        color: "#FFB904",
        textColor: "#B47F00",
        btnTextColor: "#111827",
      },
      {
        id: 3,
        badge: "CHALLENGE 04 // ROI UNCERTAINTY",
        title: "Unclear Return On Social Media Spend",
        desc: "Without exact lead tracking, leadership cannot justify social media investments. We implement granular UTM parameters, CRM conversion tracking, and transparent performance dashboards that quantify exactly how many sales originate from social channels.",
        ctaText: "Track My Social ROI →",
        color: "#F78B40",
        textColor: "#E06E22",
        btnTextColor: "#FFFFFF",
      },
    ],
  },

  // =========================================================================
  // 7. DIGITAL MARKETING
  // =========================================================================
  "digital-marketing": {
    eyebrow: "PERFORMANCE MARKETING & GROWTH",
    titleLine1: "Struggling To Scale Your Marketing Funnel?",
    titleLine2: "Here’s How Our Digital Marketing Services Help",
    subtitle:
      "Eliminate wasted ad spend and broken customer journeys with multi-channel performance marketing that delivers consistent pipeline growth.",
    cards: [
      {
        id: 0,
        badge: "CHALLENGE 01 // RISING CAC",
        title: "Skyrocketing Customer Acquisition Costs (CAC)",
        desc: "Bidding on saturated keywords without strict audience segmentation drains marketing budgets fast. We deploy hyper-targeted intent clusters, negative keyword sculpting, and algorithmic bidding strategies that cut acquisition costs while boosting lead quality.",
        ctaText: "Lower My Acquisition Cost →",
        color: "#FF4646",
        textColor: "#FF4646",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 1,
        badge: "CHALLENGE 02 // LEAKY FUNNELS",
        title: "High Traffic Bounce Rates On Landing Pages",
        desc: "Directing paid traffic to generic homepages wastes valuable clicks. We construct dedicated high-velocity landing pages with personalized dynamic copy, prominent trust seals, and conversion-optimized form steps that double inbound inquiries.",
        ctaText: "Fix My Leaky Funnel →",
        color: "#417F51",
        textColor: "#417F51",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 2,
        badge: "CHALLENGE 03 // EMAIL RETENTION",
        title: "Poor Email Deliverability & Open Rates",
        desc: "When promotional emails land in spam filters, customer retention and repeat purchases collapse. We set up robust SPF/DKIM/DMARC authentication, dynamic customer lifecycle segments, and automated win-back workflows that drive recurring lifetime revenue.",
        ctaText: "Supercharge Email Revenue →",
        color: "#FFB904",
        textColor: "#B47F00",
        btnTextColor: "#111827",
      },
      {
        id: 3,
        badge: "CHALLENGE 04 // ATTRIBUTION GAPS",
        title: "Inability To Identify Winning Channels",
        desc: "Without multi-touch attribution, businesses risk cutting top-performing marketing campaigns. We integrate Server-Side Google Tag Manager, GA4 custom event tracking, and unified BI dashboards that pinpoint the exact touchpoints generating revenue.",
        ctaText: "Uncover My Top Channels →",
        color: "#F78B40",
        textColor: "#E06E22",
        btnTextColor: "#FFFFFF",
      },
    ],
  },

  // =========================================================================
  // 8. PPC & AMAZON ADS
  // =========================================================================
  "ppc-amazon-ads": {
    eyebrow: "PAID SEARCH & MARKETPLACE EXCELLENCE",
    titleLine1: "Struggling With High Ad Spend & Low ROAS?",
    titleLine2: "Here’s How Our PPC & Amazon Ads Services Help",
    subtitle:
      "Maximize your return on ad spend across Google Ads, Amazon Advertising, and paid social with data-driven bidding and conversion-focused campaign management.",
    cards: [
      {
        id: 0,
        badge: "CHALLENGE 01 // WASTED SPEND",
        title: "Bleeding Ad Budget On Irrelevant Search Terms",
        desc: "Broad keyword matching without negative exclusions burns through marketing capital on useless clicks. We conduct rigorous daily search query audits, negative keyword isolation, and exact match targeting to ensure every ad dollar targets ready-to-buy prospects.",
        ctaText: "Cut Wasted Ad Spend →",
        color: "#FF4646",
        textColor: "#FF4646",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 1,
        badge: "CHALLENGE 02 // HIGH ACOS ON AMAZON",
        title: "Unprofitable Amazon Advertising ACoS",
        desc: "Bidding against aggressive marketplace competitors without tiered campaign structures damages profit margins. We build isolated Sponsored Products, Sponsored Brands, and Amazon DSP campaigns that lower ACoS and drive organic ranking momentum.",
        ctaText: "Reduce Amazon ACoS →",
        color: "#417F51",
        textColor: "#417F51",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 2,
        badge: "CHALLENGE 03 // LOW QUALITY SCORE",
        title: "Low Google Quality Scores & Expensive CPCs",
        desc: "Mismatch between ad headlines, search intent, and landing page speed inflates cost-per-click auctions. We overhaul ad relevance, expected CTR copy, and dedicated landing page experiences to achieve 9/10 Quality Scores and reduce auction CPCs.",
        ctaText: "Improve Quality Scores →",
        color: "#FFB904",
        textColor: "#B47F00",
        btnTextColor: "#111827",
      },
      {
        id: 3,
        badge: "CHALLENGE 04 // SCALING BOTTLENECKS",
        title: "Performance Drops When Increasing Ad Budgets",
        desc: "Scaling ad spend blindly results in audience fatigue and declining ROAS. We deploy structured Lookalike expansions, Performance Max signal clustering, and progressive retargeting ladders that preserve profitability as campaign spend multiplies.",
        ctaText: "Scale My Ad Budget Safely →",
        color: "#F78B40",
        textColor: "#E06E22",
        btnTextColor: "#FFFFFF",
      },
    ],
  },

  // =========================================================================
  // 9. SEARCH ENGINE OPTIMIZATION
  // =========================================================================
  "search-engine-optimization": {
    eyebrow: "ORGANIC SEARCH DOMINANCE",
    titleLine1: "Struggling To Rank On Google First Page?",
    titleLine2: "Here’s How Our SEO Engineering Services Help",
    subtitle:
      "Outrank aggressive competitors and capture high-intent organic search demand with technical audits, topical authority clusters, and authoritative link building.",
    cards: [
      {
        id: 0,
        badge: "CHALLENGE 01 // TECHNICAL GLITCHES",
        title: "Crawl Errors & Poor Core Web Vitals",
        desc: "Hidden redirect chains, JavaScript rendering roadblocks, and slow server response times stop Google from indexing your pages. We resolve technical debt, implement structured Schema markup, and achieve green 90+ Core Web Vitals scores.",
        ctaText: "Audit Technical SEO →",
        color: "#FF4646",
        textColor: "#FF4646",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 1,
        badge: "CHALLENGE 02 // ZERO-KEYWORD RANKINGS",
        title: "Stuck On Page 2+ For High-Volume Queries",
        desc: "Surface-level blog articles cannot outrank well-established industry authorities. We build deep topical content clusters, semantic entity optimizations, and precise search intent architecture that push your commercial keywords to Page 1.",
        ctaText: "Unlock Page 1 Rankings →",
        color: "#417F51",
        textColor: "#417F51",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 2,
        badge: "CHALLENGE 03 // POOR LOCAL TRAFFIC",
        title: "Invisible In Local Dubai & UAE Map Packs",
        desc: "If your Google Business Profile doesn't rank in the Top 3 Local Map Pack, nearby customers call your competitors instead. We optimize local citations, geo-tagged landing pages, and verified customer review flows for regional search dominance.",
        ctaText: "Dominate Local Map Pack →",
        color: "#FFB904",
        textColor: "#B47F00",
        btnTextColor: "#111827",
      },
      {
        id: 3,
        badge: "CHALLENGE 04 // WEAK BACKLINK PROFILE",
        title: "Low Domain Authority & Toxic Link Profiles",
        desc: "Low-quality link schemes trigger search algorithm penalties that decimate organic impressions. We execute white-hat digital PR outreach, guest editorial features, and authoritative data studies that build enduring domain trust and search equity.",
        ctaText: "Build High-Authority Links →",
        color: "#F78B40",
        textColor: "#E06E22",
        btnTextColor: "#FFFFFF",
      },
    ],
  },

  // =========================================================================
  // 10. CONTENT WRITING
  // =========================================================================
  "content-writing": {
    eyebrow: "CONVERSION COPYWRITING & EDITORIAL",
    titleLine1: "Struggling With Flat Copy That Doesn't Sell?",
    titleLine2: "Here’s How Our Professional Content Writing Helps",
    subtitle:
      "Engage your audience, boost search engine rankings, and convert casual readers into paying clients with authoritative, research-backed copywriting.",
    cards: [
      {
        id: 0,
        badge: "CHALLENGE 01 // UNINSPIRING COPY",
        title: "Generic AI Copy That Lacks Brand Soul",
        desc: "Automated AI copy sounds robotic, repeats clichés, and fails to convince discerning corporate buyers. Our seasoned human copywriters craft compelling storytelling narratives, authentic brand voices, and persuasive value propositions that build trust.",
        ctaText: "Revitalize My Brand Voice →",
        color: "#FF4646",
        textColor: "#FF4646",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 1,
        badge: "CHALLENGE 02 // LOW READERSHIP",
        title: "Blog Articles That Get Zero Organic Visits",
        desc: "Publishing blog posts without thorough keyword research and strategic hooks produces zero business return. We research high-intent search queries and draft comprehensive, authoritative guides designed to rank on search engines and earn organic backlinks.",
        ctaText: "Publish Content That Ranks →",
        color: "#417F51",
        textColor: "#417F51",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 2,
        badge: "CHALLENGE 03 // POOR CONVERSION COPY",
        title: "Website Pages That Don't Convert Visitors",
        desc: "Impressive web designs fall flat when the messaging fails to lead visitors to action. We employ tested conversion formulas (PAS, AIDA, BAB) with benefit-focused headlines, objection-handling copy, and clear calls-to-action that drive conversions.",
        ctaText: "Upgrade My Website Copy →",
        color: "#FFB904",
        textColor: "#B47F00",
        btnTextColor: "#111827",
      },
      {
        id: 3,
        badge: "CHALLENGE 04 // SLOW DELIVERY",
        title: "Content Bottlenecks Delaying Marketing Launches",
        desc: "Waiting weeks for draft revisions stalls product campaigns and marketing milestones. Our specialized editorial pods deliver rigorously proofread, SEO-formatted, and CMS-ready copy on reliable turnaround schedules without sacrificing quality.",
        ctaText: "Accelerate Content Velocity →",
        color: "#F78B40",
        textColor: "#E06E22",
        btnTextColor: "#FFFFFF",
      },
    ],
  },

  // =========================================================================
  // 11. CALL CENTER
  // =========================================================================
  "call-center": {
    eyebrow: "OMNICHANNEL CUSTOMER EXPERIENCE",
    titleLine1: "Struggling With Missed Calls & Slow Support?",
    titleLine2: "Here’s How Our Call Center Solutions Help",
    subtitle:
      "Deliver 24/7 multilingual phone, chat, and email customer support that builds customer loyalty, boosts CSAT, and closes inbound sales inquiries.",
    cards: [
      {
        id: 0,
        badge: "CHALLENGE 01 // MISSED INQUIRIES",
        title: "Lost Revenue From Unanswered After-Hours Calls",
        desc: "Every unanswered customer call is an immediate lost sale to a competitor. Our 24/7/365 dedicated call center teams guarantee sub-30-second response times, ensuring every inbound sales lead and customer inquiry is handled professionally in real time.",
        ctaText: "Capture After-Hours Leads →",
        color: "#FF4646",
        textColor: "#FF4646",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 1,
        badge: "CHALLENGE 02 // LOW CSAT RATINGS",
        title: "Frustrated Customers Due To Long Hold Times",
        desc: "Long phone queues and undertrained representatives quickly damage customer loyalty. We deploy rigorous agent training, dynamic knowledge bases, and smart CRM routing to achieve first-contact resolution rates consistently exceeding 90%.",
        ctaText: "Elevate CSAT Scores →",
        color: "#417F51",
        textColor: "#417F51",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 2,
        badge: "CHALLENGE 03 // LANGUAGE BARRIERS",
        title: "Inability To Serve Multilingual UAE Markets",
        desc: "Operating in diverse international markets requires natural native fluency. We provide fluent native Arabic and English customer support specialists who understand regional etiquette, creating seamless experiences that build customer confidence.",
        ctaText: "Deploy Multilingual Support →",
        color: "#FFB904",
        textColor: "#B47F00",
        btnTextColor: "#111827",
      },
      {
        id: 3,
        badge: "CHALLENGE 04 // HIGH OVERHEADS",
        title: "Prohibitive In-House Call Center Infrastructure",
        desc: "Hiring internal staff, purchasing telephony hardware, and maintaining office space creates massive ongoing operational costs. Our managed customer service pods reduce staffing overhead by up to 60% while delivering guaranteed enterprise SLA uptime.",
        ctaText: "Reduce Operational Costs →",
        color: "#F78B40",
        textColor: "#E06E22",
        btnTextColor: "#FFFFFF",
      },
    ],
  },

  // =========================================================================
  // 12. HIRE US
  // =========================================================================
  "hire-us": {
    eyebrow: "DEDICATED TECHNICAL TALENT",
    titleLine1: "Struggling To Hire Qualified Developers Fast?",
    titleLine2: "Here’s How Our Dedicated Talent Hiring Helps",
    subtitle:
      "Skip lengthy, expensive recruiting cycles. Hire top 3% vetted full-stack developers, mobile engineers, UI/UX designers, and QA specialists within 48 hours.",
    cards: [
      {
        id: 0,
        badge: "CHALLENGE 01 // RECRUITING DELAYS",
        title: "Months Wasted Vetting Unqualified Candidates",
        desc: "Traditional recruitment takes 60+ days and often ends in costly mis-hires. We maintain a pre-vetted bench of senior full-stack developers and software engineers ready to onboard into your Git repositories and communication channels in under 48 hours.",
        ctaText: "Hire Developers In 48 Hours →",
        color: "#FF4646",
        textColor: "#FF4646",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 1,
        badge: "CHALLENGE 02 // HIGH SALARY COSTS",
        title: "Sky-High Local Tech Payroll & Recruitment Fees",
        desc: "Paying recruiter commissions and local developer salaries rapidly consumes your capital. Our dedicated remote team model provides senior technical specialists at up to 65% cost savings with zero placement agency fees or long-term overhead.",
        ctaText: "Cut Engineering Payroll →",
        color: "#417F51",
        textColor: "#417F51",
        btnTextColor: "#FFFFFF",
      },
      {
        id: 2,
        badge: "CHALLENGE 03 // SKILLS MISMATCH",
        title: "Developers Who Can't Keep Pace With Deadlines",
        desc: "Inexperienced developers working on complex modern stacks cause delays and security flaws. Every engineer we supply passes rigorous multi-stage algorithmic challenges, live architecture reviews, and English fluency evaluations prior to placement.",
        ctaText: "Access Top 3% Talent →",
        color: "#FFB904",
        textColor: "#B47F00",
        btnTextColor: "#111827",
      },
      {
        id: 3,
        badge: "CHALLENGE 04 // RIGID CONTRACTS",
        title: "Inflexible Vendor Locks That Restrict Agility",
        desc: "Rigid multi-year vendor agreements prevent adapting engineering headcount as roadmap priorities shift. We provide flexible month-to-month contracts backed by a 14-day risk-free trial so you can scale your team size up or down effortlessly.",
        ctaText: "Start 14-Day Risk-Free Trial →",
        color: "#F78B40",
        textColor: "#E06E22",
        btnTextColor: "#FFFFFF",
      },
    ],
  },
};
