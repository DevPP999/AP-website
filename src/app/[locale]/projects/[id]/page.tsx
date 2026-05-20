import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/types";
import projectsTH from "@/data/mainData/projects.th";
import projectsEN from "@/data/mainData/projects.en";
import ProjectDetailClient from "./ProjectDetailClient";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const localeSafe = locale === "th" ? "th" : "en";
  const all = localeSafe === "th" ? projectsTH : projectsEN;
  const project = all.find((p) => String(p.id) === id);

  if (!project) {
    // Let Next.js show 404 for missing project
    notFound();
  }

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Iampong";
  const title = project?.title ? `${project.title} | ${siteName}` : siteName;
  const description =
    Array.isArray(project?.description) ? project.description.join(' ') : project?.description ||
    (localeSafe === "th" ? "รายละเอียดโปรเจ็ค" : "Project details");

  const openGraph: Metadata["openGraph"] = {
    title,
    description,
    // If image is present, include it for rich previews
    images: project?.image ? [project.image] : undefined,
  };

  return {
    title,
    description,
    openGraph,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const localeSafe = (locale === "th" ? "th" : "en") as Locale;
  const dictionary = await getDictionary(localeSafe);
  const all = localeSafe === "th" ? projectsTH : projectsEN;
  const project = all.find((p) => String(p.id) === id);

  if (!project) {
    return null;
  }

  const allImages: string[] = [
    ...(project.image ? [project.image] : []),
    ...(project.gallery || []),
  ];

  return (
    <ProjectDetailClient
      project={project}
      localeSafe={localeSafe}
      allImages={allImages}
      dictionary={dictionary.projects}
    />
  );
}
