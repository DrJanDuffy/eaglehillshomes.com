import type { Metadata } from "next";
import { PropertyFloorPlan } from "@/components/property/PropertyFloorPlan";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyHero } from "@/components/property/PropertyHero";
import { PropertyNeighborhood } from "@/components/property/PropertyNeighborhood";
import { PropertyPhotosGrid } from "@/components/property/PropertyPhotosGrid";
import { JsonLd } from "@/components/seo/json-ld";
import {
  absolutePropertyImageUrl,
  getPropertyMedia,
} from "@/lib/cloudflare-images";
import {
  EAGLE_HILLS_COMMUNITY_DESCRIPTION,
  EAGLE_HILLS_LISTING_STATS,
  EAGLE_HILLS_TAGLINE,
  formatUsd,
} from "@/lib/eagle-hills-community";
import { FEATURED_PROPERTY } from "@/lib/property-template";
import {
  AGENT_NAME,
  BROKERAGE,
  OFFICE_ADDRESS_SINGLE_LINE,
  SERVICE_AREA_PRIMARY,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-contact";
import { getFaqContent, getHomePageJsonLdWithListing } from "@/lib/schema";

const REALSCOUT_OFFICE_LISTINGS_HTML =
  '<realscout-office-listings agent-encoded-id="QWdlbnQtMjI1MDUw" sort-order="PRICE_HIGH" listing-status="For Sale" property-types=",SFR" price-min="1000000" price-max="20000000"></realscout-office-listings>';

const OFFICE_MAP_EMBED_SRC =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(OFFICE_ADDRESS_SINGLE_LINE) +
  "&output=embed";

/** Read Cloudflare + listing env from Vercel on each request (Project → Settings → Environment Variables). */
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const media = await getPropertyMedia();
  const ogImageUrl = absolutePropertyImageUrl(media.heroImage.src, SITE_URL);

  const title = `${FEATURED_PROPERTY.headline} | ${SITE_NAME}`;
  const description = `Featured Summerlin listing in ${FEATURED_PROPERTY.addressLine}. ${FEATURED_PROPERTY.priceDisplay} · ${FEATURED_PROPERTY.beds} bed · ${FEATURED_PROPERTY.baths} bath · ${FEATURED_PROPERTY.livingSqft.toLocaleString("en-US")} sq ft. Tour and details with ${AGENT_NAME} (${BROKERAGE}).`;

  return {
    title,
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      type: "website",
      siteName: SITE_NAME,
      images: [
        {
          url: ogImageUrl,
          width: media.heroImage.width,
          height: media.heroImage.height,
          alt: media.heroImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function HomePage() {
  const media = await getPropertyMedia();
  const faqItems = getFaqContent();
  const stats = EAGLE_HILLS_LISTING_STATS;
  const listing = FEATURED_PROPERTY;

  const primaryImageUrl = absolutePropertyImageUrl(media.heroImage.src, SITE_URL);

  const jsonLd = getHomePageJsonLdWithListing({
    slug: listing.slug,
    headline: listing.headline,
    priceValue: listing.priceValue,
    schemaStreetAddress: listing.schemaStreetAddress,
    schemaPostalCode: listing.schemaPostalCode,
    beds: listing.beds,
    baths: listing.baths,
    livingSqft: listing.livingSqft,
    primaryImageUrl,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <PropertyHero
          tagline={EAGLE_HILLS_TAGLINE}
          headline={listing.headline}
          addressLine={listing.addressLine}
          priceDisplay={listing.priceDisplay}
          beds={listing.beds}
          baths={listing.baths}
          livingSqft={listing.livingSqft}
          lotAcres={listing.lotAcres}
          heroImage={media.heroImage}
        />

        <section className="mt-10 max-w-3xl">
          <h2 className="sr-only">About the community</h2>
          <p className="text-lg leading-relaxed text-slate-600">{EAGLE_HILLS_COMMUNITY_DESCRIPTION}</p>
          <p className="mt-4 text-lg text-slate-600">
            Explore <strong className="font-semibold text-slate-800">{SITE_NAME}</strong> across{" "}
            {SERVICE_AREA_PRIMARY}—use the home search below for similar inventory, or call{" "}
            {AGENT_NAME} for a private tour of this home.
          </p>
        </section>

        <PropertyPhotosGrid title="Property photos" items={media.propertyPhotos} />

        <section
          className="mt-12 rounded-xl border border-slate-200 bg-slate-50/80 p-6 md:p-8"
          id="stats"
          aria-labelledby="stats-heading"
        >
          <h2 id="stats-heading" className="text-xl font-semibold text-slate-900">
            Eagle Hills listing stats
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Snapshot of active listings in this band; figures change as homes sell and new listings
            hit the market. Confirm price and status on a specific property with your agent.
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <dt className="text-sm font-medium text-slate-500">Total listings</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">
                {stats.totalListings}
              </dd>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <dt className="text-sm font-medium text-slate-500">Average price</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">
                {formatUsd(stats.averagePrice)}
              </dd>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <dt className="text-sm font-medium text-slate-500">Highest listing price</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">
                {formatUsd(stats.highestPrice)}
              </dd>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <dt className="text-sm font-medium text-slate-500">Lowest listing price</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">
                {formatUsd(stats.lowestPrice)}
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-12" id="listings" aria-labelledby="listings-heading">
          <h2 id="listings-heading" className="text-2xl font-semibold text-slate-900">
            More Eagle Hills homes for sale
          </h2>
          <div className="mt-6 w-full">
            <div dangerouslySetInnerHTML={{ __html: REALSCOUT_OFFICE_LISTINGS_HTML }} />
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Listing information comes from participating brokers and may not show every home on the
            market. Details are not guaranteed—confirm square footage, taxes, HOA fees, and status
            with your agent. Equal Housing Opportunity. Brokerage: {BROKERAGE}.
          </p>
        </section>

        <PropertyGallery title="Gallery" items={media.gallery} />

        <PropertyFloorPlan
          title="Floor plan"
          imageSrc={media.floorPlan.imageSrc}
          alt={media.floorPlan.alt}
          width={listing.floorPlan.width}
          height={listing.floorPlan.height}
          pdfHref={media.floorPlan.pdfHref}
        />

        <PropertyNeighborhood
          title={listing.neighborhood.title}
          body={listing.neighborhood.body}
          mapEmbedSrc={listing.neighborhood.mapEmbedSrc}
          mapTitle="Eagle Hills and Summerlin area map"
        />

        <section className="mt-14" id="about-eagle-hills" aria-labelledby="geo-heading">
          <h2 id="geo-heading" className="text-2xl font-semibold text-slate-900">
            Eagle Hills in Summerlin—location &amp; what to verify
          </h2>
          <p className="mt-3 text-slate-600">
            Eagle Hills is guard-gated and sits in <strong>The Hills South</strong> village within
            master-planned <strong>Summerlin</strong>, Las Vegas. Schools, HOA budgets, and
            architectural guidelines can vary by phase—confirm material facts for the specific
            address you like, not just the neighborhood name.
          </p>
        </section>

        <section className="mt-14" id="contact" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-2xl font-semibold text-slate-900">
            Office map &amp; directions
          </h2>
          <p className="mt-3 text-slate-600">
            Planning a private tour or listing consultation? Start with the map, then use the call,
            directions, and reviews buttons in the site footer—NAP matches what we publish in
            structured data for consistency across search and maps.
          </p>
          <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 shadow-sm">
            <iframe
              title="Office location map"
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={OFFICE_MAP_EMBED_SRC}
            />
          </div>
        </section>

        <section className="mt-14" id="faq" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-semibold text-slate-900">
            Eagle Hills Homes FAQ
          </h2>
          <dl className="mt-6 space-y-8">
            {faqItems.map((item) => (
              <div key={item.question}>
                <dt className="text-lg font-semibold text-slate-900">{item.question}</dt>
                <dd className="mt-2 text-slate-600">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </>
  );
}
