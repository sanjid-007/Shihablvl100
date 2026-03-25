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
    const res = await fetch("http://localhost:5000/api/categories");
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
    const res = await fetch("http://localhost:5000/api/categories", {
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
    const res = await fetch("http://localhost:5000/api/contents", {
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
    <div className="px-6 py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-12">Admin Dashboard</h1>

      <div className="mb-16">
        <h2 className="text-xl font-bold mb-4">Create Category</h2>

        {catMessage && (
          <p className="text-green-400 text-sm mb-4">{catMessage}</p>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Category Name"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Slug (e.g. learning)"
            value={catSlug}
            onChange={(e) => setCatSlug(e.target.value)}
            className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
          />
          <select
            value={catParentId}
            onChange={(e) => setCatParentId(e.target.value)}
            className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
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
            className="p-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200"
          >
            Create Category
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Create Content</h2>

        {contentMessage && (
          <p className="text-green-400 text-sm mb-4">{contentMessage}</p>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Slug (e.g. how-to-solve-dp)"
            value={contentSlug}
            onChange={(e) => setContentSlug(e.target.value)}
            className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
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
            className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
          />
          <button
            onClick={createContent}
            className="p-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200"
          >
            Create Content
          </button>
        </div>
      </div>
    </div>
  );
}