import { PRODUCTS } from "@/data/products";
import { getDatabase } from "@/lib/mongodb";
import { Product } from "@/types/product";
import { cache } from "react";

// In-memory cache with 60s TTL for blazing fast subsequent loads
let cachedProducts: Product[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000;

export const getCatalogProducts = cache(async function getCatalogProducts(): Promise<Product[]> {
  const now = Date.now();
  if (cachedProducts && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedProducts;
  }

  try {
    const db = await getDatabase();
    const products = await db
      .collection<Product>("products")
      .find()
      .sort({ name: 1 })
      .toArray();

    if (products.length > 0) {
      cachedProducts = products.map(({ _id, ...product }) => product as Product);
      lastFetchTime = now;
      return cachedProducts;
    }
  } catch (error) {
    console.warn("Using the static product catalog because MongoDB is unavailable:", error);
    if (cachedProducts) return cachedProducts;
  }

  return PRODUCTS;
});

export function invalidateProductCatalogCache() {
  cachedProducts = null;
  lastFetchTime = 0;
}
