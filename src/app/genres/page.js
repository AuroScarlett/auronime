import { getAnimeResponse } from "@/libs/api-libs";
import Link from "next/link";

export default async function Page() {
  const response = await getAnimeResponse("genre", "");

  const genres = response || [];

  return (
    <>
      <section className="py-12 px-4">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="text-yellow-400 hover:text-yellow-200 font-bold text-xl no-underline"
          >
            &larr; Kembali
          </Link>
          <h1 className="text-3xl font-bold text-white">
            Pilih <span className="text-yellow-400">Genre</span> Favoritmu
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {genres.map((genre, index) => {
            return (
              <Link
                key={index}
                href={`/genre/${genre.slug}`}
                className="bg-gray-800 text-gray-200 hover:bg-yellow-400 hover:text-black transition-all p-4 rounded-lg text-center font-bold border border-gray-700 shadow-md group h-full flex items-center justify-center"
              >
                <span className="group-hover:scale-110 block transition-transform">
                  {genre.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
