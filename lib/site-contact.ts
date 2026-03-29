/** Single source of NAP + entity facts. Update here first, then match visible copy and JSON-LD. */

export const SITE_NAME = "Eagle Hills Homes";

export const SITE_URL = "https://www.eaglehillshomes.com";

export const AGENT_NAME = "Dr. Jan Duffy";

export const LICENSE_ID = "S.0197614.LLC";

export const BROKERAGE = "Berkshire Hathaway HomeServices Nevada Properties";

/** Public office used for NAP; confirm against your Google Business Profile. */
export const PHONE_DISPLAY = "(702) 500-1955";

export const PHONE_E164 = "+17025001955";

export const EMAIL = "drduffy@bhhsnv.com";

export const OFFICE_ADDRESS_LINES = [
  "8850 W. Sunset Blvd, Suite 200",
  "Las Vegas, NV 89148",
] as const;

export const OFFICE_ADDRESS_SINGLE_LINE =
  "8850 W. Sunset Blvd, Suite 200, Las Vegas, NV 89148";

export const SERVICE_AREA_PRIMARY =
  "Summerlin and the greater Las Vegas Valley";

/** Google Maps search / place link for Directions (replace with exact GBP place URL when available). */
export const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(OFFICE_ADDRESS_SINGLE_LINE);

/** Profile link for entity sameAs + “Reviews” CTA (verify against live GBP). */
export const AGENT_PROFILE_URL =
  "https://www.bhhsnv.com/real-estate-agent/4986/dr-jan-duffy";

/** Opens Google Maps context for reviews; replace with your GBP review URL when available. */
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Dr. Jan Duffy Berkshire Hathaway HomeServices Las Vegas");
