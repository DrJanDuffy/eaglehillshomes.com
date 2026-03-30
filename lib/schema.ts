import {
  AGENT_NAME,
  BROKERAGE,
  BUSINESS_HOURS_CUSTOMER_COPY,
  EMAIL,
  getAgentSameAsUrls,
  LICENSE_ID,
  PHONE_DISPLAY,
  PHONE_E164,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-contact";
import { EAGLE_HILLS_HOME_COUNT } from "@/lib/eagle-hills-community";

const BROKERAGE_SITE_URL = "https://www.bhhsnv.com/";

const faqPairs: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: "What is Eagle Hills Homes?",
    answer:
      `Eagle Hills Homes is this site’s focus on Eagle Hills in Summerlin, Las Vegas—a guard-gated enclave of about ${EAGLE_HILLS_HOME_COUNT} custom homes in The Hills South village—plus a live home search on this site and representation by ${AGENT_NAME} at ${BROKERAGE}.`,
  },
  {
    question: "Where is Eagle Hills in the Las Vegas area?",
    answer:
      "Eagle Hills sits in The Hills South village inside the master-planned Summerlin community in Las Vegas, Nevada. It is a guard-gated neighborhood known for custom-built homes and landscaped streetscapes. Always confirm HOA rules, schools, and lot-specific details for the address you are considering.",
  },
  {
    question: "What is the phone number for Eagle Hills real estate?",
    answer:
      `Call ${AGENT_NAME} at ${PHONE_DISPLAY}—the same number shown in the site footer. Keep this aligned with your Google Business Profile so clients see one consistent phone on the web and on Maps.`,
  },
  {
    question: "What are your business hours?",
    answer: `${BUSINESS_HOURS_CUSTOMER_COPY} If you are comparing hours on Google Maps, they should match what you see here—update your Google Business Profile if your team changes availability.`,
  },
  {
    question: "How do I search Eagle Hills homes for sale?",
    answer:
      "Use the home search on this page to filter by price, status, and property type. For private tours, off-market options, or a curated short list inside Eagle Hills and nearby Summerlin villages, call or email using the contact block.",
  },
  {
    question: "Who represents buyers and sellers for Eagle Hills listings?",
    answer:
      `${AGENT_NAME} (${LICENSE_ID}) with ${BROKERAGE} provides buyer and seller representation for Summerlin and Las Vegas Valley homes, including Eagle Hills. Reach out by phone or email for showings, pricing strategy, and contract guidance.`,
  },
  {
    question: "Are listing details guaranteed?",
    answer:
      "Information from listing brokers and public records is deemed reliable but should be independently verified. Square footage, taxes, HOA fees, and status can change. Your agent should confirm material facts before you rely on them in a purchase or sale.",
  },
];

export function getHomeJsonLd(): Record<string, unknown> {
  const faqEntities = faqPairs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

  const sameAs = getAgentSameAsUrls();

  const officePostalAddress = {
    "@type": "PostalAddress",
    streetAddress: "8850 W. Sunset Blvd, Suite 200",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89148",
    addressCountry: "US",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_URL}/#office` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: "Eagle Hills Real Estate | Luxury Summerlin Community",
        description:
          "Eagle Hills in Summerlin, Las Vegas: guard-gated custom homes in The Hills South village, online home search, and buyer/seller representation.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#agent` },
        mainEntity: { "@id": `${SITE_URL}/#faq` },
        breadcrumb: { "@id": `${SITE_URL}/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        url: `${SITE_URL}/`,
        mainEntity: faqEntities,
      },
      {
        "@type": "RealEstateBroker",
        "@id": `${SITE_URL}/#brokerage`,
        name: BROKERAGE,
        url: BROKERAGE_SITE_URL,
      },
      {
        "@type": "RealEstateOffice",
        "@id": `${SITE_URL}/#office`,
        name: BROKERAGE,
        url: SITE_URL,
        telephone: PHONE_E164,
        email: EMAIL,
        sameAs,
        openingHours: BUSINESS_HOURS_CUSTOMER_COPY,
        address: officePostalAddress,
        parentOrganization: { "@id": `${SITE_URL}/#brokerage` },
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${SITE_URL}/#agent`,
        name: AGENT_NAME,
        identifier: LICENSE_ID,
        telephone: PHONE_E164,
        email: EMAIL,
        url: SITE_URL,
        sameAs,
        jobTitle: "REALTOR®",
        worksFor: { "@id": `${SITE_URL}/#brokerage` },
        workLocation: { "@id": `${SITE_URL}/#office` },
        openingHours: BUSINESS_HOURS_CUSTOMER_COPY,
        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: "Nevada",
          },
          {
            "@type": "City",
            name: "Las Vegas",
            containedInPlace: { "@type": "State", name: "Nevada" },
          },
          {
            "@type": "Place",
            name: "Summerlin, Las Vegas, Nevada",
            containedInPlace: {
              "@type": "City",
              name: "Las Vegas",
              containedInPlace: { "@type": "State", name: "Nevada" },
            },
          },
        ],
        knowsAbout: [
          "Eagle Hills Summerlin",
          "The Hills South village",
          "Guard-gated luxury homes Las Vegas",
        ],
        address: officePostalAddress,
      },
    ],
  };
}

export function getFaqContent(): ReadonlyArray<{ question: string; answer: string }> {
  return faqPairs;
}

export type FeaturedListingForSchema = {
  slug: string;
  headline: string;
  priceValue: number;
  schemaStreetAddress: string;
  schemaPostalCode: string;
  beds: number;
  baths: number;
  livingSqft: number;
  /** Absolute URL for the primary listing photo (Thing `image`) */
  primaryImageUrl: string;
};

/**
 * Homepage graph: agent, FAQ, brokerage, plus featured `RealEstateListing` + `SingleFamilyResidence`.
 */
export function getHomePageJsonLdWithListing(listing: FeaturedListingForSchema): Record<string, unknown> {
  const base = getHomeJsonLd();
  const graph = [...(base["@graph"] as Record<string, unknown>[])];
  const residenceId = `${SITE_URL}/#residence-${listing.slug}`;
  const listingId = `${SITE_URL}/#listing-${listing.slug}`;

  const wpIdx = graph.findIndex((n) => n["@type"] === "WebPage");
  if (wpIdx >= 0) {
    graph[wpIdx] = {
      ...graph[wpIdx],
      name: `${listing.headline} | ${SITE_NAME}`,
      description: `Featured listing in Summerlin, Las Vegas: ${listing.headline}. Price, photos, floor plan, and neighborhood context with ${AGENT_NAME}.`,
      about: [{ "@id": `${SITE_URL}/#agent` }, { "@id": listingId }],
    };
  }

  graph.push(
    {
      "@type": "SingleFamilyResidence",
      "@id": residenceId,
      name: listing.headline,
      image: listing.primaryImageUrl,
      numberOfBedrooms: listing.beds,
      numberOfBathroomsTotal: listing.baths,
      floorSize: {
        "@type": "QuantitativeValue",
        value: listing.livingSqft,
        unitCode: "FTK",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: listing.schemaStreetAddress,
        addressLocality: "Las Vegas",
        addressRegion: "NV",
        postalCode: listing.schemaPostalCode,
        addressCountry: "US",
      },
    },
    {
      "@type": "RealEstateListing",
      "@id": listingId,
      name: listing.headline,
      url: SITE_URL,
      image: listing.primaryImageUrl,
      itemOffered: { "@id": residenceId },
      offers: {
        "@type": "Offer",
        price: listing.priceValue,
        priceCurrency: "USD",
        availability: "https://schema.org/ForSale",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: listing.schemaStreetAddress,
        addressLocality: "Las Vegas",
        addressRegion: "NV",
        postalCode: listing.schemaPostalCode,
        addressCountry: "US",
      },
      broker: { "@id": `${SITE_URL}/#agent` },
    },
  );

  return {
    ...base,
    "@graph": graph,
  };
}
