'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/src/Components/Navbar/Navbar';
import SideIcons from '@/app/_components/SideIcons';
import ScrollToTopButton from '@/app/_components/ScrollToTopButton';
import Footer from '@/src/Components/Footer/Footer';
import MobileBottomNav from '@/app/_components/MobileBottomNav';
import { QuoteProvider } from '@/app/_context/QuoteContext';
import { LanguageProvider } from '@/app/_context/LanguageContext';
import GetQuoteForm from '@/app/_components/GetQuoteForm';
import GetInTouch from '@/app/_components/Home/GetInTouch/GetInTouch';

export default function UserLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = Boolean(pathname && pathname.startsWith('/admin'));
  const isWAMarketing = Boolean(pathname && (pathname.startsWith('/wamarketing-tool') || pathname.startsWith('/wamarketingtool')));
  const hideGlobalLayout = isAdmin || isWAMarketing;

  return (
    <LanguageProvider>
      <QuoteProvider>
        {!hideGlobalLayout && <Navbar />}
        {!hideGlobalLayout && <SideIcons />}
        {!hideGlobalLayout && <ScrollToTopButton />}
        <main>{children}</main>
        {!isAdmin && <GetQuoteForm />}
        {!hideGlobalLayout && <GetInTouch />}
        {!hideGlobalLayout && <Footer />}
        {!hideGlobalLayout && <MobileBottomNav />}
      </QuoteProvider>
    </LanguageProvider>
  );
}
