import type { Product } from "../types/product";

const API_BASE_URL = "https://fakestoreapi.com";

interface FetchOptions {
  signal?: AbortSignal;
  next?: { revalidate?: number };
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(
      `API Error (${response.status}): ${errorText || response.statusText}`
    );
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error("Failed to parse response as JSON");
  }
}

export async function fetchProducts(
  options?: FetchOptions
): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      next: options?.next || { revalidate: 3600 }, //NOTE: dynamic boolean value could be passed for more flexible revalidating
      signal: options?.signal,
    });

    const products = await handleResponse<Product[]>(response);
    return products;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request was aborted");
    }
    console.error("Error fetching products:", error);
    throw error instanceof Error
      ? error
      : new Error("Unknown error occurred while fetching products");
  }
}

export async function fetchProductById(
  id: number,
  options?: FetchOptions
): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: options?.next || { revalidate: 3600 },
      signal: options?.signal,
    });

    const product = await handleResponse<Product>(response);
    return product;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request was aborted");
    }
    console.error(`Error fetching product ${id}:`, error);
    throw error instanceof Error
      ? error
      : new Error(`Unknown error occurred while fetching product ${id}`);
  }
}

