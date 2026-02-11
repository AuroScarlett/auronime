export const getAnimeResponse = async (resource, query) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fullUrl = query
    ? `${baseUrl}/${resource}?${query}`
    : `${baseUrl}/${resource}`;

  try {
    const response = await fetch(fullUrl);

    if (!response.ok) {
      console.error(`❌ API Error ${response.status}: ${fullUrl}`);
      return null;
    }

    const text = await response.text();

    try {
      const payload = JSON.parse(text);

      return payload.data ? payload.data : payload;
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
