import { CATEGORIES } from "@/data/categories";
import { getDatabase } from "@/lib/mongodb";
import { SITE_CONFIG } from "@/lib/constants";
import { Category } from "@/types/category";

const CATEGORY_INITIALIZATION_ID = "categories";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

export function normalizeCategoryRecord(value: unknown): Category {
  if (!isRecord(value)) throw new Error("Category must be an object.");

  const name = stringValue(value.name, "");
  const slug = stringValue(value.slug, "");
  if (!name || !slug) throw new Error("Category name and slug are required.");

  const tradition = isRecord(value.traditionContent) ? value.traditionContent : {};
  const seo = isRecord(value.seo) ? value.seo : {};
  const benefits = Array.isArray(value.benefits)
    ? value.benefits.filter(
        (item): item is { title: string; description: string } =>
          isRecord(item) && typeof item.title === "string" && typeof item.description === "string"
      )
    : [];
  const faqs = Array.isArray(value.faqs)
    ? value.faqs.filter(
        (item): item is { question: string; answer: string } =>
          isRecord(item) && typeof item.question === "string" && typeof item.answer === "string"
      )
    : [];

  return {
    id: stringValue(value.id, `category-${slug}`),
    slug,
    name,
    ...(typeof value.gujaratiName === "string" ? { gujaratiName: value.gujaratiName } : {}),
    tagline: stringValue(value.tagline, `Explore our ${name} collection from Lajja's Foods.`),
    description: stringValue(value.description, `Shop authentic ${name} from Lajja's Foods.`),
    heroImage: stringValue(value.heroImage, CATEGORIES[0].heroImage),
    traditionContent: {
      heading: stringValue(tradition.heading, `About ${name}`),
      paragraphs: stringArray(tradition.paragraphs),
    },
    culinaryHighlights: stringArray(value.culinaryHighlights),
    storageAndTravelTips: stringArray(value.storageAndTravelTips),
    benefits,
    faqs,
    seo: {
      title: stringValue(seo.title, `${name} | Lajja's Foods`),
      description: stringValue(seo.description, `Order authentic ${name} online from Lajja's Foods.`),
      canonicalUrl: stringValue(seo.canonicalUrl, `${SITE_CONFIG.url}/${slug}/`),
      keywords: stringArray(seo.keywords),
    },
  };
}

export async function getCatalogCategories(): Promise<Category[]> {
  let categories: Array<Record<string, unknown>>;
  try {
    const database = await getDatabase();
    const collection = database.collection("categories");
    categories = await collection.find().sort({ name: 1 }).toArray();
    const initialization = database.collection<{ _id: string; initializedAt?: Date }>("catalog_metadata");
    const initialized = await initialization.findOne({ _id: CATEGORY_INITIALIZATION_ID });

    if (categories.length > 0) {
      if (!initialized) {
        await initialization.updateOne(
          { _id: CATEGORY_INITIALIZATION_ID },
          { $setOnInsert: { initializedAt: new Date() } },
          { upsert: true }
        );
      }
    } else if (!initialized) {
      const claim = await initialization.updateOne(
        { _id: CATEGORY_INITIALIZATION_ID },
        { $setOnInsert: { initializedAt: new Date() } },
        { upsert: true }
      );
      if (claim.upsertedCount === 1) {
        try {
          await collection.insertMany(
            CATEGORIES.map((category) => ({
              ...normalizeCategoryRecord(category),
              createdAt: new Date(),
              updatedAt: new Date(),
            }))
          );
          categories = await collection.find().sort({ name: 1 }).toArray();
        } catch (error) {
          await initialization.deleteOne({ _id: CATEGORY_INITIALIZATION_ID });
          throw error;
        }
      }
    }
  } catch (error) {
    console.warn("Using the static category catalog because MongoDB is unavailable:", error);
    return CATEGORIES.map(normalizeCategoryRecord);
  }

  return categories.map(({ _id, ...category }) => normalizeCategoryRecord(category));
}
