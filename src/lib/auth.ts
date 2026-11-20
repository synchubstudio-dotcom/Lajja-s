import { auth, currentUser } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
};

const DEFAULT_ADMIN_EMAILS = [
  "bhattlakshit200@gmail.com",
  "lajjas123@gmail.com",
];

function getAdminEmails(): string[] {
  const configured = [
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_EMAILS,
    ...DEFAULT_ADMIN_EMAILS,
  ];
  return configured
    .flatMap((val) => (val ? val.split(",") : []))
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

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
  
  const adminEmails = getAdminEmails();
  const isAdmin = existingUser?.role === "admin" || adminEmails.includes(email);
  const role: "user" | "admin" = isAdmin ? "admin" : "user";
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
