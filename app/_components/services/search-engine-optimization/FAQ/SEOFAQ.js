    import SeoFAQ from '../../../../../components/Faq/Faq'
    const faqsscoquestion = [
        {
            question: "What do professional SEO services include?",
            answer: "Professional SEO services include keyword research, on-page optimization, technical SEO fixes, content optimization, local search optimization, link building, analytics tracking, and ongoing performance reporting, all tailored to improve your search visibility and drive targeted traffic."
        },
        {
            question: "How long does it take to see results from SEO?",
            answer: "SEO is a long-term strategy. While some improvements may appear within weeks, significant ranking gains and sustained organic traffic growth typically take 3–6 months, depending on competition, website condition, and keyword difficulty."
        },
        {
            question: "Can SEO help my business rank locally in the UAE?",
            answer: "Yes. Local SEO focuses on optimizing your Google Business Profile, local citations, and location-specific keywords so your business can rank higher for “near me” and city-based searches in Dubai, Abu Dhabi, Sharjah, and across the UAE."
        },
        {
            question: "What is the difference between on-page and off-page SEO?",
            answer: "On-page SEO refers to optimizing elements on your website (content, meta tags, headings, internal links) to improve relevance and rankings. Off-page SEO focuses on external signals like backlinks and citations that build domain authority and trust."
        },
        {
            question: "Do you provide SEO audits, and what do they include?",
            answer: "Yes, our SEO audits analyze your website’s technical health, site speed, mobile performance, content quality, keyword alignment, backlink profile, and competitive benchmarks. The audit identifies issues and opportunities to improve rankings and traffic."
        },
        {
            question: "How does keyword research impact SEO success?",
            answer: "Keyword research identifies the most relevant, high-intent terms your audience is searching for. It guides content creation, page targeting, and optimization strategy to attract qualified visitors and improve rankings effectively."
        },
        {
            question: "Is SEO only about ranking on Google?",
            answer: "While ranking on Google is a major goal, SEO also improves user experience, mobile performance, site usability, and conversion rates, helping your business attract more customers and generate measurable growth."
        },
        {
            question: "Can you help my eCommerce store rank higher in search results?",
            answer: "Absolutely. Our eCommerce SEO services optimize product pages, category pages, site architecture, and technical elements to increase visibility, attract high-intent buyers, and boost online sales across platforms like Shopify, WooCommerce, Wix, and Magento."
        },
        {
            question: "Do you provide monthly SEO reports?",
            answer: "Yes, we deliver detailed monthly SEO reports that track keyword rankings, organic traffic, backlink growth, conversions, and key performance metrics to show progress and guide strategy."
        },
        {
            question: "How much does professional SEO cost?",
            answer: "SEO pricing varies based on your business size, goals, competition, and the scale of work needed. We offer customized packages designed to fit your budget while delivering measurable ROI and long-term organic growth."
        }
    ]

      export default function faqspageseo() {
  return <SeoFAQ title="Frequently Asked Questions (FAQs)" faqs={faqsscoquestion} />;
}


