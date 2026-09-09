import { NextResponse } from "next/server";
import { hashPassword, hashResetToken } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();
    if (!token || typeof password !== "string" || password.length < 8) return NextResponse.json({ message: "A valid token and 8-character password are required." }, { status: 400 });
    const db = await getDatabase();
    const tokenRecord = await db.collection("password_reset_tokens").findOne({ tokenHash: hashResetToken(token), expiresAt: { $gt: new Date() } });
    if (!tokenRecord) return NextResponse.json({ message: "This reset link is invalid or expired." }, { status: 400 });
    await db.collection("users").updateOne({ _id: tokenRecord.userId }, { $set: { passwordHash: await hashPassword(password), updatedAt: new Date() } });
    await db.collection("password_reset_tokens").deleteMany({ userId: tokenRecord.userId });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Password reset failed:", error);
    return NextResponse.json({ message: "Unable to reset the password right now." }, { status: 500 });
  }
}
