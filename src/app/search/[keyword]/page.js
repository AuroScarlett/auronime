import { getAnimeResponse } from "@/libs/api-libs";
import AnimeList from "@/components/AnimeList";
import Link from "next/link";

export default async function Page({ params }) {
  const { keyword } = await params;

  const decodedKeyword = decodeURI(keyword);

  const searchAnime = await getAnimeResponse("anime", `q=${keyword}`);

  return (
    <>
      <section className="py-8 px-4 min-h-screen">
        <div className="flex flex-col items-center mb-8">
          <Link
            href="/"
            className="text-yellow-400 hover:underline mb-4 text-sm"
          >
            &larr; Kembali ke Home
          </Link>
          <h1 className="text-2xl text-white font-bold text-center">
            Hasil Pencarian:{" "}
            <span className="text-yellow-400 capitalize">{decodedKeyword}</span>
          </h1>
        </div>

        {!searchAnime ? (
          <div className="text-center py-10 px-4 bg-gray-800/50 mx-auto max-w-lg rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-2">
              Waduh! Pencarian Gagal.
            </h3>
            <p className="text-gray-400 text-sm">
              Server sedang sibuk memproses pencarian. Silakan coba lagi nanti.
            </p>
          </div>
        ) : (
          <AnimeList api={searchAnime} />
        )}
      </section>
    </>
  );
}
