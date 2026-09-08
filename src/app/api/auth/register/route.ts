import { NextResponse } from "next/server";
import { hashPassword, createSession } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    if (!name || !email || password.length < 8) {
      return NextResponse.json({ message: "Name, email, and an 8-character password are required." }, { status: 400 });
    }
    const db = await getDatabase();
    const users = db.collection("users");
    if (await users.findOne({ email })) {
      return NextResponse.json({ message: "An account with this email already exists." }, { status: 409 });
    }
    const user = { _id: new ObjectId(), name, email, passwordHash: await hashPassword(password), role: "user" as const, createdAt: new Date() };
    await users.insertOne(user);
    await createSession({ id: user._id.toString(), name, email, role: user.role });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Registration request failed:", error);
    return NextResponse.json({ message: "Unable to create the account right now. Check the server configuration." }, { status: 500 });
  }
}
