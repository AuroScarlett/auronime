import { getAnimeResponse } from "@/libs/api-libs";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const response = await getAnimeResponse(`episode/${id}`, "");

  if (response && response.data) {
    const title = response.data.title || "Nonton Anime";
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

  // Cek validitas respons
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

  // Tangkap link video (di API ini ada di data.iframe)
  const videoUrl = data.iframe || data.stream_url || "";

  // Menangkap data navigasi
  const nav = data.navigation || {};
  const prevSlug = nav.previous?.slug;
  const nextSlug = nav.next?.slug;
  const animeSlug = nav.anime?.slug;

  // 👇 Tangkap data download 👇
  const downloads = data.downloads || [];

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

          {/* Tombol ke Semua Episode */}
          {animeSlug && (
            <Link
              href={`/anime/${animeSlug}`}
              className="bg-gray-800 border border-gray-600 px-4 py-2 rounded hover:bg-yellow-500 hover:text-black transition font-bold text-sm text-center shadow-lg"
            >
              Daftar Episode Lengkap
            </Link>
          )}
        </div>

        <h1 className="text-xl md:text-2xl font-bold mb-6 text-yellow-400 border-b border-gray-800 pb-4 leading-relaxed">
          {data.title}
        </h1>
      </div>

      <div className="container mx-auto px-4">
        {/* PLAYER VIDEO */}
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
              <p>Maaf, link stream video belum tersedia.</p>
            </div>
          )}
        </div>

        {/* NAVIGASI EPISODE */}
        <div className="mt-6 p-4 bg-gray-800/50 border border-gray-800 rounded-lg shadow-lg mb-8">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex-1">
              {prevSlug ? (
                <Link
                  href={`/watch/${prevSlug}`}
                  className="inline-block bg-gray-700 px-5 py-3 rounded-lg font-bold hover:bg-yellow-500 hover:text-black transition shadow"
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
                  className="inline-block bg-gray-700 px-5 py-3 rounded-lg font-bold hover:bg-yellow-500 hover:text-black transition shadow"
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

        {/* 👇 AREA DOWNLOAD BERSUSUN 👇 */}
        {downloads.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-4 md:p-6 mt-8">
            <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
              <span>📥</span> Link Download Episode
            </h3>

            <div className="flex flex-col gap-3">
              {downloads.map((dl, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center gap-3 bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-500 transition"
                >
                  <div className="min-w-30 flex items-baseline gap-2">
                    <span className="font-extrabold text-lg text-white">
                      {dl.quality}
                    </span>
                    <span className="text-xs text-gray-400 tracking-wide">
                      ({dl.size})
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {dl.providers.map((prov, idx) => (
                      <a
                        key={idx}
                        href={prov.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-yellow-500 hover:text-black text-white text-xs md:text-sm px-3 py-1.5 rounded transition font-medium"
                      >
                        {prov.provider}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4 italic">
              *Klik salah satu penyedia (provider) untuk mulai mengunduh. Jika
              link mati, silakan coba provider lain.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
