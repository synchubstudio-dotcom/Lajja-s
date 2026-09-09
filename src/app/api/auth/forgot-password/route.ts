import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { createResetToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email: rawEmail } = await request.json();
    const email = String(rawEmail || "").trim().toLowerCase();
    const response = { message: "If an account exists, a reset link has been sent." };
    if (!email || !process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) return NextResponse.json(response);
    const user = await (await getDatabase()).collection("users").findOne({ email });
    if (!user) return NextResponse.json(response);
    const { token, hash } = createResetToken();
    await (await getDatabase()).collection("password_reset_tokens").insertOne({ userId: user._id, tokenHash: hash, expiresAt: new Date(Date.now() + 1000 * 60 * 30), createdAt: new Date() });
    const baseUrl = process.env.APP_URL || new URL(request.url).origin;
    const resetUrl = `${baseUrl}/reset-password/?token=${token}`;
    const emailResponse = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL, to: [email], subject: "Reset your Lajja's Foods password", html: `<p>Use this link to reset your password. It expires in 30 minutes.</p><p><a href="${resetUrl}">Reset password</a></p>` }) });
    if (!emailResponse.ok) throw new Error("Reset email delivery failed.");
    return NextResponse.json(response);
  } catch (error) {
    console.error("Password reset request failed:", error);
    return NextResponse.json({ message: "Unable to send a reset link right now." }, { status: 500 });
  }
}
