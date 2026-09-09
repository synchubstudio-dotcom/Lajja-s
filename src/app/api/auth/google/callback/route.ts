import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { createSession } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const store = await cookies();
  const savedState = store.get("lajjas_oauth_state")?.value;
  store.delete("lajjas_oauth_state");
  if (!code || !state || state !== savedState) return NextResponse.redirect(new URL("/login/?error=google_state", request.url));
  try {
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || new URL("/api/auth/google/callback", request.url).toString();
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ code, client_id: process.env.GOOGLE_CLIENT_ID || "", client_secret: process.env.GOOGLE_CLIENT_SECRET || "", redirect_uri: redirectUri, grant_type: "authorization_code" }) });
    if (!tokenResponse.ok) throw new Error("Google token exchange failed.");
    const tokens = await tokenResponse.json() as { access_token?: string };
    const profileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", { headers: { Authorization: `Bearer ${tokens.access_token}` } });
    if (!profileResponse.ok) throw new Error("Google profile lookup failed.");
    const profile = await profileResponse.json() as { sub?: string; email?: string; name?: string };
    if (!profile.sub || !profile.email) throw new Error("Google account did not provide an email.");
    const db = await getDatabase();
    const users = db.collection("users");
    const existing = await users.findOne({ $or: [{ googleId: profile.sub }, { email: profile.email.toLowerCase() }] });
    const userId = existing?._id || new ObjectId();
    const role = existing?.role === "admin" ? "admin" : "user";
    await users.updateOne({ _id: userId }, { $set: { googleId: profile.sub, email: profile.email.toLowerCase(), name: profile.name || profile.email.split("@")[0], role, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } }, { upsert: true });
    await createSession({ id: userId.toString(), email: profile.email.toLowerCase(), name: profile.name || "Customer", role });
    return NextResponse.redirect(new URL(role === "admin" ? "/admin/" : "/products/all-products/", request.url));
  } catch (error) {
    console.error("Google login failed:", error);
    return NextResponse.redirect(new URL("/login/?error=google_failed", request.url));
  }
}
