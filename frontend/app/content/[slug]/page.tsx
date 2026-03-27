import Link from "next/link";
import { getContents } from "../../lib/api";

type Content = {
  id: number;
  title: string;
  slug: string;
  body: string;
  categoryId: number;
  createdAt: string;
};

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const contents: Content[] = await getContents();

  const content = contents.find(c => c.slug === slug);

  if (!content) {
    return (
      <div className="mx-auto w-full max-w-5xl px-6 py-16 md:px-8">
        <div className="rounded-xl border border-brand-border bg-white/[0.02] p-8">
          <h1 className="text-2xl font-bold">Content not found</h1>
          <p className="mt-2 text-sm text-brand-muted">
            The article you requested is unavailable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-20 pt-10 md:px-8">
      <section className="rounded-2xl border border-brand-border bg-gradient-to-b from-white/5 to-transparent p-8 md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
          Article
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
          {content.title}
        </h1>
        <p className="mt-3 text-sm text-brand-muted">
          {new Date(content.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </section>

      <section className="mt-10 rounded-xl border border-brand-border bg-white/[0.02] p-6 md:p-8">
        <p className="max-w-none whitespace-pre-line text-base leading-relaxed text-gray-200">
          {content.body}
        </p>
      </section>

      <section className="mt-8">
        <Link
          href="/"
          className="inline-flex rounded-md border border-brand-border px-4 py-2 text-sm font-semibold text-brand-muted transition hover:border-white/30 hover:text-white"
        >
          Back to Home
        </Link>
      </section>
    </div>
  );
}