import Image from "next/image";

export type PropertyHeroProps = {
  tagline: string;
  headline: string;
  addressLine: string;
  priceDisplay: string;
  beds: number;
  baths: number;
  livingSqft: number;
  lotAcres: number;
  heroImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export function PropertyHero({
  tagline,
  headline,
  addressLine,
  priceDisplay,
  beds,
  baths,
  livingSqft,
  lotAcres,
  heroImage,
}: PropertyHeroProps) {
  return (
    <section
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      aria-labelledby="property-hero-heading"
    >
      <div className="relative aspect-[21/11] w-full max-h-[min(70vh,520px)] bg-slate-100">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          width={heroImage.width}
          height={heroImage.height}
          className="h-full w-full object-cover"
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          unoptimized={heroImage.src.endsWith(".svg")}
        />
      </div>
      <div className="p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#0e64c8]">{tagline}</p>
        <h1 id="property-hero-heading" className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">
          {headline}
        </h1>
        <p className="mt-2 text-lg text-slate-600">{addressLine}</p>
        <p className="mt-4 text-2xl font-semibold text-slate-900 md:text-3xl">{priceDisplay}</p>
        <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <dt className="text-sm font-medium text-slate-500">Beds</dt>
            <dd className="text-lg font-semibold text-slate-900">{beds}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">Baths</dt>
            <dd className="text-lg font-semibold text-slate-900">{baths}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">Sq ft</dt>
            <dd className="text-lg font-semibold text-slate-900">{livingSqft.toLocaleString("en-US")}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">Lot</dt>
            <dd className="text-lg font-semibold text-slate-900">{lotAcres} ac</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
