'use client'

import React from 'react'
import { FaThumbsUp, FaHeart, FaSmile } from 'react-icons/fa'
import { getCmsVal } from '@/lib/api-helper'

export const defaultTestimonials = {
  titlePrefix: 'Customer',
  titleHighlight: 'Reviews',
  companyName: 'Tech Solutionor',
  ratingText: '5.0',
  poweredByText: 'powered by Google',
  reviewButtonText: 'review us on',
  reviews: [
    {
      name: 'DreamCatcherTV',
      initial: 'D',
      color: 'bg-[#F47413]',
      time: '10 days ago',
      review:
        'We hired TechSolutionor to develop our eCommerce platform, and the outcome exceeded expectations. The website is fast, easy to manage, and optimized for conversions. We appreciate their professional approach.',
    },
    {
      name: 'Bellanoir',
      initial: 'B',
      color: 'bg-[#912D91]',
      time: '10 days ago',
      review: 'Very professional team. Our social media engagement improved noticeably after working with them.',
    },
    {
      name: 'Endless Data',
      initial: 'E',
      color: 'bg-[#2B6DAA]',
      time: 'a year ago',
      review: 'good experience',
    },
    {
      name: 'Salam Bin Sultan',
      initial: 'S',
      color: 'bg-[#43B949]',
      time: '2 months ago',
      review:
        'Our partnership with Techsolutionor has exceeded our expectations. Their innovative solutions and reliable support have been crucial in driving our branch technology initiatives forward.',
    },
  ],
}

const colorPalette = [
  'bg-[#1877F2]',
  'bg-[#F47413]',
  'bg-[#912D91]',
  'bg-[#2B6DAA]',
  'bg-[#43B949]',
  'bg-[#EF7A35]',
  'bg-[#D9961A]',
  'bg-[#0E0707]',
]

const reactionPresets = [
  { icon: <FaThumbsUp size={12} className="text-white" />, bg: 'bg-[#1877F2]', pos: '-bottom-3 left-28', action: 'Like', color: 'text-[#1877F2]', badges: ['👍', '❤️'], count: '6' },
  { icon: <FaHeart size={13} className="text-white" />, bg: 'bg-[#E41E3F]', pos: '-top-3 right-8', action: 'Love', color: 'text-[#E41E3F]', badges: ['❤️'], count: '4' },
  { icon: <FaSmile size={14} className="text-white" />, bg: 'bg-[#FFC017]', pos: '-bottom-3 -left-3', action: 'Like', color: 'text-[#1877F2]', badges: ['👍'], count: '2' },
  { icon: <FaThumbsUp size={13} className="text-white" />, bg: 'bg-[#1877F2]', pos: '-bottom-3 right-20', action: 'Like', color: 'text-[#1877F2]', badges: ['👍', '❤️'], count: '8' },
  { icon: <FaSmile size={15} className="text-white" />, bg: 'bg-[#FFC017]', pos: '-bottom-4 -left-4', action: 'Love', color: 'text-[#E41E3F]', badges: ['😍', '👍'], count: '20' },
]

function dataReviewsFromCms(cmsContent) {
  if (!cmsContent) return null
  if (Array.isArray(cmsContent.testimonials?.reviews)) return cmsContent.testimonials.reviews
  if (Array.isArray(cmsContent.reviews)) return cmsContent.reviews
  return null
}

const Testimonials = ({ content, cmsContent }) => {
  // Parse section titles dynamically from CMS / API
  const sectionTitlePrefix = getCmsVal(cmsContent, content?.titlePrefix || defaultTestimonials.titlePrefix, 'testimonials')
  const sectionTitleHighlight = getCmsVal(cmsContent, content?.titleHighlight || defaultTestimonials.titleHighlight, 'testimonials')

  // Parse reviews array dynamically from CMS / API / Props
  const rawReviews = content?.reviews || dataReviewsFromCms(cmsContent) || defaultTestimonials.reviews
  const reviewsList = Array.isArray(rawReviews) && rawReviews.length > 0 ? rawReviews : defaultTestimonials.reviews

  // Format reviews dynamically
  const formattedReviews = reviewsList.map((item, idx) => {
    const name = item.name || item.author || item.clientName || 'Verified Client'
    const initial = item.initial || (name ? name.charAt(0).toUpperCase() : 'C')
    const color = item.color || colorPalette[idx % colorPalette.length]
    const time = item.time || item.date || 'Recently'
    const reviewText = item.review || item.text || item.comment || ''
    const rx = reactionPresets[idx % reactionPresets.length]

    return {
      name,
      initial,
      color,
      time,
      review: reviewText,
      rx,
    }
  })

  // Distribute dynamically into 2 balanced columns
  const halfIndex = Math.ceil(formattedReviews.length / 2)
  const leftColCards = formattedReviews.slice(0, halfIndex)
  const rightColCards = formattedReviews.slice(halfIndex)

  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] relative overflow-hidden select-none">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Speech Bubble Banner */}
        <div className="flex justify-center mb-16">
          <div className="relative bg-[#FDE047]/90 border border-[#FACC15] rounded-3xl px-8 sm:px-12 py-5 text-center shadow-sm max-w-3xl">
            <h2 
              className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1C1E21] tracking-tight leading-snug"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              <span>{sectionTitlePrefix}</span> <span>{sectionTitleHighlight}</span>: Real Feedback From Our Clients
            </h2>

            {/* Pointer Arrow */}
            <div className="absolute -bottom-3 left-16 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-[#FDE047]/90" />
          </div>
        </div>

        {/* 2-Column Dynamic Social Comment Wall */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Column Stack */}
          <div className="flex flex-col space-y-6">
            {leftColCards.map((item, idx) => (
              <div key={idx} className="relative group">
                
                {/* Floating Reaction Badge */}
                {item.rx && (
                  <div className={`absolute ${item.rx.pos} z-20 w-8 h-8 rounded-full ${item.rx.bg} flex items-center justify-center shadow-md border-2 border-white transform group-hover:scale-110 transition-transform duration-200`}>
                    {item.rx.icon}
                  </div>
                )}

                {/* Comment Box */}
                <div className="bg-white border-2 border-[#FDE68A]/80 rounded-2xl p-5 shadow-[0_6px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_rgba(245,158,11,0.12)] hover:border-[#F59E0B]/60 transition-all duration-300 relative">
                  
                  <div className="flex items-start gap-3.5">
                    <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-white font-black text-base shadow-xs shrink-0 mt-0.5 border border-white/60`}>
                      {item.initial}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="inline">
                        <span 
                          className="font-bold text-[#2B6DAA] text-sm sm:text-base mr-2 hover:underline cursor-pointer inline-block"
                          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                        >
                          {item.name}
                        </span>
                        <span className="text-[#1C1E21] text-xs sm:text-sm leading-relaxed font-normal inline">
                          {item.review}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100 text-xs font-semibold text-[#65676B]">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button className={`hover:underline cursor-pointer ${item.rx.color}`}>{item.rx.action}</button>
                          <span>·</span>
                          <button className="hover:underline cursor-pointer">Reply</button>
                          <span>·</span>
                          <span className="text-[#8A8D91] font-normal">{item.time}</span>
                        </div>

                        <div className="flex items-center gap-1 bg-gray-50 border border-gray-200/60 rounded-full px-2 py-0.5 shadow-2xs">
                          <span className="text-xs">{item.rx.badges.join('')}</span>
                          <span className="text-[11px] font-bold text-gray-500">{item.rx.count}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Right Column Stack */}
          <div className="flex flex-col space-y-6">
            {rightColCards.map((item, idx) => (
              <div key={idx} className="relative group">
                
                {/* Floating Reaction Badge */}
                {item.rx && (
                  <div className={`absolute ${item.rx.pos} z-20 w-8 h-8 rounded-full ${item.rx.bg} flex items-center justify-center shadow-md border-2 border-white transform group-hover:scale-110 transition-transform duration-200`}>
                    {item.rx.icon}
                  </div>
                )}

                {/* Comment Box */}
                <div className="bg-white border-2 border-[#FDE68A]/80 rounded-2xl p-5 shadow-[0_6px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_rgba(245,158,11,0.12)] hover:border-[#F59E0B]/60 transition-all duration-300 relative">
                  
                  <div className="flex items-start gap-3.5">
                    <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-white font-black text-base shadow-xs shrink-0 mt-0.5 border border-white/60`}>
                      {item.initial}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="inline">
                        <span 
                          className="font-bold text-[#2B6DAA] text-sm sm:text-base mr-2 hover:underline cursor-pointer inline-block"
                          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                        >
                          {item.name}
                        </span>
                        <span className="text-[#1C1E21] text-xs sm:text-sm leading-relaxed font-normal inline">
                          {item.review}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100 text-xs font-semibold text-[#65676B]">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button className={`hover:underline cursor-pointer ${item.rx.color}`}>{item.rx.action}</button>
                          <span>·</span>
                          <button className="hover:underline cursor-pointer">Reply</button>
                          <span>·</span>
                          <span className="text-[#8A8D91] font-normal">{item.time}</span>
                        </div>

                        <div className="flex items-center gap-1 bg-gray-50 border border-gray-200/60 rounded-full px-2 py-0.5 shadow-2xs">
                          <span className="text-xs">{item.rx.badges.join('')}</span>
                          <span className="text-[11px] font-bold text-gray-500">{item.rx.count}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

export default Testimonials
