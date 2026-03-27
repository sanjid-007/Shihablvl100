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
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-8">
        <div className="rounded-xl border border-brand-border bg-white/[0.02] p-8">
          <h1 className="text-2xl font-bold">Category not found</h1>
          <p className="mt-2 text-sm text-brand-muted">
            The requested category does not exist or may have been moved.
          </p>
        </div>
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
    <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10 md:px-8">
      <section className="rounded-2xl border border-brand-border bg-gradient-to-b from-white/5 to-transparent p-8 md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
          Category
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          {currentCategory.name}
        </h1>
      </section>

      {children.length > 0 && (
        <section className="mt-12 border-t border-brand-border pt-10">
          <h2 className="text-2xl font-semibold tracking-tight">Topics</h2>
          <p className="mt-2 text-sm text-brand-muted">
            Continue exploring sub-categories.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {children.map((child) => (
              <Link
                key={child.id}
                href={`/${slug.join("/")}/${child.slug}`}
                className="group rounded-xl border border-brand-border bg-white/[0.02] p-6 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.04]"
              >
                <h3 className="text-xl font-semibold">{child.name}</h3>
                <p className="mt-2 text-sm text-brand-muted">
                  View related resources and guides.
                </p>
                <p className="mt-6 text-sm font-medium text-brand-accent">
                  Explore topic
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {categoryContents.length > 0 && (
        <section className="mt-12 border-t border-brand-border pt-10">
          <h2 className="text-2xl font-semibold tracking-tight">Articles</h2>
          <p className="mt-2 text-sm text-brand-muted">
            Read the latest content in this category.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {categoryContents.map((content) => (
              <Link
                key={content.id}
                href={`/content/${content.slug}`}
                className="group rounded-xl border border-brand-border bg-white/[0.02] p-6 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.04]"
              >
                <h3 className="text-lg font-semibold md:text-xl">
                  {content.title}
                </h3>
                <div className="mt-6 flex items-center justify-between text-sm text-brand-muted">
                  <span>
                    {new Date(content.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="font-medium text-white">Read more</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {children.length === 0 && categoryContents.length === 0 && (
        <section className="mt-12">
          <div className="rounded-xl border border-brand-border bg-white/[0.02] p-8">
            <p className="text-brand-muted">No content has been added yet.</p>
          </div>
        </section>
      )}
    </div>
  );
}