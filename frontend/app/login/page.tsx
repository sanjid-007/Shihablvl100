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
    <div className="flex items-center justify-center py-20">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-8">Login</h1>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
          />
          <button
            onClick={handleLogin}
            className="p-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}