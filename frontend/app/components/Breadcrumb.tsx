import Link from "next/link";

type BreadcrumbItem = {
  name: string;
  slug: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest">
      <Link
        href="/"
        className="text-white/30 hover:text-brand-accent transition-colors"
      >
        Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="text-white/15">/</span>
          {i === items.length - 1 ? (
            <span className="text-white/60">{item.name}</span>
          ) : (
            <Link
              href={`/${item.slug}`}
              className="text-white/30 hover:text-brand-accent transition-colors"
            >
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}