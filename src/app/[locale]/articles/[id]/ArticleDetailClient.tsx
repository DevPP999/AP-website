"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import type { Article } from "@/types";

// Props ของ component
interface ArticleDetailClientProps {
  article: Article;
  localeSafe: string;
  allImages: string[];
}

export default function ArticleDetailClient({
  article,
  localeSafe,
  allImages,
}: ArticleDetailClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* กลับไปหน้า Articles */}
      {/* หัวข้อบทความ */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        {localeSafe === "th" ? "หมวดหมู่" : "Category"}: {article.category}
      </div>

      {/* รูปภาพหลัก */}
      {article.image && (
        <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden bg-white">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-contain"
            priority={false}
          />
        </div>
      )}

      {/* เนื้อหาบทความ */}
      <div className="text-gray-800 leading-7 space-y-6">
        {article.description.map((desc, index) => (
          <div key={index}>
            {/* intro / คำอธิบายหลัก */}
            {desc.descTitle && (
              <p className="mb-4 whitespace-pre-line">{desc.descTitle}</p>
            )}

            {/* หัวข้อย่อย */}
            {desc.descTitleDetail && (
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {desc.descTitleDetail}
              </h2>
            )}

            {/* เนื้อหาหัวข้อย่อย */}
            {desc.descInfoDetail && (
              <p className="whitespace-pre-line">{desc.descInfoDetail}</p>
            )}
          </div>
        ))}
      </div>

      {/* แกลเลอรี่รูปภาพ */}
      {allImages.length > 0 && (
        <div className="mt-8">
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
                  alt={`${article.title} - gallery image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 16vw, 16vw"
                  className="object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-90"
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

          {/* ปุ่มดูแกลเลอรี่ทั้งหมด */}
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
          alt: `${article.title} - image ${index + 1}`,
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
