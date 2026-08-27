"use client"
import React from 'react'
import { FaLightbulb, FaRocket, FaCog, FaChartLine } from 'react-icons/fa'

const ProcessSteps = () => {
    const steps = [
        {
            number: "1",
            icon: <FaLightbulb className="text-white text-2xl" />,
            title: "Strategy",
            desc: "Set goals and plan your growth"
        },
        {
            number: "2",
            icon: <FaRocket className="text-white text-2xl" />,
            title: "Execution",
            desc: "Implement campaigns and creative ideas"
        },
        {
            number: "3",
            icon: <FaCog className="text-white text-2xl" />,
            title: "Optimization",
            desc: "Analyze data and refine tactics"
        },
        {
            number: "Step",
            icon: <FaChartLine className="text-white text-2xl" />,
            title: "Growth",
            desc: "Achieve measurable results worldwide"
        }
    ];

    return (
        <section className="py-10 bg-white">
            <div className="flex justify-center px-4 my-6">
                <h1 className="text-[26px] sm:text-[32px] md:text-[36px] font-bold text-white bg-[#41b349] px-6 sm:px-10 py-3 sm:py-4 rounded-[6px] shadow-md text-center inline-block">
                    Our Simple 4-Step Process to Digital Success
                </h1>
            </div>
            <div className="w-full max-w-[1280px] container mx-auto px-5 md:px-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center flex-1 relative">
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gray-200 z-0"></div>
                            )}

                            {/* Icon & Number Badge */}
                            <div className="relative z-10 mb-6">
                                <div className="w-16 h-16 bg-[#41B349] rounded-full flex items-center justify-center shadow-lg">
                                    {step.icon}
                                </div>
                                <div className="absolute -top-2 -left-2 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-white border-4 border-white">
                                    {step.number}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-gray-500 text-sm max-w-[200px]">{step.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Hire Us Call to Action */}
                
            </div>
        </section>
    )
}

export default ProcessSteps
