import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const nunitoSans = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeighBorrow",
  description: "NeighBorrow - borrow items you need, we have it all!",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en' className={`${nunitoSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
