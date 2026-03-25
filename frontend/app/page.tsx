import Link from "next/link";
import { getCategories, getContents } from "./lib/api";

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
  updatedAt: string;
};
export default async function Home() {
  const categories: Category[] = await getCategories();
  const articles: Content[] = await getContents();
  const rootCategories = categories.filter((c) => c.parentId === null);

  return (
    <div className="px-6">
      <div className="py-20">
        <p className="text-sm text-blue-400 uppercase tracking-widest">
          Welcome
        </p>
        <h1 className="text-5xl font-bold mt-4">
          Shihablvl100
        </h1>
        <p className="text-gray-500 mt-4 max-w-lg">
          A curated collection of tutorials and resources on
          Computer Science, HSC, IELTS, and beyond.
        </p>
      </div>

      <div className="py-16 border-t border-gray-800">
        <h2 className="text-sm uppercase tracking-widest text-gray-400">
          Explore Topics
        </h2>
        <div className="grid grid-cols-3 gap-6 mt-8">
          {rootCategories.map((c) => (
            <Link
              key={c.id}
              href={`/${c.slug}`}
              className="p-8 border border-gray-800 rounded-lg hover:border-gray-600"
            >
              <h3 className="text-2xl font-bold">{c.name}</h3>
              <p className="text-gray-500 text-sm mt-2">
                Explore {c.name.toLowerCase()} →
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className="py-16 border-t border-gray-800">
        <h2 className="text-xl text-gray-400">Explore Articles</h2>
        <div className="flex flex-col gap-6 mt-5">
          {articles.map(e => (
            <Link key={e.id} href={`/content/${e.slug}`} className="p-6 border border-gray-800 rounded-lg hover:border-gray-600 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">{e.categoryId}</p>
                <h3 className="text-lg font-bold mt-1">{e.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}