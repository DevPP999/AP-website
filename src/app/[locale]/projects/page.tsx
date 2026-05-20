import { getDictionary } from "@/lib/i18n";
import React from "react";
import AllProjectsClient from "./AllProjectsClient";
import type { Locale } from "@/types";
import type { Metadata } from "next";

type Props = {
  params: Promise<{
    locale: string;
  }>;
  // Next.js will pass searchParams to generateMetadata
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] }>;
}): Promise<Metadata> {
  // `params` and `searchParams` are provided as promises by Next.js types; await them.
  const { locale } = await params;
  const localeSafe: Locale =
    locale === "th" || locale === "en" ? (locale as Locale) : "th";

  const dictionary = await getDictionary(localeSafe);

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Iampong";

  const sp = searchParams ? await searchParams : undefined;
  const rawCategory = Array.isArray(sp?.category)
    ? sp?.category[0]
    : sp?.category;

  let title = localeSafe === "th" ? "โปรเจ็กต์ทั้งหมด" : "All Projects";
  let description = dictionary.projects.subtitle || siteName;

  if (rawCategory) {
    const found = dictionary.projects.categories.find(
      (c) => String(c.value) === String(rawCategory)
    );
    if (found) {
      title = `${found.label}`;
      description = `${found.label} - ${
        dictionary.projects.subtitle || siteName
      }`;
    }
  }

  return {
    title: `${title} | ${siteName}`,
    description,
  };
}

export default async function AllProjects({ params }: Props) {
  const { locale } = await params;
  const localeSafe = locale === "th" ? "th" : "en";
  const dictionary = await getDictionary(localeSafe as Locale);

  return (
    <React.Suspense fallback={<div />}>
      <AllProjectsClient
        dictionary={dictionary.projects}
        localeSafe={localeSafe}
      />
    </React.Suspense>
  );
}
