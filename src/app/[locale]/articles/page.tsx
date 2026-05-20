import { articlesEN } from "@/data/mainData/articles-en";
import { articlesTH } from "@/data/mainData/articles-th";
import React from "react";
import AllArticlesClient from "./AllArticlesClient";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const sp = searchParams ? await searchParams : undefined;

  const rawCategory = Array.isArray(sp?.category)
    ? sp?.category[0]
    : sp?.category;
  const localeSafe = locale === "th" ? "th" : "en";
  const dictionary = await getDictionary(localeSafe);

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Iampong";

  let title =
    localeSafe === "th" ? "บทความและข่าวสารทั้งหมด" : "All Articles & News";
  let description = dictionary?.projects?.subtitle || siteName;

  if (rawCategory) {
    // try to find a friendly label from articles data
    const articles = localeSafe === "th" ? articlesTH : articlesEN;
    const found = articles.find(
      (a) =>
        a.category &&
        String(a.category).toLowerCase().replace(/\s+/g, "-") ===
          String(rawCategory).toLowerCase()
    );
    if (found) {
      title = found.category;
      description = `${found.category} - ${
        dictionary?.projects?.subtitle || siteName
      }`;
    }
  }

  return {
    title: `${title} | ${siteName}`,
    description,
  };
}

export default async function AllArticles({ params }: Props) {
  const { locale } = await params;
  const localeSafe = locale === "th" ? "th" : "en";

  const articles = localeSafe === "th" ? articlesTH : articlesEN;
  // Preserve original IDs. Only convert purely-numeric string IDs to number;
  // otherwise keep the string to avoid producing NaN keys for slugs like "R9".
  const normalizedArticles = articles.map((a) => {
    if (typeof a.id === "string") {
      // Only convert when the string is entirely numeric (e.g. "5")
      // so slugs like "5-benefits-ground-rod" remain strings.
      const isNumeric = /^\d+$/.test(a.id);
      return {
        ...a,
        id: isNumeric ? parseInt(a.id, 10) : a.id,
      };
    }

    return a;
  });

  return (
    <React.Suspense fallback={<div />}>
      <AllArticlesClient
        articles={normalizedArticles}
        localeSafe={localeSafe}
      />
    </React.Suspense>
  );
}
