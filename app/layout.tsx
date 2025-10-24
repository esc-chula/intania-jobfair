import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import {
  Nunito,
  Manrope,
  IBM_Plex_Sans_Thai_Looped,
  Anuphan,
  Inter,
} from "next/font/google";

/* === 1. Font Setup === */
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-head-en",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body-en",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body-en-2",
  display: "swap",
});

const plexThai = IBM_Plex_Sans_Thai_Looped({
  subsets: ["thai"],
  weight: ["500", "600"],
  variable: "--font-head-th",
  display: "swap",
});

const anuphan = Anuphan({
  subsets: ["latin", "thai"],
  weight: ["400"],
  variable: "--font-body-th",
  display: "swap",
});

/* === 2. Metadata === */
export const metadata: Metadata = {
  title: "Intania Jobfair",
  description: "Intania Jobfair 2025 Website",
};

/* === 3. Root Layout === */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body
        className={`
          ${nunito.variable}
          ${manrope.variable}
          ${plexThai.variable}
          ${anuphan.variable}
          ${inter.variable}
          antialiased
          bg-background text-foreground
        `}
      >
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
