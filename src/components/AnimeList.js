import Link from "next/link";

const AnimeList = ({ api }) => {
  // 1. Guard Clause
  if (!api)
    return (
      <div className="text-center text-red-500 p-8">⚠️ Koneksi API Gagal</div>
    );

  // 2. DETEKSI FORMAT DATA
  const dataAnime =
    api.ongoing_anime || api.data?.ongoing_anime || api.data || api;

  // 3. Validasi Array
  if (!Array.isArray(dataAnime) || dataAnime.length === 0) {
    return (
      <div className="text-center text-yellow-500 p-8">
        Data tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
      {dataAnime.map((anime, index) => {
        // LOGIC ID:
        let id = anime.slug || anime.endpoint || anime.id;
        if (id && id.includes("/anime/")) id = id.split("/anime/")[1];

        // LOGIC GAMBAR:
        const image = anime.poster || anime.thumb || anime.image;

        // LOGIC LABEL (PERBAIKAN DISINI):
        // Prioritas: Episode -> Status -> Rating -> Tipe -> Tanda Tanya
        const info =
          anime.current_episode ||
          anime.episode ||
          anime.status ||
          (anime.rating ? `⭐ ${anime.rating}` : null) ||
          anime.type ||
          "?";

        return (
          <Link
            href={`/anime/${id}`}
            key={index}
            className="cursor-pointer text-white hover:text-yellow-400 transition-all group"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={image}
                alt={anime.title}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 w-full p-2 bg-linear-to-t from-black to-transparent">
                <span className="bg-yellow-400 text-gray-900 text-xs px-2 py-1 rounded font-bold truncate max-w-[90%] inline-block">
                  {info}
                </span>
              </div>
            </div>
            <h3 className="font-bold md:text-xl text-md mt-2 p-2 truncate">
              {anime.title}
            </h3>
          </Link>
        );
      })}
    </div>
  );
};

export default AnimeList;
