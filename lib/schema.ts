import {
  AGENT_NAME,
  AGENT_PROFILE_URL,
  BROKERAGE,
  EMAIL,
  LICENSE_ID,
  PHONE_E164,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-contact";
import { EAGLE_HILLS_HOME_COUNT } from "@/lib/eagle-hills-community";

const faqPairs: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: "What is Eagle Hills Homes?",
    answer:
      `Eagle Hills Homes is this site’s focus on Eagle Hills in Summerlin, Las Vegas—a guard-gated enclave of about ${EAGLE_HILLS_HOME_COUNT} custom homes in The Hills South village—plus MLS-backed search and representation by ${AGENT_NAME} at ${BROKERAGE}.`,
  },
  {
    question: "Where is Eagle Hills in the Las Vegas area?",
    answer:
      "Eagle Hills sits in The Hills South village inside the master-planned Summerlin community in Las Vegas, Nevada. It is a guard-gated neighborhood known for custom-built homes and landscaped streetscapes. Always confirm HOA rules, schools, and lot-specific details for the address you are considering.",
  },
  {
    question: "How do I search Eagle Hills homes for sale?",
    answer:
      "Use the MLS-backed listings widget on this page to filter by price, status, and property type. For private tours, off-market options, or a curated short list inside Eagle Hills and nearby Summerlin villages, call or email using the contact block.",
  },
  {
    question: "Who represents buyers and sellers for Eagle Hills listings?",
    answer:
      `${AGENT_NAME} (${LICENSE_ID}) with ${BROKERAGE} provides buyer and seller representation for Summerlin and Las Vegas Valley homes, including Eagle Hills. Reach out by phone or email for showings, pricing strategy, and contract guidance.`,
  },
  {
    question: "Are listing details guaranteed?",
    answer:
      "Information from MLS partners and third-party feeds is deemed reliable but should be independently verified. Square footage, taxes, HOA fees, and status can change. Your agent should confirm material facts before you rely on them in a purchase or sale.",
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

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_URL}/#agent` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: "Eagle Hills Real Estate | Luxury Summerlin Community",
        description:
          "Eagle Hills in Summerlin, Las Vegas: guard-gated custom homes in The Hills South village, MLS-backed search, and buyer/seller representation.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#agent` },
        mainEntity: { "@id": `${SITE_URL}/#faq` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        url: `${SITE_URL}/`,
        mainEntity: faqEntities,
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${SITE_URL}/#agent`,
        name: AGENT_NAME,
        identifier: LICENSE_ID,
        telephone: PHONE_E164,
        email: EMAIL,
        url: SITE_URL,
        sameAs: [AGENT_PROFILE_URL],
        jobTitle: "REALTOR®",
        worksFor: {
          "@type": "RealEstateBroker",
          name: BROKERAGE,
        },
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
        address: {
          "@type": "PostalAddress",
          streetAddress: "8850 W. Sunset Blvd, Suite 200",
          addressLocality: "Las Vegas",
          addressRegion: "NV",
          postalCode: "89148",
          addressCountry: "US",
        },
      },
    ],
  };
}

export function getFaqContent(): ReadonlyArray<{ question: string; answer: string }> {
  return faqPairs;
}
