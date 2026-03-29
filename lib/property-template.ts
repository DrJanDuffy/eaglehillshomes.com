/**
 * Featured single-property template data. Replace with MLS-approved copy, photos, and price
 * before marketing a specific listing.
 */
export type PropertyGalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const FEATURED_PROPERTY = {
  slug: "featured-summerlin-estate",
  headline: "Eagle Hills Area Luxury Home",
  /** One line for UI; full street may be withheld until qualification—swap when approved. */
  addressLine: "The Hills South, Summerlin, Las Vegas, NV",
  schemaStreetAddress: "The Hills South, Summerlin",
  schemaPostalCode: "89135",
  priceDisplay: "$3,995,000",
  priceValue: 3_995_000,
  beds: 4,
  baths: 4.5,
  livingSqft: 5200,
  lotAcres: 0.44,
  heroImage: {
    src: "/images/property/hero.svg",
    alt: "Luxury home exterior in Summerlin Eagle Hills area, Las Vegas",
    width: 1200,
    height: 630,
  },
  gallery: [
    {
      src: "/images/property/gallery-01.svg",
      alt: "Open living space with views, Summerlin luxury home",
      width: 800,
      height: 600,
    },
    {
      src: "/images/property/gallery-02.svg",
      alt: "Chef kitchen with island, Summerlin luxury home",
      width: 800,
      height: 600,
    },
    {
      src: "/images/property/gallery-03.svg",
      alt: "Primary suite sitting area, Summerlin luxury home",
      width: 800,
      height: 600,
    },
  ] satisfies PropertyGalleryItem[],
  floorPlan: {
    imageSrc: "/images/property/floorplan.svg",
    alt: "Floor plan overview — confirm room count and dimensions with listing documents",
    width: 1000,
    height: 800,
    pdfHref: null as string | null,
  },
  neighborhood: {
    title: "Neighborhood: Eagle Hills & Summerlin",
    body:
      "This property sits in the guard-gated Eagle Hills enclave within The Hills South village of Summerlin—minutes from golf, trails, and retail. Schools, HOA fees, and lot lines vary by parcel; your agent should confirm anything material to your purchase decision.",
    mapEmbedSrc:
      "https://www.google.com/maps?q=" +
      encodeURIComponent("Eagle Hills Summerlin Las Vegas NV") +
      "&output=embed",
  },
} as const;
