"use client";
import React, { useEffect, useState, useRef } from "react";
import { getCmsVal } from "@/lib/api-helper";

export const defaultCounter = {
  stats: [
    { value: 100, suffix: "+", label: "Satisfied Clients" },
    { value: 150, suffix: "+", label: "Satisfied Clients" },
    { value: 90, suffix: "%", label: "Completed Projects" },
  ],
};

const Counter = ({ content, cmsContent }) => {
  const rawData = { ...defaultCounter, ...(content || {}) };
  const rawStats = Array.isArray(rawData.stats) && rawData.stats.length ? rawData.stats : defaultCounter.stats;

  const counters = rawStats.map((stat, index) => {
    const fallbackValue = defaultCounter.stats[index]?.value ?? 100;
    const fallbackSuffix = defaultCounter.stats[index]?.suffix ?? "+";
    const fallbackLabel = defaultCounter.stats[index]?.label ?? "";

    const valStr = getCmsVal(cmsContent, stat?.value ?? fallbackValue, "counter");
    const numVal = Number(valStr) || Number(stat?.value) || fallbackValue;
    const suffix = getCmsVal(cmsContent, stat?.suffix ?? fallbackSuffix, "counter");
    const label = getCmsVal(cmsContent, stat?.label ?? fallbackLabel, "counter");

    return {
      value: numVal,
      suffix,
      label,
    };
  });

  const [counts, setCounts] = useState(counters.map(() => 0));
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setCounts(counters.map(() => 0));
  }, [counters.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setInView(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!inView) return;
    const timers = [];
    const durations = counters.map(() => 1200);

    counters.forEach((counter, idx) => {
      let start = 0;
      const end = Number(counter.value) || 0;
      const increment = Math.ceil(end / (durations[idx] / 20 || 1));
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCounts((prev) => {
          const updated = [...prev];
          updated[idx] = start;
          return updated;
        });
      }, 20);
      timers.push(timer);
    });

    return () => timers.forEach((timer) => clearInterval(timer));
  }, [inView, counters]);

  return (
    <div ref={ref} className="w-full h-auto md:h-[148px] py-5 md:py-0 bg-[#41b349] flex flex-col md:flex-row items-center justify-center mt-20 md:mt-40">
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 text-center">
        {counters.map((counter, idx) => (
          <div key={`${counter.label}-${idx}`} className="flex flex-col items-center justify-center">
            <span className="text-white text-[48px] md:text-[48px] font-[700] leading-none">
              {counts[idx] || 0}
              <span>{counter.suffix}</span>
            </span>
            <span className="text-white text-[20px]  mt-4">
              {counter.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Counter;
