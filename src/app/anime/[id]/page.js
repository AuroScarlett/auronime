import { getAnimeResponse } from "@/libs/api-libs";
import Link from "next/link";

// --- 1. FUNGSI UNTUK MENGUBAH JUDUL TAB BROWSER ---
export async function generateMetadata({ params }) {
  const { id } = await params;
  const anime = await getAnimeResponse(`anime/${id}`, "");

  if (anime) {
    return {
      title: `${anime.title} - AuroNime`,
    };
  }
  return {
    title: "AuroNime",
  };
}

// --- 2. KOMPONEN HALAMAN UTAMA ---
export default async function Page({ params }) {
  const { id } = await params;
  const anime = await getAnimeResponse(`anime/${id}`, "");

  if (!anime) {
    return (
      <div className="text-white text-center p-10">Data tidak ditemukan.</div>
    );
  }

  // Logic Episode List (sesuai perbaikan sebelumnya)
  const episodes = anime.episode_lists || anime.episode_list || [];

  return (
    <div className="text-white min-h-screen pb-10">
      <div className="relative">
        <div className="absolute inset-0 bg-gray-900 opacity-80"></div>

        <div className="container mx-auto px-4 py-8 relative z-10 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center">
            <img
              src={anime.poster || anime.thumb}
              alt={anime.title}
              className="w-64 md:w-full rounded-lg shadow-2xl border border-gray-700"
            />
          </div>

          <div className="w-full md:w-2/3">
            <h1 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-2">
              {anime.title}
            </h1>
            <p className="text-gray-400 text-sm mb-4">{anime.japanese_title}</p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-6">
              <span className="bg-gray-800 px-3 py-1 rounded border border-gray-600">
                ⭐ {anime.rating || anime.score || "-"}
              </span>
              <span className="bg-gray-800 px-3 py-1 rounded border border-gray-600">
                {anime.status}
              </span>
              <span className="bg-gray-800 px-3 py-1 rounded border border-gray-600">
                {anime.produser || anime.studio || "-"}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2 border-b border-gray-700 inline-block pb-1">
              Sinopsis
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base text-justify">
              {anime.synopsis}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <h3 className="text-2xl font-bold mb-4 text-yellow-400">
          Daftar Episode ({episodes.length})
        </h3>

        {episodes.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {episodes.map((eps, index) => {
              let epsId = eps.slug || eps.endpoint || eps.id;
              if (epsId && epsId.includes("/episode/")) {
                epsId = epsId.split("/episode/")[1];
              }
              if (epsId) epsId = epsId.replace(/\//g, "");

              return (
                <Link
                  href={`/watch/${epsId}`}
                  key={index}
                  className="bg-gray-800 p-3 rounded hover:bg-yellow-500 hover:text-black transition text-center text-sm border border-gray-700 truncate"
                >
                  Episode {eps.episode_number}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-gray-500 italic">
            Belum ada episode yang tersedia.
          </div>
        )}
      </div>
    </div>
  );
}
