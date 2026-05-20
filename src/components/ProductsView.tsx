"use client";

import { useState } from "react";
import CategoryList from "./CategoryList";
import ProductFilter from "./ProductFilter";

type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
};

type Translations = {
  productsTitle?: string;
  backButton?: string;
  searchPlaceholder?: string;
  allCategories?: string;
  noProducts?: string;
  categories?: Record<string, string>;
};

type Props = {
  products: Product[];
  categories: string[];
  locale: string;
  translations: Translations;
};

export default function ProductsView({
  products,
  categories,
  locale,
  translations,
}: Props) {
  const [query, setQuery] = useState("");

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="w-full sm:flex-1">
          <CategoryList
            categories={categories}
            locale={locale}
            translations={translations}
          />
        </div>

        <div className="w-full sm:w-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              translations?.searchPlaceholder || "Search by name or ID..."
            }
            className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          />
        </div>
      </div>

      <ProductFilter
        products={products}
        translations={translations}
        locale={locale}
        query={query}
        showSearch={false}
      />
    </div>
  );
}
