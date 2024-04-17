import type { Metadata } from "next";
import { Onest as FontSans } from "next/font/google";
import "@/styles/globals.css";

import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Cleanway",
  description: "Cleanway's description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>{children}</body>
    </html>
  );
}
