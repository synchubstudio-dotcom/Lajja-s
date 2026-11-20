import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { getDatabase } from "../src/lib/mongodb";

dotenv.config({ path: ".env" });

const adminEmails = [
  process.env.ADMIN_EMAIL,
  process.env.ADMIN_EMAILS,
  "bhattlakshit200@gmail.com",
  "lajjas123@gmail.com",
]
  .flatMap((val) => (val ? val.split(",") : []))
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

const uniqueAdminEmails = Array.from(new Set(adminEmails));
const adminPassword = process.env.ADMIN_PASSWORD || "lajjas123";

async function seedAdmin() {
  const db = await getDatabase();
  const users = db.collection("users");

  for (const email of uniqueAdminEmails) {
    const isOwner = email.includes("bhatt");
    await users.updateOne(
      { email },
      {
        $set: {
          name: isOwner ? "Lakshit Bhatt (Admin)" : "Lajja Admin",
          email,
          role: "admin",
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
          passwordHash: await bcrypt.hash(adminPassword, 12),
        },
      },
      { upsert: true }
    );
    console.log(`Admin user seeded / updated: ${email}`);
  }
}

seedAdmin()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
