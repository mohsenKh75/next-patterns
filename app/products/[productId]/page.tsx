import { ProductId } from "@/src/components/PagesComponents/Products/ProductId";
import { fetchProductById, fetchProducts } from "@/src/services/api/products";
import { createISRConfig } from "@/src/utils/isr";
import { cacheLife } from "next/cache";
import type { Product } from "@/src/services/types/product";
import { ViewTransition } from "react";

const isrConfig = createISRConfig<Product, number, { productId: string }, Product>({
  // Fetch all products for generateStaticParams
  fetchAll: (options) => fetchProducts(options),
  getId: (product) => product.id,
  paramName: "productId",
  fetchById: (id, options) => fetchProductById(id, options),
  cacheLife: {
    unit: "hours",
  },
  revalidate: 3600,
  listRevalidate: 86400,
  pregenerateLimit: 20,
});

export const generateStaticParams = isrConfig.generateStaticParams;

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  'use cache';
  if (isrConfig.cacheLife) {
    cacheLife(isrConfig.cacheLife.unit);
  }
  
  // Await params and extract ID
  const resolvedParams = await params;
  const productId = isrConfig.extractId(resolvedParams);
  
  // Fetch product data using ISR handler
  const product = await isrConfig.fetchData(productId);
  
  return (
    <ViewTransition>
      <ProductId product={product} />
    </ViewTransition>
  );
}