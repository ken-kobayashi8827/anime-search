import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/utils/chakra-ui/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'あにめさ～ち',
  description: 'あにめさ～ち',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
