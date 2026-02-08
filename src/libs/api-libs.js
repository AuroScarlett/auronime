export const getAnimeResponse = async (resource, query) => {
  // Ambil URL dasar dari env
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Gabungkan URL
  const fullUrl = query
    ? `${baseUrl}/${resource}?${query}`
    : `${baseUrl}/${resource}`;

  try {
    const response = await fetch(fullUrl);

    // 1. Cek Status Server (Apakah 200 OK?)
    // Jika server error (404 atau 500), stop di sini.
    if (!response.ok) {
      console.error(`❌ API Error ${response.status}: ${fullUrl}`);
      return null;
    }

    // 2. Ambil text mentah dulu (jangan langsung .json())
    // Ini untuk mencegah error "<!DOCTYPE..." jika server kirim HTML
    const text = await response.text();

    try {
      // Coba ubah text menjadi JSON
      const payload = JSON.parse(text);

      // Berhasil! Kembalikan datanya.
      // API Natee kadang membungkus dalam "data", kita buka bungkusnya
      return payload.data ? payload.data : payload;
    } catch (jsonError) {
      // Jika gagal parse JSON (berarti server kirim HTML error page)
      console.error(
        "⚠️ API tidak mengirim JSON (Mungkin Maintenance):",
        text.substring(0, 50),
      );
      return null;
    }
  } catch (error) {
    // Jika koneksi internet mati atau URL salah total
    console.error("⛔ Network Error:", error);
    return null;
  }
};
