export async function ProductCardSkeleton() {
  'use cache'
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Image Skeleton */}
      <div className="relative aspect-square w-full animate-pulse bg-gray-200" />

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Title Skeleton */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Rating Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Price and Button Skeleton */}
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-gray-100 pt-4">
          <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-24 animate-pulse rounded-2xl bg-gray-200" />
        </div>
      </div>
    </article>
  );
};

