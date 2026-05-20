"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import projectsTH from "@/data/mainData/projects.th";
import projectsEN from "@/data/mainData/projects.en";
import Image from "next/image";
import type { Projects, ProjectCategory } from "@/types";
import AnimatedSection from "@/components/AnimatedSection";

interface ProjectsProps {
  dictionary: Projects;
}

const Projects: React.FC<ProjectsProps & { locale: "th" | "en" }> = ({
  dictionary,
  locale,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("115kV");

  const projects = locale === "th" ? projectsTH : projectsEN;

  // ✅ เพิ่มส่วนนี้: กรอง duplicate categories
  const uniqueCategories = useMemo(() => {
    return dictionary.categories.filter(
      (cat, index, self) =>
        index === self.findIndex((c) => c.value === cat.value)
    );
  }, [dictionary.categories]);

  const filteredProjects = projects.filter(
    (project) => project.category === selectedCategory
  );

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value as ProjectCategory);
  };

  return (
    <section className="py-32 bg-white" id="project">
      <div className="container max-w-5xl mx-auto px-4">
        <AnimatedSection type="fade" priority="important" delay={0.1}>
          <div className="mb-12">
            <h1 className="text-2xl md:text-5xl font-bold text-professional-grey mb-8">
              {dictionary.title}
            </h1>
          </div>
        </AnimatedSection>

        <div className="max-w-6xl mx-auto">
          <AnimatedSection type="slide-up" priority="optional" delay={0.2}>
            <div className="lg:flex flex-row justify-between items-start lg:items-center mb-12 gap-6">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-semibold text-professional-grey leading-relaxed">
                  {dictionary.successText}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <label
                  htmlFor="cert-select"
                  className="text-lg font-medium text-professional-grey whitespace-nowrap"
                >
                  {dictionary.filterLabel}
                </label>
                <select
                  id="cert-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="px-4 py-2 border border-gray-300 rounded-md bg-white text-professional-grey focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 min-w-[200px]"
                >
                  {/* ✅ เปลี่ยนจาก dictionary.categories เป็น uniqueCategories */}
                  {uniqueCategories.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection
            type="fade"
            priority="optional"
            stagger={0.1}
            useCSS={true}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.length > 0 ? (
                filteredProjects.slice(0, 6).map((project) => (
                  <div
                    key={project.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                  >
                    <Link
                      href={`/${locale}/projects/${project.id}`}
                      className="block"
                    >
                      <div className="relative w-full aspect-[4/3] bg-gray-100 flex items-center justify-center">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="text-professional-grey text-center">
                            <div className="text-4xl mb-2">📋</div>
                            <p className="text-sm">No Image</p>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3 gap-3">
                          {project.year && (
                            <span className="text-sm text-ap-red whitespace-nowrap">
                              {locale === "th" ? "ปี" : "Year"}: {project.year}
                            </span>
                          )}
                          <span className="text-sm text-ap-red inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-[70%] text-right">
                            {locale === "th" ? "หมวดหมู่" : "Category"}:{" "}
                            {/* ✅ ใช้ uniqueCategories แทน */}
                            {uniqueCategories.find(
                              (c) => c.value === project.category
                            )?.label || project.category}
                          </span>
                        </div>
                        <h3 className="text-md font-semibold text-professional-grey mb-2 line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-professional-grey mb-4 line-clamp-2">
                          {Array.isArray(project.description) ? project.description.join(' ') : project.description}
                        </p>
                        <div className="mt-4">
                          <span className="inline-flex items-center text-red-600 hover:text-red-700 font-medium text-sm">
                            {locale === "th"
                              ? "อ่านเพิ่มเติม"
                              : "View Project Details"}
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
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {dictionary.noProjectsText}
                  </h3>
                  <p className="text-gray-500">
                    No projects found in this category.
                  </p>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* View All Projects Button */}
          <AnimatedSection type="fade" priority="optional" delay={0.3}>
            <div className="text-center mt-12">
              <Link
                href={`/${locale}/projects`}
                className="inline-flex items-center bg-professional-grey hover:bg-gray-900 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                {locale === "th" ? "ดูโปรเจ็กต์ทั้งหมด" : "View All Projects"}
                <svg
                  className="w-4 h-4 ml-2"
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
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Projects;
