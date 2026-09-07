"use client";

import React from "react";
import TechnologiesBook from "@/app/_components/services/common/TechnologiesBook/TechnologiesBook";

/**
 * Backwards-compatible wrapper for Web Development Technologies section.
 * Delegates to the unified reusable TechnologiesBook component with serviceKey="web-development".
 */
const TechnoligesWeUse = (props) => {
  return <TechnologiesBook serviceKey="web-development" {...props} />;
};

export default TechnoligesWeUse;
