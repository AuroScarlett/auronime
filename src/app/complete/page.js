import AnimeList from "@/components/AnimeList";
import { getAnimeResponse } from "@/libs/api-libs";
import Link from "next/link";

export const metadata = {
  title: "Anime Tamat (Completed) - AuroNime",
};

export default async function Page() {
  const completeAnime = await getAnimeResponse("complete/1", "");

  return (
    <section className="py-12 px-4 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/"
          className="text-yellow-400 hover:text-yellow-200 font-bold text-xl no-underline"
        >
          &larr; Kembali
        </Link>
        <h1 className="text-3xl font-bold text-white">
          Anime <span className="text-yellow-400">Tamat (Completed)</span>
        </h1>
      </div>

      {!completeAnime ? (
        <div className="text-center py-10 px-4 bg-gray-800/50 mx-4 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-2">
            Waduh! Server API sedang sibuk.
          </h3>
          <p className="text-gray-400 text-sm">
            Gagal memuat daftar anime tamat. Silakan coba refresh beberapa saat
            lagi.
          </p>
        </div>
      ) : (
        <AnimeList api={completeAnime} />
      )}
    </section>
  );
}
