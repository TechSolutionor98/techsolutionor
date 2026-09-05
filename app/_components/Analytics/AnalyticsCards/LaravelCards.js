import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import { getCmsVal } from "@/lib/api-helper";

const analyticsKeyFeaturesDefault = [
  {
    title: "Real-Time Data Tracking",
    desc: "Monitor visitor activity instantly with real-time analytics, helping businesses respond quickly to traffic trends and website performance.",
  },
  {
    title: "Audience Insights",
    desc: "Gain detailed demographic, geographic, and behavioral data to understand your audience’s preferences and optimize engagement strategies.",
  },
  {
    title: "Conversion Tracking",
    desc: "Track key metrics such as goals, conversions, and e-commerce transactions to measure ROI and business success.",
  },
  {
    title: "Custom Reporting",
    desc: "Create custom reports highlighting the metrics that matter most to your business objectives.",
  },
];

const AnalyticsCards = ({ cmsContent }) => {
  const cards = analyticsKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "analyticscards"),
    desc: getCmsVal(cmsContent, item.desc, "analyticscards"),
  }));

  return <KeyFeatures title="NO RISK." subtitle="ONLY RESULTS." features={cards} />;
};

export default AnalyticsCards;
