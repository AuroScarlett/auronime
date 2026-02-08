"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation"; // Gunakan next/navigation untuk App Router

const InputSearch = () => {
  const searchRef = useRef();
  const router = useRouter();

  const handleSearch = (event) => {
    // Mencegah refresh halaman jika tekan enter
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();

      const keyword = searchRef.current.value;

      // Validasi: Jangan search kalau kosong
      if (!keyword || keyword.trim() == "") return;

      // Arahkan ke halaman search (nanti kita buat halamannya)
      router.push(`/search/${keyword}`);
    }
  };

  return (
    <div className="relative">
      <input
        placeholder="Cari anime seru..."
        className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
        ref={searchRef}
        onKeyDown={handleSearch}
      />
      <button
        className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-3 py-1 rounded font-bold hover:bg-yellow-500 transition-all"
        onClick={handleSearch}
      >
        🔍
      </button>
    </div>
  );
};

export default InputSearch;
