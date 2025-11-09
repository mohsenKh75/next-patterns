import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import React from "react";

export type CacheLifeUnit = "seconds" | "minutes" | "hours" | "days";

export interface ISRConfig<TItem, TId = string | number, TData = any> {
  // Function to fetch all items for generateStaticParams
  fetchAll: (options?: { next?: { revalidate?: number } }) => Promise<TItem[]>;
  
  // Extract ID from item (can be string or number)
  getId: (item: TItem) => TId;
  
  // Param name in the route (e.g., "productId", "userId")
  paramName: string;
  
  // Function to fetch a single item by ID
  fetchById: (id: TId, options?: { next?: { revalidate?: number } }) => Promise<TData>;
  
  // Cache configuration
  cacheLife?: {
    unit: CacheLifeUnit;
  };
  
  // Revalidation time in seconds for fetch calls (default: 3600)
  revalidate?: number;
  
  // Revalidation time for the list fetch (for generateStaticParams, default: 86400)
  listRevalidate?: number;
  
  // Limit number of pre-generated paths (default: 20, set to null for all)
  pregenerateLimit?: number | null;
  
  // Optional: Custom ID validation function
  validateId?: (id: string) => boolean;
  
  // Optional: Custom ID transformation (e.g., parse to number)
  transformId?: (id: string) => TId;
}

export interface ISRPageProps<TParams extends Record<string, string>> {
  params: Promise<TParams>;
}

/**
 * Creates a generateStaticParams function for ISR
 */
export function createGenerateStaticParams<TItem, TId = string | number>(
  config: Pick<ISRConfig<TItem, TId>, "fetchAll" | "getId" | "paramName" | "listRevalidate" | "pregenerateLimit">
) {
  return async function generateStaticParams() {
    try {
      const items = await config.fetchAll({
        next: { revalidate: config.listRevalidate ?? 86400 },
      });
      
      // Apply limit if specified
      const itemsToGenerate = config.pregenerateLimit !== null
        ? items.slice(0, config.pregenerateLimit ?? 20)
        : items;
      
      return itemsToGenerate.map((item) => {
        const id = config.getId(item);
        return {
          [config.paramName]: String(id),
        };
      });
    } catch (error) {
      console.error(`Error generating static params for ${config.paramName}:`, error);
      // Return empty array on error - pages will be generated on-demand
      return [];
    }
  };
}

/**
 * Helper function to extract and validate ID from params
 * This handles ID extraction, transformation, and validation
 */
export function extractIdFromParams<TId = string | number, TParams extends Record<string, string> = Record<string, string>>(
  params: TParams,
  config: {
    paramName: string;
    transformId?: (id: string) => TId;
    validateId?: (id: string) => boolean;
  }
): TId {
  const paramValue = params[config.paramName];
  
  if (!paramValue) {
    notFound();
  }
  
  // Validate ID if validation function provided
  if (config.validateId && !config.validateId(paramValue)) {
    notFound();
  }
  
  // Transform and return ID
  if (config.transformId) {
    return config.transformId(paramValue);
  }
  
  return paramValue as TId;
}

/**
 * Helper function to fetch data for ISR pages
 * This handles the data fetching with proper revalidation
 */
export async function fetchISRData<TId = string | number, TData = any>(
  id: TId,
  config: {
    fetchById: (id: TId, options?: { next?: { revalidate?: number } }) => Promise<TData>;
    revalidate?: number;
    paramName: string;
  }
): Promise<TData> {
  try {
    // Fetch data with revalidation
    const data = await config.fetchById(id, {
      next: { revalidate: config.revalidate ?? 3600 },
    });
    
    return data;
  } catch (error) {
    console.error(`Error fetching data for ${config.paramName} ${id}:`, error);
    notFound();
  }
}

/**
 * Complete ISR setup helper - creates generateStaticParams and provides utilities for page components
 * This is a convenience function that sets up ISR for a page
 * 
 * @example
 * ```tsx
 * const isrConfig = createISRConfig({
 *   fetchAll: () => fetchProducts(),
 *   getId: (product) => product.id,
 *   paramName: "productId",
 *   fetchById: (id) => fetchProductById(id),
 *   cacheLife: { unit: "hours" },
 *   revalidate: 3600,
 *   pregenerateLimit: 20,
 *   transformId: (id) => parseInt(id, 10),
 * });
 * 
 * export const generateStaticParams = isrConfig.generateStaticParams;
 * 
 * export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
 *   'use cache';
 *   cacheLife('hours');
 *   
 *   const resolvedParams = await params;
 *   const id = isrConfig.extractId(resolvedParams);
 *   const product = await isrConfig.fetchData(id);
 *   return <ProductPage product={product} />;
 * }
 * ```
 */
export function createISRConfig<
  TItem,
  TId = string | number,
  TParams extends Record<string, string> = Record<string, string>,
  TData = any
>(config: ISRConfig<TItem, TId, TData>) {
  const generateStaticParams = createGenerateStaticParams({
    fetchAll: config.fetchAll,
    getId: config.getId,
    paramName: config.paramName,
    listRevalidate: config.listRevalidate,
    pregenerateLimit: config.pregenerateLimit,
  });

  const extractId = (params: TParams): TId => {
    return extractIdFromParams(params, {
      paramName: config.paramName,
      transformId: config.transformId,
      validateId: config.validateId,
    });
  };

  const fetchData = (id: TId): Promise<TData> => {
    return fetchISRData(id, {
      fetchById: config.fetchById,
      revalidate: config.revalidate,
      paramName: config.paramName,
    });
  };

  return {
    generateStaticParams,
    extractId,
    fetchData,
    cacheLife: config.cacheLife,
    config,
  };
}

