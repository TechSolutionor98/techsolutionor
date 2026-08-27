"use client";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useQuote } from "../../../../app/_context/QuoteContext";

import { getCmsVal } from "@/lib/api-helper";

export const defaultNewsletter = {
  title: "Ready to scale your digital presence?\nHire the TechSolutionor team to\nhandle your project.",
  buttonText: "Hire Us",
};

const formatNewsletterTitle = (fullTitle) => {
  if (!fullTitle) return { line1: "", line2: "", line3: "" };
  const str = String(fullTitle).trim();
  if (str.includes("\n")) {
    const lines = str.split("\n").map((l) => l.trim()).filter(Boolean);
    return {
      line1: lines[0] || "",
      line2: lines[1] || "",
      line3: lines.slice(2).join(" ") || "",
    };
  }
  if (str.includes("?")) {
    const parts = str.split("?");
    const line1 = (parts[0] + "?").trim();
    const rest = (parts.slice(1).join("?")).trim();
    const restParts = rest.split(" ");
    if (restParts.length >= 4) {
      const line2 = restParts.slice(0, 5).join(" ");
      const line3 = restParts.slice(5).join(" ");
      return { line1, line2, line3 };
    }
    return { line1, line2: rest, line3: "" };
  }
  return { line1: str, line2: "", line3: "" };
};

const Newsletter = ({ content, cmsContent }) => {
  const { openQuote } = useQuote();
  const rawData = { ...defaultNewsletter, ...(content || {}) };
  const rawTitle =
    rawData.title ||
    `${rawData.titleLine1 || ""}\n${rawData.titleLine2 || ""}\n${rawData.titleLine3 || ""}`.trim();

  const title = getCmsVal(cmsContent, rawTitle, "newsletter");
  const buttonText = getCmsVal(cmsContent, rawData.buttonText, "newsletter");
  const { line1, line2, line3 } = formatNewsletterTitle(title);

  return (
    <div className="w-full flex justify-center py-8">
      <div
        className="w-full md:w-[950px] h-[80px] md:h-[150px] flex rounded-[30px] overflow-hidden"
        style={{
          boxShadow: "0px 9px 21px 0px rgba(58,155,65,0.68)",
        }}
      >
        <div className="flex-[3] bg-[#43b949] flex items-center px-6 md:mx-auto lg:pl-24">
          <h2 className="text-white text-center text-[14px] md:text-[27px] font-[700] leading-[1.15]" style={{ fontFamily: "Montserrat, sans-serif" }}>
            <span className="text-[#232323]">
              {line1}
            </span>
            {line2 && <br className="" />}
            {line2 && (
              <span className="text-center tracking-tight">
                {line2}
                {line3 && <br />}
                {line3 && <span>{line3}</span>}
              </span>
            )}
          </h2>
        </div>
        <div onClick={openQuote} className="flex-[1] bg-[#232323] flex items-center justify-center cursor-pointer">
          <button className="text-white text-[12px] md:text-[20px] font-semibold flex items-center gap-3 group cursor-pointer">
            <span>{buttonText}</span>
            <span className="bg-white rounded-full w-5 text-[14px] text-center flex items-center justify-center h-5 cursor-pointer">
              <FaArrowRight className="text-black" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
