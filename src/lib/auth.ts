import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { createHash, randomBytes } from "node:crypto";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const cookieName = "lajjas_session";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(user: SessionUser) {
  if (!process.env.AUTH_SECRET) throw new Error("Missing AUTH_SECRET.");
  const token = await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
  const store = await cookies();
  store.set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSession(): Promise<SessionUser | null> {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token || !process.env.AUTH_SECRET) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionUser;
  } catch {
    return null;
  }
}

export async function clearSession() {
  (await cookies()).delete(cookieName);
}

export function createResetToken() {
  const token = randomBytes(32).toString("hex");
  return { token, hash: hashResetToken(token) };
}

export function hashResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
