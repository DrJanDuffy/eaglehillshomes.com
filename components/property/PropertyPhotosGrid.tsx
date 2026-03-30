import Image from "next/image";
import type { PropertyGalleryItem } from "@/lib/property-template";

export type PropertyPhotosGridProps = {
  title: string;
  items: readonly PropertyGalleryItem[];
};

export function PropertyPhotosGrid({ title, items }: PropertyPhotosGridProps) {
  const cells = items.slice(0, 6);

  return (
    <section className="mt-14" aria-labelledby="property-photos-heading">
      <h2 id="property-photos-heading" className="text-2xl font-semibold text-slate-900">
        {title}
      </h2>
      <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        {cells.map((item, index) => (
          <li
            key={`${item.src}-${index}`}
            className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="aspect-[4/3] h-auto w-full object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 50vw, 33vw"
              unoptimized={item.src.endsWith(".svg")}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
