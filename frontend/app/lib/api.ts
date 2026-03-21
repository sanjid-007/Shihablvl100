const API_URL = "http://localhost:5000/api";

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`);
  return res.json();
}

export async function getCategoryById(id: number) {
  const res = await fetch(`${API_URL}/categories/${id}`);
  return res.json();
}

export async function getContents() {
  const res = await fetch(`${API_URL}/contents`);
  return res.json();
}

export async function getContentById(id: number) {
  const res = await fetch(`${API_URL}/contents/${id}`);
  return res.json();
}