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
  const categoryById = new Map(categories.map((category) => [category.id, category]));
  const latestArticles = [...articles]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 8);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10 md:px-8">
      <section className="rounded-2xl border border-brand-border bg-gradient-to-b from-white/5 to-transparent p-8 md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
          Learning Platform
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
          Learn Smarter with Shihablvl100
        </h1>
        <p className="mt-5 max-w-2xl text-base text-brand-muted md:text-lg">
          A professional resource hub for students and self-learners exploring
          computer science, HSC, IELTS, and practical skill development.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#topics"
            className="rounded-md bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Explore Topics
          </Link>
          <Link
            href="#articles"
            className="rounded-md border border-brand-border px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30"
          >
            Browse Articles
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-brand-border bg-white/[0.02] p-4">
            <p className="text-2xl font-bold">{rootCategories.length}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-brand-muted">
              Core Topics
            </p>
          </div>
          <div className="rounded-lg border border-brand-border bg-white/[0.02] p-4">
            <p className="text-2xl font-bold">{articles.length}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-brand-muted">
              Published Articles
            </p>
          </div>
          <div className="rounded-lg border border-brand-border bg-white/[0.02] p-4">
            <p className="text-2xl font-bold">100%</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-brand-muted">
              Focused Learning
            </p>
          </div>
          <div className="rounded-lg border border-brand-border bg-white/[0.02] p-4">
            <p className="text-2xl font-bold">24/7</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-brand-muted">
              Open Access
            </p>
          </div>
        </div>
      </section>

      <section id="topics" className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Explore Topics
            </h2>
            <p className="mt-2 text-sm text-brand-muted">
              Jump into your preferred learning track.
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rootCategories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="group rounded-xl border border-brand-border bg-white/[0.02] p-6 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.04]"
            >
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p className="mt-2 text-sm text-brand-muted">
                Structured resources and guides for {category.name.toLowerCase()}
                .
              </p>
              <p className="mt-6 text-sm font-medium text-brand-accent transition group-hover:translate-x-0.5">
                View collection
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section id="articles" className="mt-14 border-t border-brand-border pt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Latest Articles
            </h2>
            <p className="mt-2 text-sm text-brand-muted">
              Fresh updates and practical learning content.
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {latestArticles.map((article) => {
            const categoryName =
              categoryById.get(article.categoryId)?.name ?? "General";

            return (
              <Link
                key={article.id}
                href={`/content/${article.slug}`}
                className="group flex h-full flex-col justify-between rounded-xl border border-brand-border bg-white/[0.02] p-6 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.04]"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
                    {categoryName}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug md:text-xl">
                    {article.title}
                  </h3>
                </div>
                <div className="mt-8 flex items-center justify-between text-sm text-brand-muted">
                  <span>
                    Updated{" "}
                    {new Date(article.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="font-medium text-white transition group-hover:translate-x-0.5">
                    Read more
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}