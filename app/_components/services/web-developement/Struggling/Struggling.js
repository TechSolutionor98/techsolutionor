"use client";

import React from "react";
import CommonStruggling from "@/app/_components/services/common/Struggling/CommonStruggling";

/**
 * Web Development Struggling Component
 * Delegates to the unified reusable CommonStruggling component
 */
export default function Struggling(props) {
  return <CommonStruggling serviceKey="web-development" {...props} />;
}
