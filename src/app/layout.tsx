import Header from '@/components/Header';
import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import type { ReactNode } from 'react'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shopify store',
  description: 'Shopify + Next.js 13',
}

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children } : RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <Banner />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
};

export default RootLayout;
