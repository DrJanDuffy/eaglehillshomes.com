import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site-contact";

export const defaultMetadataBase = new URL(SITE_URL);

export const rootTitleTemplate = `%s | ${SITE_NAME}`;

function buildGoogleSiteVerification(): Metadata["verification"] | undefined {
  const token = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  if (!token) return undefined;
  return { google: token };
}

const verification = buildGoogleSiteVerification();

export const rootMetadata: Metadata = {
  metadataBase: defaultMetadataBase,
  title: {
    default: `${SITE_NAME} | Luxury Summerlin Community`,
    template: rootTitleTemplate,
  },
  description:
    "Eagle Hills Real Estate in Summerlin, Las Vegas: guard-gated custom homes in The Hills South village. Search homes for sale and get representation by Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
  keywords: [
    "Eagle Hills Homes",
    "Eagle Hills real estate",
    "Eagle Hills Summerlin",
    "The Hills South Summerlin",
    "Summerlin luxury homes",
    "guard-gated Summerlin",
    "Las Vegas luxury homes",
  ],
  ...(verification ? { verification } : {}),
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
      "Eagle Hills Summerlin real estate: homes for sale and local guidance in The Hills South village.",
  },
  robots: {
    index: true,
    follow: true,
  },
};
