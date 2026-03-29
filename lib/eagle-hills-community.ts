/** Eagle Hills (Summerlin) — community copy and listing snapshot. Update stats when inventory changes. */

export const EAGLE_HILLS_HEADLINE = "Eagle Hills Real Estate";

export const EAGLE_HILLS_TAGLINE = "Luxury Summerlin Community";

/** Custom homes built in the neighborhood (community fact). */
export const EAGLE_HILLS_HOME_COUNT = 153;

/** Point-in-time active listing snapshot — refresh with MLS when marketing this block. */
export const EAGLE_HILLS_LISTING_STATS = {
  totalListings: 3,
  averagePrice: 3_750_000,
  highestPrice: 4_250_000,
  lowestPrice: 3_250_000,
} as const;

export const EAGLE_HILLS_COMMUNITY_DESCRIPTION =
  "Eagle Hills is a guard-gated community filled with custom homes located in The Hills South village, within the master-planned area of Summerlin, Las Vegas. There are 153 homes that have been custom built to specification in the beautifully landscaped neighborhood. Eagle Hills is considered one of the nicest communities of the Summerlin area and one of the most beautifully designed smaller communities in the Las Vegas area.";

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
