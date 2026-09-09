import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import { servicesKeyFeaturesData } from "@/app/_data/servicesKeyFeaturesData";

/**
 * Reusable CommonKeyFeatures Component
 * Reuses the exact same 3-card table UI, design, styling, layout, animations,
 * spacing, typography, and card structure from <LaravelCards /> across all Service pages.
 *
 * @param {string} serviceKey - e.g. "web-development", "app-development", etc.
 * @param {string} title - Optional title override (defaults to service's title or "HOW WE HELP")
 * @param {string} subtitle - Optional subtitle override (defaults to service's subtitle or "YOU GET RESULTS.")
 * @param {Array} columns - Optional metric columns array
 * @param {Array} features - Optional 3-card feature array override
 */
export default function CommonKeyFeatures({
  serviceKey = "web-development",
  title,
  subtitle,
  columns = ["Speed", "Flexible", "Quality", "Scalable", "Cost-Effective"],
  features,
}) {
  const serviceConfig = servicesKeyFeaturesData[serviceKey] || servicesKeyFeaturesData["web-development"];
  const displayTitle = title || serviceConfig?.title || "HOW WE HELP";
  const displaySubtitle = subtitle || serviceConfig?.subtitle || "YOU GET RESULTS.";
  const displayFeatures = features || serviceConfig?.features || [];

  return (
    <KeyFeatures
      title={displayTitle}
      subtitle={displaySubtitle}
      columns={columns}
      features={displayFeatures}
    />
  );
}
