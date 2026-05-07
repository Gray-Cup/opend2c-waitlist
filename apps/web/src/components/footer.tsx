import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-neutral-400">
        <p>© {new Date().getFullYear()} OpenD2C. All rights reserved.</p>
        <nav className="flex gap-5">
          <Link href="/terms" className="hover:text-neutral-700 transition-colors">
            Terms &amp; Conditions
          </Link>
        </nav>
      </div>
    </footer>
  );
}
