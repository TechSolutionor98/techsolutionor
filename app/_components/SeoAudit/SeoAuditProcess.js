
"use client"
import React from "react"

const SeoAuditProcess = () => {

const steps = [
{
number: "1",
title: "Website Crawl & Analysis",
desc: "We perform a comprehensive website crawl to analyze your site structure, page performance, indexing status, and loading speed. Whether you're targeting businesses in the UAE or a global audience, we identify hidden structural issues that may be limiting your visibility on search engines like Google."
},
{
number: "2",
title: "Technical SEO Check",
desc: "Our team conducts an in-depth technical SEO audit to detect broken links, crawl errors, mobile usability issues, Core Web Vitals problems, and indexing gaps. For UAE-based businesses and international brands alike, strong technical SEO ensures your website is fully optimized for search engine performance and user experience."
},
{
number: "3",
title: "On-Page SEO Review",
desc: "We evaluate your meta tags, headings, content quality, keyword targeting, internal linking, and search intent alignment. Our goal is to ensure your website is optimized for high-converting keywords in competitive markets like Dubai, Abu Dhabi, and global search landscapes."
},
{
number: "4",
title: "Backlink & Competitor Analysis",
desc: "We analyze your backlink profile and compare it with top-ranking competitors in the UAE and international markets. This helps us identify authority gaps, link-building opportunities, and strategic insights that can improve your domain trust and search rankings."
},
{
number: "5",
title: "Custom Report & Recommendations",
desc: "You receive a detailed, easy-to-understand SEO audit report with prioritized recommendations tailored to your business goals. Instead of generic advice, we provide a clear growth roadmap designed to increase traffic, leads, and conversions, locally in the UAE and globally."
}
]

return (

<section className="py-5 bg-white overflow-hidden">

<div className="container mx-auto px-5 md:px-10 max-w-[1500px]">

{/* Heading */}

<div className="text-center mb-24">
<h2 className="text-3xl md:text-[36px] font-bold text-black uppercase">
Our SEO Audit Process
</h2>
</div>

{/* Timeline */}

<div className="relative max-w-[1350px] mx-auto">

{/* Snake SVG */}

<div className="hidden lg:block absolute inset-0 pointer-events-none z-0">

<svg
width="100%"
height="100%"
viewBox="0 0 1200 1200"
fill="none"
xmlns="http://www.w3.org/2000/svg"
preserveAspectRatio="none"
>

<path
d="M 80 125 
L 80 180 
C 80 220, 80 220, 120 220 
L 1080 220 
C 1120 220, 1120 220, 1120 260 
L 1120 420 
C 1120 460, 1120 460, 1080 460 
L 120 460 
C 80 460, 80 460, 80 500 
L 80 660 
C 80 700, 80 700, 120 700 
L 1080 700 
C 1120 700, 1120 700, 1120 740 
L 1120 900 
C 1120 940, 1120 940, 1080 940 
L 120 940 
C 80 940, 80 940, 80 980 
L 80 1050"
stroke="#00C853"
strokeWidth="4"
strokeLinecap="round"
strokeLinejoin="round"
/>

</svg>

</div>

<div className="space-y-32 lg:space-y-0 relative z-10">

{steps.map((step, index) => {

const isEven = index % 2 !== 0

return (

<div
key={index}
className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-20 min-h-[240px] ${isEven ? "lg:flex-row-reverse" : ""}`}
>

{/* Mobile Circle */}

<div className="w-12 h-12 bg-[#00C853] text-white rounded-full flex items-center justify-center text-xl font-bold shrink-0 lg:hidden">
{step.number}
</div>

{/* Content */}

<div className={` ${isEven ? "lg:text-right" : "lg:text-left"} w-full `}>

<div className={`flex flex-col lg:block relative ${isEven ? 'lg:mr-[130px] -mt-15' : 'lg:ml-[130px] -mt-15'}`}>

{/* Desktop Circle */}

<div className={`hidden lg:flex absolute top-0 w-12 h-12 bg-[#00C853] text-white rounded-full items-center justify-center text-xl font-bold z-20 ${isEven ? "top-10 -right-10 translate-x-1/2" : "-left-10 -translate-x-1/2 top-14"}`}>
{step.number}
</div>

<h3 className=" text-xl md:text-[28px]  text-[#00C853] mb-4  tracking-wide">
{step.title}
</h3>

<p className={`text-[16px] md:text-[17px] text-gray-700 leading-relaxed font-medium ${isEven ? 'ml-auto max-w-[1100px]' : 'mr-auto max-w-[1100px]'}`}>
{step.desc}
</p>

</div>

</div>

<div className="hidden lg:block flex-1"></div>

</div>

)

})}

</div>

</div>

</div>



</section>

)

}

export default SeoAuditProcess

