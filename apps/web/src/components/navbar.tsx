"use client";

import { useState } from "react";
import Link from "next/link";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-neutral-900">
              Open<span className="text-green-600">D2C</span>
            </span>
          </Link>

          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link
              href="/terms"
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Terms
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
