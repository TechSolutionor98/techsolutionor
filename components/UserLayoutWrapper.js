'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/src/Components/Navbar/Navbar';
import SideIcons from '@/app/_components/SideIcons';
import ScrollToTopButton from '@/app/_components/ScrollToTopButton';
import Footer from '@/src/Components/Footer/Footer';
import { QuoteProvider } from '@/app/_context/QuoteContext';
import GetQuoteForm from '@/app/_components/GetQuoteForm';

export default function UserLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = Boolean(pathname && pathname.startsWith('/admin'));

  return (
    <QuoteProvider>
      {!isAdmin && <Navbar />}
      {!isAdmin && <SideIcons />}
      {!isAdmin && <ScrollToTopButton />}
      <main>{children}</main>
      {!isAdmin && <GetQuoteForm />}
      {!isAdmin && <Footer />}
    </QuoteProvider>
  );
}
