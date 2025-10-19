import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const IBMFont = IBM_Plex_Sans_Thai({
  subsets: ["latin", "thai"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Intania Jobfair",
  description: "Intania Jobfair 2025 Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${IBMFont.className} antialiased`}>
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
