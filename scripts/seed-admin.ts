import dotenv from "dotenv";
import { getDatabase } from "../src/lib/mongodb";
import { hashPassword } from "../src/lib/auth";

dotenv.config({ path: ".env" });
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.");
const adminEmail = email;
const adminPassword = password;
async function seedAdmin() {
  const db = await getDatabase();
  await db.collection("users").updateOne(
    { email: adminEmail.toLowerCase() },
    { $set: { name: "Lajja Admin", email: adminEmail.toLowerCase(), passwordHash: await hashPassword(adminPassword), role: "admin", updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true },
  );
  console.log("Admin user seeded.");
}

seedAdmin().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
