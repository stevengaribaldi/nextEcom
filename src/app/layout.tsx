import { Inter } from 'next/font/google';
import './globals.css';
import { cn, constructMetadata } from '@/lib/utils';
import NarbarServer from '@/components/NarbarServer';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn('relative h-full font-sans antialiased', inter.className)}
      >
        <main className="relative flex flex-col min-h-screen bg-custom-black">
          <Providers>
            <NarbarServer />
            <div className="flex-grow flex-1">{children}</div>
            <Footer />
          </Providers>
        </main>
      </body>
    </html>
  );
}
