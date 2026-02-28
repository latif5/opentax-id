import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Leaf } from 'lucide-react';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', style: ['normal', 'italic'] });

export const metadata: Metadata = {
  title: 'PajakKu | Perbandingan Pajak Pribadi & Badan',
  description: 'Hitung perbandingan beban pajak secara jujur, efisien, dan menenangkan.',
  keywords: ['Pajak', 'Kalkulator Pajak', 'Pajak Pribadi', 'Pajak Badan', 'PTKP', 'PPh 21', 'Pajak Indonesia'],
  authors: [{ name: 'OpenTaxation ID' }],
  openGraph: {
    title: 'PajakKu | Perbandingan Pajak Pribadi & Badan',
    description: 'Hitung perbandingan beban pajak secara jujur, efisien, dan menenangkan.',
    url: 'https://opentaxation.id',
    siteName: 'PajakKu',
    images: [
      {
        url: '/thumbnail.jpeg',
        width: 1200,
        height: 630,
        alt: 'PajakKu Preview',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PajakKu | Perbandingan Pajak Pribadi & Badan',
    description: 'Hitung perbandingan beban pajak secara jujur, efisien, dan menenangkan.',
    images: ['/thumbnail.jpeg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className={`font-sans bg-sand-50 text-brand-800 antialiased selection:bg-brand-200 selection:text-brand-900 min-h-screen flex flex-col`} suppressHydrationWarning>
        <header className="sticky top-0 w-full z-50 glass-panel border-b border-brand-200">
          <div className="max-w-6xl h-20 flex items-center justify-between mx-auto px-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 group-hover:bg-brand-200 transition-colors">
                 <Leaf className="w-4 h-4" />
              </div>
              <span className="font-serif text-lg tracking-tight text-brand-900 font-medium group-hover:text-brand-800 transition-colors">
                Kalkulator PajakKu
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-brand-700">
              <Link href="/calculator" className="hover:text-brand-900 transition-colors">
                Kalkulator
              </Link>
              <Link href="/calendar" className="hover:text-brand-900 transition-colors">
                Kalender Edukasi
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>
        
        <footer className="bg-brand-900 text-brand-300 py-16 mt-24">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-sm">Membangun pemahaman perpajakan yang lebih tenang & jelas di Indonesia.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
