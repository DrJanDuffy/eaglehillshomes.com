import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site-contact";

export const defaultMetadataBase = new URL(SITE_URL);

export const rootTitleTemplate = `%s | ${SITE_NAME}`;

export const rootMetadata: Metadata = {
  metadataBase: defaultMetadataBase,
  title: {
    default: `${SITE_NAME} | Luxury Summerlin Community`,
    template: rootTitleTemplate,
  },
  description:
    "Eagle Hills Real Estate in Summerlin, Las Vegas: guard-gated custom homes in The Hills South village. MLS search and representation by Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Luxury Summerlin Community`,
    description:
      "Guard-gated Eagle Hills in Summerlin—custom homes, listing search, and local real estate guidance in Las Vegas.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Luxury Summerlin Community`,
    description:
      "Eagle Hills Summerlin real estate: MLS-backed listings and local guidance in The Hills South village.",
  },
  robots: {
    index: true,
    follow: true,
  },
};
