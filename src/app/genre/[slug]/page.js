import { getAnimeResponse } from "@/libs/api-libs";
import AnimeList from "@/components/AnimeList";
import Navbar from "@/components/Navbar"; // Pastikan import Navbar jika ingin tetap ada header

export default async function Page({ params }) {
  // 1. Ambil slug (nama genre) dari URL
  const { slug } = await params;

  // 2. Fetch data dari API (Endpoint: genre/{slug})
  const data = await getAnimeResponse(`genre/${slug}`, "");

  // 3. Normalisasi Data
  // Berdasarkan screenshot Anda, data anime dibungkus dalam properti "anime"
  // Kita ubah formatnya biar bisa dibaca oleh komponen AnimeList
  const animeList = data?.anime || [];
  const formattedData = { data: animeList };

  // Judul Genre (Ubah slug jadi Huruf Kapital, misal: "action" -> "ACTION")
  const title = slug.toUpperCase();

  return (
    <>
      <section className="py-8 px-4">
        <div className="flex items-center gap-4 mb-6">
          {/* Tombol Back Sederhana */}
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

        {/* Tampilkan List Anime */}
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
