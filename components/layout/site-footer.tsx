import {
  AGENT_NAME,
  BROKERAGE,
  EMAIL,
  LICENSE_ID,
  MAPS_DIRECTIONS_URL,
  OFFICE_ADDRESS_LINES,
  PHONE_DISPLAY,
  PHONE_E164,
  GOOGLE_REVIEWS_URL,
  SITE_NAME,
} from "@/lib/site-contact";

export function SiteFooter() {
  const telHref = `tel:${PHONE_E164}`;
  const mailHref = `mailto:${EMAIL}`;

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Contact
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{SITE_NAME}</p>
            <p className="mt-1 text-slate-700">{AGENT_NAME}</p>
            <p className="text-sm text-slate-600">{BROKERAGE}</p>
            <p className="mt-2 text-sm text-slate-600">License {LICENSE_ID}</p>
            <address className="mt-4 not-italic text-slate-700">
              {OFFICE_ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Connect
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                className="inline-flex items-center justify-center rounded-md bg-[#0e64c8] px-4 py-2 text-sm font-medium text-white hover:bg-[#0c549e]"
                href={telHref}
              >
                Call {PHONE_DISPLAY}
              </a>
              <a
                className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
                href={MAPS_DIRECTIONS_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                Directions
              </a>
              <a
                className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
                href={GOOGLE_REVIEWS_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                View Google Reviews
              </a>
              <a
                className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
                href={mailHref}
              >
                Email
              </a>
            </div>
            <p className="text-xs text-slate-500">
              Hours: by appointment — call or email to schedule tours and consultations.
            </p>
          </div>
        </div>
        <p className="mt-10 text-xs text-slate-500">
          {SITE_NAME} is operated by {AGENT_NAME} ({LICENSE_ID}) with {BROKERAGE}. Not intended as
          legal or tax advice; consult a qualified professional for those matters.
        </p>
      </div>
    </footer>
  );
}
