// SEO utilities and helpers

// Generate meta descriptions
export function generateMetaDescription(
  content: string,
  maxLength: number = 160,
  _locale: string = "th"
): string {
  const cleanContent = content
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  // Find the last complete sentence within the limit
  const truncated = cleanContent.substring(0, maxLength);
  const lastSentenceEnd = Math.max(
    truncated.lastIndexOf("."),
    truncated.lastIndexOf("!"),
    truncated.lastIndexOf("?")
  );

  if (lastSentenceEnd > maxLength * 0.7) {
    return truncated.substring(0, lastSentenceEnd + 1);
  }

  // Fallback: truncate at word boundary
  const lastSpace = truncated.lastIndexOf(" ");
  return truncated.substring(0, lastSpace) + "...";
}

// Generate page titles
export function generatePageTitle(
  title: string,
  siteName: string = "Iampong",
  separator: string = " | ",
  maxLength: number = 60
): string {
  const fullTitle = `${title}${separator}${siteName}`;

  if (fullTitle.length <= maxLength) {
    return fullTitle;
  }

  // Truncate title if too long
  const maxTitleLength = maxLength - siteName.length - separator.length;
  return `${title.substring(0, maxTitleLength)}${separator}${siteName}`;
}

// Generate keywords from content
export function extractKeywords(
  content: string,
  maxKeywords: number = 10,
  locale: string = "th"
): string[] {
  const stopWords =
    locale === "th"
      ? ["และ", "หรือ", "ที่", "ใน", "ของ", "กับ", "เป็น", "มี", "จะ", "ได้"]
      : ["and", "or", "the", "a", "an", "in", "on", "at", "to", "for"];

  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, " ") // Remove punctuation
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.includes(word));

  // Count word frequency
  const wordCount: { [key: string]: number } = {};
  words.forEach((word) => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  // Sort by frequency and return top keywords
  return Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

// Generate canonical URLs
export function generateCanonicalUrl(
  path: string,
  baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

// Generate Open Graph data
export function generateOpenGraphData({
  title,
  description,
  url,
  image,
  type = "website",
  locale = "th",
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  type?: string;
  locale?: string;
}) {
  return {
    "og:title": title,
    "og:description": description,
    "og:url": url,
    "og:image": image,
    "og:type": type,
    "og:locale": locale === "th" ? "th_TH" : "en_US",
    "og:site_name": "Iampong",
  };
}

// Generate Twitter Card data
export function generateTwitterCardData({
  title,
  description,
  image,
  card = "summary_large_image",
}: {
  title: string;
  description: string;
  image: string;
  card?: string;
}) {
  return {
    "twitter:card": card,
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": image,
  };
}

// Validate URL structure
export function validateUrlStructure(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "https:" || urlObj.protocol === "http:";
  } catch {
    return false;
  }
}

// Generate breadcrumb data
export function generateBreadcrumbData(
  path: string,
  locale: string = "th"
): Array<{ name: string; url: string }> {
  const segments = path.split("/").filter(Boolean);
  const breadcrumbs = [
    { name: locale === "th" ? "หน้าแรก" : "Home", url: `/${locale}` },
  ];

  let currentPath = `/${locale}`;
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const name = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    breadcrumbs.push({
      name,
      url: currentPath,
    });
  });

  return breadcrumbs;
}

// Generate sitemap data
export function generateSitemapData(
  pages: Array<{
    url: string;
    lastModified: string;
    changeFrequency:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never";
    priority: number;
  }>
) {
  return {
    urlset: {
      "@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
      url: pages.map((page) => ({
        loc: page.url,
        lastmod: page.lastModified,
        changefreq: page.changeFrequency,
        priority: page.priority,
      })),
    },
  };
}

// Content optimization
export function optimizeContentForSEO(content: string): string {
  return content
    .replace(/\s+/g, " ") // Normalize whitespace
    .replace(/\n\s*\n/g, "\n\n") // Normalize line breaks
    .trim();
}

// Generate internal linking suggestions
export function generateInternalLinks(
  content: string,
  availablePages: string[]
): Array<{ text: string; url: string; position: number }> {
  const links: Array<{ text: string; url: string; position: number }> = [];

  availablePages.forEach((page, _index) => {
    const pageTitle = page.split("/").pop()?.replace(/-/g, " ") || "";
    const regex = new RegExp(`\\b${pageTitle}\\b`, "gi");
    let match;

    while ((match = regex.exec(content)) !== null) {
      links.push({
        text: match[0],
        url: page,
        position: match.index,
      });
    }
  });

  return links;
}
