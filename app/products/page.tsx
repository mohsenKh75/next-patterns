import { ProductCardSkeleton } from "@/src/components/atoms/ProductCardSkeleton";
import { ProductsList } from "@/src/components/molecules/ProductsList";
import { cacheLife } from "next/cache";
import { Suspense } from "react";

export default async function Products() {
  //NOTE: the caching apis in next must controlled. a use cache here and a caching api inside fetch! 
  'use cache'
  cacheLife('hours')
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Products</h2>
          <p className="mt-1 text-sm text-gray-500">
            Browse our complete catalog
          </p>
        </div>
      </div>
      <Suspense fallback={
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      }>
        <ProductsList />
      </Suspense>
    </div>
  );
}
