"use client"
import React, { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadLinksPreset } from "@tsparticles/preset-links";
import Image from 'next/image';
import HireImg from '../../../../../components/Images/hireusbanner.png'

const HireUsBanner = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadLinksPreset(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    return (
        <section className="relative bg-[#41b349] w-full min-h-[500px] flex items-center overflow-hidden font-sans">
            {/* Particles Background */}
            <div className="absolute inset-0 z-0 opacity-40">
                {init && (
                    <Particles
                        id="hireUsParticles"
                        className="w-full h-full"
                        options={{
                            preset: "links",
                            fullScreen: { enable: false },
                            particles: {
                                color: { value: "#ffffff" },
                                links: {
                                    color: "#ffffff",
                                    enable: true,
                                    opacity: 0.4,
                                    width: 1,
                                    distance: 150,
                                },
                                move: {
                                    enable: true,
                                    speed: 1.5,
                                    direction: "none",
                                    outModes: { default: "out" },
                                },
                                number: {
                                    value: 60,
                                    density: { enable: true, area: 800 }
                                },
                                size: { value: 2 }
                            },
                            interactivity: {
                                events: {
                                    onHover: { enable: true, mode: "repulse" },
                                },
                                modes: {
                                    repulse: { distance: 100, duration: 0.4 }
                                }
                            }
                        }}
                        style={{ position: "absolute", inset: 0 }}
                    />
                )}
            </div>

            <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
                {/* Left Content */}
                <div className="w-full md:w-1/2 text-white">
                    <h1 className="text-[36px] md:text-[54px] font-bold leading-[1.1] mb-6">
                        Hire Skilled <br />
                        Developers & Tech <br />
                        Experts for Your <br />
                        Business
                    </h1>
                    <p className="text-[16px] md:text-[18px] leading-relaxed max-w-[600px] mb-8">
                        Hire expert developers and tech teams instantly to build, scale,
                        and deliver custom software, web applications, mobile apps, and
                        business projects, trusted by businesses in the UAE and worldwide.
                    </p>
                </div>

                {/* Right Content */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end  z-50">
                    <div className="relative w-full max-w-[450px] rounded-2xl overflow-hidden bg-[#41b349] shadow-2xl">
                        <Image
                            src={HireImg}
                            alt="Hire Us"
                            width={500}
                            height={350}
                            className="object-cover "
                        />
                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HireUsBanner
