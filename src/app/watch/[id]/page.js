import { getAnimeResponse } from "@/libs/api-libs";
import Link from "next/link";

// --- 1. BAGIAN JUDUL TAB DINAMIS ---
export async function generateMetadata({ params }) {
  const { id } = await params;
  // Fetch data episode untuk ambil judulnya
  const data = await getAnimeResponse(`episode/${id}`, "");

  if (data) {
    // Ambil judul episode, biasanya di properti 'episode' atau 'title'
    const title = data.episode || data.title || "Nonton Anime";
    return {
      title: `${title} - AuroNime`,
    };
  }

  return {
    title: "Nonton Anime - AuroNime",
  };
}

// --- 2. BAGIAN HALAMAN NONTON (Main Component) ---
export default async function Page({ params }) {
  const { id } = await params;
  const data = await getAnimeResponse(`episode/${id}`, "");

  // Validasi
  if (!data) {
    return (
      <div className="text-white text-center p-10">Video tidak ditemukan.</div>
    );
  }

  // Logic Video (DesuStream)
  const videoUrl = data.stream_url || data.url || data.iframe || "";

  return (
    <div className="text-white min-h-screen pb-10">
      {/* Header / Navigasi Balik */}
      <div className="container mx-auto px-4 py-4">
        <Link
          href="/"
          className="text-yellow-400 hover:underline flex items-center gap-2 mb-4"
        >
          &larr; Kembali ke Home
        </Link>
        <h1 className="text-xl md:text-2xl font-bold mb-4">
          {data.episode || data.title}
        </h1>
      </div>

      {/* VIDEO PLAYER */}
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
            <div className="flex items-center justify-center h-full text-red-500 flex-col gap-2">
              <p>⚠️ Maaf, link stream belum tersedia.</p>
            </div>
          )}
        </div>

        {/* Info Tambahan & Navigasi Next/Prev */}
        <div className="mt-6 p-4 bg-gray-800 rounded text-sm text-gray-300">
          <p className="mb-4">
            <strong>Status Server:</strong> Stream diambil dari{" "}
            <em>DesuStream</em>.
          </p>

          <div className="flex gap-4 flex-wrap">
            {data.has_previous_episode && (
              <Link
                href={`/watch/${data.previous_episode?.slug}`}
                className="bg-gray-700 px-4 py-2 rounded hover:bg-yellow-600 hover:text-black transition"
              >
                &laquo; Eps Sebelumnya
              </Link>
            )}
            {data.has_next_episode && (
              <Link
                href={`/watch/${data.next_episode?.slug}`}
                className="bg-gray-700 px-4 py-2 rounded hover:bg-yellow-600 hover:text-black transition"
              >
                Eps Selanjutnya &raquo;
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
