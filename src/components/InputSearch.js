"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

const InputSearch = () => {
  const searchRef = useRef();
  const router = useRouter();

  const handleSearch = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();

      const keyword = searchRef.current.value;

      if (!keyword || keyword.trim() == "") return;

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
