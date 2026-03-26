import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { QuoteHashScroll } from "@/components/QuoteHashScroll";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://freshpressedshirts.com"),
  title: {
    default: "Custom T-Shirts Miami | FreshPressedShirts.com",
    template: `%s | ${site.domain}`,
  },
  description:
    "Custom t-shirt printing in Miami with fast turnaround, bulk pricing, and design help for businesses, events, and brands.",
  openGraph: {
    title: "Custom T-Shirts Miami | FreshPressedShirts.com",
    description:
      "Miami custom shirt printing, bulk orders, and graphic design—fast quotes, local studio quality.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans">
        <Navbar />
        <QuoteHashScroll />
        {children}
        <Footer />
        <MobileStickyCTA />
        <ChatbotWidget />
      </body>
    </html>
  );
}
