"use client";

import { FormEvent, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const params = useSearchParams(); const router = useRouter();
  const [password, setPassword] = useState(""); const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true);
    const response = await fetch("/api/auth/reset-password/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: params.get("token"), password }) });
    const data = await response.json(); setMessage(data.message || (response.ok ? "Password reset." : "Unable to reset password.")); setBusy(false);
    if (response.ok) setTimeout(() => router.push("/login/"), 800);
  }
  return <main className="mx-auto max-w-md px-4 py-16"><div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm"><h1 className="font-serif text-3xl font-bold text-stone-900">Choose a new password</h1><form onSubmit={submit} className="mt-6 space-y-4"><input required minLength={8} type="password" placeholder="New password (8+ characters)" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border p-3 text-sm" />{message && <p className="text-sm text-[#1f5a3d]">{message}</p>}<button disabled={busy} className="w-full rounded-xl bg-[#1f5a3d] p-3 font-bold text-white disabled:opacity-60">{busy ? "Saving..." : "Reset password"}</button></form></div></main>;
}
