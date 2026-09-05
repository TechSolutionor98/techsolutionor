"use client";
import React from 'react';
import LaravelShowcase from '@/components/Images/laravel-showcase.jpg';
import WhyChoose from '@/components/WhyChoose/WhyChoose';

const Framework = () => {
  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest="Laravel Framework?"
      image={LaravelShowcase}
      imageAlt="Laravel Development Showcase"
      imageFit="cover"
      paragraphs={[
        <>
          <strong className="font-bold text-[#111827]">Built for modern engineering</strong>, Laravel is an elegant, robust PHP framework designed for developing secure, high-performance web applications.
        </>,
        <>
          With its expressive syntax and rich built-in toolkit, Laravel simplifies complex operations like{" "}
          <strong className="font-bold text-[#111827]">routing, authentication, caching, and database management</strong>.
        </>,
        <>
          Development teams move faster.{" "}
          <strong className="font-bold text-[#111827]">You deliver scalable, enterprise-grade digital platforms with confidence.</strong>
        </>
      ]}
    />
  );
};

export default Framework;
