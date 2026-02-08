import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Kita akan buat ini di langkah 2
import Footer from "@/components/Footer"; // Kita akan buat ini di langkah 2

// Mengambil font Inter dari Google
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AuroNime - Nonton Anime Sub Indo Gratis",
  template: "%s | AuroNime",
  description:
    "Platform streaming anime terbaik, tercepat, dan gratis dengan subtitle Indonesia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${inter.className} bg-gray-900 text-white min-h-screen flex flex-col`}
      >
        {/* Navbar akan muncul di SEMUA halaman */}
        <Navbar />

        {/* Bagian utama (konten) akan berubah-ubah sesuai halaman */}
        <main className="grow container mx-auto px-4 py-8">{children}</main>

        {/* Footer akan muncul di SEMUA halaman */}
        <Footer />
      </body>
    </html>
  );
}
