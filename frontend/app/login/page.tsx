"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin() {
    setError("");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError("Login failed. Check your email and password.");
      return;
    }

    const data = await res.json();
    localStorage.setItem("token", data.access_token);
    router.push("/");
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-16 md:px-8">
      <div className="w-full max-w-md rounded-2xl border border-brand-border bg-white/[0.02] p-8 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
          Account
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Sign in</h1>
        <p className="mt-2 text-sm text-brand-muted">
          Access your dashboard to manage categories and content.
        </p>

        {error && (
          <p className="mb-4 mt-6 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-brand-border bg-black/30 p-3 text-white outline-none transition focus:border-brand-accent"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-brand-border bg-black/30 p-3 text-white outline-none transition focus:border-brand-accent"
          />
          <button
            onClick={handleLogin}
            className="rounded-lg bg-brand-accent p-3 font-semibold text-white transition hover:opacity-90"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}