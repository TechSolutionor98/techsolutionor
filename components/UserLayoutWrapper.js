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
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <QuoteProvider>
      <Navbar />
      <SideIcons />
      <ScrollToTopButton />
      <main>{children}</main>
      <GetQuoteForm />
      <Footer />
    </QuoteProvider>
  );
}
