import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/navbar/page";
import Footer from "@/components/global/footer/page";
import StoreLayout from "@/components/global/storeLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  keywords: ["Todo", "Next.js", "React", "App"],
  description: "A simple Todo app built with Next.js",
  authors: [{ name: "Sravan" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreLayout>
        <Navbar />
        <main style={{minHeight:'calc(100vh - 230px)'}}>
        {children}
        </main>
        <Footer />
        </StoreLayout>
        
      </body>
    </html>
  );
}
