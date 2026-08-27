import React from "react";
import Image from 'next/image'
import Icon1 from '../../../components/Images/abouticon4.png' 
import Icon2 from '../../../components/Images/abouticon5.png' 
import Icon3 from '../../../components/Images/abouticon6.png' 
import Icon4 from '../../../components/Images/abouticon7.png' 

const whyChooseUsData = [
    {
        image: Icon1,
        title: "Expertise and Innovation",
        description:
            "We stay at the forefront of technology, constantly pushing boundaries to deliver innovative, cutting-edge solutions that redefine what is possible."
    },
    {
        image: Icon2,
        title: "Transparent Process",
        description:
            "Our clear and transparent workflow simplifies every step of your project, from concept to delivery, so you always know what to expect."
    },
    {
        image: Icon3,
        title: "Client-Centric Approach",
        description:
            "We prioritize collaboration and communication, ensuring every interaction moves your project forward and contributes to your success and satisfaction."
    },
    {
        image: Icon4,
        title: "Cost-Effective",
        description:
            "We are committed to providing high-quality, cost-effective solutions that deliver maximum value without compromising on performance or results."
    }
];

const WhyChooseUs = () => {
    return (
        <div className="w-full bg-white py-2 md:-pt-20 pb-8">
            <div className="max-w-[1140px] mx-auto px-5 text-left">
                <h2 className="text-[#262323] text-[35px] md:text-[45px] font-bold mb-10">
                    Why Choose Us?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {whyChooseUsData.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-start p-2 border-l md:border-l-0 lg:border-l border-black first:border-l-0"
                        >
                            {/* Image */}
                            <div className="mb-6">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={55}
                                    height={55}
                                    className="object-contain"
                                />
                            </div>

                            <h3 className="text-[#41b349] text-[19px] font-semibold mb-4 tracking-wide">
                                {item.title}
                            </h3>

                            <p className="text-gray-500 text-base leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default WhyChooseUs;
