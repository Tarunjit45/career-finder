import type { Metadata, Viewport } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Compass — Calm Career Navigation',
  description:
    'You don’t have to know what you want to become. Let’s figure out what’s next through calm, step-by-step career discovery.',
  keywords: ['career navigation', 'career finder', 'career discovery', 'students', 'career switch'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#FAFAF8] text-brand-dark antialiased selection:bg-brand-primary/15 selection:text-brand-primary">
        <Navigation />
        <main className="flex-1 flex flex-col justify-start items-center w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
