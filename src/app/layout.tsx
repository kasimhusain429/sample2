import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Priva International | Exclusive Vintage Kantha & Bed Covers",
  description: "Manufacturing, supplying and exporting a huge assortment of Vintage Kantha, Cushion Cover, Bed Throw, Designer Bedspread, Block Printed Bed Covers, and more from Jaipur, Rajasthan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-primary/20">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

