"use client"
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaSms } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

const SideIcons = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="fixed top-1/2 right-0 z-50 flex flex-col items-end"
      style={{ transform: "translateY(-50%)" }}
    >
      
      {/* Toggle Button */}
      <button
        className={`flex items-center justify-center w-[50px] h-[50px] bg-black rounded-l-[40px] rounded-r-none mt-2 transition-all duration-300`}
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
        onClick={() => setOpen((v) => !v)}
        title={open ? "Hide" : "Show"}
      >
        <span
          className={`text-white text-2xl transition-transform duration-300 inline-block`}
          style={{
            transform: `rotate(${open ? "0deg" : "180deg"})`,
            transition: "transform 0.3s",
          }}
        >
          <FaLongArrowAltRight />
        </span>
      </button>
      <div
        className={`flex flex-col gap-0 items-end transition-all duration-300 ${
          open ? "translate-x-0" : "translate-x-[90px]"
        }`}
      >
        {/* WhatsApp Icon */}
        <a
          href="https://wa.me/your-number"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-[50px] h-[50px] bg-[#41B349] rounded-l-[40px] rounded-r-none shadow-lg transition hover:bg-[#36913a]"
          title="WhatsApp"
        >
          <FaWhatsapp size={20} className="text-white" />
        </a>
        {/* SMS Icon */}
        <a
          href="sms:your-number"
          className="flex items-center justify-center w-[50px] h-[50px] bg-[#41B349] rounded-l-[40px] rounded-r-none shadow-lg transition hover:bg-[#36913a]"
          title="SMS"
        >
          <FaSms size={20} className="text-white" />
        </a>
      </div>
    </div>
  );
};

export default SideIcons;
