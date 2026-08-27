"use client"
import React from 'react'
import Image from 'next/image'
import AppIcon from '../../../../../components/Images/hireusimg1.png'
import WebIcon from '../../../../../components/Images/hireusimg2.png'
import GraphicIcon from '../../../../../components/Images/hireusimg3.png'
import DigitalIcon from '../../../../../components/Images/hireusimg4.jpg'

const AtoZSolution = () => {
    const solutions = [
        { icon: AppIcon, title: "App Development" },
        { icon: WebIcon, title: "Web Development" },
        { icon: GraphicIcon, title: "Graphics Designer" },
        { icon: DigitalIcon, title: "Digital Marketing" }
    ]

    return (
        <section className=" px-6 bg-white">
            <div className="max-w-[1180px] mx-auto text-center mb-16">
                <h2 className="text-[#41B349] uppercase tracking-widest font-bold text-[24px] md:text-[32px] mb-2">YOUR A-TO-Z SOLUTION</h2>
                <h3 className="text-[28px] md:text-[40px] font-bold text-black">for Hiring the Perfect Person</h3>
            </div>

            <div className="max-w-[1180px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
                {solutions.map((item, index) => (
                    <div key={index} className="flex flex-col items-center group">
                        <div className="w-[150px] md:w-[200px] h-[150px] md:h-[200px] flex items-center justify-center ">
                            <Image
                                src={item.icon}
                                alt={item.title}
                                width={180}
                                height={180}
                                className="object-contain"
                            />
                        </div>
                        <h4 className="text-[18px] md:text-[22px] font-semibold text-black text-center ">
                            {item.title}
                        </h4>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AtoZSolution
