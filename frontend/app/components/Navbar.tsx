"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      queueMicrotask(() => setLoggedIn(true));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    router.push("/");
  }

  return (
    <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold">
          SHIHABLVL100
        </Link>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <Link href="/learning" className="hover:text-white">Learn</Link>
          <Link href="/news" className="hover:text-white">News</Link>
          <Link href="/communities" className="hover:text-white">Community</Link>
          <Link href="/about" className="hover:text-white">About</Link>
        </div>
      </div>
      <div>
        {loggedIn ? (
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-white"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="text-sm text-gray-400 hover:text-white"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}