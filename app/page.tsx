

export default function Home() {
  return (
    <section className="flex flex-col gap-10 px-10 py-12">
      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium uppercase tracking-widest text-blue-500">
          Welcome back
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900">Next Patterns design system</h1>
        <p className="max-w-2xl text-base text-gray-600">
          Explore the components library, reuse atoms and molecules, and manage your product experiences in a unified, statically rendered workspace.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Start with products</h2>
          <p className="mt-2 text-sm text-gray-500">
            Review the catalog, update product details, and follow their performance metrics.
          </p>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Build new flows</h2>
          <p className="mt-2 text-sm text-gray-500">
            Combine atoms and molecules to compose new templates and interaction patterns.
          </p>
        </article>
      </div>
    </section>
  );
}
