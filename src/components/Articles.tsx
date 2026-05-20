"use client";

import { useParams } from "next/navigation";
import { articlesTH } from "@/data/mainData/articles-th";
import { articlesEN } from "@/data/mainData/articles-en";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import type { Article } from "@/types";

const Articles = () => {
  const params = useParams();
  const locale = (params?.locale === "th" ? "th" : "en") as "th" | "en";

  const articles: Article[] = locale === "th" ? articlesTH : articlesEN;
  const displayedArticles = articles.slice(0, 3); // แสดงแค่ 3 บทความ

  return (
    <section id="articles" className="py-16 bg-gray-50">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Header */}
        <AnimatedSection type="fade" priority="important" delay={0.1}>
          <div className=" mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-professional-grey mb-4">
              {locale === "th" ? "บทความและข่าวสาร" : "Articles & News"}
            </h2>
            <p className="text-lg text-gray-600">
              {locale === "th"
                ? "คลังความรู้จาก AP"
                : "Knowledge Center from AP"}
            </p>
          </div>
        </AnimatedSection>

        {/* Articles Grid */}
        <AnimatedSection
          type="fade"
          priority="optional"
          stagger={0.1}
          useCSS={true}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayedArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {/* Article Image */}
                <div className="relative w-full aspect-4/3 bg-white">
                  <Image
                    src={article.image || "/images/data/aaa.gif"}
                    alt={article.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <div className="text-sm text-ap-red font-medium mb-2">
                    {locale === "th" ? "หมวดหมู่" : "Category"}:{" "}
                    {article.category}
                  </div>
                  <h3 className="text-xl font-bold text-professional-grey mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.description[0]?.descTitle || ""}
                  </p>
                  <Link
                    href={`/${locale}/articles/${article.id}`}
                    className="inline-flex items-center text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    {locale === "th" ? "อ่านเพิ่มเติม" : "Read More"}
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
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </AnimatedSection>

        {/* View All Button */}
        <AnimatedSection type="fade" priority="optional" delay={0.3}>
          <div className="text-center mt-8">
            <Link
              href={`/${locale}/articles`}
              className="inline-flex items-center bg-professional-grey hover:bg-gray-900 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              {locale === "th" ? "ดูบทความทั้งหมด" : "View All Articles"}
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
    </section>
  );
};

export default Articles;
