import React from 'react'
import Image from 'next/image'
import PowerfulImg from '../../../components/Images/posabout.png'

const POSPowerfulFeatures = () => {
    const features = [
        {
            title: "Inventory Management",
            desc: "Streamline your operations with our inventory management system, which offers real-time tracking and optimization of stock levels."
        },
        {
            title: "Sales & Payment Process",
            desc: "Simplify transactions with our streamlined sales and payment process, ensuring fast, secure, and accurate payments every time."
        },
        {
            title: "Report and Analysis",
            desc: "Gain valuable insights with our comprehensive report and analysis tools, providing detailed data to drive informed business decisions."
        },
        {
            title: "Secure Fast Transaction",
            desc: "Experience secure, fast transactions with our system, ensuring reliable and swift processing every time."
        }
    ];

    return (
        <section className="py-10 bg-white font-sans overflow-hidden">
            <div className="max-w-[1180px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-5">
                    {/* Left: Illustration */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                        <div className="relative w-full max-w-[550px]">
                            <Image
                                src={PowerfulImg}
                                alt="Powerful POS Features"
                                layout="responsive"
                                width={100}
                                height={85}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="w-full lg:w-1/2">
                        <div className="mb-10">
                            <span className="bg-[#41B349] text-white px-6 py-2   mb-3 inline-block">
                                POS Key Features
                            </span>
                            <h2 className="text-[36px] md:text-[35px] font-bold  leading-tight">
                                Powerful Features With <br />
                                Incredible Design
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
                            {features.map((item, index) => (
                                <div key={index} className="flex flex-col gap-4">
                                    <h3 className="text-[#41B349] text-[22px] font-semibold tracking-wide">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-[15px] leading-relaxed tracking-wide text-start">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default POSPowerfulFeatures
