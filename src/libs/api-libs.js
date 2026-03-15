export const getAnimeResponse = async (resource, query) => {
  const baseUrl = "https://otakudesuscrapperapi.my.id/api";

  const route = resource === "home" ? "" : resource;

  const fullUrl = query
    ? `${baseUrl}/${route}?${query}`
    : route
      ? `${baseUrl}/${route}`
      : baseUrl;

  try {
    const response = await fetch(fullUrl);

    if (!response.ok) {
      console.error(`❌ API Error ${response.status}: ${fullUrl}`);
      return null;
    }

    const text = await response.text();

    try {
      const payload = JSON.parse(text);

      // Kembalikan seluruh payload (jangan dipotong) agar AnimeList bisa membaca struktur barunya
      return payload;
    } catch (jsonError) {
      console.error(
        "⚠️ API tidak mengirim JSON (Mungkin Maintenance):",
        text.substring(0, 50),
      );
      return null;
    }
  } catch (error) {
    console.error("⛔ Network Error:", error);
    return null;
  }
};
