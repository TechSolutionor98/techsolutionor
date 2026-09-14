'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FaThumbsUp, FaHeart, FaSmile } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
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
    {
      name: 'M saleem Mughal',
      initial: 'M',
      color: 'bg-[#4F46E5]',
      time: 'Recently',
      review:
        'Exceptional engineering and digital transformation consultancy. Tech Solutionor delivered our project ahead of schedule with top-tier technical quality.',
    },
    {
      name: 'Apex Digital Systems',
      initial: 'A',
      color: 'bg-[#059669]',
      time: '3 weeks ago',
      review:
        'Great communication and solid technical stack. They built our cloud architecture with high performance and zero downtime.',
    },
    {
      name: 'OmniRetail Solutions',
      initial: 'O',
      color: 'bg-[#0284C7]',
      time: '1 month ago',
      review:
        'The custom POS system and inventory management developed by Tech Solutionor streamlined our retail operations across all branches in Dubai.',
    },
    {
      name: 'NEXA Technologies',
      initial: 'N',
      color: 'bg-[#7C3AED]',
      time: '2 weeks ago',
      review:
        'Outstanding UI/UX redesign and web app development. Their attention to detail and responsive design delivered a flawless customer experience.',
    },
  ],
}

const colorPalette = [
  'bg-[#F47413]',
  'bg-[#912D91]',
  'bg-[#2B6DAA]',
  'bg-[#43B949]',
  'bg-[#4F46E5]',
  'bg-[#059669]',
  'bg-[#0284C7]',
  'bg-[#7C3AED]',
  'bg-[#1877F2]',
  'bg-[#EF7A35]',
]

const reactionPresets = [
  { icon: <FaThumbsUp size={12} className="text-white" />, bg: 'bg-[#1877F2]', pos: '-bottom-3 left-28', action: 'Like', color: 'text-[#1877F2]', badges: ['👍', '❤️'], count: '6' },
  { icon: <FaHeart size={13} className="text-white" />, bg: 'bg-[#E41E3F]', pos: '-top-3 right-8', action: 'Love', color: 'text-[#E41E3F]', badges: ['❤️'], count: '4' },
  { icon: <FaSmile size={14} className="text-white" />, bg: 'bg-[#FFC017]', pos: '-bottom-3 -left-3', action: 'Like', color: 'text-[#1877F2]', badges: ['👍'], count: '2' },
  { icon: <FaThumbsUp size={13} className="text-white" />, bg: 'bg-[#1877F2]', pos: '-bottom-3 right-20', action: 'Like', color: 'text-[#1877F2]', badges: ['👍', '❤️'], count: '8' },
]

const slotDelays = [0, 0.12, 0.06, 0.18]

function dataReviewsFromCms(cmsContent) {
  if (!cmsContent) return null
  if (Array.isArray(cmsContent.testimonials?.reviews) && cmsContent.testimonials.reviews.length > 0) return cmsContent.testimonials.reviews
  if (Array.isArray(cmsContent.reviews) && cmsContent.reviews.length > 0) return cmsContent.reviews
  return null
}

const Testimonials = ({ content, cmsContent }) => {
  const [liveReviews, setLiveReviews] = useState([])
  const [slotReviews, setSlotReviews] = useState([0, 1, 2, 3])
  const [hoveredSlots, setHoveredSlots] = useState({ 0: false, 1: false, 2: false, 3: false })

  // Tracks hovered slots without causing re-renders or recreating the timer
  const hoveredSlotsRef = useRef({ 0: false, 1: false, 2: false, 3: false })
  const nextIndexRef = useRef(4)

  // Fetch real reviews dynamically from live backend / Google sync API
  useEffect(() => {
    let isMounted = true
    async function fetchReviews() {
      try {
        const res = await fetch('/api/reviews', { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setLiveReviews(data)
            return
          }
        }
      } catch (err) {
        console.warn('Could not fetch live reviews from /api/reviews:', err)
      }
      if (isMounted) {
        const fallback = dataReviewsFromCms(cmsContent) || content?.reviews || defaultTestimonials.reviews
        setLiveReviews(fallback)
      }
    }

    fetchReviews()
    return () => {
      isMounted = false
    }
  }, [content, cmsContent])

  // Parse section titles dynamically
  const sectionTitlePrefix = getCmsVal(cmsContent, content?.titlePrefix || defaultTestimonials.titlePrefix, 'testimonials')
  const sectionTitleHighlight = getCmsVal(cmsContent, content?.titleHighlight || defaultTestimonials.titleHighlight, 'testimonials')

  // Active reviews list
  const activeReviews = liveReviews.length > 0 ? liveReviews : defaultTestimonials.reviews

  // Format all available reviews
  const formattedReviews = activeReviews.map((item, idx) => {
    const name = item.name || item.author || item.clientName || 'Verified Client'
    const initial = item.initial || (name ? name.charAt(0).toUpperCase() : 'C')
    const color = item.color || colorPalette[idx % colorPalette.length]
    const time = item.time || item.date || 'Recently'
    const reviewText = item.message || item.review || item.text || item.comment || ''
    const uniqueKey = item._id || `${name}-${idx}`

    return {
      uniqueKey,
      name,
      initial,
      color,
      time,
      review: reviewText,
    }
  })

  // Automatic review rotation every 5 seconds (5000ms)
  // Individual card hover: only the hovered card stops; all other cards continue normally
  useEffect(() => {
    if (formattedReviews.length <= 4) return

    const timer = setInterval(() => {
      setSlotReviews((prevSlots) => {
        // Collect currently locked (hovered) review indices so other slots don't duplicate them
        const lockedIndices = []
        for (let i = 0; i < 4; i++) {
          if (hoveredSlotsRef.current[i]) {
            lockedIndices.push(prevSlots[i])
          }
        }

        const newSlots = [...prevSlots]
        const usedInThisTick = [...lockedIndices]

        for (let i = 0; i < 4; i++) {
          // If this individual card is hovered, keep it locked and do NOT change it
          if (hoveredSlotsRef.current[i]) {
            newSlots[i] = prevSlots[i]
            continue
          }

          // Otherwise, pick the next available review index not currently shown
          let candidate = nextIndexRef.current % formattedReviews.length
          let attempts = 0
          while (usedInThisTick.includes(candidate) && attempts < formattedReviews.length) {
            candidate = (candidate + 1) % formattedReviews.length
            attempts++
          }

          newSlots[i] = candidate
          usedInThisTick.push(candidate)
          nextIndexRef.current = (candidate + 1) % formattedReviews.length
        }

        return newSlots
      })
    }, 5000)

    return () => clearInterval(timer)
  }, [formattedReviews.length])

  // Individual card hover handler
  const handleCardHover = (slotIdx, isHovering) => {
    hoveredSlotsRef.current[slotIdx] = isHovering
    setHoveredSlots((prev) => ({
      ...prev,
      [slotIdx]: isHovering,
    }))
  }

  // Render individual card slot with exact original UI
  const renderCardSlot = (slotIdx) => {
    const reviewIndex = slotReviews[slotIdx] % formattedReviews.length
    const item = formattedReviews[reviewIndex]
    if (!item) return null

    const rx = reactionPresets[slotIdx % reactionPresets.length]
    const slotDelay = slotDelays[slotIdx] || 0
    const isCardHovered = !!hoveredSlots[slotIdx]

    return (
      <div 
        key={slotIdx} 
        className="relative min-h-[140px]"
        onMouseEnter={() => handleCardHover(slotIdx, true)}
        onMouseLeave={() => handleCardHover(slotIdx, false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${slotIdx}-${item.uniqueKey}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: isCardHovered ? 0 : slotDelay, ease: 'easeInOut' }}
            className="relative group"
          >
            {/* Floating Reaction Badge */}
            {rx && (
              <div className={`absolute ${rx.pos} z-20 w-8 h-8 rounded-full ${rx.bg} flex items-center justify-center shadow-md border-2 border-white transform group-hover:scale-110 transition-transform duration-200 pointer-events-none`}>
                {rx.icon}
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
                      <button type="button" className={`hover:underline cursor-pointer ${rx.color}`}>{rx.action}</button>
                      <span>·</span>
                      <button type="button" className="hover:underline cursor-pointer">Reply</button>
                      <span>·</span>
                      <span className="text-[#8A8D91] font-normal">{item.time}</span>
                    </div>

                    <div className="flex items-center gap-1 bg-gray-50 border border-gray-200/60 rounded-full px-2 py-0.5 shadow-2xs">
                      <span className="text-xs">{rx.badges.join('')}</span>
                      <span className="text-[11px] font-bold text-gray-500">{rx.count}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }

  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] relative overflow-hidden select-none">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Speech Bubble Banner */}
        <div className="flex justify-center mb-16">
          <div className="relative bg-[#FDE047]/90 border border-[#FACC15] rounded-3xl px-8 sm:px-12 py-5 text-center shadow-sm max-w-3xl">
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1C1E21] tracking-tight leading-tight"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              <span>{sectionTitlePrefix}</span> <span>{sectionTitleHighlight}</span>: Real Feedback From Our Clients
            </h2>

            {/* Pointer Arrow */}
            <div className="absolute -bottom-3 left-16 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-[#FDE047]/90" />
          </div>
        </div>

        {/* 2-Column Social Comment Wall (Exact Original Layout with Individual Card Hover Pause) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Column Stack */}
          <div className="flex flex-col space-y-6">
            {renderCardSlot(0)}
            {renderCardSlot(1)}
          </div>

          {/* Right Column Stack */}
          <div className="flex flex-col space-y-6">
            {renderCardSlot(2)}
            {renderCardSlot(3)}
          </div>

        </div>

      </div>
    </section>
  )
}

export default Testimonials
