"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types";

interface AllArticlesClientProps {
  articles: Article[];
  localeSafe: string;
}

export default function AllArticlesClient({
  articles,
  localeSafe,
}: AllArticlesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  // หมวดหมู่บทความ
  const categories = useMemo(() => {
    const allCats = articles.map((article) => article.category);
    const uniqueCats = [...new Set(allCats)]; // เอาเฉพาะหมวดหมู่ที่ไม่ซ้ำกัน

    const dynamicCategories = uniqueCats.map((cat) => ({
      id: cat.toLowerCase().replace(/\s+/g, "-"), // สร้าง id ที่ปลอดภัยสำหรับ CSS/JS
      name: cat,
    }));

    // เพิ่ม "ทั้งหมด" เข้าไปข้างหน้า
    return [
      { id: "all", name: localeSafe === "th" ? "ทั้งหมด" : "All" },
      ...dynamicCategories,
    ];
  }, [articles, localeSafe]);

  // update document.title and meta based on selected category
  useEffect(() => {
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Iampong";

    const currentCategoryLabel =
      selectedCategory === "all"
        ? localeSafe === "th"
          ? "บทความและข่าวสารทั้งหมด"
          : "All Articles & News"
        : categories.find((c) => c.id === selectedCategory)?.name ||
          String(selectedCategory);

    const newTitle = `${currentCategoryLabel} | ${siteName}`;
    document.title = newTitle;

    const meta = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    if (meta) {
      meta.setAttribute(
        "content",
        `${currentCategoryLabel} - ${
          localeSafe === "th" ? "คลังความรู้จาก AP" : "Knowledge Center from AP"
        }`
      );
    }
  }, [selectedCategory, localeSafe, categories]);

  // init selectedCategory from URL search param
  const searchParams = useSearchParams();
  useEffect(() => {
    try {
      const cat = searchParams?.get("category");
      if (!cat) return;
      const exists = categories.some((c) => String(c.id) === String(cat));
      if (exists) setSelectedCategory(String(cat));
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep URL in sync (replaceState so no navigation)
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (selectedCategory === "all") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", String(selectedCategory));
      }
      window.history.replaceState({}, "", url.toString());
    } catch {
      // ignore
    }
  }, [selectedCategory]);

  // กรองบทความตามหมวดหมู่และคำค้นหา
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // กรองตามหมวดหมู่
    if (selectedCategory !== "all") {
      filtered = filtered.filter((article) =>
        article.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // กรองตามคำค้นหา
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((article) => {
        const descriptionText = article.description
          .map(
            (desc) =>
              `${desc.descTitle || ""} ${desc.descTitleDetail || ""} ${
                desc.descInfoDetail || ""
              }`
          )
          .join(" ");

        return (
          article.title.toLowerCase().includes(query) ||
          descriptionText.toLowerCase().includes(query) ||
          article.category.toLowerCase().includes(query)
        );
      });
    }

    return filtered;
  }, [articles, selectedCategory, searchQuery]);

  // คำนวณจำนวนหน้าทั้งหมด
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // บทความที่จะแสดงในหน้าปัจจุบัน
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  // จัดการการเปลี่ยนหน้า
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // จัดการการเปลี่ยนหมวดหมู่
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // กลับไปหน้าแรกเมื่อเปลี่ยนหมวดหมู่
  };

  // จัดการการค้นหา
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // กลับไปหน้าแรกเมื่อค้นหา
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {localeSafe === "th"
            ? "บทความและข่าวสารทั้งหมด"
            : "All Articles & News"}
        </h1>
        <p className="text-lg text-gray-600">
          {localeSafe === "th"
            ? "คลังความรู้จาก AP | KNOWLEDGE CENTER"
            : "Knowledge Center from AP"}
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="max-w-md">
          <input
            type="text"
            placeholder={
              localeSafe === "th" ? "ค้นหาบทความ..." : "Search articles..."
            }
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {localeSafe === "th" ? "หมวดหมู่" : "Categories"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === cat.id
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          {localeSafe === "th" ? "พบ" : "Found"} {filteredArticles.length}{" "}
          {localeSafe === "th" ? "บทความ" : "articles"}
          {selectedCategory !== "all" && (
            <>
              {" "}
              {localeSafe === "th" ? "ในหมวดหมู่" : "in category"}{" "}
              {categories.find((cat) => cat.id === selectedCategory)?.name}
            </>
          )}
        </p>
      </div>

      {/* Articles Grid */}
      {currentArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* รูปภาพบทความ */}
              <div className="relative w-full aspect-4/3 rounded-t-lg overflow-hidden">
                <Image
                  src={article.image || "/images/data/aaa.gif"}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={false}
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                  {article.title}
                </h2>
                <div className="mb-2 text-sm text-gray-500">
                  {localeSafe === "th" ? "หมวดหมู่" : "Category"}:{" "}
                  {article.category}
                </div>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {article.description[0]?.descTitle ||
                    "No description available"}
                </p>
                <Link
                  href={`/${localeSafe}/articles/${article.id}`}
                  className="text-red-600 hover:underline text-sm font-medium"
                >
                  {localeSafe === "th" ? "อ่านเพิ่มเติม →" : "Read more →"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {localeSafe === "th" ? "ไม่พบบทความ" : "No articles found"}
          </h3>
          <p className="text-gray-600">
            {localeSafe === "th"
              ? "ลองเปลี่ยนคำค้นหาหรือหมวดหมู่ดูครับ"
              : "Try changing your search terms or category"}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2">
            {/* ปุ่มหน้าแรก */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {localeSafe === "th" ? "หน้าแรก" : "First"}
            </button>

            {/* ปุ่มหน้าก่อนหน้า */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {localeSafe === "th" ? "ก่อนหน้า" : "Previous"}
            </button>

            {/* หมายเลขหน้า */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
              )
              .map((page, index, array) => (
                <React.Fragment key={page}>
                  {/* แสดง ... เมื่อมีหน้าข้าม */}
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className="px-3 py-2">...</span>
                  )}
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg border ${
                      currentPage === page
                        ? "bg-red-600 text-white border-red-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}

            {/* ปุ่มหน้าถัดไป */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {localeSafe === "th" ? "ถัดไป" : "Next"}
            </button>

            {/* ปุ่มหน้าสุดท้าย */}
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {localeSafe === "th" ? "หน้าสุดท้าย" : "Last"}
            </button>
          </div>
        </div>
      )}

      {/* Page Info */}
      {totalPages > 1 && (
        <div className="mt-4 text-center text-gray-600">
          {localeSafe === "th" ? "หน้า" : "Page"} {currentPage}{" "}
          {localeSafe === "th" ? "จาก" : "of"} {totalPages}
        </div>
      )}
    </div>
  );
}
