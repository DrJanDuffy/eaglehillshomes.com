import Image from "next/image";

export type PropertyFloorPlanProps = {
  title: string;
  imageSrc: string;
  alt: string;
  width: number;
  height: number;
  pdfHref: string | null;
};

export function PropertyFloorPlan({
  title,
  imageSrc,
  alt,
  width,
  height,
  pdfHref,
}: PropertyFloorPlanProps) {
  return (
    <section className="mt-14" aria-labelledby="floorplan-heading">
      <h2 id="floorplan-heading" className="text-2xl font-semibold text-slate-900">
        {title}
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Dimensions and room labels are illustrative—verify against the title report, HOA documents,
        and appraiser measurements before relying on them.
      </p>
      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className="mx-auto h-auto w-full max-w-4xl object-contain"
          loading="lazy"
          sizes="(max-width: 896px) 100vw, 896px"
          unoptimized={imageSrc.endsWith(".svg")}
        />
      </div>
      {pdfHref ? (
        <p className="mt-4">
          <a
            className="font-medium text-[#0e64c8] underline hover:text-[#0c549e]"
            href={pdfHref}
            rel="noopener noreferrer"
            target="_blank"
          >
            Download floor plan PDF
          </a>
        </p>
      ) : null}
    </section>
  );
}
