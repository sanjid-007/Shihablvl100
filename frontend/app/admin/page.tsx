"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Category = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
};

function getCategoryPath(category: Category, allCategories: Category[]): string {
  const path: string[] = [category.name];
  let current = category;

  while (current.parentId) {
    const parent = allCategories.find(c => c.id === current.parentId);
    if (parent) {
      path.unshift(parent.name);
      current = parent;
    } else {
      break;
    }
  }

  return path.join(" → ");
}

export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catParentId, setCatParentId] = useState("");
  const [catMessage, setCatMessage] = useState("");

  const [title, setTitle] = useState("");
  const [contentSlug, setContentSlug] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [contentMessage, setContentMessage] = useState("");

  async function fetchCategories(): Promise<Category[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    return res.json();
  }

  async function loadCategories() {
    setCategories(await fetchCategories());
  }

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (!saved) {
      router.push("/login");
      return;
    }
    let cancelled = false;
    void fetchCategories().then((data) => {
      if (!cancelled) setCategories(data);
    });
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function createCategory() {
    setCatMessage("");

    const authToken = localStorage.getItem("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken ?? ""}`,
      },
      body: JSON.stringify({
        name: catName,
        slug: catSlug,
        parentId: catParentId ? Number(catParentId) : null,
        order: 0,
      }),
    });

    if (res.ok) {
      setCatMessage("Category created!");
      setCatName("");
      setCatSlug("");
      setCatParentId("");
      loadCategories();
    } else {
      setCatMessage("Failed to create category.");
    }
  }

  async function createContent() {
    setContentMessage("");

    if (!categoryId) {
      setContentMessage("Please select a category.");
      return;
    }

    const authToken = localStorage.getItem("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken ?? ""}`,
      },
      body: JSON.stringify({
        title,
        slug: contentSlug,
        body,
        categoryId: Number(categoryId),
      }),
    });

    if (res.ok) {
      setContentMessage("Content created!");
      setTitle("");
      setContentSlug("");
      setBody("");
      setCategoryId("");
    } else {
      setContentMessage("Failed to create content.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-20 pt-10 md:px-8">
      <section className="rounded-2xl border border-brand-border bg-gradient-to-b from-white/5 to-transparent p-8 md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
          Admin
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
          Dashboard
        </h1>
        <p className="mt-3 text-sm text-brand-muted md:text-base">
          Create and organize categories and learning content.
        </p>
      </section>

      <section className="mt-12 rounded-xl border border-brand-border bg-white/[0.02] p-6 md:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">Create Category</h2>

        {catMessage && (
          <p className="mb-4 mt-4 rounded-md border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-300">
            {catMessage}
          </p>
        )}

        <div className="mt-5 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Category Name"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            className="rounded-lg border border-brand-border bg-black/30 p-3 text-white outline-none transition focus:border-brand-accent"
          />
          <input
            type="text"
            placeholder="Slug (e.g. learning)"
            value={catSlug}
            onChange={(e) => setCatSlug(e.target.value)}
            className="rounded-lg border border-brand-border bg-black/30 p-3 text-white outline-none transition focus:border-brand-accent"
          />
          <select
            value={catParentId}
            onChange={(e) => setCatParentId(e.target.value)}
            className="rounded-lg border border-brand-border bg-black/30 p-3 text-white outline-none transition focus:border-brand-accent"
          >
            <option value="">No Parent (Root Category)</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {getCategoryPath(c, categories)}
              </option>
            ))}
          </select>
          <button
            onClick={createCategory}
            className="rounded-lg bg-brand-accent p-3 font-semibold text-white transition hover:opacity-90"
          >
            Create Category
          </button>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-brand-border bg-white/[0.02] p-6 md:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">Create Content</h2>

        {contentMessage && (
          <p className="mb-4 mt-4 rounded-md border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-300">
            {contentMessage}
          </p>
        )}

        <div className="mt-5 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-lg border border-brand-border bg-black/30 p-3 text-white outline-none transition focus:border-brand-accent"
          />
          <input
            type="text"
            placeholder="Slug (e.g. how-to-solve-dp)"
            value={contentSlug}
            onChange={(e) => setContentSlug(e.target.value)}
            className="rounded-lg border border-brand-border bg-black/30 p-3 text-white outline-none transition focus:border-brand-accent"
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="rounded-lg border border-brand-border bg-black/30 p-3 text-white outline-none transition focus:border-brand-accent"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {getCategoryPath(c, categories)}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Write your content in Markdown..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            className="rounded-lg border border-brand-border bg-black/30 p-3 text-white outline-none transition focus:border-brand-accent"
          />
          <button
            onClick={createContent}
            className="rounded-lg bg-brand-accent p-3 font-semibold text-white transition hover:opacity-90"
          >
            Create Content
          </button>
        </div>
      </section>
    </div>
  );
}