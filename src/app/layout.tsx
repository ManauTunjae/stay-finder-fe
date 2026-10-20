import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StayFinder",
  description: "Hitta och boka boenden",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sv"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Suspense fallback={<div className="h-16 bg-blue-200/50" />}>
            <Header />
          </Suspense>

          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />

          <Suspense fallback={null}>
            <BottomNav />
          </Suspense>

          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
