import {
  Globe,
  Layers,
  ShoppingCart,
  Cpu,
  Smartphone,
  ShieldCheck,
  Code,
  Database,
  Server,
  Palette,
  Layout,
  Share2,
  Megaphone,
  BarChart3,
  TrendingUp,
  Search,
  FileText,
  Headphones,
  Users,
  CheckCircle,
  Truck,
  CreditCard,
  ShoppingBag,
  Activity,
  Building2,
  Briefcase,
  Monitor,
  PenTool,
  MessageSquare,
  PhoneCall,
  Clock,
  Award,
  Target,
} from "lucide-react";

export const servicesOfferingsData = {
  // 1. WEB DEVELOPMENT
  "web-development": {
    badge: "FULL-CYCLE WEB ENGINEERING",
    title: "Our Web Development",
    titleHighlight: "Services",
    subtitle:
      "From high-performance custom web applications to scalable enterprise portals, we build secure, conversion-driven digital systems tailored for enterprises in Dubai and globally.",
    services: [
      {
        icon: Cpu,
        title: "Custom Web Applications & SaaS",
        desc: "We engineer scalable, high-throughput cloud web applications, bespoke client portals, and multi-tenant SaaS platforms. Built with modern micro-frontend architectures, automated workflows, and robust business logic tailored for commercial growth.",
        tags: ["React & Next.js", "Cloud SaaS", "Real-Time APIs"],
      },
      {
        icon: Globe,
        title: "Enterprise & Corporate Websites",
        desc: "High-authority, multilingual corporate web portals designed to establish industry dominance, elevate executive brand presence, and engage global stakeholders. Engineered for uncompromising enterprise security, compliance, and effortless CMS governance.",
        tags: ["Brand Authority", "Multi-Language", "Enterprise Security"],
      },
      {
        icon: ShoppingCart,
        title: "E-Commerce & Digital Commerce Platforms",
        desc: "Bespoke digital storefronts and B2B/B2C trade portals built for high conversion. We deliver frictionless checkout pipelines, secure multi-currency payment gateways, automated inventory synchronization, and omnichannel customer experiences.",
        tags: ["Headless Commerce", "Payment Gateways", "Conversion Focused"],
      },
      {
        icon: Layers,
        title: "Full-Stack & API-Driven Architecture",
        desc: "Decoupled web platforms powered by resilient RESTful and GraphQL APIs, headless content management systems, and microservices. We ensure seamless interoperability between your website, ERPs, CRMs, and third-party enterprise tools.",
        tags: ["Headless CMS", "GraphQL & REST", "ERP/CRM Integration"],
      },
      {
        icon: Smartphone,
        title: "Progressive Web Apps (PWA) & Responsive Web",
        desc: "Mobile-first, cross-device web experiences that deliver app-like performance directly in the browser. Featuring instant load speeds, offline access capabilities, push notifications, and fluid responsive layouts optimized for all screen sizes.",
        tags: ["PWA Capabilities", "Mobile-First UX", "Offline Storage"],
      },
      {
        icon: ShieldCheck,
        title: "Web Modernization, Speed & 24/7 Support",
        desc: "Transform legacy web systems into modern, lightning-fast digital assets. We provide Core Web Vitals optimization, cloud refactoring, automated security audits, zero-downtime deployments, and dedicated round-the-clock technical support.",
        tags: ["Core Web Vitals", "Security Audits", "24/7 SLA Support"],
      },
    ],
  },

  // 2. APP DEVELOPMENT
  "app-development": {
    badge: "MOBILE ENGINEERING EXCELLENCE",
    title: "Our Mobile App",
    titleHighlight: "Services",
    subtitle:
      "We design, build, and deploy high-performance native and cross-platform mobile applications that captivate users and drive tangible business growth across iOS and Android.",
    services: [
      {
        icon: Smartphone,
        title: "Native iOS & Android App Development",
        desc: "Platform-optimized native mobile apps built with Swift for iOS and Kotlin for Android. Engineered to fully leverage hardware acceleration, biometric authentication, and Apple App Store / Google Play performance guidelines.",
        tags: ["Swift & Xcode", "Kotlin & Jetpack", "Native Performance"],
      },
      {
        icon: Layers,
        title: "Cross-Platform & Hybrid Apps",
        desc: "Cost-effective, single-codebase mobile applications using React Native and Flutter. We build unified, high-speed apps that run seamlessly across Android and iOS with native-feel UI and fast time-to-market.",
        tags: ["React Native", "Flutter SDK", "Single Codebase"],
      },
      {
        icon: ShoppingBag,
        title: "M-Commerce & Shopping Apps",
        desc: "High-converting mobile commerce apps featuring seamless catalog browsing, one-click Apple Pay / Google Pay, push notification flash sales, and automated customer loyalty rewards.",
        tags: ["Apple / Google Pay", "One-Click Checkout", "Push Marketing"],
      },
      {
        icon: Truck,
        title: "On-Demand & Geolocation Apps",
        desc: "Real-time dispatch and delivery ecosystems for ride-sharing, food delivery, and logistics. Engineered with live GPS tracking, route optimization, automated driver matching, and instant alerts.",
        tags: ["Real-Time GPS", "Automated Dispatch", "Live Tracking"],
      },
      {
        icon: CreditCard,
        title: "FinTech & Digital Wallet Solutions",
        desc: "Banking-grade mobile applications with end-to-end encryption, biometric authentication, PCI-DSS compliance, peer-to-peer transfers, and multi-currency digital wallet capabilities.",
        tags: ["Biometric Auth", "PCI-DSS Compliant", "Digital Wallets"],
      },
      {
        icon: ShieldCheck,
        title: "App Maintenance, ASO & Support",
        desc: "Continuous mobile app updates, OS compatibility patches, crash analytics monitoring, App Store Optimization (ASO) for ranking, and round-the-clock SLA technical support.",
        tags: ["App Store ASO", "OS Updates", "24/7 Monitoring"],
      },
    ],
  },

  // 3. SOFTWARE DEVELOPMENT
  "software-development": {
    badge: "ENTERPRISE SOFTWARE ENGINEERING",
    title: "Our Software Development",
    titleHighlight: "Services",
    subtitle:
      "We design and build custom enterprise software, cloud-native platforms, and automated workflow systems engineered to scale operations across Dubai and global enterprises.",
    services: [
      {
        icon: Code,
        title: "Custom Enterprise Software Solutions",
        desc: "We design and engineer tailored software applications aligned with your specific business processes. Improve workflow efficiency, eliminate manual bottlenecks, and maintain long-term competitive advantage.",
        tags: ["Custom Workflows", "Scalable Logic", "Process Automation"],
      },
      {
        icon: Server,
        title: "SaaS Platforms & Cloud Architecture",
        desc: "Multi-tenant cloud SaaS products engineered for high scalability, fault tolerance, and security. We build modular microservices, subscription billing engines, and robust tenant management systems.",
        tags: ["Multi-Tenant SaaS", "Cloud-Native", "Microservices"],
      },
      {
        icon: Layers,
        title: "API Integration & Interoperability",
        desc: "Seamlessly integrate your custom software with third-party ERPs, CRMs, payment processors, and legacy systems. We build secure RESTful and GraphQL APIs for unified data flows.",
        tags: ["REST & GraphQL", "ERP / CRM Sync", "Data Pipelines"],
      },
      {
        icon: Database,
        title: "Database & Cloud Infrastructure",
        desc: "Architecting high-concurrency SQL and NoSQL databases with automated replication, secure encryption at rest and in transit, high availability, and disaster recovery.",
        tags: ["SQL & NoSQL", "High Availability", "Data Security"],
      },
      {
        icon: ShieldCheck,
        title: "DevSecOps & Software Security",
        desc: "Security-first development lifecycle featuring automated vulnerability scanning, zero-trust architecture, compliance auditing (ISO, GDPR), and penetration testing.",
        tags: ["Zero-Trust", "Penetration Testing", "Security Auditing"],
      },
      {
        icon: Award,
        title: "Legacy Modernization & Ongoing SLA",
        desc: "Refactor legacy monolithic software into modern containerized cloud microservices with zero downtime, continuous CI/CD pipelines, and dedicated SLA support.",
        tags: ["Legacy Refactoring", "Docker / Kubernetes", "24/7 SLA"],
      },
    ],
  },

  // 4. E-COMMERCE DEVELOPMENT
  "ecommerce-development": {
    badge: "OMNICHANNEL COMMERCE ARCHITECTURE",
    title: "Our E-Commerce Development",
    titleHighlight: "Services",
    subtitle:
      "We build high-converting, scalable e-commerce ecosystems and B2B/B2C online stores that elevate digital sales and streamline retail operations across the UAE and worldwide.",
    services: [
      {
        icon: ShoppingCart,
        title: "Custom E-Commerce Store Development",
        desc: "Bespoke online retail storefronts tailored to your unique catalog and brand identity. Built for high conversion, frictionless mobile shopping, and lightning-fast checkout experiences.",
        tags: ["Custom Storefront", "Mobile Commerce", "Fast Checkout"],
      },
      {
        icon: Layers,
        title: "Platform Selection & Implementation",
        desc: "Expert development across leading platforms including Shopify Plus, Magento / Adobe Commerce, and WooCommerce, as well as modern headless commerce architectures.",
        tags: ["Shopify Plus", "Magento", "Headless Commerce"],
      },
      {
        icon: CreditCard,
        title: "Payment Gateway & Security Integration",
        desc: "Secure multi-currency payment integration supporting Stripe, PayPal, Apple Pay, Google Pay, and localized UAE payment providers with 3D Secure fraud protection.",
        tags: ["Multi-Currency", "Apple Pay / Stripe", "PCI-DSS Compliant"],
      },
      {
        icon: Briefcase,
        title: "B2B & Wholesale E-Commerce Portals",
        desc: "Specialized B2B portals with tiered wholesale pricing, bulk ordering, custom quote generation, automated credit terms, and multi-warehouse inventory management.",
        tags: ["Tiered Pricing", "Bulk Ordering", "Quote Workflows"],
      },
      {
        icon: Server,
        title: "ERP, CRM & Inventory Synchronization",
        desc: "Real-time bi-directional integration between your e-commerce store and backend ERPs (SAP, NetSuite, Odoo), CRM systems, warehouse logistics, and courier tracking.",
        tags: ["ERP Integration", "Live Inventory", "Warehouse Sync"],
      },
      {
        icon: TrendingUp,
        title: "E-Commerce Optimization & Growth Support",
        desc: "Continuous conversion rate optimization (CRO), checkout funnel A/B testing, Core Web Vitals speed tuning, and ongoing store maintenance to maximize revenue.",
        tags: ["CRO Auditing", "A/B Testing", "Speed Optimization"],
      },
    ],
  },

  // 5. GRAPHIC DESIGN
  "graphic-design": {
    badge: "CREATIVE BRANDING & DIGITAL DESIGN",
    title: "Our Graphic & UI/UX Design",
    titleHighlight: "Services",
    subtitle:
      "We craft compelling visual identities, intuitive user experiences, and high-impact digital graphics that command attention and elevate brand prestige across all touchpoints.",
    services: [
      {
        icon: Palette,
        title: "Brand Identity & Logo Architecture",
        desc: "Complete corporate brand identity systems including bespoke logo design, typography guidelines, curated color palettes, brand books, and stationery that define your market authority.",
        tags: ["Brand Guidelines", "Logo Design", "Visual Identity"],
      },
      {
        icon: Layout,
        title: "UI/UX & Product Experience Design",
        desc: "Intuitive, human-centered UI/UX design for web applications and mobile apps. We deliver comprehensive user research, interactive Figma prototypes, wireframes, and design systems.",
        tags: ["Figma Prototypes", "Wireframing", "Design Systems"],
      },
      {
        icon: Monitor,
        title: "Website & Digital Interface Graphics",
        desc: "High-resolution digital graphics, custom banners, vector iconography, and interactive web elements designed to captivate visitors and increase user engagement.",
        tags: ["Web Graphics", "Vector Icons", "Hero Illustrations"],
      },
      {
        icon: PenTool,
        title: "Marketing Collateral & Print Design",
        desc: "Professional marketing materials including corporate brochures, annual reports, business cards, trade show banners, and presentation decks engineered for high conversion.",
        tags: ["Brochures & Decks", "Print Ready", "Corporate Collateral"],
      },
      {
        icon: ShoppingBag,
        title: "Packaging & Merchandise Design",
        desc: "Eye-catching product packaging, labels, and retail box designs that stand out on physical and digital shelves, reinforcing brand premium value.",
        tags: ["Product Packaging", "Label Design", "Retail Graphics"],
      },
      {
        icon: TrendingUp,
        title: "Social Media & Advertising Creatives",
        desc: "Engaging social media graphics, display ad creatives, infographic carousels, and visual templates engineered to drive high click-through rates across digital campaigns.",
        tags: ["Ad Creatives", "Social Templates", "High CTR"],
      },
    ],
  },

  // 6. SOCIAL MEDIA
  "social-media": {
    badge: "STRATEGIC SOCIAL ENGAGEMENT",
    title: "Our Social Media",
    titleHighlight: "Services",
    subtitle:
      "We build, manage, and scale high-performing social media channels that connect your brand with targeted audiences, foster loyalty, and convert followers into customers.",
    services: [
      {
        icon: Share2,
        title: "Comprehensive Social Media Strategy",
        desc: "Data-driven social media roadmaps customized to your business goals. We analyze audience demographics, competitive landscapes, and content pillars to maximize organic reach and brand relevance.",
        tags: ["Content Strategy", "Audience Analysis", "Brand Positioning"],
      },
      {
        icon: Layout,
        title: "Content Creation & Visual Storytelling",
        desc: "High-impact visual content, motion graphics, carousel infographics, and short-form video reels that capture attention and communicate your brand story with authority.",
        tags: ["Video Reels", "Carousels & Graphics", "Copywriting"],
      },
      {
        icon: Users,
        title: "Community Management & Moderation",
        desc: "Active community engagement, comment moderation, direct message handling, and follower interaction to build trust, resolve inquiries, and foster brand advocacy 7 days a week.",
        tags: ["24/7 Engagement", "Reputation Care", "Follower Growth"],
      },
      {
        icon: Megaphone,
        title: "Social Advertising & Paid Growth",
        desc: "Targeted paid social ad campaigns across Meta (Facebook & Instagram), LinkedIn, and TikTok. We engineer high-ROAS funnels with precision lookalike audience targeting.",
        tags: ["Meta Ads", "LinkedIn B2B Ads", "ROAS Optimization"],
      },
      {
        icon: Award,
        title: "Influencer Marketing & Collaborations",
        desc: "End-to-end influencer partnership management. We identify, vet, and coordinate with relevant UAE and regional influencers to amplify your reach and credibility.",
        tags: ["Influencer Vetting", "Campaign Sponsoring", "Brand Partnerships"],
      },
      {
        icon: BarChart3,
        title: "Analytics, KPI Reporting & Insights",
        desc: "Transparent, actionable monthly performance reporting tracking reach, engagement rate, follower conversion, and commercial attribution to continuously optimize ROI.",
        tags: ["KPI Dashboards", "Attribution Tracking", "Monthly Reports"],
      },
    ],
  },

  // 7. DIGITAL MARKETING
  "digital-marketing": {
    badge: "FULL-FUNNEL DIGITAL ACCELERATION",
    title: "Our Digital Marketing",
    titleHighlight: "Services",
    subtitle:
      "Drive sustainable commercial growth with full-funnel digital marketing strategies combining organic search authority, targeted paid campaigns, and conversion optimization.",
    services: [
      {
        icon: Search,
        title: "Search Engine Optimization (SEO)",
        desc: "Dominate high-intent search rankings with comprehensive on-page SEO, technical site health auditing, high-authority backlink acquisition, and optimized content marketing.",
        tags: ["Organic Rankings", "Technical SEO", "Keyword Strategy"],
      },
      {
        icon: Target,
        title: "Pay-Per-Click Advertising (PPC)",
        desc: "Precision paid search campaigns across Google Ads, Bing, and YouTube. We optimize quality scores, negative keywords, and bid strategies to maximize revenue and minimize CPA.",
        tags: ["Google Ads", "Bid Management", "High Intent Leads"],
      },
      {
        icon: Share2,
        title: "Social Media Marketing & Advertising",
        desc: "Omnichannel paid and organic social marketing campaigns across Instagram, Facebook, LinkedIn, and TikTok designed to expand reach and convert prospective buyers.",
        tags: ["Paid Social", "Audience Retargeting", "Brand Awareness"],
      },
      {
        icon: TrendingUp,
        title: "Conversion Rate Optimization (CRO)",
        desc: "Data-driven landing page testing, heatmap user behavior analysis, and checkout funnel optimization designed to extract maximum revenue from your existing website traffic.",
        tags: ["A/B Testing", "Heatmap Analysis", "Funnel Optimization"],
      },
      {
        icon: FileText,
        title: "Content Marketing & Lead Magnets",
        desc: "Authoritative industry whitepapers, blogs, case studies, and email lead nurturing workflows that establish market leadership and guide prospects down the sales funnel.",
        tags: ["Lead Magnets", "Email Workflows", "Thought Leadership"],
      },
      {
        icon: BarChart3,
        title: "Performance Analytics & BI Attribution",
        desc: "Advanced Google Analytics 4 (GA4) tracking, multi-touch revenue attribution modeling, and automated executive dashboards for complete marketing visibility.",
        tags: ["GA4 Architecture", "Multi-Touch Attribution", "Live Dashboards"],
      },
    ],
  },

  // 8. PPC & AMAZON ADS
  "ppc-amazon-ads": {
    badge: "PRECISION PAID MEDIA & ROAS",
    title: "Our PPC & Amazon Ads",
    titleHighlight: "Services",
    subtitle:
      "Maximize advertising returns with hyper-targeted Google, Bing, and Amazon ad campaigns engineered for immediate lead generation, high ROAS, and scalable revenue.",
    services: [
      {
        icon: Search,
        title: "Google Search & Shopping Ads",
        desc: "Capture high-intent buyers with keyword-targeted Google Search ads, Performance Max campaigns, and Google Shopping feeds optimized for maximum return on ad spend (ROAS).",
        tags: ["Google Search", "Performance Max", "Shopping Feeds"],
      },
      {
        icon: ShoppingBag,
        title: "Amazon Sponsored Products & Brands",
        desc: "Dominate Amazon UAE, US, and global marketplaces with optimized Sponsored Products, Sponsored Brands video ads, and Sponsored Display placements that drive sales rank.",
        tags: ["Amazon PPC", "Buy Box Defense", "A+ Content Synergy"],
      },
      {
        icon: Target,
        title: "Display & Dynamic Retargeting",
        desc: "Re-engage lost site visitors with personalized display ads and dynamic product remarketing across the Google Display Network, social channels, and premium partner networks.",
        tags: ["Dynamic Retargeting", "Display Network", "Cart Abandonment"],
      },
      {
        icon: BarChart3,
        title: "Amazon Brand Store & Listing Optimization",
        desc: "Improve organic and paid conversion rates on Amazon through keyword-rich product listings, professional product imagery, and custom Amazon Brand Stores.",
        tags: ["Listing Copy", "Brand Storefront", "Conversion Lift"],
      },
      {
        icon: TrendingUp,
        title: "Negative Keyword & Bid Management",
        desc: "Eliminate wasted advertising spend through daily negative keyword harvesting, automated rule-based bid adjustments, and dayparting budget allocation.",
        tags: ["Waste Reduction", "Automated Bidding", "Dayparting"],
      },
      {
        icon: Award,
        title: "ROAS Tracking & Transparent Reporting",
        desc: "Real-time advertising dashboards showing exact cost per acquisition (CPA), revenue generated, ACoS, and blended ROAS with complete budget transparency.",
        tags: ["ACoS Reduction", "Live Dashboards", "Revenue Attribution"],
      },
    ],
  },

  // 9. SEARCH ENGINE OPTIMIZATION
  "search-engine-optimization": {
    badge: "ORGANIC VISIBILITY & AUTHORITY",
    title: "Our Search Engine",
    titleHighlight: "Optimization Services",
    subtitle:
      "Boost organic visibility, capture high-intent buyer traffic, and dominate search rankings with our technical, on-page, and authority-building SEO solutions in Dubai and globally.",
    services: [
      {
        icon: Search,
        title: "Keyword Research & Competitive Strategy",
        desc: "Identify high-value, commercial intent keywords your target customers search for. We analyze competitor gap opportunities and map keywords to strategic page landing URLs.",
        tags: ["Intent Mapping", "Competitor Gaps", "Search Volume"],
      },
      {
        icon: Cpu,
        title: "Technical SEO & Core Web Vitals",
        desc: "Eliminate crawl errors, optimize site architecture, implement structured schema markup, and maximize Core Web Vitals speed scores to pass Google search benchmarks.",
        tags: ["Core Web Vitals", "Schema Markup", "Crawl Budget"],
      },
      {
        icon: FileText,
        title: "On-Page SEO & Content Optimization",
        desc: "Optimize title tags, meta descriptions, header hierarchy, and internal linking structures while refining page copy to satisfy both users and modern search algorithms.",
        tags: ["On-Page Tuning", "Content Alignment", "Internal Linking"],
      },
      {
        icon: Award,
        title: "High-Authority Link Building",
        desc: "Acquire high-quality, relevant editorial backlinks from authoritative industry publications and news portals to build long-term domain authority and organic rankings.",
        tags: ["Editorial Backlinks", "Digital PR", "Domain Authority"],
      },
      {
        icon: Building2,
        title: "Local SEO & Google Business Profile",
        desc: "Dominate Google Maps and localized searches across Dubai, Abu Dhabi, and the UAE with optimized Google Business Profiles, localized citations, and review strategies.",
        tags: ["Google Maps", "Local Citations", "Review Management"],
      },
      {
        icon: ShoppingCart,
        title: "E-Commerce SEO & Category Scaling",
        desc: "Specialized SEO for Shopify, Magento, and WooCommerce. We optimize product pages, faceted navigation, collection structures, and breadcrumb indexing to scale online sales.",
        tags: ["Faceted Navigation", "Product Indexing", "E-Commerce SEO"],
      },
    ],
  },

  // 10. CONTENT WRITING
  "content-writing": {
    badge: "PERSUASIVE DIGITAL COPYWRITING",
    title: "Our Content Writing",
    titleHighlight: "Services",
    subtitle:
      "We craft compelling, SEO-optimized copywriting and brand narratives that inform, engage, and inspire action across websites, blogs, and marketing collateral.",
    services: [
      {
        icon: FileText,
        title: "SEO Blog & Thought Leadership Articles",
        desc: "Deeply researched, search-optimized articles that answer client queries, establish industry expertise, and consistently attract qualified organic search traffic.",
        tags: ["SEO Optimized", "Keyword Rich", "Thought Leadership"],
      },
      {
        icon: Globe,
        title: "High-Conversion Website Copywriting",
        desc: "Clear, persuasive website copy for landing pages, services, about sections, and homepages that articulates your value proposition and turns visitors into paying clients.",
        tags: ["Landing Pages", "Value Proposition", "CRO Copy"],
      },
      {
        icon: Briefcase,
        title: "Technical Writing & Corporate Whitepapers",
        desc: "Rigorous technical documentation, whitepapers, case studies, and enterprise product guides that break down complex systems into clear, authoritative business narratives.",
        tags: ["Case Studies", "Whitepapers", "Technical Docs"],
      },
      {
        icon: Megaphone,
        title: "Sales Copywriting & Email Campaigns",
        desc: "High-converting email newsletters, automated drip sequences, sales pitch decks, and ad copy engineered to trigger emotional response and drive measurable action.",
        tags: ["Drip Sequences", "Email Newsletters", "Pitch Decks"],
      },
      {
        icon: Award,
        title: "Press Releases & Editorial PR",
        desc: "Journalistic corporate press releases and announcement copy formatted for distribution across regional and international news wires, media outlets, and syndicates.",
        tags: ["Press Releases", "Media Ready", "Brand News"],
      },
      {
        icon: ShoppingBag,
        title: "E-Commerce Product Descriptions",
        desc: "Engaging, benefit-focused product copy that highlights specifications, answers buyer questions, and overcomes objections to increase cart conversions.",
        tags: ["Product Specs", "Benefit Driven", "High Conversion"],
      },
    ],
  },

  // 11. CALL CENTER
  "call-center": {
    badge: "24/7 CUSTOMER SUPPORT & SALES",
    title: "Our Call Center & BPO",
    titleHighlight: "Services",
    subtitle:
      "Elevate customer satisfaction and boost sales with dedicated, professional 24/7 inbound support, outbound telemarketing, and omnichannel communication solutions.",
    services: [
      {
        icon: Headphones,
        title: "24/7 Inbound Customer Support",
        desc: "Round-the-clock telephone and voice support handled by trained representatives. We ensure prompt call answering, dispute resolution, and high first-contact resolution rates.",
        tags: ["24/7 Coverage", "First Call Resolution", "Voice Support"],
      },
      {
        icon: PhoneCall,
        title: "Outbound Telemarketing & Lead Generation",
        desc: "Proactive sales calls, B2B appointment setting, lead qualification, and customer follow-up campaigns designed to expand your sales pipeline and close more deals.",
        tags: ["Lead Qualification", "Appointment Setting", "Cold Outreach"],
      },
      {
        icon: MessageSquare,
        title: "Omnichannel Live Chat & Email Support",
        desc: "Instant live chat and ticketing support across your website, WhatsApp, and email, providing fast, personalized assistance directly where your customers reach out.",
        tags: ["Live Chat", "WhatsApp Support", "Email Helpdesk"],
      },
      {
        icon: Cpu,
        title: "Technical Helpdesk & Tier 1/2 Support",
        desc: "Skilled technical support teams capable of troubleshooting software issues, onboarding users, resolving account inquiries, and escalating complex tickets efficiently.",
        tags: ["Tier 1 & 2 Support", "Software Helpdesk", "Ticket Escalation"],
      },
      {
        icon: Globe,
        title: "Multilingual Support Operations",
        desc: "Professional customer service delivered in multiple languages (English, Arabic, Hindi, Urdu, French) to serve diverse multicultural client bases across the UAE and globally.",
        tags: ["Arabic & English", "Multicultural", "Global Service"],
      },
      {
        icon: BarChart3,
        title: "QA Monitoring & SLA Performance",
        desc: "Rigorous call recording quality audits, CSAT and NPS tracking, and transparent real-time reporting dashboards ensuring complete compliance with agreed SLA benchmarks.",
        tags: ["SLA Compliance", "CSAT Tracking", "Call Recording Audits"],
      },
    ],
  },

  // 12. HIRE US
  "hire-us": {
    badge: "DEDICATED TECH TALENT & TEAMS",
    title: "Hire Dedicated Developers &",
    titleHighlight: "Tech Teams",
    subtitle:
      "Scale your engineering velocity with pre-vetted full-stack developers, mobile engineers, and UI/UX designers ready to integrate seamlessly into your agile workflow.",
    services: [
      {
        icon: Code,
        title: "Dedicated Full-Stack Developers",
        desc: "Hire senior frontend (React, Next.js, Vue) and backend (Node.js, Python, PHP, Laravel) developers dedicated exclusively to your product roadmap and sprint goals.",
        tags: ["Full-Stack", "Frontend & Backend", "Dedicated Staff"],
      },
      {
        icon: Smartphone,
        title: "Mobile App Development Specialists",
        desc: "Experienced iOS (Swift), Android (Kotlin), and cross-platform (Flutter, React Native) developers ready to build or scale your mobile applications with speed.",
        tags: ["iOS & Android", "Flutter & React Native", "App Specialists"],
      },
      {
        icon: Layers,
        title: "Flexible Engagement Models",
        desc: "Choose between full-time dedicated talent, part-time staff augmentation, or fixed-scope project teams based on your exact budget and engineering timelines.",
        tags: ["Staff Augmentation", "Full-Time Dedicated", "Fixed Scope"],
      },
      {
        icon: Clock,
        title: "Timezone Aligned Collaboration",
        desc: "Our developers work aligned with UAE (GST), European (CET), and US time zones, ensuring daily standups, instant communication via Slack, and rapid code reviews.",
        tags: ["Timezone Aligned", "Daily Standups", "Instant Slack Sync"],
      },
      {
        icon: Award,
        title: "Rigorous Vetting & Agile Sprints",
        desc: "Every engineer passes technical live-coding assessments and English fluency checks. We work in standard two-week agile sprints with daily Jira ticket updates.",
        tags: ["Top 3% Talent", "Agile Sprints", "Code Quality"],
      },
      {
        icon: ShieldCheck,
        title: "Zero Overhead & Fast Onboarding",
        desc: "Eliminate recruitment costs, payroll overheads, and lengthy hiring cycles. Onboard pre-vetted senior developers and scale your team up or down in as little as 48 hours.",
        tags: ["48-Hour Onboarding", "No Payroll Overhead", "Scale on Demand"],
      },
    ],
  },
};

export const getServiceOfferings = (serviceKey) => {
  return (
    servicesOfferingsData[serviceKey] ||
    servicesOfferingsData["web-development"]
  );
};
