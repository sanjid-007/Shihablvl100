import { getCategories } from "./lib/api";
type Category = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  order: number;
}
export default async function stoic(){
  const categories : Category[] = await getCategories();

  const rootCategories = categories.filter(category => category.parentId === null);
  return (
    <div className="min-h-screen p-8">
    <h1 className="text-4xl font-bold mb-8">Shihablvl100</h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {rootCategories.map((category) => (
        <a
          key={category.id}
          href={`/${category.slug}`}
          className="p-6 border rounded-lg hover:bg-gray-100"
        >
          <h2 className="text-2xl font-semibold">{category.name}</h2>
        </a>
      ))}
    </div>
  </div>
  );
}