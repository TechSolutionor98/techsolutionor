import React from 'react'
import Image from 'next/image'
import ProcessImg from '../../../../../components/Images/contentprocessimg.png' // Using avatar.jpg as a placeholder for the guy in blue shirt

const ContentProcess = () => {
    const steps = [
        {
            num: "1.",
            title: "CONSULTATION:",
            desc: "We start with an in-depth discussion to understand your content needs, business goals, and target audience. This ensures every piece of content aligns with your strategy."
        },
        {
            num: "2.",
            title: "RESEARCH:",
            desc: "Our writers conduct thorough research to gather relevant information, insights, and industry knowledge, laying the foundation for high-quality, authoritative content."
        },
        {
            num: "3.",
            title: "WRITING:",
            desc: "We craft high-quality, engaging content tailored to your requirements and optimized for SEO, ensuring it resonates with your audience and supports your marketing objectives."
        },
        {
            num: "4.",
            title: "REVIEW & EDIT:",
            desc: "Our editors carefully review every piece for accuracy, clarity, coherence, and consistency, refining the content to meet the highest quality standards."
        },
        {
            num: "5.",
            title: "Delivery:",
            desc: "We deliver the final content on time, ready for publishing, ensuring a seamless handoff and immediate impact on your online presence."
        }
    ]

    return (
        <section className="py-15 bg-[#ffffff] px-6 overflow-hidden">
            <div className="max-w-[1280px] mx-auto">
                <div className="text-center mb-30">
                    <h2 className="text-[32px] md:text-[40px] font-bold text-[#262323] uppercase">
                        OUR CONTENT CREATION PROCESS
                    </h2>
                </div>

                <div className="relative flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-0">

                    {/* Left Column (Steps 1 & 3) */}
                    <div className="flex flex-col gap-10 lg:w-[35%] lg:pl-[80px] lg:mb-[120px] ">
                        <div className="flex flex-col items-start lg:items-start text-left ">
                            <span className="text-[45px] font-semibold  text-[#262323] leading-none mb-4">{steps[0].num}</span>
                            <h3 className="text-[20px] font-bold text-[#41B349] mb-4 uppercase">{steps[0].title}</h3>
                            <p className="text-gray-600 text-[15px] leading-relaxed max-w-[350px]">
                                {steps[0].desc}
                            </p>
                        </div>

                        <div className="flex flex-col items-start lg:items-start text-left ">
                            <span className="text-[45px] font-semibold text-[#262323] leading-none mb-4">{steps[2].num}</span>
                            <h3 className="text-[20px] font-bold text-[#41B349] mb-4 text-left uppercase">{steps[2].title}</h3>
                            <p className="text-gray-600 text-[15px] leading-relaxed max-w-[350px]">
                                {steps[2].desc}
                            </p>
                        </div>
                    </div>

                    {/* Center Column (Image & Step 5) */}
                    <div className="flex flex-col bg-white items-start lg:w-[30%] order-first lg:order-none mb-6 lg:mb-0">
                        <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px]  overflow-hidden  mb-5">
                            <Image
                                src={ProcessImg}
                                alt="Process Central"
                                fill
                                className=" object-contain "
                            />
                        </div>

                        <div className="lg:hidden flex flex-col items-center text-left">
                            <span className="text-[45px] font-semibold text-[#262323] leading-none mb-4 tracking-tighter">{steps[1].num}</span>
                            <h3 className="text-[20px] font-bold text-[#41B349] mb-4 uppercase">{steps[1].title}</h3>
                            <p className="text-gray-600 text-[15px] leading-relaxed max-w-[350px]">
                                {steps[1].desc}
                            </p>
                        </div>
                        <div className="lg:hidden flex flex-col items-start text-center mt-12 ">
                            <span className="text-[45px] font-semibold text-[#262323] leading-none mb-4 tracking-tighter">{steps[3].num}</span>
                            <h3 className="text-[20px] font-bold text-[#41B349] mb-4 uppercase">{steps[3].title}</h3>
                            <p className="text-gray-600 text-[15px] leading-relaxed max-w-[350px]">
                                {steps[3].desc}
                            </p>
                        </div>

                        <div className="flex flex-col items-start text-start lg:pl-[15px] mt-8">
                            <span className="text-[45px] font-semibold text-[#262323] leading-none mb-4 tracking-tighter">{steps[4].num}</span>
                            <h3 className="text-[20px] font-bold text-[#41B349] mb-4 uppercase">{steps[4].title}</h3>
                            <p className="text-gray-600 text-[15px] leading-relaxed max-w-[350px]">
                                {steps[4].desc}
                            </p>
                        </div>
                    </div>

                    {/* Right Column (Steps 2 & 4) - Hidden on mobile, shown on lg */}
                    <div className="hidden lg:flex flex-col gap-16 lg:w-[35%]  lg:mb-[120px] ">
                        <div className="flex flex-col items-start text-left">
                            <span className="text-[45px] font-semibold text-[#262323] leading-none mb-4">{steps[1].num}</span>
                            <h3 className="text-[20px] font-bold text-[#41B349] mb-4 uppercase">{steps[1].title}</h3>
                            <p className="text-gray-600 text-[15px] leading-relaxed max-w-[350px]">
                                {steps[1].desc}
                            </p>
                        </div>

                        <div className="flex flex-col items-start text-left">
                            <span className="text-[45px] font-semibold text-[#262323] leading-none mb-4">{steps[3].num}</span>
                            <h3 className="text-[20px] font-bold text-[#41B349] mb-4 uppercase">{steps[3].title}</h3>
                            <p className="text-gray-600 text-[15px] leading-relaxed max-w-[350px]">
                                {steps[3].desc}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ContentProcess
