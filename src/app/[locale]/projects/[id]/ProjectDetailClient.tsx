"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import type { ProjectItem, Projects } from "@/types";

interface ProjectDetailClientProps {
  project: ProjectItem;
  localeSafe: "th" | "en";
  allImages: string[];
  dictionary: Projects;
}

export default function ProjectDetailClient({
  project,
  localeSafe,
  allImages,
}: ProjectDetailClientProps) {
  // Ensure document title/meta update on client-side navigation
  useEffect(() => {
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Iampong";
    const title = project?.title ? `${project.title} | ${siteName}` : siteName;
    document.title = title;

    const meta = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    if (meta) {
      meta.setAttribute(
        "content",
        Array.isArray(project?.description) ? project?.description.join('\n\n') : project?.description ||
          (localeSafe === "th" ? "รายละเอียดโปรเจ็ค" : "Project details")
      );
    }

    try {
      const og = document.querySelector(
        'meta[property="og:title"]'
      ) as HTMLMetaElement | null;
      if (og) og.setAttribute("content", title);
      const ogDesc = document.querySelector(
        'meta[property="og:description"]'
      ) as HTMLMetaElement | null;
      if (ogDesc) ogDesc.setAttribute("content", Array.isArray(project?.description) ? project?.description.join('\n\n') : project?.description || "");
      const ogImage = document.querySelector(
        'meta[property="og:image"]'
      ) as HTMLMetaElement | null;
      if (ogImage && project?.image)
        ogImage.setAttribute("content", project.image);
    } catch {
      // ignore
    }

    // no cleanup: allow destination pages to set their own metadata
  }, [project, localeSafe]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        {project.year && (
          <span className="mr-3">
            {localeSafe === "th" ? "ปี" : "Year"}: {project.year}
          </span>
        )}
        <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">
          {project.category.toUpperCase()}
        </span>
      </div>

      {project.image && (
        <div className="relative w-full aspect-[16/9] mb-6 rounded-lg overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover"
          />
        </div>
      )}

      {project.description && (
  <p className="text-gray-800 leading-7 whitespace-pre-line mb-8">
    {Array.isArray(project.description) 
      ? project.description.join('\n\n') 
      : project.description}
  </p>
)}

      {allImages.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {localeSafe === "th" ? "แกลเลอรีรูปภาพ" : "Image Gallery"}
          </h2>
          <div className="grid grid-cols-6 gap-2">
            {allImages.slice(0, 6).map((imageUrl, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={imageUrl}
                  alt={`${project.title} - gallery image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 16vw, 16vw"
                  className="object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-70"
                />
                {/* Overlay effect */}
                <div className="absolute inset-0 rounded group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-8 h-8 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setLightboxIndex(0);
                setLightboxOpen(true);
              }}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
            >
              {localeSafe === "th" ? "ดูแกลเลอรี่ทั้งหมด" : "View All Images"}
            </button>
          </div>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={allImages.map((imageUrl, index) => ({
          src: imageUrl,
          alt: `${project.title} - image ${index + 1}`,
        }))}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true }}
        render={{
          buttonPrev: allImages.length <= 1 ? () => null : undefined,
          buttonNext: allImages.length <= 1 ? () => null : undefined,
        }}
      />
    </div>
  );
}
