import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Nunito } from "next/font/google";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { auth } from "@/auth";

const nunitoSans = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeighBorrow",
  description: "NeighBorrow - borrow items you need, we have it all!",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <html lang='en' className={`${nunitoSans.variable} antialiased`}>
      <SessionProvider session={session}>
        <body>
          {children}
          <Toaster position='top-center' className='text-foreground!' />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
