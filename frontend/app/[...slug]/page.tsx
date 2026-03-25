import Link from "next/link";
import { getCategories, getContents } from "../lib/api";

type Category = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  order: number;
};

type Content = {
  id: number;
  title: string;
  slug: string;
  body: string;
  categoryId: number;
  createdAt: string;
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const categories: Category[] = await getCategories();
  const contents: Content[] = await getContents();

  let currentCategory: Category | undefined;

  for (const s of slug) {
    if (!currentCategory) {
      currentCategory = categories.find(
        c => c.slug === s && c.parentId === null
      );
    } else {
      currentCategory = categories.find(
        c => c.slug === s && c.parentId === currentCategory!.id
      );
    }
  }

  if (!currentCategory) {
    return (
      <div className="px-6 py-16">
        <h1 className="text-2xl font-bold">Category not found</h1>
      </div>
    );
  }

  const children = categories.filter(
    c => c.parentId === currentCategory!.id
  );

  const categoryContents = contents.filter(
    c => c.categoryId === currentCategory!.id
  );

  return (
    <div className="px-6">
      <div className="py-16">
        <h1 className="text-5xl font-bold">{currentCategory.name}</h1>
      </div>

      {children.length > 0 && (
        <div className="py-16 border-t border-gray-800">
          <h2 className="text-sm uppercase tracking-widest text-gray-400">
            Topics
          </h2>
          <div className="grid grid-cols-3 gap-6 mt-8">
            {children.map(child => (
              <Link
                key={child.id}
                href={`/${slug.join("/")}/${child.slug}`}
                className="p-8 border border-gray-800 rounded-lg hover:border-gray-600"
              >
                <h3 className="text-2xl font-bold">{child.name}</h3>
                <p className="text-gray-500 text-sm mt-2">Explore →</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {categoryContents.length > 0 && (
        <div className="py-16 border-t border-gray-800">
          <h2 className="text-sm uppercase tracking-widest text-gray-400">
            Articles
          </h2>
          <div className="flex flex-col gap-4 mt-8">
            {categoryContents.map(content => (
              <Link
                key={content.id}
                href={`/content/${content.slug}`}
                className="p-6 border border-gray-800 rounded-lg hover:border-gray-600 flex items-center justify-between"
              >
                <h3 className="text-lg font-bold">{content.title}</h3>
                <span className="text-gray-500">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {children.length === 0 && categoryContents.length === 0 && (
        <div className="py-16">
          <p className="text-gray-500">No content yet.</p>
        </div>
      )}
    </div>
  );
}