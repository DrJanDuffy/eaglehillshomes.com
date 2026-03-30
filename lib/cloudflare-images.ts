/**
 * Cloudflare Images: build delivery URLs and optionally list images via the Account API.
 * @see https://developers.cloudflare.com/api/resources/images/subresources/v1/methods/list/
 * @see https://developers.cloudflare.com/images/manage-images/serve-images/
 * @see https://developers.cloudflare.com/images/manage-images/serve-images/serve-private-images/
 *
 * Secrets stay server-only (`CLOUDFLARE_API_TOKEN` or `CLOUDFLARE_GLOBAL_API_TOKEN`, `CLOUDFLARE_IMAGES_SIGNING_KEY`). Configure in Vercel →
 * Environment Variables; the App Router page uses `dynamic = "force-dynamic"` so values are read per request.
 * Signing runs only on the server—never expose the signing key to the client.
 */
import { createHmac } from "node:crypto";
import { cache } from "react";
import type { PropertyGalleryItem } from "@/lib/property-template";
import { FEATURED_PROPERTY } from "@/lib/property-template";

const CF_API = "https://api.cloudflare.com/client/v4";

export type CfApiImage = {
  id: string;
  filename: string;
  uploaded: string;
};

export type ResolvedPropertyMedia = {
  heroImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Up to 6 thumbnails for the “Property photos” grid */
  propertyPhotos: PropertyGalleryItem[];
  /** Larger gallery row (e.g. 3 images) */
  gallery: PropertyGalleryItem[];
  floorPlan: {
    imageSrc: string;
    alt: string;
    width: number;
    height: number;
    pdfHref: string | null;
  };
  source: "cloudflare" | "fallback";
};

function getImageHash(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_CF_IMAGES_HASH?.trim() ||
    process.env.CF_IMAGES_HASH?.trim()
  );
}

function getVariant(): string {
  return process.env.CF_IMAGES_VARIANT?.trim() || "public";
}

function getSigningKey(): string | undefined {
  return process.env.CLOUDFLARE_IMAGES_SIGNING_KEY?.trim();
}

/** Prefer `CLOUDFLARE_API_TOKEN`; `CLOUDFLARE_GLOBAL_API_TOKEN` matches common Vercel fleet naming. */
function getCloudflareApiToken(): string | undefined {
  return (
    process.env.CLOUDFLARE_API_TOKEN?.trim() ||
    process.env.CLOUDFLARE_GLOBAL_API_TOKEN?.trim()
  );
}

/** Default 24h; align with caching if you change static generation later. */
function getSignedUrlTtlSeconds(): number {
  const raw = process.env.CF_IMAGES_SIGNED_URL_TTL_SECONDS?.trim();
  if (raw) {
    const n = Number.parseInt(raw, 10);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return 86400;
}

/**
 * HMAC-SHA256 hex signature for private image delivery.
 * String to sign: `{pathname}?exp={exp}` (see Cloudflare “Serve private images”).
 */
function signCloudflareImagePath(pathname: string, exp: number, signingKey: string): string {
  const stringToSign = `${pathname}?exp=${exp}`;
  return createHmac("sha256", signingKey).update(stringToSign).digest("hex");
}

function buildSignedCloudflareDeliveryUrl(
  hash: string,
  imageId: string,
  variant: string,
  signingKey: string,
): string {
  const pathname = `/${hash}/${imageId}/${variant}`;
  const exp = Math.floor(Date.now() / 1000) + getSignedUrlTtlSeconds();
  const sig = signCloudflareImagePath(pathname, exp, signingKey);
  return `https://imagedelivery.net${pathname}?exp=${exp}&sig=${sig}`;
}

/**
 * Build Image Delivery URL (no API call).
 * If `CLOUDFLARE_IMAGES_SIGNING_KEY` is set, returns a signed URL for private images; otherwise unsigned.
 */
export function buildCloudflareDeliveryUrl(imageId: string): string | null {
  const hash = getImageHash();
  if (!hash || !imageId) return null;
  const variant = getVariant();
  const signingKey = getSigningKey();
  if (signingKey) {
    return buildSignedCloudflareDeliveryUrl(hash, imageId, variant, signingKey);
  }
  return `https://imagedelivery.net/${hash}/${imageId}/${variant}`;
}

function altFromFilename(filename: string, fallback: string): string {
  const base = filename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
  if (!base) return fallback;
  return `${base} — ${FEATURED_PROPERTY.headline}, Summerlin Las Vegas`;
}

function toGalleryItem(
  src: string,
  alt: string,
  width = 800,
  height = 600,
): PropertyGalleryItem {
  return { src, alt, width, height };
}

/**
 * GET /accounts/{account_id}/images/v1 — list uploaded images (requires API token).
 */
export async function fetchCloudflareImagesFromApi(): Promise<CfApiImage[]> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
  const token = getCloudflareApiToken();
  if (!accountId || !token) return [];

  const url = `${CF_API}/accounts/${encodeURIComponent(accountId)}/images/v1?per_page=100`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 300 },
  });

  if (!res.ok) return [];
  const json: {
    success?: boolean;
    result?: { images: CfApiImage[] };
  } = await res.json();
  if (!json.success || !json.result?.images) return [];
  return json.result.images;
}

function fallbackMedia(): ResolvedPropertyMedia {
  const listing = FEATURED_PROPERTY;
  const padGallery = (count: number): PropertyGalleryItem[] =>
    Array.from({ length: count }, (_, i) => {
      const g = listing.gallery[i % listing.gallery.length];
      return toGalleryItem(g.src, g.alt, g.width, g.height);
    });
  return {
    heroImage: { ...listing.heroImage },
    propertyPhotos: padGallery(6),
    gallery: padGallery(3),
    floorPlan: { ...listing.floorPlan },
    source: "fallback",
  };
}

/**
 * Resolve hero, property photo grid, gallery, and floor plan.
 *
 * **Order without API (env only):** set `NEXT_PUBLIC_CF_IMAGES_HASH` (or `CF_IMAGES_HASH`) and
 * `CLOUDFLARE_IMAGE_IDS` as comma-separated image IDs in order:
 * `hero, grid1..grid6, gallery1..gallery3, floorplan` (11 IDs). If fewer IDs are provided,
 * remaining slots fall back to local placeholders.
 *
 * **API (recommended):** set `CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_API_TOKEN` (Images read).
 * With no `CLOUDFLARE_IMAGE_IDS`, the server lists your account images and assigns the **newest 11**
 * to hero → 6 grid → 3 gallery → floor plan. Set `CLOUDFLARE_SYNC_FROM_API=false` to skip API calls.
 * With a **partial** `CLOUDFLARE_IMAGE_IDS`, set `CLOUDFLARE_SYNC_FROM_API=true` to fill remaining
 * slots from newest uploads.
 */
async function resolvePropertyMedia(): Promise<ResolvedPropertyMedia> {
  const hash = getImageHash();
  if (!hash) {
    return fallbackMedia();
  }

  const explicitRaw = process.env.CLOUDFLARE_IMAGE_IDS?.trim();
  const explicitIds = explicitRaw
    ? explicitRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
  const token = getCloudflareApiToken();
  const hasApiCreds = Boolean(accountId && token);
  const syncFromApiExplicit = process.env.CLOUDFLARE_SYNC_FROM_API === "true";
  const syncFromApiDisabled = process.env.CLOUDFLARE_SYNC_FROM_API === "false";

  let apiImages: CfApiImage[] = [];
  const shouldFetchApi =
    hasApiCreds &&
    explicitIds.length < 11 &&
    !syncFromApiDisabled &&
    (explicitIds.length === 0 || syncFromApiExplicit);

  if (shouldFetchApi) {
    apiImages = await fetchCloudflareImagesFromApi();
  }

  const byId = new Map<string, CfApiImage>();
  for (const img of apiImages) {
    byId.set(img.id, img);
  }

  function urlForId(id: string): string | null {
    return buildCloudflareDeliveryUrl(id);
  }

  const ids: string[] = [...explicitIds];
  if (apiImages.length && ids.length < 11) {
    const sorted = [...apiImages].sort(
      (a, b) =>
        new Date(b.uploaded).getTime() - new Date(a.uploaded).getTime(),
    );
    for (const img of sorted) {
      if (ids.length >= 11) break;
      if (!ids.includes(img.id)) ids.push(img.id);
    }
  }

  if (ids.length === 0) {
    return fallbackMedia();
  }

  const heroId = ids[0];
  const heroUrl = urlForId(heroId);
  if (!heroUrl) return fallbackMedia();

  const heroMeta = byId.get(heroId);
  const heroAlt = heroMeta
    ? altFromFilename(heroMeta.filename, FEATURED_PROPERTY.heroImage.alt)
    : FEATURED_PROPERTY.heroImage.alt;

  const gridIds = ids.slice(1, 7);
  const galleryIds = ids.slice(7, 10);
  const floorId = ids[10];

  const fallback = FEATURED_PROPERTY;

  const propertyPhotos: PropertyGalleryItem[] = gridIds.map((id, i) => {
    const u = urlForId(id);
    const meta = byId.get(id);
    const alt = meta
      ? altFromFilename(meta.filename, `Property photo ${i + 1}`)
      : fallback.gallery[i]?.alt ?? `Property photo ${i + 1}`;
    return toGalleryItem(
      u ?? fallback.gallery[i % fallback.gallery.length].src,
      alt,
    );
  });

  while (propertyPhotos.length < 6) {
    const i = propertyPhotos.length;
    propertyPhotos.push(
      toGalleryItem(
        fallback.gallery[i % fallback.gallery.length].src,
        fallback.gallery[i % fallback.gallery.length].alt,
      ),
    );
  }

  const gallery: PropertyGalleryItem[] = galleryIds.map((id, i) => {
    const u = urlForId(id);
    const meta = byId.get(id);
    const alt = meta
      ? altFromFilename(meta.filename, `Gallery ${i + 1}`)
      : fallback.gallery[i]?.alt ?? `Gallery ${i + 1}`;
    return toGalleryItem(
      u ?? fallback.gallery[i % fallback.gallery.length].src,
      alt,
    );
  });

  while (gallery.length < 3) {
    const i = gallery.length;
    gallery.push(
      toGalleryItem(
        fallback.gallery[i % fallback.gallery.length].src,
        fallback.gallery[i % fallback.gallery.length].alt,
      ),
    );
  }

  let floorSrc: string = fallback.floorPlan.imageSrc;
  let floorAlt: string = fallback.floorPlan.alt;
  if (floorId) {
    const u = urlForId(floorId);
    const meta = byId.get(floorId);
    if (u) {
      floorSrc = u;
      floorAlt = meta
        ? altFromFilename(meta.filename, fallback.floorPlan.alt)
        : fallback.floorPlan.alt;
    }
  }

  return {
    heroImage: {
      src: heroUrl,
      alt: heroAlt,
      width: fallback.heroImage.width,
      height: fallback.heroImage.height,
    },
    propertyPhotos: propertyPhotos.slice(0, 6),
    gallery,
    floorPlan: {
      imageSrc: floorSrc,
      alt: floorAlt,
      width: fallback.floorPlan.width,
      height: fallback.floorPlan.height,
      pdfHref: fallback.floorPlan.pdfHref,
    },
    source: "cloudflare",
  };
}

/** Absolute URL for OG/Twitter/JSON-LD when `src` may be site-relative. */
export function absolutePropertyImageUrl(src: string, siteOrigin: string): string {
  return src.startsWith("http") ? src : new URL(src, siteOrigin).toString();
}

/** Dedupe Cloudflare + fallback resolution per request (metadata + page). */
export const getPropertyMedia = cache(resolvePropertyMedia);
