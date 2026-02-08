"use client";

import { useRouter } from "next/navigation";

const Pagination = ({ page }) => {
  const router = useRouter();

  // Pastikan page dianggap angka
  const currentPage = Number(page) || 1;

  const handlePageChange = (newPage) => {
    // Pindah URL ke halaman baru
    router.push(`/?page=${newPage}`);

    // Scroll halus ke atas
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-center items-center py-8 px-2 gap-4 text-white text-xl">
      {/* Tombol PREV */}
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="transition-all hover:text-yellow-400 hover:underline"
        >
          &laquo; Sebelumnya
        </button>
      )}

      <p className="font-bold text-yellow-400">Halaman {currentPage}</p>

      {/* Tombol NEXT */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="transition-all hover:text-yellow-400 hover:underline"
      >
        Selanjutnya &raquo;
      </button>
    </div>
  );
};

export default Pagination;
