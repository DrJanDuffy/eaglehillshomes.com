import Image from "next/image";
import type { PropertyGalleryItem } from "@/lib/property-template";

export type PropertyGalleryProps = {
  title: string;
  items: readonly PropertyGalleryItem[];
};

export function PropertyGallery({ title, items }: PropertyGalleryProps) {
  return (
    <section className="mt-14" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="text-2xl font-semibold text-slate-900">
        {title}
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li
            key={item.src}
            className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="h-auto w-full object-cover"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized={item.src.endsWith(".svg")}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
