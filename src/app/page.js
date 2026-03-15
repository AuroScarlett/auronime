import AnimeList from "@/components/AnimeList";
import InputSearch from "@/components/InputSearch";
import { getAnimeResponse } from "@/libs/api-libs";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const topAnime = await getAnimeResponse("home", "");

  return (
    <>
      <section className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-4xl md:text-6xl font-extrabold text-white">
          <span>Nonton di</span>

          <Image
            src="/icon.png"
            width={65}
            height={65}
            alt="AuroNime Logo"
            className="drop-shadow-lg object-contain animate-pulse"
          />

          <span className="text-yellow-400">AuroNime</span>
        </h1>

        <div className="w-full max-w-lg">
          <InputSearch />
        </div>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link
            href="/genres"
            className="bg-gray-800 border border-gray-600 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 text-white font-bold py-2 px-6 rounded-full transition-all flex items-center gap-2 shadow-lg"
          >
            📂 Lihat Semua Genre
          </Link>

          <Link
            href="/schedule"
            className="bg-gray-800 border border-gray-600 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 text-white font-bold py-2 px-6 rounded-full transition-all flex items-center gap-2 shadow-lg"
          >
            📅 Jadwal Tayang
          </Link>
        </div>
      </section>

      <section className="py-8">
        <div className="flex justify-between items-center px-4 mb-4">
          <h2 className="text-2xl font-bold text-yellow-400 border-l-4 border-yellow-400 pl-3">
            Sedang Tayang (Ongoing)
          </h2>
        </div>

        {!topAnime || !topAnime.ongoing || !topAnime.ongoing.data ? (
          <div className="text-center py-10 px-4 bg-gray-800/50 mx-4 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-2">
              Waduh! Server API sedang sibuk.
            </h3>
            <p className="text-gray-400 text-sm">
              Gagal memuat daftar anime. Silakan coba refresh beberapa saat
              lagi.
            </p>
          </div>
        ) : (
          <AnimeList api={topAnime} />
        )}

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
