import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested is not on this site.",
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">
        That URL doesn’t exist on this site. Head back to the homepage for Eagle Hills listings and contact
        options.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex rounded-md bg-[#0e64c8] px-4 py-2 text-sm font-medium text-white hover:bg-[#0c549e]"
        >
          Back to home
        </Link>
        <Link
          href="/#contact"
          className="inline-flex rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
        >
          Office map &amp; contact
        </Link>
      </div>
    </main>
  );
}
