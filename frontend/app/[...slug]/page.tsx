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
        (c) => c.slug === s && c.parentId === null
      );
    } else {
     
      currentCategory = categories.find(
        (c) => c.slug === s && c.parentId === currentCategory!.id
      );
    }
  }

  if (!currentCategory) {
    return <div className="p-8 text-xl">Category not found</div>;
  }


  const children = categories.filter(
    (c) => c.parentId === currentCategory!.id
  );


  const categoryContents = contents.filter(
    (c) => c.categoryId === currentCategory!.id
  );

  
  const breadcrumb: string[] = [];
  let temp: Category | undefined = currentCategory;
  while (temp) {
    breadcrumb.unshift(temp.name);
    temp = categories.find((c) => c.id === temp!.parentId);
  }

  return (
    <div className="min-h-screen p-8">
     
      <div className="text-gray-500 mb-4">
        <Link href="/" className="hover:underline">Home</Link>
        {breadcrumb.map((name, i) => (
          <span key={i}> → {name}</span>
        ))}
      </div>

      <h1 className="text-4xl font-bold mb-8">{currentCategory.name}</h1>

      
      {children.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {children.map((child) => (
            <a
              key={child.id}
              href={`/${slug.join("/")}/${child.slug}`}
              className="p-6 border rounded-lg hover:bg-gray-100"
            >
              <h2 className="text-2xl font-semibold">{child.name}</h2>
            </a>
          ))}
        </div>
      )}

    
      {categoryContents.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Articles</h2>
          {categoryContents.map((content) => (
            <a
              key={content.id}
              href={`/content/${content.slug}`}
              className="block p-4 border rounded-lg hover:bg-gray-100"
            >
              <h3 className="text-xl">{content.title}</h3>
            </a>
          ))}
        </div>
      )}

     
      {children.length === 0 && categoryContents.length === 0 && (
        <p className="text-gray-500">No content yet.</p>
      )}
    </div>
  );
}