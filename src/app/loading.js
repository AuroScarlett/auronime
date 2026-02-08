const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex justify-center items-center gap-4 flex-col">
        {/* Animasi Spinner Sederhana dengan CSS Tailwind */}
        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-yellow-400 font-bold text-xl">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
