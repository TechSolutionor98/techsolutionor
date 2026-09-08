import React from 'react';
import Banner from '@/app/_components/services/eCommerce-developement/Banner/eCommerceDevBanner';
import Framework from '@/app/_components/services/eCommerce-developement/Framework/Framework';
import ECommerceServices from '@/app/_components/services/eCommerce-developement/E-CommerceServices/ECommerceServices';
import B2B from '@/app/_components/services/eCommerce-developement/B2B/B2B';
import B2C from '@/app/_components/services/eCommerce-developement/B2C/B2C';
import SliderIcon from '@/app/_components/services/eCommerce-developement/SliderIcon/SliderIcon';
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook';
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose';
import HireUs from '@/app/_components/services/eCommerce-developement/HireUs/HireUs';
import EcommerceFAQ from '@/app/_components/services/eCommerce-developement/FAQ/EcommerceFAQ';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/services/ecommerce-development', {
    title: 'E-commerce Development Services | Tech Solutioner',
    description: 'Scalable and secure e-commerce web and mobile app development services tailored for your business.',
  });
}

export default function EcommerceDevelopmentPage() {
  return (
    <div>
      <Banner />
      <CommonWhyChoose serviceKey="ecommerce-development" />
      <Framework />
      <ECommerceServices />
      <B2B />
      <B2C />
      <SliderIcon />
      <TechnologiesBook serviceKey="ecommerce-development" />
      <HireUs />
      <EcommerceFAQ />
    </div>
  );
}
