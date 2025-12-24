import Link from 'next/link';
import { prisma } from '@/lib/prisma';

async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    return [];
  }
}

export default async function CategoryNav() {
  const categories = await getCategories();

  return (
    <nav className="bg-white border-b sticky top-[104px] z-40">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide py-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex items-center gap-2 whitespace-nowrap hover:text-jumia-orange transition-colors"
            >
              <span className="text-xl">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
