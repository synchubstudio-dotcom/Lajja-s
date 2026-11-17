import { auth, currentUser } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
};

export async function getSession(): Promise<SessionUser | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  const primaryEmail = clerkUser?.emailAddresses.find(
    (email) => email.id === clerkUser.primaryEmailAddressId
  );
  if (!clerkUser || !primaryEmail || primaryEmail.verification?.status !== "verified") {
    return null;
  }

  const email = primaryEmail.emailAddress.toLowerCase();
  const name = clerkUser.fullName?.trim() || clerkUser.firstName?.trim() || email.split("@")[0];
  const users = (await getDatabase()).collection("users");
  const existingUser =
    (await users.findOne({ clerkUserId: userId })) ||
    (await users.findOne({ email }));
  const userIdInDatabase = existingUser?._id ?? new ObjectId();
  const role = existingUser?.role === "admin" ? "admin" : "user";
  const now = new Date();

  await users.updateOne(
    { _id: userIdInDatabase },
    {
      $set: { clerkUserId: userId, email, name, role, updatedAt: now },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true }
  );

  return { id: userIdInDatabase.toString(), email, name, role };
}
