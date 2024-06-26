import type { Metadata, Viewport } from "next";
import { Onest as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import Header from "@/components/common/Header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Cleanway",
  description: "Application de nettoyage de ville",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["cleanway", "clean", "way", "ville", "city", "nettoyage"],
  authors: [
    { name: "Théo Truvelot" },
    { name: "Kévin Morainville" },
    { name: "Alan Courtois" },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "/icons/icon-512x512.png" },
    { rel: "icon", url: "/icons/icon-512x512.png" },
  ],
};

export const viewport: Viewport = {
  userScalable: false,
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="fr">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased touch-none",
          fontSans.variable
        )}
      >
        <SessionProvider session={session}>
        <Header />
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}
