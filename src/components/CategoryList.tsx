"use client";

import { usePathname, useRouter } from "next/navigation";

type Props = {
  categories: string[];
  locale: string;
  translations?: {
    allCategories?: string;
    categories?: Record<string, string>;
  };
};

export default function CategoryList({
  categories,
  locale,
  translations,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const categoryPrefix = `/${locale}/product/category/`;

  const selectedValue = (() => {
    if (pathname === `/${locale}/product`) return "";
    if (pathname.startsWith(categoryPrefix)) {
      const slug = pathname.slice(categoryPrefix.length);
      return slug;
    }
    return "";
  })();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === "") {
      router.push(`/${locale}/product`);
    } else {
      router.push(`/${locale}/product/category/${value}`);
    }
  };

  return (
    <div className="mb-4">
      <select
        value={selectedValue}
        onChange={handleChange}
        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      >
        <option value="">
          {translations?.allCategories ?? "All Categories"}
        </option>
        {categories.map((cat) => {
          const slug = encodeURIComponent(cat.toLowerCase());
          const label = translations?.categories?.[cat] ?? cat;
          return (
            <option key={cat} value={slug}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
