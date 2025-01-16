import { Suspense } from 'react';

import type { Metadata } from 'next';

import Header from '@/components/Header';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Lottusse',
  description: 'Lottusse E-commerce',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <Suspense>
          <Header />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
