/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import Preloader from "@/components/main/Preloader";
import ScrollProgressBar from "@/components/main/ScrollProgressBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Space Portfolio",
  description: "This is my portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
      >
        <StarsCanvas />
        <Navbar />
        {/* overflow-x-clip stops anything inside from widening the page (and
            thus the fixed navbar) on mobile; overflow-x-hidden is the
            fallback for browsers without `clip` support. */}
        <div className="w-full overflow-x-hidden overflow-x-clip">
          <Preloader>{children}</Preloader>
          <Footer />
        </div>
        <ScrollProgressBar />
      </body>
    </html>
  );
}
