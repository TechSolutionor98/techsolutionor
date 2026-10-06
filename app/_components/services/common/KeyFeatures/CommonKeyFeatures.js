import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import { servicesKeyFeaturesData } from "@/app/_data/servicesKeyFeaturesData";
import { getCmsVal } from "@/lib/api-helper";

/**
 * Reusable CommonKeyFeatures Component
 * Reuses the exact same 3-card table UI, design, styling, layout, animations,
 * spacing, typography, and card structure from <LaravelCards /> across all Service pages.
 *
 * @param {string} serviceKey - e.g. "web-development", "app-development", etc.
 * @param {string} title - Optional title override (defaults to service's title or "HOW WE HELP")
 * @param {string} subtitle - Optional subtitle override (defaults to service's subtitle or "YOU GET RESULTS.")
 * @param {string} badge - Optional badge override (defaults to "NO RISK ARCHITECTURE")
 * @param {Array} columns - Optional metric columns array
 * @param {Array} features - Optional 3-card feature array override
 */
export default function CommonKeyFeatures({
  cmsContent,
  serviceKey = "web-development",
  title,
  subtitle,
  badge,
  columns = ["Speed", "Flexible", "Quality", "Scalable", "Cost-Effective"],
  features,
}) {
  const serviceConfig = servicesKeyFeaturesData[serviceKey] || servicesKeyFeaturesData["web-development"];
  const rawBadge = badge || serviceConfig?.badge || "NO RISK ARCHITECTURE";
  const rawTitle = title || serviceConfig?.title || "HOW WE HELP";
  const rawSubtitle = subtitle || serviceConfig?.subtitle || "YOU GET RESULTS.";
  const displayFeatures = features || serviceConfig?.features || [];

  const displayBadge = getCmsVal(cmsContent, rawBadge, "keyfeatures");
  const displayTitle = getCmsVal(cmsContent, rawTitle, "keyfeatures");
  const displaySubtitle = getCmsVal(cmsContent, rawSubtitle, "keyfeatures");

  return (
    <KeyFeatures
      badge={displayBadge}
      title={displayTitle}
      subtitle={displaySubtitle}
      columns={columns}
      features={displayFeatures}
    />
  );
}
