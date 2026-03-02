import { getAnimeResponse } from "@/libs/api-libs";
import Link from "next/link";

export default async function Page() {
  const data = await getAnimeResponse("home", "");

  if (!data || !data.ongoing_anime) {
    return (
      <section className="py-12 px-4 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Waduh! Server API sedang sibuk.
        </h2>
        <p className="text-gray-400">
          Gagal memuat jadwal tayang. Silakan coba refresh beberapa saat lagi.
        </p>
        <Link
          href="/"
          className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-400 transition"
        >
          Kembali ke Beranda
        </Link>
      </section>
    );
  }

  const ongoingAnime = data.ongoing_anime || [];

  const daysOrder = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
    "Random",
  ];

  const schedule = {};

  daysOrder.forEach((day) => (schedule[day] = []));

  ongoingAnime.forEach((anime) => {
    if (anime.release_day && schedule[anime.release_day]) {
      schedule[anime.release_day].push(anime);
    } else {
      schedule["Random"].push(anime);
    }
  });

  return (
    <>
      <section className="py-12 px-4 min-h-screen">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="text-yellow-400 hover:text-yellow-200 font-bold text-xl no-underline"
          >
            &larr; Kembali
          </Link>
          <h1 className="text-3xl font-bold text-white">
            Jadwal <span className="text-yellow-400">Rilis Terbaru</span>
          </h1>
        </div>

        <div className="space-y-12">
          {daysOrder.map((day) => {
            const animeList = schedule[day];

            if (animeList.length === 0) return null;

            return (
              <div key={day} className="border-l-4 border-yellow-500 pl-4">
                <h2 className="text-2xl font-bold text-white mb-4 bg-gray-800 inline-block px-4 py-1 rounded-r-lg">
                  {day}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {animeList.map((anime, index) => (
                    <Link
                      key={index}
                      href={`/anime/${anime.slug}`}
                      className="group relative block overflow-hidden rounded-lg shadow-lg border border-gray-700"
                    >
                      <div className="relative w-full h-64 md:h-80">
                        <img
                          src={anime.poster}
                          alt={anime.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black via-black/80 to-transparent p-2">
                          <h3 className="text-white font-bold text-sm truncate">
                            {anime.title}
                          </h3>
                          <p className="text-yellow-400 text-xs">
                            {anime.current_episode}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
