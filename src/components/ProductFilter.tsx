"use client";

import ProductCard from "./ProductCard";
import { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  summary?: string;
  image: string;
  category: string;
};

type Props = {
  products: Product[];
  translations: {
    productsTitle?: string;
    backButton?: string;
    searchPlaceholder?: string;
    allCategories?: string;
    noProducts?: string;
    categories?: Record<string, string>;
  };
  locale: string;
  query?: string;
  onQueryChange?: (value: string) => void;
  showSearch?: boolean;
};

export default function ProductFilter({
  products,
  translations,
  locale,
  query: controlledQuery,
  onQueryChange,
  showSearch = true,
}: Props) {
  const [internalQuery, setInternalQuery] = useState("");
  const query = controlledQuery ?? internalQuery;

  const normalizedQuery = query.trim().toLowerCase();

  const visibleProducts = useMemo(() => {
    if (!normalizedQuery) return products;
    return products.filter((p) => {
      const byName = p.name?.toLowerCase().includes(normalizedQuery);
      const byId = p.id?.toLowerCase().includes(normalizedQuery);
      return byName || byId;
    });
  }, [products, normalizedQuery]);

  return (
    <div>
      {showSearch && (
        <div className="mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              const next = e.target.value;
              if (onQueryChange) onQueryChange(next);
              else setInternalQuery(next);
            }}
            placeholder={
              translations.searchPlaceholder || "Search by name or ID..."
            }
            className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          />
        </div>
      )}

      {visibleProducts.length === 0 ? (
        <p>{translations.noProducts || "No products found."}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
