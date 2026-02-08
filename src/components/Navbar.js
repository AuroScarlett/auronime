import Link from "next/link";
import InputSearch from "./InputSearch";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="bg-gray-900 p-4 shadow-lg sticky top-0 z-50">
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icon.png"
            width={40}
            height={40}
            alt="AuroNime Logo"
            className="object-contain"
          />
          <span className="font-bold text-white text-2xl">
            Auro
            <span className="text-yellow-400 hover:text-yellow-300 transition-colors">
              Nime
            </span>
          </span>
        </Link>

        <InputSearch />
      </div>
    </header>
  );
};

export default Navbar;
