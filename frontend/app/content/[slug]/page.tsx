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
      <div className="px-6 py-16">
        <h1 className="text-2xl font-bold">Content not found</h1>
      </div>
    );
  }

  return (
    <div className="px-6">
      <div className="py-16">
        <h1 className="text-4xl font-bold">{content.title}</h1>
        <p className="text-gray-500 mt-2 text-sm">
          {new Date(content.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="py-8 border-t border-gray-800">
        <p className="text-gray-300 leading-relaxed whitespace-pre-line max-w-2xl">
          {content.body}
        </p>
      </div>

      <div className="py-8 border-t border-gray-800">
        <Link href="/" className="text-gray-500 hover:text-white">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}