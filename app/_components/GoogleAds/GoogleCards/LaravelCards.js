import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import { getCmsVal } from "@/lib/api-helper";

const googleKeyFeaturesDefault = [
  {
    title: "Targeted Advertising",
    desc: "Reach the most relevant audience with advanced targeting options, including location, demographics, interests, and device types to ensure your ads appear to the right users at the right time.",
  },
  {
    title: "Keyword Bidding",
    desc: "Control how your ads appear in Google Search by bidding on relevant keywords. This allows businesses to compete for top ad placements and attract high-intent, qualified traffic.",
  },
  {
    title: "Campaign Analytics",
    desc: "Monitor campaign performance with detailed analytics, including impressions, clicks, conversions, and cost metrics to continuously optimize campaigns and maximize ROI.",
  },
  {
    title: "Ad Formats",
    desc: "Utilize multiple ad formats such as search ads, display ads, video ads, and shopping ads to reach users across different stages of the customer journey.",
  },
];

const GoogleCards = ({ cmsContent }) => {
  const cards = googleKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "googlecards"),
    desc: getCmsVal(cmsContent, item.desc, "googlecards"),
  }));

  return <KeyFeatures title="NO RISK." subtitle="ONLY RESULTS." features={cards} />;
};

export default GoogleCards;
