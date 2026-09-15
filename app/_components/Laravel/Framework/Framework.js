"use client";
import React from 'react';
import LaravelShowcase from '@/components/Images/laravel-showcase.jpg';
import WhyChoose from '@/components/WhyChoose/WhyChoose';
import { getCmsVal } from '@/lib/api-helper';

const Framework = ({ cmsContent }) => {
  const defaultImage = LaravelShowcase;
  const imageUrl = getCmsVal(cmsContent, defaultImage, "framework");

  const defaultP1 = "Built for modern engineering, Laravel is an elegant, robust PHP framework designed for developing secure, high-performance web applications.";
  const defaultP2 = "With its expressive syntax and rich built-in toolkit, Laravel simplifies complex operations like routing, authentication, caching, and database management.";
  const defaultP3 = "Development teams move faster. You deliver scalable, enterprise-grade digital platforms with confidence.";

  const p1 = getCmsVal(cmsContent, defaultP1, "framework");
  const p2 = getCmsVal(cmsContent, defaultP2, "framework");
  const p3 = getCmsVal(cmsContent, defaultP3, "framework");

  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest="Laravel Framework?"
      image={imageUrl}
      imageAlt="Laravel Development Showcase"
      imageFit="cover"
      paragraphs={[
        <span key="p1">{p1}</span>,
        <span key="p2">{p2}</span>,
        <span key="p3">{p3}</span>
      ]}
    />
  );
};

export default Framework;
