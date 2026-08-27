import React from 'react'

const SEOWhyWork = () => {
    const reasons = [
        {
            title: "Full-Service Management",
            desc: "We pride ourselves on transparency. With detailed processes and expert project management, you’ll always know the status and progress of your marketing campaigns, whether digital, email, or social media."
        },
        {
            title: "Custom Strategy",
            desc: "We don't believe in one-size-fits-all solutions. Every strategy is carefully crafted to align with your brand's unique goals, audience, and business objectives."
        },
        {
            title: "Nationally Recognized",
            desc: "Our excellence is not self-proclaimed; we've earned top industry rankings and over 120 five-star reviews online, reflecting the trust and satisfaction of our clients."
        },
        {
            title: "Achievable Goals",
            desc: "We focus on strategies that deliver measurable impact. Every tactic we implement is designed to improve your business's bottom line and drive real results."
        },
        {
            title: "Experience Across Industries",
            desc: "We've successfully partnered with 150+ clients across diverse industries, providing tailored solutions for businesses of all sizes, locally in the UAE and internationally."
        },
        {
            title: "Flexibility is Key",
            desc: "We don't tie clients to long-term contracts. Our clients stay because we consistently deliver value and measurable business growth."
        },
        {
            title: "Clear ROI",
            desc: "Our reporting demonstrates the tangible impact of your campaigns on online traffic, lead generation, and sales, so you always know the results of our strategies."
        },
        {
            title: "Strategic Blueprint",
            desc: "With over a decade of experience, we combine industry best practices with innovative tactics to design strategies that drive long-term business success."
        }
    ]

    return (
        <>
        <div className="bg-[#41B349] py-10 mt-10 px-10 mb-12 rounded-sm w-full ">
                    <h2 className="text-2xl text-center md:text-4xl  font-bold text-white uppercase tracking-widest">
                        WHY WORK WITH US?
                    </h2>
                </div>
        <section className="py-20 bg-[#F9FAFB] px-6">
            <div className="max-w-[1000px] mx-auto">
                

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
                    {reasons.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer group"
                        >
                            <h3 className="italic text-[25px] font-bold text-[#262323] mb-4  transition-colors duration-300">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-[15px]">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        </>
    )
}

export default SEOWhyWork
