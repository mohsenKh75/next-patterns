import { Suspense } from "react";

import { ProductCard } from "@/src/components/molecules/ProductCard";
import { ProductCardSkeleton } from "@/src/components/atoms/ProductCardSkeleton";
import { fetchProducts } from "@/src/services/api/products";

async function ProductsGrid() {
  //NOTE: using fetch for server side req and caching - could work for our home page data?
  const products = await fetchProducts();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export const ProductsList = () => {
  return (
    <ProductsGrid />
  );
};

