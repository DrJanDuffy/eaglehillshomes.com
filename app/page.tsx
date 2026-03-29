import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import {
  EAGLE_HILLS_COMMUNITY_DESCRIPTION,
  EAGLE_HILLS_HEADLINE,
  EAGLE_HILLS_HOME_COUNT,
  EAGLE_HILLS_LISTING_STATS,
  EAGLE_HILLS_TAGLINE,
  formatUsd,
} from "@/lib/eagle-hills-community";
import {
  AGENT_NAME,
  BROKERAGE,
  OFFICE_ADDRESS_SINGLE_LINE,
  SERVICE_AREA_PRIMARY,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-contact";
import { getFaqContent, getHomeJsonLd } from "@/lib/schema";

const REALSCOUT_OFFICE_LISTINGS_HTML =
  '<realscout-office-listings agent-encoded-id="QWdlbnQtMjI1MDUw" sort-order="PRICE_HIGH" listing-status="For Sale" property-types=",SFR" price-min="1000000" price-max="20000000"></realscout-office-listings>';

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(OFFICE_ADDRESS_SINGLE_LINE) +
  "&output=embed";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Eagle Hills Real Estate | Luxury Summerlin Homes for Sale";
  const description = `Eagle Hills in Summerlin, Las Vegas: guard-gated custom homes in The Hills South village (${EAGLE_HILLS_HOME_COUNT} homes). Browse MLS listings, review current Eagle Hills listing stats, and connect with ${AGENT_NAME} (${BROKERAGE}).`;

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function HomePage() {
  const faqItems = getFaqContent();
  const stats = EAGLE_HILLS_LISTING_STATS;

  return (
    <>
      <JsonLd data={getHomeJsonLd()} />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#0e64c8]">
            {EAGLE_HILLS_TAGLINE}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {EAGLE_HILLS_HEADLINE}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {EAGLE_HILLS_COMMUNITY_DESCRIPTION}
          </p>
          <p className="mt-4 text-lg text-slate-600">
            Explore <strong className="font-semibold text-slate-800">{SITE_NAME}</strong> for{" "}
            {SERVICE_AREA_PRIMARY}—use the live MLS feed below, then call or email {AGENT_NAME} for
            showings, pricing strategy, and a curated short list.
          </p>
        </header>

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
            Eagle Hills homes for sale (MLS-backed search)
          </h2>
          <p className="mt-3 text-slate-600">
            Listings update from the MLS via RealScout. Filters below focus on single-family resales
            in a broad luxury band—ask {AGENT_NAME} to refine by village, views, lot size, and HOA
            inside Summerlin.
          </p>
          <div className="mt-6 w-full">
            <div dangerouslySetInnerHTML={{ __html: REALSCOUT_OFFICE_LISTINGS_HTML }} />
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Data is supplied by MLS partners and third-party sources. Not guaranteed—verify square
            footage, taxes, HOA fees, and status with your agent. Equal Housing Opportunity.
            Brokerage: {BROKERAGE}.
          </p>
        </section>

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
              src={MAP_EMBED_SRC}
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
