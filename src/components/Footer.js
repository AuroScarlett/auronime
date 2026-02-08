const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-6 mt-auto text-center text-sm">
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-yellow-400 font-bold">AuroNime</span>. All rights
        reserved.
      </p>
      <p className="mt-1 text-xs">
        Website ini dibuat untuk tujuan pembelajaran (Educational Purpose).
      </p>
    </footer>
  );
};

export default Footer;
