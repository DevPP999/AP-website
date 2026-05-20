import "server-only";
import type { Locale, Dictionary, ProjectCategory } from "@/types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  th: async () => {
    const mod = await import("../messages/th.json");
    return mod.default as unknown as Dictionary;
  },
  en: async () => {
    const mod = await import("../messages/en.json");
    return mod.default as unknown as Dictionary;
  },
};

const validateProjectCategory = (
  value: string
): ProjectCategory | undefined => {
  const validCategories: ProjectCategory[] = [
    "PEA",
    "MEA",
    "EGAT",
    "Government",
    "Industrial",
    "115kV",
  ];
  return validCategories.includes(value as ProjectCategory)
    ? (value as ProjectCategory)
    : undefined;
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  // Validate locale
  if (!dictionaries[locale]) {
    throw new Error(
      `Invalid locale: ${locale}. Supported locales: ${Object.keys(
        dictionaries
      ).join(", ")}`
    );
  }

  const rawDictionary = await dictionaries[locale]();

  // Validate and transform categories
  if (rawDictionary.projects?.categories) {
    rawDictionary.projects.categories = rawDictionary.projects.categories.map(
      (category) => ({
        ...category,
        value: validateProjectCategory(category.value) || "115kV",
      })
    );
  }

  return rawDictionary as Dictionary;
};
