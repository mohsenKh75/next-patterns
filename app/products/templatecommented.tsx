import { Suspense } from "react"

export default function ProductsTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col text-gray-900">
      <header className="border-b border-gray-200 px-8 py-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="text-sm text-gray-500">
            Browse, create and manage items in your catalog.
          </p>
        </div>
      </header>
      <Suspense fallback={'loading'}>
        <div className="flex-1 overflow-y-auto px-8 py-6">{children}</div>
      </Suspense>
    </div>
  );
}
