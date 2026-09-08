import { NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const user = await (await getDatabase()).collection("users").findOne({ email });
    if (!user || !(await verifyPassword(password, String(user.passwordHash)))) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }
    await createSession({ id: user._id.toString(), name: String(user.name), email, role: user.role === "admin" ? "admin" : "user" });
    return NextResponse.json({ success: true, role: user.role });
  } catch (error) {
    console.error("Login request failed:", error);
    const message = error instanceof Error && error.message.startsWith("Missing ")
      ? "Authentication is not configured on the server."
      : "Unable to sign in right now. Check the server configuration.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
