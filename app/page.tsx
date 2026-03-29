const REALSCOUT_OFFICE_LISTINGS_HTML =
  '<realscout-office-listings agent-encoded-id="QWdlbnQtMjI1MDUw" sort-order="PRICE_HIGH" listing-status="For Sale" property-types=",SFR" price-min="1000000" price-max="20000000"></realscout-office-listings>';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
        Eagle Hills Homes
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Las Vegas area real estate — site under construction. Contact your agent for listings and
        neighborhood insight.
      </p>
      <section className="mt-12 w-full" aria-label="Office listings">
        <h2 className="sr-only">Featured listings</h2>
        <div dangerouslySetInnerHTML={{ __html: REALSCOUT_OFFICE_LISTINGS_HTML }} />
      </section>
    </main>
  );
}
