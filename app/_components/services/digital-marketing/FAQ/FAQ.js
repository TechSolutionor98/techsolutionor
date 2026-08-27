import FAQ from "../../../../../components/Faq/Faq";

const faqsDigitalMarketing = [
 { question: "What do digital marketing services include?", 
   answer: "Digital marketing services typically include SEO, PPC advertising, social media marketing, content creation, email marketing, web design and development, analytics tracking, and strategy optimization, all designed to boost visibility, drive traffic, and increase conversions.", },
  { question: "How can digital marketing help my business grow in the UAE?", 
    answer: "Digital marketing helps UAE businesses increase brand awareness, attract local and international customers, generate quality leads, and compete in online marketplaces. Tailored strategies like local SEO and targeted social media ads increase visibility in cities like Dubai, Abu Dhabi, and Sharjah.", }, 
  { question: "How long does it take to see results from digital marketing?", 
    answer: "Results vary by service: PPC and social media ads can deliver immediate visibility and traffic. SEO and content marketing typically take 3–6 months for measurable organic growth. Combined strategies often produce the best long‑term results.", }, 
  { question: "Do you provide custom digital marketing strategies?", 
    answer: "Yes, we create bespoke digital marketing strategies based on your business goals, target audience, industry, and budget to ensure measurable results and maximum ROI.", },
   {question: "Can digital marketing increase my online sales?", 
    answer: "Absolutely. Through targeted SEO, PPC campaigns, social ads, email marketing, and conversion‑focused content, we help you attract high‑intent customers, increase conversions, and grow online sales.", },
   {question: "What platforms do you use for social media marketing?", 
      answer: "We manage campaigns across major platforms such as Facebook, Instagram, LinkedIn, Twitter, Pinterest, and TikTok, selecting the most effective channels based on your audience and business objectives.", },
    {question: "How do you measure the success of digital marketing campaigns?", 
      answer: "We track key performance indicators (KPIs) like organic traffic, click‑through rates, conversions, ROI, engagement metrics, and sales. Detailed reporting helps you understand performance and make data‑driven decisions.", }, 
    {question: "Is digital marketing suitable for small businesses?", 
      answer: "Yes, digital marketing is highly effective for small and growing businesses. Scalable strategies like SEO, social media, and targeted ads help you compete with larger brands and attract customers without huge budgets.", },
    {question: "Can you improve our brand’s online presence internationally?", 
      answer: "Yes, our digital marketing services are designed to increase your brand’s visibility not only in the UAE but also across global markets, helping you attract international customers and expand your reach.", }, 
    {question: "How much do digital marketing services cost?",
      answer: "Costs depend on the range of services needed, campaign complexity, competition, and business goals. We offer customized solutions and flexible packages designed to fit different budgets while maximizing ROI.", },
];

export default function DigitalMarketingPage() {
  return <FAQ title="Frequently Asked Questions (FAQs)" faqs={faqsDigitalMarketing} />;
}