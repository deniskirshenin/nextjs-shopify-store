import Header from '@/components/Header';
import './globals.css'
import type { Metadata } from 'next'
import { Prompt } from 'next/font/google'
import type { ReactNode } from 'react'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner';

const prompt = Prompt({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shopify store',
  description: 'Shopify + Next.js 13',
}

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children } : RootLayoutProps) => {
  return (
    <html lang="en" className='relative'>
      <body className={`${prompt.className} relative`}>
        <Banner />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
};

export default RootLayout;
