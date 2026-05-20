// Keywords Manager for SEO - Manage 2000+ Keywords
import KeywordsGenerator from "./keywords-generator";

interface KeywordData {
  keyword: string;
  category: string;
  language: "th" | "en";
  priority: "high" | "medium" | "low";
  searchVolume?: number;
  competition?: "low" | "medium" | "high";
}

interface KeywordStats {
  total: number;
  byCategory: { [key: string]: number };
  byLanguage: { th: number; en: number };
  byPriority: { high: number; medium: number; low: number };
  byCompetition: { low: number; medium: number; high: number };
}

class KeywordsManager {
  private generator: KeywordsGenerator;
  private keywords: KeywordData[];

  constructor() {
    this.generator = new KeywordsGenerator();
    this.keywords = this.generator.getAllKeywords();
  }

  // Get comprehensive keyword statistics
  public getKeywordStats(): KeywordStats {
    const stats: KeywordStats = {
      total: this.keywords.length,
      byCategory: {},
      byLanguage: { th: 0, en: 0 },
      byPriority: { high: 0, medium: 0, low: 0 },
      byCompetition: { low: 0, medium: 0, high: 0 },
    };

    this.keywords.forEach((keyword) => {
      // Count by category
      stats.byCategory[keyword.category] =
        (stats.byCategory[keyword.category] || 0) + 1;

      // Count by language
      stats.byLanguage[keyword.language]++;

      // Count by priority
      stats.byPriority[keyword.priority]++;

      // Count by competition
      if (keyword.competition) {
        stats.byCompetition[keyword.competition]++;
      }
    });

    return stats;
  }

  // Get keywords for specific use cases
  public getKeywordsForMetaTags(): string[] {
    return this.keywords
      .filter(
        (k) => k.priority === "high" && k.searchVolume && k.searchVolume > 100
      )
      .slice(0, 50)
      .map((k) => k.keyword);
  }

  public getKeywordsForContent(): string[] {
    return this.keywords
      .filter((k) => k.priority === "high" || k.priority === "medium")
      .map((k) => k.keyword);
  }

  public getKeywordsForSitemap(): string[] {
    return this.keywords
      .filter((k) => k.searchVolume && k.searchVolume > 50)
      .map((k) => k.keyword);
  }

  // Generate keyword variations
  public generateKeywordVariations(baseKeyword: string): string[] {
    const variations: string[] = [];

    // Add base keyword
    variations.push(baseKeyword);

    // Add with "Thailand"
    variations.push(`${baseKeyword} Thailand`);
    variations.push(`${baseKeyword} ประเทศไทย`);

    // Add with "price"
    variations.push(`${baseKeyword} price`);
    variations.push(`${baseKeyword} ราคา`);

    // Add with "supplier"
    variations.push(`${baseKeyword} supplier`);
    variations.push(`${baseKeyword} ผู้จำหน่าย`);

    // Add with "manufacturer"
    variations.push(`${baseKeyword} manufacturer`);
    variations.push(`${baseKeyword} ผู้ผลิต`);

    // Add with "buy"
    variations.push(`buy ${baseKeyword}`);
    variations.push(`ซื้อ ${baseKeyword}`);

    return variations;
  }

  // Generate keyword clusters
  public generateKeywordClusters(): { [key: string]: string[] } {
    const clusters: { [key: string]: string[] } = {};

    this.keywords.forEach((keyword) => {
      const cluster = keyword.category;
      if (!clusters[cluster]) {
        clusters[cluster] = [];
      }
      clusters[cluster].push(keyword.keyword);
    });

    return clusters;
  }

  // Get trending keywords (simulated)
  public getTrendingKeywords(): KeywordData[] {
    return this.keywords
      .filter((k) => k.searchVolume && k.searchVolume > 200)
      .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
      .slice(0, 20);
  }

  // Get low competition keywords
  public getLowCompetitionKeywords(): KeywordData[] {
    return this.keywords
      .filter(
        (k) => k.competition === "low" && k.searchVolume && k.searchVolume > 50
      )
      .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0));
  }

  // Generate keyword report
  public generateKeywordReport(): string {
    const stats = this.getKeywordStats();
    const trending = this.getTrendingKeywords();
    const lowComp = this.getLowCompetitionKeywords();

    let report = `# SEO Keywords Report\n\n`;
    report += `## Total Keywords: ${stats.total}\n\n`;

    report += `## By Category:\n`;
    Object.entries(stats.byCategory).forEach(([category, count]) => {
      report += `- ${category}: ${count}\n`;
    });

    report += `\n## By Language:\n`;
    report += `- Thai: ${stats.byLanguage.th}\n`;
    report += `- English: ${stats.byLanguage.en}\n`;

    report += `\n## By Priority:\n`;
    report += `- High: ${stats.byPriority.high}\n`;
    report += `- Medium: ${stats.byPriority.medium}\n`;
    report += `- Low: ${stats.byPriority.low}\n`;

    report += `\n## Top Trending Keywords:\n`;
    trending.slice(0, 10).forEach((keyword, index) => {
      report += `${index + 1}. ${keyword.keyword} (Volume: ${
        keyword.searchVolume
      })\n`;
    });

    report += `\n## Low Competition Keywords (Top 10):\n`;
    lowComp.slice(0, 10).forEach((keyword, index) => {
      report += `${index + 1}. ${keyword.keyword} (Volume: ${
        keyword.searchVolume
      })\n`;
    });

    return report;
  }

  // Export keywords to different formats
  public exportKeywords(format: "json" | "csv" | "txt"): string {
    switch (format) {
      case "json":
        return JSON.stringify(this.keywords, null, 2);
      case "csv":
        return this.generator.exportToCSV();
      case "txt":
        return this.keywords.map((k) => k.keyword).join("\n");
      default:
        return "";
    }
  }
}

export default KeywordsManager;
