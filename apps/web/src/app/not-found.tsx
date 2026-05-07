import Link from "next/link";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <p className="text-6xl font-bold text-neutral-200 mb-4">404</p>
          <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
            Page not found
          </h1>
          <p className="text-neutral-500 mb-8">
            This page doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="inline-block bg-neutral-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-neutral-700 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
