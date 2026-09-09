"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json") ? await response.json() : {};
    setBusy(false);
    if (!response.ok) {
      setError(data.message || `Unable to continue (error ${response.status}).`);
      return;
    }
    const returnTo = new URLSearchParams(window.location.search).get("returnTo");
    const destination = data.role === "admin"
      ? "/admin/"
      : returnTo?.startsWith("/")
        ? returnTo
        : "/products/all-products/";
    router.push(destination);
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-2 text-sm text-stone-500">Sign in to buy Lajja&apos;s Gujarati snacks.</p>
        <a href="/api/auth/google/" className="mt-6 block w-full rounded-xl border border-stone-300 p-3 text-center text-sm font-bold text-stone-700 hover:bg-stone-50">
          Continue with Google
        </a>
        <div className="my-5 flex items-center gap-3 text-xs text-stone-400"><span className="h-px flex-1 bg-stone-200" />OR<span className="h-px flex-1 bg-stone-200" /></div>
        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === "register" && (
            <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border p-3 text-sm" />
          )}
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border p-3 text-sm" />
          <input required minLength={8} type="password" placeholder="Password (8+ characters)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-xl border p-3 text-sm" />
          {mode === "login" && <Link href="/forgot-password/" className="block text-right text-xs font-semibold text-[#1f5a3d]">Forgot password?</Link>}
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={busy} className="w-full rounded-xl bg-[#1f5a3d] p-3 font-bold text-white hover:bg-[#f6f0e5] hover:text-[#1f5a3d] disabled:opacity-60">
            {busy ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
        <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="mt-5 text-sm font-semibold text-[#1f5a3d]">
          {mode === "login" ? "New customer? Create an account" : "Already have an account? Sign in"}
        </button>
        <Link href="/" className="mt-4 block text-sm text-stone-500">Continue browsing without signing in</Link>
      </div>
    </main>
  );
}
