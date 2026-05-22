import { FAKE_PRODS, type Product } from "../types/product";

interface FetchOptions {
  signal?: AbortSignal;
  next?: { revalidate?: number };
}

/** Local catalog — no network requests. */
export async function fetchProducts(
  _options?: FetchOptions
): Promise<Product[]> {
  return FAKE_PRODS;
}

export async function fetchProductById(
  id: number,
  _options?: FetchOptions
): Promise<Product> {
  const product = FAKE_PRODS.find((p) => p.id === id);

  if (!product) {
    throw new Error(`Product ${id} not found`);
  }

  return product;
}
