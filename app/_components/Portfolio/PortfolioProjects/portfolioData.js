import Grab from '@/components/Images/grab.png';
import Protein from '@/components/Images/protein.png';
import Clickpos from '@/components/Images/clickpos.png';
import Appliances from '@/components/Images/appliances.png';
import Mubayya from '@/components/Images/mubayya.png';
import Albasit from '@/components/Images/albasit.png';
import Crown from '@/components/Images/crownexcel.png';
import Clickslice from '@/components/Images/clickslice.png';
import Smart from '@/components/Images/smart.png';
import Traders from '@/components/Images/traders.png';

import p1 from '@/components/Images/portfolioimg1.png';
import p2 from '@/components/Images/portfolioimg2.png';
import p3 from '@/components/Images/portfolioimg3.png';
import p4 from '@/components/Images/portfolioimg4.png';

export const portfolioCategories = [
  { id: 'all', label: 'All Projects', count: 12 },
  { id: 'ecommerce', label: 'E-Commerce & Retail', count: 6 },
  { id: 'pos-cloud', label: 'POS & Cloud Systems', count: 3 },
  { id: 'realestate', label: 'Corporate & Real Estate', count: 2 },
  { id: 'growth-seo', label: 'SEO & Growth Agency', count: 1 },
];

export const portfolioProjects = [
  {
    id: 1,
    slug: 'grabatoz',
    name: 'Grabatoz',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce & Tech Retail',
    location: 'Dubai, UAE',
    logo: Grab,
    image: p1,
    accentColor: '#00B651',
    gradient: 'from-emerald-600 via-teal-600 to-green-500',
    description:
      'Grabatoz is a rapidly growing e-commerce platform based in Dubai, UAE, dedicated to delivering a wide selection of high-quality electronics and IT products to customers across the region. Built to serve both individual buyers and businesses, the platform offers everything from the latest gadgets and accessories to advanced tech solutions, all in one place. With a strong focus on reliability, competitive value, and convenience, Grabatoz provides a seamless and secure shopping experience, allowing customers to easily explore, compare, and confidently purchase products that meet their exact needs.',
    services: [
      'E-commerce Development',
      'Mobile App Development',
      'UI/UX Design',
    ],
    challenge:
      'Balancing a seamless B2C shopping experience with a complex B2B RFQ system in Dubai’s competitive tech market, while ensuring high performance across a large-scale product inventory.',
    solution:
      'Built a high-performance WooCommerce platform with custom AED/USD pricing and an automated B2B portal, delivering a streamlined, professional, and conversion-focused experience for all users.',
    techStack: ['HTML', 'CSS', 'React', 'JavaScript', 'WooCommerce', 'B2B RFQ Engine'],
    metrics: {
      performance: '95+ PageSpeed score',
      features: 'Fully Integrated Checkout',
      sales: '45% increase in organic traffic',
    },
    highlights: ['Multi-currency AED/USD', 'Instant B2B Quote Workflow', 'Lightning-fast Search'],
  },
  {
    id: 2,
    slug: 'baytal-protein',
    name: 'Baytal Protein',
    category: 'ecommerce',
    categoryLabel: 'Sports Nutrition & Health E-Commerce',
    location: 'Dubai, UAE',
    logo: Protein,
    image: p2,
    accentColor: '#FF6B00',
    gradient: 'from-orange-500 via-amber-500 to-red-500',
    description:
      'Baytal Protein is a UAE-based e-commerce store specializing in high-quality fitness supplements, offering a wide range of products including protein, pre-workouts, vitamins, and recovery essentials. Designed for athletes, fitness enthusiasts, and health-conscious individuals, the platform makes it easy to discover and purchase trusted supplements from leading brands. With a strong focus on product variety, competitive pricing, and convenience, Baytal Protein delivers a smooth and reliable shopping experience that helps customers achieve their fitness goals with confidence.',
    services: [
      'E-commerce Development',
      'Mobile App Development',
      'UI/UX Design',
    ],
    challenge:
      'Balancing a smooth B2C shopping experience in the competitive supplements market, while managing a large product range and maintaining fast, reliable performance.',
    solution:
      'Developed a high-performance WooCommerce store with optimized product navigation and a streamlined checkout, delivering a fast, user-friendly, and conversion-focused shopping experience.',
    techStack: ['HTML', 'CSS', 'React', 'JavaScript', 'Custom Filters', 'Smart Inventory'],
    metrics: {
      performance: '95+ PageSpeed score',
      features: 'Fully Integrated Checkout',
      sales: '45% increase in organic traffic',
    },
    highlights: ['Goal-Based Supplement Finder', '1-Click Express Checkout', 'Real-time Stock Alerts'],
  },
  {
    id: 3,
    slug: 'clix-pos',
    name: 'Clix POS',
    category: 'pos-cloud',
    categoryLabel: 'Cloud Point of Sale Software',
    location: 'Global / Multi-Industry',
    logo: Clickpos,
    image: p3,
    accentColor: '#2563EB',
    gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    description:
      'ClixPOS delivers smart and reliable Point of Sale (POS) solutions designed for a wide range of businesses, including retail stores, restaurants, cafes, and salons. Built to simplify daily operations, the system streamlines transactions, improves efficiency, and enhances the overall customer experience. With an intuitive, user-friendly interface and dedicated 24/7 support, ClixPOS empowers businesses to manage sales with ease and grow with confidence.',
    services: [
      'E-commerce Development',
      'Mobile App Development',
      'UI/UX Design',
    ],
    challenge:
      'Creating a unified POS solution that caters to multiple business types, while ensuring simplicity, speed, and reliability in high-volume transaction environments.',
    solution:
      'Developed a scalable and user-friendly POS platform with optimized workflows and real-time processing, delivering a fast, efficient, and business-focused experience across all industries.',
    techStack: ['HTML', 'CSS', 'React', 'JavaScript', 'Real-Time Sync', 'Cloud Analytics'],
    metrics: {
      performance: '95+ PageSpeed score',
      features: 'Fully Integrated Checkout',
      sales: '45% increase in organic traffic',
    },
    highlights: ['Offline-First Architecture', 'Multi-Register Hardware Support', 'Live Analytics'],
  },
  {
    id: 4,
    slug: 'just-appliances',
    name: 'Just Appliances',
    category: 'pos-cloud',
    categoryLabel: 'On-Demand Field Service & Booking',
    location: 'Greater Seattle, USA',
    logo: Appliances,
    image: p4,
    accentColor: '#0EA5E9',
    gradient: 'from-sky-500 via-blue-600 to-indigo-600',
    description:
      'Just Appliances LLC provides expert home appliance repair services across the Greater Seattle area. Their team of skilled technicians handles everything from refrigerators and washers to dryers and more, delivering fast, reliable, and efficient solutions. With a strong focus on professionalism and customer satisfaction, Just Appliances ensures homeowners get their appliances back in perfect working condition with minimal downtime.',
    services: [
      'E-commerce Development',
      'Mobile App Development',
      'UI/UX Design',
    ],
    challenge:
      'Offering quick, dependable appliance repair services in a busy market while maintaining high customer satisfaction and efficient scheduling.',
    solution:
      'Implemented a streamlined service management system to schedule, track, and optimize repairs, ensuring timely, professional service and a smooth, trustworthy experience for every customer.',
    techStack: ['HTML', 'CSS', 'React', 'JavaScript', 'Smart Dispatch', 'Customer SMS Portal'],
    metrics: {
      performance: '95+ PageSpeed score',
      features: 'Fully Integrated Checkout',
      sales: '45% increase in organic traffic',
    },
    highlights: ['Instant Booking Engine', 'Technician GPS Tracking', 'Automated Invoicing'],
  },
  {
    id: 5,
    slug: 'mubayaa-real-estate',
    name: 'Mubayaa Real Estate',
    category: 'realestate',
    categoryLabel: 'Government Registration & Legal Trustee',
    location: 'Dubai, UAE',
    logo: Mubayya,
    image: null,
    accentColor: '#D97706',
    gradient: 'from-amber-600 via-orange-600 to-yellow-500',
    description:
      'Mubayaa is a premier real estate registration trustee based in Dubai, UAE, specializing in property transfer and registration services. They assist clients with a full range of property documentation needs, including title transfers, mortgage registration, off-plan (Oqoodi) processing, donation/gift registration, blocking properties, and lease-to-own (Ejara) transactions. With deep local expertise and a commitment to professional service, Mubayaa simplifies complex real estate processes, helping clients complete transactions smoothly and with confidence.',
    services: [
      'E-commerce Development',
      'Mobile App Development',
      'UI/UX Design',
    ],
    challenge:
      'Navigating Dubai’s complex property registration requirements while ensuring timely, compliant, and stress-free transactions for diverse client needs.',
    solution:
      'Delivered expert real estate registration support with a clear, client-first process, handling documentation, regulatory compliance, and property transfer logistics to ensure fast, professional, and reliable service every time.',
    techStack: ['HTML', 'CSS', 'React', 'JavaScript', 'Document Compliance', 'Secure Vault'],
    metrics: {
      performance: '95+ PageSpeed score',
      features: 'Fully Integrated Checkout',
      sales: '45% increase in organic traffic',
    },
    highlights: ['DLD Integration Ready', 'Ejara & Oqoodi Workflows', 'Client Document Vault'],
  },
  {
    id: 6,
    slug: 'albasit',
    name: 'ALBasit',
    category: 'realestate',
    categoryLabel: 'Construction & Real Estate Group',
    location: 'Islamabad, Pakistan',
    logo: Albasit,
    image: null,
    accentColor: '#10B981',
    gradient: 'from-emerald-700 via-teal-700 to-green-600',
    description:
      'Al Basit Group of Companies is a well-established construction and real estate development firm based in Islamabad, Pakistan, with over two decades of industry experience. The company specializes in delivering high-quality real estate projects and investment opportunities, serving both residential and commercial markets with a customer-centric approach. Known for its commitment to excellence and strategic growth, Al Basit Group combines professional project execution with strong market insights, helping clients achieve their property and investment goals with confidence.',
    services: [
      'E-commerce Development',
      'Mobile App Development',
      'UI/UX Design',
    ],
    challenge:
      'Creating a strong online presence that effectively showcases the company’s diverse property portfolio and construction expertise, while making complex real estate and investment information easy for potential clients to explore and understand.',
    solution:
      'Developed a professional, user-friendly website that highlights Al Basit’s services, projects, and company strengths with clear messaging and intuitive navigation, improving customer engagement and supporting lead generation in a competitive market.',
    techStack: ['HTML', 'CSS', 'React', 'JavaScript', 'Interactive Blueprints', 'Lead Capture Engine'],
    metrics: {
      performance: '95+ PageSpeed score',
      features: 'Fully Integrated Checkout',
      sales: '45% increase in organic traffic',
    },
    highlights: ['Virtual Property Tours', 'Dynamic Project Timelines', 'Investor ROI Calculator'],
  },
  {
    id: 7,
    slug: 'optimum-fusion',
    name: 'Optimum Fusion',
    category: 'ecommerce',
    categoryLabel: 'Premium Sports Nutrition Brand',
    location: 'UAE Nationwide',
    logo: null,
    image: null,
    accentColor: '#EF4444',
    gradient: 'from-red-600 via-rose-600 to-orange-500',
    description:
      'OptimumFusion is a UAE-based premium sports nutrition brand and e-commerce platform offering a wide selection of high-quality supplements, from muscle support and pre-workouts to general health and men’s wellness products, designed to help athletes and fitness enthusiasts achieve peak performance and overall well-being. With fast delivery across the UAE, third-party lab-tested formulas, and a customer-centric online shopping experience, OptimumFusion empowers users to fuel their fitness goals with confidence and ease.',
    services: [
      'E-commerce Development',
      'Mobile App Development',
      'UI/UX Design',
    ],
    challenge:
      'Positioning a niche sports supplement brand in a competitive UAE market while creating a high-converting online store that appeals to both serious athletes and everyday health-focused shoppers.',
    solution:
      'Built a clean, conversion-focused Shopify store with intuitive product categorization, goal-oriented filters (muscle support, pre-workouts, wellness), and seamless checkout, enabling visitors to easily find, compare, and purchase supplements tailored to their fitness objectives.',
    techStack: ['HTML', 'CSS', 'React', 'JavaScript', 'Shopify Plus', 'Conversion Engine'],
    metrics: {
      performance: '95+ PageSpeed score',
      features: 'Fully Integrated Checkout',
      sales: '45% increase in organic traffic',
    },
    highlights: ['Goal-Oriented Browsing', 'Third-Party Lab Badging', 'Fast UAE Logistics'],
  },
  {
    id: 8,
    slug: 'click-slice',
    name: 'Click Slice',
    category: 'growth-seo',
    categoryLabel: 'SEO & Growth Marketing Agency',
    location: 'London, United Kingdom',
    logo: Clickslice,
    image: null,
    accentColor: '#8B5CF6',
    gradient: 'from-purple-600 via-violet-600 to-indigo-600',
    description:
      'ClickSlice is a London-based ecommerce SEO and digital marketing agency that helps online brands grow through bespoke search strategies, paid ads, and CRO-focused optimisation. Known for blending advanced organic SEO with data-driven PPC, digital PR, and web-design support, the team works to put businesses in front of the right customers at the right moment. With tailored campaigns and transparent reporting, ClickSlice drives both immediate traffic and sustainable long-term growth for clients across the UK and internationally.',
    services: [
      'E-commerce Development',
      'Mobile App Development',
      'UI/UX Design',
    ],
    challenge:
      'Helping ecommerce and service-based businesses stand out and scale in overcrowded digital markets by increasing both immediate and sustainable visibility, from organic search rankings to paid traffic, while delivering measurable ROI.',
    solution:
      'Delivered a blended digital growth strategy combining advanced SEO, high-impact PPC, tailored content, and conversion-optimized web enhancements, enabling brands to attract qualified traffic, boost sales, and achieve scalable, long-term digital success.',
    techStack: ['HTML', 'CSS', 'React', 'JavaScript', 'CRO Architecture', 'SEO Performance Suite'],
    metrics: {
      performance: '95+ PageSpeed score',
      features: 'Fully Integrated Checkout',
      sales: '45% increase in organic traffic',
    },
    highlights: ['Data-driven CRO Audit', 'Automated Rank Tracker', 'Conversion Optimized UI'],
  },
  {
    id: 9,
    slug: 'seen-alif',
    name: 'Seen Alif',
    category: 'ecommerce',
    categoryLabel: 'Consumer Electronics & Gadgets',
    location: 'Dubai, UAE',
    logo: null,
    image: null,
    accentColor: '#06B6D4',
    gradient: 'from-cyan-600 via-sky-600 to-teal-500',
    description:
      'Seenalif is a Dubai-based online retail platform offering a curated selection of consumer electronics, gadgets, and tech products designed to meet everyday needs and lifestyle demands. With an easy-to-navigate storefront and a focus on quality and value, Seenalif enables customers in the UAE to find and purchase popular devices and accessories with confidence. The platform delivers a streamlined shopping experience, helping tech shoppers discover deals and complete purchases quickly.',
    services: [
      'E-commerce Development',
      'Mobile App Development',
      'UI/UX Design',
    ],
    challenge:
      'Building trust and visibility in the competitive UAE electronics e-commerce market while presenting a wide range of products in a way that drives conversions and repeat purchases.',
    solution:
      'Crafted a conversion-optimized online store with clear product categorization, engaging visuals, trust signals, and a smooth checkout process that encourages browsing, boosts user confidence, and supports higher sales performance.',
    techStack: ['HTML', 'CSS', 'React', 'JavaScript', 'Fast Catalog', 'Apple/Google Pay Ready'],
    metrics: {
      performance: '95+ PageSpeed score',
      features: 'Fully Integrated Checkout',
      sales: '45% increase in organic traffic',
    },
    highlights: ['Curated Tech Bundles', 'Real-time Stock Counters', 'Verified Buyer Badging'],
  },
  {
    id: 10,
    slug: 'crown-excel',
    name: 'Crown Excel',
    category: 'ecommerce',
    categoryLabel: 'IT Hardware & Wholesale Trading',
    location: 'Dubai, UAE',
    logo: Crown,
    image: null,
    accentColor: '#6366F1',
    gradient: 'from-indigo-600 via-blue-600 to-violet-600',
    description:
      'Crown Excel General Trading LLC is a Dubai-based tech retailer and wholesaler providing a wide range of genuine laptops, desktops, and IT hardware from leading brands such as Lenovo, HP, Dell, ASUS and more. With a focus on quality products, competitive pricing, and personalised support, Crown Excel helps customers, from individual buyers to business clients, find the right technology solutions with confidence and clarity in one place.',
    services: [
      'E-commerce Development',
      'Mobile App Development',
      'UI/UX Design',
    ],
    challenge:
      'Standing out in Dubai’s competitive tech retail market while showcasing a broad product range and ensuring customers feel supported and confident throughout the buying process.',
    solution:
      'Delivered a professional, conversion-focused online presence with clear product categorisation, trust signals, and responsive customer service that enhances browsing, simplifies decision-making, and drives higher sales performance.',
    techStack: ['HTML', 'CSS', 'React', 'JavaScript', 'Hardware Filter Matrix', 'Bulk Tier Pricing'],
    metrics: {
      performance: '95+ PageSpeed score',
      features: 'Fully Integrated Checkout',
      sales: '45% increase in organic traffic',
    },
    highlights: ['Enterprise Spec Comparison', 'Tiered Bulk Pricing', 'Authorized Brand Signals'],
  },
  {
    id: 11,
    slug: 'smart-max-it',
    name: 'Smart Max IT',
    category: 'pos-cloud',
    categoryLabel: 'Enterprise IT & Cloud Infrastructure',
    location: 'UAE Nationwide',
    logo: Smart,
    image: null,
    accentColor: '#14B8A6',
    gradient: 'from-teal-600 via-emerald-600 to-cyan-600',
    description:
      'Smart Max IT is a UAE-based IT solutions provider offering a full suite of business-critical technology services, including network infrastructure, firewall protection, server management, cloud services, website development, and more. With over a decade of experience and a client-centric approach, Smart Max IT helps businesses improve performance, strengthen security, and accelerate digital transformation with tailored, reliable IT solutions.',
    services: [
      'E-commerce Development',
      'Mobile App Development',
      'UI/UX Design',
    ],
    challenge:
      'Helping businesses in a fast-moving digital landscape implement secure, scalable, and integrated IT systems, from connectivity and servers to web presence, while delivering consistent performance and support.',
    solution:
      'Built a comprehensive, customized IT services platform with expert consultation, reliable infrastructure implementation, and user-focused web development, enabling clients to operate with enhanced security, seamless connectivity, and optimized digital workflows.',
    techStack: ['HTML', 'CSS', 'React', 'JavaScript', 'Infrastructure Portal', 'Cloud Monitor API'],
    metrics: {
      performance: '95+ PageSpeed score',
      features: 'Fully Integrated Checkout',
      sales: '45% increase in organic traffic',
    },
    highlights: ['24/7 SLA Dashboard', 'Firewall & Server Configurator', 'Instant Tech Consultation'],
  },
  {
    id: 12,
    slug: 'osum-enterprises',
    name: 'Osum Enterprises',
    category: 'ecommerce',
    categoryLabel: 'Industrial & B2B Spare Parts Trading',
    location: 'Dubai, UAE',
    logo: Traders,
    image: null,
    accentColor: '#F59E0B',
    gradient: 'from-amber-600 via-yellow-600 to-orange-600',
    description:
      'Osum Enterprises is a UAE-based trading and supply company specializing in providing a diverse range of industrial and automotive products, spare parts, and hardware solutions tailored for businesses and distributors across the region. With a commitment to quality, reliability, and competitive pricing, Osum Enterprises helps clients source the right products with confidence. Their professional service and streamlined procurement support make buying and supply processes hassle-free for businesses of all sizes.',
    services: [
      'E-commerce Development',
      'Mobile App Development',
      'UI/UX Design',
    ],
    challenge:
      'Standing out in a competitive B2B trading landscape by clearly presenting a broad product range while making it effortless for buyers to find, verify, and request quotes or place orders.',
    solution:
      'Developed a clean and intuitive business website with structured product categorization, clear contact and inquiry options, and trust elements that simplify browsing and support informed purchasing decisions for both small enterprises and large distributors.',
    techStack: ['HTML', 'CSS', 'React', 'JavaScript', 'OEM Part Matcher', 'B2B RFQ Cart'],
    metrics: {
      performance: '95+ PageSpeed score',
      features: 'Fully Integrated Checkout',
      sales: '45% increase in organic traffic',
    },
    highlights: ['Part Number Catalog Match', 'Fast RFQ Cart Dispatch', 'Distributor Portal Ready'],
  },
];
