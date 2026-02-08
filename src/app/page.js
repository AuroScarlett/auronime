import AnimeList from "@/components/AnimeList";
import InputSearch from "@/components/InputSearch";
import { getAnimeResponse } from "@/libs/api-libs";
import Image from "next/image"; // Pastikan import Image ada

export default async function Page() {
  const topAnime = await getAnimeResponse("home", "");

  return (
    <>
      <section className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-6">
        {/* --- BAGIAN JUDUL BARU --- */}
        {/* Flex container untuk mensejajarkan Teks - Gambar - Teks */}
        <h1 className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-4xl md:text-6xl font-extrabold text-white">
          {/* Bagian 1: Teks Kiri */}
          <span>Nonton di</span>

          {/* Bagian 2: Gambar Tengah */}
          <Image
            src="/icon.png"
            width={65}
            height={65}
            alt="AuroNime Logo"
            className="drop-shadow-lg object-contain animate-pulse" // Bonus: animate-bounce biar logonya loncat-loncat lucu
          />

          {/* Bagian 3: Teks Kanan */}
          <span className="text-yellow-400">AuroNime</span>
        </h1>
        {/* ------------------------- */}

        <div className="w-full max-w-lg">
          <InputSearch />
        </div>
      </section>

      <section className="py-8">
        <div className="flex justify-between items-center px-4 mb-4">
          <h2 className="text-2xl font-bold text-yellow-400 border-l-4 border-yellow-400 pl-3">
            Sedang Tayang (Ongoing)
          </h2>
        </div>

        {/* Render List Anime */}
        <AnimeList api={topAnime} />

        {/* Pesan Kaki (Footer kecil sebagai ganti Pagination) */}
        <div className="text-center text-gray-500 mt-10 mb-6 px-4">
          <p>Ingin cari anime lain?</p>
          <p className="text-sm">
            Gunakan fitur <strong>Pencarian</strong> di atas untuk menemukan
            anime favoritmu.
          </p>
        </div>
      </section>
    </>
  );
}
