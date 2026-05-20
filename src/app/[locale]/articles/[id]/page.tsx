import { notFound } from "next/navigation";
import { articlesEN } from "@/data/mainData/articles-en";
import { articlesTH } from "@/data/mainData/articles-th";
import ArticleDetailClient from "./ArticleDetailClient";
import type { Metadata } from "next";
import type { Article } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const localeSafe = locale === "th" ? "th" : "en";
  const articles = localeSafe === "th" ? articlesTH : articlesEN;
  const article = articles.find((a) => String(a.id) === id) as
    | Article
    | undefined;

  if (!article) {
    notFound();
  }

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Iampong";
  const title = article?.title ? `${article.title} | ${siteName}` : siteName;
  const description =
    article?.description?.[0]?.descTitle ||
    (localeSafe === "th" ? "บทความ" : "Article");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: article?.image ? [article.image] : undefined,
    },
  };
}

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export default async function ArticleDetail({ params }: Props) {
  const { locale, id } = await params;
  const localeSafe = locale === "th" ? "th" : "en";

  const articles = localeSafe === "th" ? articlesTH : articlesEN;
  const article = articles.find((a) => String(a.id) === id) as Article;

  if (!article) return notFound();

  // ใช้เฉพาะรูปในแกลเลอรี่สำหรับ Lightbox (ไม่รวมรูปหลัก)
  const allImages = article.gallery || [];

  return (
    <ArticleDetailClient
      article={article}
      localeSafe={localeSafe}
      allImages={allImages}
    />
  );
}
