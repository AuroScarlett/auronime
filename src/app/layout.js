import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AuroNime - Nonton Anime Sub Indo Gratis",
  template: "%s | AuroNime",
  description:
    "Platform streaming anime terbaik, tercepat, dan gratis dengan subtitle Indonesia.",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${inter.className} bg-gray-900 text-white min-h-screen flex flex-col`}
      >
        <Navbar />

        <main className="grow container mx-auto px-4 py-8">{children}</main>

        <Footer />

        <Analytics />
      </body>
    </html>
  );
}
