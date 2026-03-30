export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12" aria-busy="true" aria-label="Loading page">
      <div className="animate-pulse space-y-6">
        <div className="h-12 max-w-md rounded-lg bg-slate-200" />
        <div className="aspect-[21/11] w-full max-h-[min(70vh,520px)] rounded-2xl bg-slate-200" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-[92%] rounded bg-slate-200" />
          <div className="h-4 w-4/5 rounded bg-slate-200" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] rounded-xl bg-slate-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
