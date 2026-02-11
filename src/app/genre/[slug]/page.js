import { getAnimeResponse } from "@/libs/api-libs";
import AnimeList from "@/components/AnimeList";
import Navbar from "@/components/Navbar";

export default async function Page({ params }) {
  const { slug } = await params;

  const data = await getAnimeResponse(`genre/${slug}`, "");

  const animeList = data?.anime || [];
  const formattedData = { data: animeList };

  const title = slug.toUpperCase();

  return (
    <>
      <section className="py-8 px-4">
        <div className="flex items-center gap-4 mb-6">
          <a
            href="/"
            className="text-yellow-400 hover:text-yellow-200 font-bold text-xl no-underline"
          >
            &larr;
          </a>

          <h1 className="text-2xl font-bold text-yellow-400">
            Kategori: <span className="text-white">{title}</span>
          </h1>
        </div>

        {animeList.length > 0 ? (
          <AnimeList api={formattedData} />
        ) : (
          <div className="text-center text-white py-10">
            <p>Maaf, anime untuk genre ini belum tersedia.</p>
          </div>
        )}
      </section>
    </>
  );
}
