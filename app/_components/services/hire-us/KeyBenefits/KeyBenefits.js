"use client"
import React from 'react'
import Image from 'next/image'
import Benefit1 from '../../../../../components/Images/hireuscard1.jpg'
import Benefit2 from '../../../../../components/Images/hireuscard2.jpg'
import Benefit3 from '../../../../../components/Images/hireuscard3.jpg'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const KeyBenefits = () => {
    const benefits = [
        {
            icon: Benefit1,
            title: "Personalized One-on-One Attention",
            description: "Work closely with your dedicated developer or team. We understand your project goals, business requirements, and technical needs, ensuring every solution is tailored for maximum impact."
        },
        {
            icon: Benefit2,
            title: "Transparent Progress & Reporting",
            description: "Stay in the loop with regular updates, progress reports, and milestone tracking. Our process ensures accountability, transparency, and timely delivery for every software, web, or mobile app project."
        },
        {
            icon: Benefit3,
            title: "Security & Confidentiality Guaranteed",
            description: "We prioritize your data privacy and business information. All projects are handled with strict confidentiality, secure development practices, and compliance standards for UAE and international clients."
        }
    ]

    return (
        <section className="py-20 px-6 bg-[#fcfcfc]">
            <div className="max-w-[1150px] mx-auto text-center mb-16">
                <h4 className="text-[#41B349] uppercase tracking-widest font-bold text-[32px] mb-2">Key Benefits of</h4>
                <h2 className="text-[32px] md:text-[40px] font-bold text-black mb-6">Hiring Our Tech Experts</h2>
                <p className="text-[#111111] max-w-[1000px] mx-auto text-[16px]">
                    Experience seamless project execution with dedicated developers and tech teams. From custom software and web apps to business solutions, we ensure efficiency, transparency, and security every step of the way, for businesses in the UAE and worldwide.
                </p>
            </div>

            <div className="max-w-[1150px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                        <div className="mb-8 w-[150px] h-[150px] flex items-center justify-center transition-transform duration-300 hover:scale-110">
                            <Image
                                src={benefit.icon}
                                alt={benefit.title}
                                width={150}
                                height={150}
                                className="object-contain"
                            />
                        </div>
                        <h3 className={`{poppins.className} text-[25px] font-[600] text-black mb-6 tracking-wide leading-7 flex items-center`}>
                            {benefit.title}
                        </h3>
                        <p className="text-[#666] text-[15px] max-w-[300px] leading-relaxed">
                            {benefit.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default KeyBenefits
