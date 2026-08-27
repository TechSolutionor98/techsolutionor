"use client"
import React from 'react'

const WhyChooseUs = () => {
    const cards = [
        {
            title: "Experienced & Dedicated Developers",
            description: "Work with skilled developers and tech experts with proven experience in custom software, web, and mobile app development. Our team ensures your projects are delivered on time, with high-quality standards, and fully aligned to your business goals."
        },
        {
            title: "Scalable & Flexible Solutions",
            description: "Whether you need a small project team or a full-scale tech department, our flexible hiring models allow you to scale your resources quickly. We adapt to your project requirements, timelines, and budget — for UAE-based or global businesses."
        },
        {
            title: "Trusted & Results-Driven Approach",
            description: "We focus on real business outcomes, not just code. From software and web apps to business solutions, we ensure efficiency, transparency, and security every step of the way, for businesses in the UAE and worldwide."
        }
    ]

    return (
        <section className="py-15 px-6 bg-white">
            <div className="max-w-[1150px] mx-auto text-center">
                <div className="inline-block bg-[#41B349] text-white px-4 py-2 tracking-tight text-[14px] font-semibold mb-16 shadow-lg">
                    Why Choose Us
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white p-5 rounded-[30px]  shadow-[10px_10px_10px_10px_rgba(0,0,0,0.2)] transition-all duration-500 hover:scale-105 border border-gray-100 flex flex-col items-center text-center"
                        >
                            <h3 className="text-[#41B349] text-[26px] font-semibold mb-4 leading-tight">
                                {card.title}
                            </h3>
                            <p className="text-[#555] text-[16px] leading-[1.6]">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs
