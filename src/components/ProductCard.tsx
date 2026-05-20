"use client";

import Image from "next/image";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  summary?: string;
  image: string;
  category: string;
};

type Props = {
  product: Product;
  locale: string;
};

export default function ProductCard({ product, locale }: Props) {
  return (
    <div className="border rounded p-4 hover:shadow-lg transition-shadow h-full flex flex-col">
      <Link href={`/${locale}/product/${product.id}`} className="block">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={200}
          className="object-contain w-full h-48 mb-3 rounded bg-white"
        />
      </Link>

      <div className="flex-1">
        <h2 className="text-lg text-center font-semibold line-clamp-1">
          {product.name}
        </h2>
        <p className="text-sm text-center text-gray-800 font-medium line-clamp-1">
          {product.id}
        </p>
        {product.summary && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">
            {product.summary}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <Link
          href={`/${locale}/product/${product.id}`}
          className="px-3 py-2 rounded text-white bg-ap-red hover:bg-red-700 text-sm font-semibold"
        >
          {locale === "th" ? "รายละเอียดสินค้า" : "Detail Product"}
        </Link>
      </div>
    </div>
  );
}
