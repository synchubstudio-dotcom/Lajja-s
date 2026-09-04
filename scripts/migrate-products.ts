import "dotenv/config";
import { MongoClient } from "mongodb";
import { v2 as cloudinary } from "cloudinary";
import { PRODUCTS } from "../src/data/products";

const required = [
  "MONGODB_URI",
  "MONGODB_DB",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
] as const;

for (const name of required) {
  if (!process.env[name]) {
    throw new Error(`Missing ${name}. Copy .env.example to .env.local and fill in your credentials.`);
  }
}

const mongodbUri = process.env.MONGODB_URI;
const mongodbDb = process.env.MONGODB_DB;
if (!mongodbUri || !mongodbDb) {
  throw new Error("MongoDB configuration is incomplete.");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const client = new MongoClient(mongodbUri);

async function migrateProducts() {
  try {
    await client.connect();
    const collection = client.db(mongodbDb).collection("products");

    for (const product of PRODUCTS) {
      const images = [];
      for (const [index, image] of product.images.entries()) {
        const upload = await cloudinary.uploader.upload(image.url, {
          folder: `lajjas-foods/products/${product.slug}`,
          public_id: index === 0 ? "primary" : `gallery-${index + 1}`,
          overwrite: true,
          resource_type: "image",
        });

        images.push({
          url: upload.secure_url,
          publicId: upload.public_id,
          format: upload.format,
          width: upload.width,
          height: upload.height,
          alt: image.alt,
          caption: image.caption || image.alt,
          isPrimary: Boolean(image.isPrimary),
        });
      }

      await collection.updateOne(
        { slug: product.slug },
        { $set: { ...product, images, migratedAt: new Date() } },
        { upsert: true },
      );
      console.log(`Migrated ${product.name}`);
    }
  } finally {
    await client.close();
  }
}

migrateProducts().catch((error: unknown) => {
  console.error("Product migration failed.");
  console.error(error);
  process.exitCode = 1;
});
