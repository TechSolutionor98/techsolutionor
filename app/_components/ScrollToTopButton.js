"use client";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToNavbar = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToNavbar}
      style={{ boxShadow: '6px 6px 13px 0px rgba(42, 67, 113, 0.2)' }}
      className={`fixed bottom-8 font-extralight right-4 md:right-6 lg:right-4 z-50 bg-white text-[#43baff] p-3 rounded-[5px] shadow-lg transition-all duration-300
          hover:translate-y-[-8px]
        ${
          visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
    >
      <FaArrowUp size={18} />
    </button>
  );
};

export default ScrollToTopButton;
