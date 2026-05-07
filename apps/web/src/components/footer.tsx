export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-neutral-400">
        <p>OpenD2C by Gray Cup Enterprises Private Limited</p>
        <nav className="flex gap-5">
          <a href="/terms" className="hover:text-neutral-700 transition-colors">
            Terms &amp; Conditions
          </a>
        </nav>
      </div>
    </footer>
  );
}
