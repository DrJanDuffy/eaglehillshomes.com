"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center px-6 py-16">
      <div role="alert" aria-live="assertive" className="rounded-xl border border-red-200 bg-red-50/80 p-6">
        <h1 className="text-xl font-semibold text-slate-900">Something went wrong</h1>
        <p className="mt-2 text-slate-600">
          This page couldn’t load. You can try again, or return home from the footer.
        </p>
        {error.digest ? (
          <p className="mt-4 font-mono text-xs text-slate-500">Reference: {error.digest}</p>
        ) : null}
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 inline-flex rounded-md bg-[#0e64c8] px-4 py-2 text-sm font-medium text-white hover:bg-[#0c549e]"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
