"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  image?: string;
  specImage?: string;
  category?: string;
  summary?: string;
  specification?: Record<string, string | number>;
}

interface General {
  summary?: string;
  fullDescription?: string;
}

interface TabProductDetailProps {
  product: Product;
  general?: General;
  specification?: Record<string, string | number>;
  tabSpec: string;
  locale: "th" | "en";
  allProducts?: Product[];
  dictionary?: {
    relatedProductsTitle: string;
    viewMoreProducts: string;
    noRelatedProducts: string;
  };
}

export default function TabProductDetail({
  product,
  tabSpec,
  locale,
  allProducts = [],
  dictionary,
}: TabProductDetailProps) {
  const router = useRouter();
  // fallback image ถ้าไม่มี
  const defaultImage = "/images/default.png";

  // หาสินค้าที่เกี่ยวข้อง - AI Smart Algorithm
  const getRelatedProducts = (
    currentProduct: Product,
    products: Product[],
    limit = 4
  ) => {
    if (products.length === 0) return [];

    // 🧠 สร้าง AI Score ให้แต่ละสินค้า
    const calculateSimilarityScore = (product: Product) => {
      let score = 0;

      // 1. Product Code Similarity (40%)
      const getCodePrefix = (id: string) => id.match(/^([A-Z]+)/)?.[1] || "";
      const currentPrefix = getCodePrefix(currentProduct.id);
      const productPrefix = getCodePrefix(product.id);

      if (productPrefix === currentPrefix) {
        score += 40;

        // ถ้า prefix เดียวกัน ดูตัวเลขด้วย
        const currentNum = parseInt(currentProduct.id.match(/\d+/)?.[0] || "0");
        const productNum = parseInt(product.id.match(/\d+/)?.[0] || "0");
        const numDiff = Math.abs(currentNum - productNum);

        if (numDiff <= 100) score += 15; // ตัวเลขใกล้เคียง +15
        else if (numDiff <= 500) score += 10; // ตัวเลขไม่ไกลมาก +10
        else if (numDiff <= 1000) score += 5; // ตัวเลขไกลหน่อย +5
      }

      // 2. Category Similarity (20%)
      if (product.category === currentProduct.category) {
        score += 20;
      }

      // 3. Name Similarity (20%)
      const currentWords = currentProduct.name.toLowerCase().split(" ");
      const productWords = product.name.toLowerCase().split(" ");
      const commonWords = currentWords.filter((word) =>
        productWords.some((pw) => pw.includes(word) || word.includes(pw))
      );
      const nameScore =
        (commonWords.length /
          Math.max(currentWords.length, productWords.length)) *
        20;
      score += nameScore;

      // 4. Price Similarity (10%)
      if (currentProduct.specification?.Price && product.specification?.Price) {
        const currentPrice = parseFloat(
          currentProduct.specification.Price.toString().replace(/[^\d.]/g, "")
        );
        const productPrice = parseFloat(
          product.specification.Price.toString().replace(/[^\d.]/g, "")
        );

        if (!isNaN(currentPrice) && !isNaN(productPrice)) {
          const priceDiff = Math.abs(currentPrice - productPrice);
          const avgPrice = (currentPrice + productPrice) / 2;
          const priceScore = Math.max(0, 10 - (priceDiff / avgPrice) * 10);
          score += priceScore;
        }
      }

      // 5. Specification Similarity (10%)
      if (currentProduct.specification && product.specification) {
        const currentSpecs = Object.keys(currentProduct.specification);
        const productSpecs = Object.keys(product.specification);
        const commonSpecs = currentSpecs.filter((spec) =>
          productSpecs.includes(spec)
        );
        const specScore =
          (commonSpecs.length /
            Math.max(currentSpecs.length, productSpecs.length)) *
          10;
        score += specScore;
      }

      return score;
    };

    // 🎯 คำนวณ score ให้ทุกสินค้า
    const scoredProducts = products
      .filter((p) => p.id !== currentProduct.id && p.image)
      .map((product) => ({
        product,
        score: calculateSimilarityScore(product),
      }))
      .sort((a, b) => b.score - a.score); // เรียงจากคะแนนสูงสุด

    // 🎲 Smart Selection Algorithm
    const result = [];
    const usedPrefixes = new Set();
    const usedCategories = new Set();

    for (const { product, score } of scoredProducts) {
      if (result.length >= limit) break;

      const productPrefix = product.id.match(/^([A-Z]+)/)?.[1] || "";

      // กลยุทธ์การเลือก:
      // 1. เอาคะแนนสูงสุด 1 ชิ้นก่อน
      if (result.length === 0) {
        result.push(product);
        usedPrefixes.add(productPrefix);
        usedCategories.add(product.category);
        continue;
      }

      // 2. หลีกเลี่ยง prefix ซ้ำ (เว้นแต่ว่าคะแนนสูงมาก)
      if (usedPrefixes.has(productPrefix) && score < 70) {
        continue;
      }

      // 3. ชอบความหลากหลายของหมวด
      if (!usedCategories.has(product.category)) {
        result.push(product);
        usedPrefixes.add(productPrefix);
        usedCategories.add(product.category);
        continue;
      }

      // 4. ถ้าคะแนนสูงมากก็เอา
      if (score >= 80) {
        result.push(product);
        usedPrefixes.add(productPrefix);
        continue;
      }

      // 5. เติมที่เหลือถ้ายังไม่ครบ
      if (result.length < limit) {
        result.push(product);
        usedPrefixes.add(productPrefix);
      }
    }

    return result.slice(0, limit);
  };

  const relatedProducts = getRelatedProducts(product, allProducts);

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Product Info */}
      <div className="grid md:grid-cols-1 gap-5 mt-4">
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {product.name}
          </h1>
          <h2 className="text-sm text-gray-800 font-semibold mb-5">
            {product.id}
          </h2>
          <p>
            {product.summary ||
              (locale === "th"
                ? "ไม่มีรายละเอียดสินค้า"
                : "No product details available")}
          </p>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-medium-grey text-professional-grey rounded hover:bg-gray-50"
          >
            {locale === "th" ? "ย้อนกลับ" : "Back"}
          </button>
          <Link
            href={`https://page.line.me/iampong`}
            target="_blank"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {locale === "th" ? "ติดต่อฝ่ายขาย" : "Contact Sales"}
          </Link>
        </div>

        <div className="border-1">
          {product.image && (
            <div className="w-full rounded overflow-hidden bg-white">
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={product.image || defaultImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spec Section */}
      <div className="mt-10">
        <section id="specs">
          <div className="mb-6">
            <div className="flex">
              <div className="border-t border-l border-r border-medium-grey bg-white px-6 py-3 rounded-t-lg">
                <h2 className="text-xl font-semibold text-professional-grey">
                  {tabSpec}
                </h2>
              </div>
              <div className="flex-1 border-b border-medium-grey self-end"></div>
            </div>
          </div>

          {(product.specImage || product.image) && (
            <div className="rounded mb-4">
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={product.specImage || product.image || defaultImage}
                  alt={`${product.name} specs`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </section>

        {/* Related Products Section */}
        {dictionary && relatedProducts.length > 0 && (
          <section className="mt-12">
            <div className="mb-6">
              <div className="flex">
                <div className="border-t border-l border-r border-medium-grey bg-white px-6 py-3 rounded-t-lg">
                  <h2 className="text-xl font-semibold text-professional-grey">
                    {dictionary.relatedProductsTitle}
                  </h2>
                </div>
                <div className="flex-1 border-b border-medium-grey self-end"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/${locale}/product/${relatedProduct.id}`}
                  className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-xl hover:border-ap-red/20 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-2">
                    <Image
                      src={relatedProduct.image || defaultImage}
                      alt={relatedProduct.name}
                      width={320} // ปรับขนาดรูปสินค้า
                      height={180} // ปรับขนาดรูปสินค้า
                      className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-ap-red transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-xs font-medium text-ap-red bg-ap-red/5 px-2 py-1 rounded-full inline-block">
                      {relatedProduct.id}
                    </p>
                    {relatedProduct.summary && (
                      <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                        {relatedProduct.summary}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {relatedProducts.length === 4 && (
              <div className="text-center mt-6">
                <Link
                  href={`/${locale}/product/category/${product.category?.toLowerCase()}`}
                  className="inline-flex items-center px-4 py-2 border border-medium-grey rounded-lg text-professional-grey hover:bg-gray-50 transition-colors"
                >
                  {dictionary.viewMoreProducts}
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </section>
        )}

        {/* No Related Products */}
        {dictionary &&
          relatedProducts.length === 0 &&
          allProducts.length > 0 && (
            <section className="mt-12">
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">{dictionary.noRelatedProducts}</p>
              </div>
            </section>
          )}
      </div>
    </div>
  );
}
