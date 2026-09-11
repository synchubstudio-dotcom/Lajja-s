import { CATEGORIES } from "@/data/categories";
import { getDatabase } from "@/lib/mongodb";
import { Category } from "@/types/category";

export async function getCatalogCategories(): Promise<Category[]> {
  try {
    const categories = await (await getDatabase()).collection<Category>("categories").find().sort({ name: 1 }).toArray();
    if (categories.length > 0) return categories.map(({ _id, ...category }) => category as Category);
  } catch (error) {
    console.warn("Using the static category catalog because MongoDB is unavailable:", error);
  }
  return CATEGORIES;
}
