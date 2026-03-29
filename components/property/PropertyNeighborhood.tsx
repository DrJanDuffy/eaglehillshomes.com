export type PropertyNeighborhoodProps = {
  title: string;
  body: string;
  mapEmbedSrc: string;
  mapTitle: string;
};

export function PropertyNeighborhood({
  title,
  body,
  mapEmbedSrc,
  mapTitle,
}: PropertyNeighborhoodProps) {
  return (
    <section className="mt-14" aria-labelledby="neighborhood-heading">
      <h2 id="neighborhood-heading" className="text-2xl font-semibold text-slate-900">
        {title}
      </h2>
      <p className="mt-3 max-w-3xl text-slate-600">{body}</p>
      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 shadow-sm">
        <iframe
          title={mapTitle}
          className="h-72 w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={mapEmbedSrc}
        />
      </div>
    </section>
  );
}
