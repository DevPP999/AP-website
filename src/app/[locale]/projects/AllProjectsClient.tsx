"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import projectsTH from "@/data/mainData/projects.th";
import projectsEN from "@/data/mainData/projects.en";
import type { Projects, ProjectCategory } from "@/types";

interface AllProjectsClientProps {
  dictionary: Projects;
  localeSafe: string;
}

export default function AllProjectsClient({
  dictionary,
  localeSafe,
}: AllProjectsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    ProjectCategory | "all"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 12;

  const projects = localeSafe === "th" ? projectsTH : projectsEN;

  // กรองโปรเจ็กต์ตามหมวดหมู่
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") {
      return projects;
    }
    return projects.filter((project) => project.category === selectedCategory);
  }, [projects, selectedCategory]);

  // คำนวณจำนวนหน้าทั้งหมด
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // โปรเจ็กต์ที่จะแสดงในหน้าปัจจุบัน
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  // จัดการการเปลี่ยนหน้า
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // จัดการการเปลี่ยนหมวดหมู่
  const handleCategoryChange = (categoryId: ProjectCategory | "all") => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  // ✅ แก้ไข: กรอง duplicate categories
  const categories = useMemo(() => {
    const allCategory = {
      value: "all" as const,
      label: localeSafe === "th" ? "ทั้งหมด" : "All",
    };

    // กรองค่าซ้ำออก โดยเก็บตัวแรกที่เจอ
    const uniqueCategories = dictionary.categories.filter(
      (cat, index, self) =>
        index === self.findIndex((c) => c.value === cat.value)
    );

    // debug logs removed: do not print categories in production

    return [allCategory, ...uniqueCategories];
  }, [dictionary.categories, localeSafe]);

  // อัปเดต document.title และ meta description ให้สอดคล้องกับหมวดหมู่ที่เลือก
  useEffect(() => {
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Iampong";

    const currentCategoryLabel =
      selectedCategory === "all"
        ? localeSafe === "th"
          ? "โปรเจ็กต์ทั้งหมด"
          : "All Projects"
        : categories.find((c) => c.value === selectedCategory)?.label ||
          String(selectedCategory);

    const newTitle = `${currentCategoryLabel} | ${siteName}`;

    document.title = newTitle;

    // update meta description if exists
    const meta = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    if (meta) {
      meta.setAttribute(
        "content",
        `${currentCategoryLabel} - ${dictionary.subtitle || siteName}`
      );
    }

    // No cleanup: do not restore previous title/description here.
    // Leaving cleanup out avoids race conditions where unmount restores a stale title
    // after client-side navigation to another page which sets its own metadata.
    return undefined;
  }, [selectedCategory, localeSafe, categories, dictionary.subtitle]);

  // ตั้งค่าเริ่มต้นของ selectedCategory จาก URL search param (เช่น ?category=PEA)
  const searchParams = useSearchParams();
  useEffect(() => {
    try {
      const cat = searchParams?.get("category");
      if (!cat) return;

      // ตรวจสอบว่า value ที่ได้อยู่ใน categories
      const exists = categories.some((c) => String(c.value) === String(cat));
      if (exists) {
        setSelectedCategory(cat as ProjectCategory);
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // เมื่อ selectedCategory เปลี่ยน ให้ update URL search param โดยไม่ทำ navigation
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
      // ignore in non-browser environments
    }
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {localeSafe === "th" ? "โปรเจ็กต์ทั้งหมด" : "All Projects"}
        </h1>
        <p className="text-lg text-gray-600">
          {dictionary.title} | {dictionary.subtitle}
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {dictionary.filterLabel}
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === cat.value
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          {localeSafe === "th" ? "พบ" : "Found"} {filteredProjects.length}{" "}
          {localeSafe === "th" ? "โปรเจ็กต์" : "projects"}
          {selectedCategory !== "all" && (
            <>
              {" "}
              {localeSafe === "th" ? "ในหมวดหมู่" : "in category"}{" "}
              {categories.find((cat) => cat.value === selectedCategory)?.label}
            </>
          )}
        </p>
      </div>

      {/* Projects Grid */}
      {currentProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project) => (
            <Link
              href={`/${localeSafe}/projects/${project.id}`}
              key={project.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 block"
            >
              {/* Project Image */}
              <div className="relative w-full aspect-4/3 bg-gray-100 flex items-center justify-center">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">📋</div>
                    <p className="text-sm">No Image</p>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  {project.year && (
                    <span className="text-sm whitespace-nowrap text-ap-red">
                      {localeSafe === "th" ? "ปี" : "Year"}: {project.year}
                    </span>
                  )}
                  <span className="text-sm overflow-hidden inline-block whitespace-nowrap text-ellipsis max-w-[70%] text-right text-ap-red">
                    {localeSafe === "th" ? "หมวดหมู่" : "Category"}:{" "}
                    {dictionary.categories.find(
                      (c) => c.value === project.category
                    )?.label || project.category}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                  {project.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {Array.isArray(project.description) ? project.description.join(' ') : project.description}
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center text-red-600 hover:text-red-700 font-medium text-sm">
                    {localeSafe === "th" ? "อ่านเพิ่มเติม" : "Read More"}
                    <svg
                      className="w-4 h-4 ml-1"
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
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {dictionary.noProjectsText}
          </h3>
          <p className="text-gray-600">
            {localeSafe === "th"
              ? "ลองเปลี่ยนหมวดหมู่ดูครับ"
              : "Try changing the category"}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {localeSafe === "th" ? "หน้าแรก" : "First"}
            </button>

            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {localeSafe === "th" ? "ก่อนหน้า" : "Previous"}
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
              )
              .map((page, index, array) => (
                <React.Fragment key={page}>
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

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {localeSafe === "th" ? "ถัดไป" : "Next"}
            </button>

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
