import { getAnimeResponse } from "@/libs/api-libs";
import AnimeList from "@/components/AnimeList";
import Link from "next/link";

export default async function Page({ params }) {
  const { keyword } = await params;

  const decodedKeyword = decodeURI(keyword);

  const searchAnime = await getAnimeResponse(`search/${keyword}`, "");

  return (
    <>
      <section className="py-8 px-4">
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

        <AnimeList api={searchAnime} />
      </section>
    </>
  );
}
