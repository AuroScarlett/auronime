import { getAnimeResponse } from "@/libs/api-libs";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const response = await getAnimeResponse(`episode/${id}`, "");

  if (response && response.data) {
    const title =
      response.data.title || response.data.episode || "Nonton Anime";
    return {
      title: `${title} - AuroNime`,
    };
  }

  return {
    title: "Nonton Anime - AuroNime",
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const response = await getAnimeResponse(`episode/${id}`, "");

  if (!response || !response.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white text-center p-10">
        <h2 className="text-2xl font-bold mb-4">Video tidak ditemukan.</h2>
        <Link
          href="/"
          className="bg-yellow-500 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-400 transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const data = response.data;

  let videoUrl = data.stream_url || data.iframe || data.url || "";

  if (
    !videoUrl &&
    data.stream &&
    Array.isArray(data.stream) &&
    data.stream.length > 0
  ) {
    videoUrl = data.stream[0].iframe || data.stream[0].link || "";
  }

  const getSlugFromLink = (linkUrl) => {
    if (!linkUrl) return null;
    const parts = linkUrl.split("/").filter(Boolean);
    return parts[parts.length - 1];
  };

  const prevSlug = data.prev_episode_link
    ? getSlugFromLink(data.prev_episode_link)
    : null;
  const nextSlug = data.next_episode_link
    ? getSlugFromLink(data.next_episode_link)
    : null;

  return (
    <div className="text-white min-h-screen pb-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <Link
            href="/"
            className="text-yellow-400 hover:text-yellow-200 font-bold transition flex items-center gap-2"
          >
            &larr; Beranda
          </Link>

          {data.anime_link && (
            <Link
              href={`/anime/${getSlugFromLink(data.anime_link)}`}
              className="bg-gray-800 border border-gray-600 px-4 py-2 rounded hover:bg-gray-700 transition text-sm text-center"
            >
              Daftar Episode
            </Link>
          )}
        </div>

        <h1 className="text-xl md:text-2xl font-bold mb-6 text-yellow-400 border-b border-gray-800 pb-4">
          {data.title || data.episode}
        </h1>
      </div>

      <div className="container mx-auto px-4">
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
          {videoUrl ? (
            <iframe
              src={videoUrl}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="Video Player"
              referrerPolicy="origin"
            ></iframe>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 flex-col gap-3 bg-gray-900">
              <span className="text-4xl">⚠️</span>
              <p>Maaf, link stream video belum tersedia dari server sumber.</p>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-gray-800/50 border border-gray-800 rounded-lg">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex-1">
              {prevSlug ? (
                <Link
                  href={`/watch/${prevSlug}`}
                  className="inline-block bg-gray-700 px-4 py-2 rounded font-bold hover:bg-yellow-500 hover:text-black transition"
                >
                  &laquo; Eps Sebelumnya
                </Link>
              ) : (
                <span className="inline-block px-4 py-2 text-gray-600 text-sm italic">
                  Tidak ada eps sebelumnya
                </span>
              )}
            </div>

            <div className="flex-1 text-right">
              {nextSlug ? (
                <Link
                  href={`/watch/${nextSlug}`}
                  className="inline-block bg-gray-700 px-4 py-2 rounded font-bold hover:bg-yellow-500 hover:text-black transition"
                >
                  Eps Selanjutnya &raquo;
                </Link>
              ) : (
                <span className="inline-block px-4 py-2 text-gray-600 text-sm italic">
                  Belum ada eps selanjutnya
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
