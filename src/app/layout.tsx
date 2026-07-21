import type { Metadata } from 'next';
import { Quicksand, Playfair_Display } from 'next/font/google';
import { Inspector } from 'react-dev-inspector';
import Navbar from '@/components/cute/Navbar';
import './globals.css';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-quicksand',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: {
    default: 'Cute Text Studio',
    template: '%s | Cute Text Studio',
  },
  description:
    'Discover beautiful English art fonts, Unicode symbols, emoji combinations and decorative typography. Create your cute style.',
  keywords: [
    'cute text',
    'unicode art',
    'emoji combinations',
    'korean aesthetic',
    'japanese cute',
    'text decoration',
  ],
  authors: [{ name: 'Cute Text Studio' }],
  openGraph: {
    title: 'Cute Text Studio | Create your cute style',
    description:
      'Discover beautiful text art, Unicode symbols, and emoji combinations. Your digital diary of cute typography.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${playfair.variable}`}
    >
      <body className={`antialiased ${quicksand.className}`}>
        {isDev && <Inspector />}
        <Navbar />
        {children}
      </body>
    </html>
  );
}