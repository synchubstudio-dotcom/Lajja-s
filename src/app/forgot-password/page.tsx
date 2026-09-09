"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const response = await fetch("/api/auth/forgot-password/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    const data = await response.json(); setMessage(data.message || "Please check your email."); setBusy(false);
  }
  return <main className="mx-auto max-w-md px-4 py-16"><div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm"><h1 className="font-serif text-3xl font-bold text-stone-900">Reset your password</h1><p className="mt-2 text-sm text-stone-500">Enter your email and we&apos;ll send a reset link.</p><form onSubmit={submit} className="mt-6 space-y-4"><input required type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border p-3 text-sm" />{message && <p className="text-sm text-[#1f5a3d]">{message}</p>}<button disabled={busy} className="w-full rounded-xl bg-[#1f5a3d] p-3 font-bold text-white disabled:opacity-60">{busy ? "Sending..." : "Send reset link"}</button></form><Link href="/login/" className="mt-5 block text-sm text-[#1f5a3d]">Back to sign in</Link></div></main>;
}
