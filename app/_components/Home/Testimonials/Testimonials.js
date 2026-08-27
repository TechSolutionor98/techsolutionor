'use client'

import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { LiaStarSolid } from 'react-icons/lia'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Logo from '../../../../components/Images/Logo.png';
import Image from 'next/image'

export const defaultTestimonials = {
  titlePrefix: 'Customer',
  titleHighlight: 'Reviews',
  logoImageUrl: '',
  companyName: 'Tech Solutionor',
  ratingText: '5.0',
  poweredByText: 'powered by Google',
  reviewButtonText: 'review us on',
  reviews: [
    {
      name: 'Bellanoir',
      initial: 'D',
      color: 'bg-[#f47413]',
      time: '10 days ago',
      review:
        'We hired TechSolutionor to develop our eCommerce platform, and the outcome exceeded expectations. The website is fast, easy to manage, and optimized for conversions. We appreciate their professional approach.',
    },
    {
      name: 'Bellanoir',
      initial: 'B',
      color: 'bg-[#912d91]',
      time: '10 days ago',
      review: 'Very professional team. Our social media engagement improved noticeably after working with them.',
    },
    {
      name: 'Bellanoir',
      initial: 'E',
      color: 'bg-[#2b6daa]',
      time: 'a year ago',
      review: 'good experience',
    },
    {
      name: 'Bellanoir',
      initial: 'S',
      color: 'bg-[#43b949]',
      time: '2 months ago',
      review:
        'Our partnership with Techsolutionor has exceeded our expectations. Their innovative solutions and reliable support have been crucial in driving our branch technology initiatives forward.',
    },
  ],
}
const resolveAssetUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) return url
  return `/${url.replace(/^\/+/, '')}`
}

const Testimonials = ({ content }) => {
  const swiperRef = useRef(null)
  const data = { ...defaultTestimonials, ...(content || {}) }
  const reviews = Array.isArray(data.reviews) && data.reviews.length ? data.reviews : defaultTestimonials.reviews

  return (
    <div className="py-0 bg-white">
      <div className="container mx-auto px-5 md:px-20">
        <h1 className="text-center text-[30px] md:text-[40px] font-bold -mt-3 mb-7" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          <span>{data.titlePrefix}</span>{' '}
          <span className="text-[#43b949]">
            {data.titleHighlight}
          </span>
        </h1>

        <div className="w-full max-w-[1180px] flex flex-col md:flex-row gap-10 md:gap-8 items-start justify-between">
          <div className="w-full md:w-[340px] flex flex-col items-start space-y-4 pt-6 md:pt-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-gray-200 p-2 flex items-center justify-center">
                {resolveAssetUrl(data.logoImageUrl) ? (
                  <img src={resolveAssetUrl(data.logoImageUrl)} alt="TechSolutionor" width={32} height={32} />
                ) : (
                  <Image src={Logo} alt="TechSolutionor" width={32} height={32} />
                )}
              </div>
              <div className="w-[170px]">
                <h3 className="text-[18px] font-bold text-black whitespace-nowrap w-full" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  {data.companyName}
                </h3>
                <div className="flex items-center gap-2 w-full">
                  <span className="text-[17px] font-bold text-[#fbd033]">
                    {data.ratingText}
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <LiaStarSolid key={i} className="text-[#fbd033] text-[19px]" />
                    ))}
                  </div>
                </div>
                <p className="text-[14px] text-gray-500 w-full mt-1">
                  {data.poweredByText}
                </p>
              </div>
            </div>

            <button className="flex items-center -mt-1 justify-center w-[150px] md:ml-[50px] gap-2 bg-[#4285f4] text-white px-3 py-2 rounded-full text-[14px] font-semibold hover:bg-blue-600 transition shadow-sm">
              <span>{data.reviewButtonText}</span> <FcGoogle />
            </button>
          </div>

          <div className="flex flex-wrap max-w-[840px] w-full relative group">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center text-gray-400 hover:text-[#43b949] transition"
            >
              <FaChevronLeft size={16} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute -right-[20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center text-gray-400 hover:text-[#43b949] transition"
            >
              <FaChevronRight size={16} />
            </button>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              pagination={{ clickable: true, el: '.custom-pagination' }}
              autoplay={{ delay: 5000 }}
              loop={true}
              className="pb-16"
            >
              {reviews.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 h-[320px] flex flex-col shadow-none" style={{ boxShadow: 'none' }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${item.color || 'bg-[#43b949]'} flex items-center justify-center text-white font-bold text-[18px]`}>
                          {item.initial}
                        </div>
                        <div>
                          <h4 className="text-[16px] font-bold text-black leading-tight">
                            {item.name}
                          </h4>
                          <p className="text-[12px] text-gray-400 mt-2">
                            {item.time}
                          </p>
                        </div>
                      </div>
                      <FcGoogle className="text-gray-300 -mt-6" />
                    </div>

                    <div className="flex mb-3">
                      {[...Array(5)].map((_, idx) => (
                        <LiaStarSolid key={idx} className="text-[#fbd033] text-[18px]" />
                      ))}
                    </div>

                    <p className="text-gray-600 text-[14px] leading-[22px] overflow-hidden">
                      {item.review}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="custom-pagination flex justify-center items-center w-full gap-2 mt-3"></div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: gray;
          opacity: 1;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #f47413;
        }
      `}</style>
    </div>
  )
}

export default Testimonials
