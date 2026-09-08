import { PRODUCTS } from "@/data/products";
import { getDatabase } from "@/lib/mongodb";
import { Product } from "@/types/product";

export async function getCatalogProducts(): Promise<Product[]> {
  try {
    const products = await (await getDatabase()).collection<Product>("products").find().sort({ name: 1 }).toArray();
    if (products.length > 0) return products.map(({ _id, ...product }) => product as Product);
  } catch (error) {
    console.warn("Using the static product catalog because MongoDB is unavailable:", error);
  }
  return PRODUCTS;
}
