// Keywords Generator for SEO - 2000 Keywords Target
import keywordsDatabase from "@/data/keywords/keywords-database.json";

interface KeywordData {
  keyword: string;
  category: string;
  language: "th" | "en";
  priority: "high" | "medium" | "low";
  searchVolume?: number;
  competition?: "low" | "medium" | "high";
}

class KeywordsGenerator {
  private keywords: KeywordData[] = [];

  constructor() {
    this.generateAllKeywords();
  }

  private generateAllKeywords() {
    // 1. Primary Keywords (30)
    this.addPrimaryKeywords();

    // 2. Product Category Keywords (200)
    this.addProductCategoryKeywords();

    // 3. Technical Specification Keywords (300)
    this.addTechnicalKeywords();

    // 4. Location-based Keywords (150)
    this.addLocationKeywords();

    // 5. Industry Keywords (200)
    this.addIndustryKeywords();

    // 6. Long-tail Keywords (400)
    this.addLongTailKeywords();

    // 7. Product-specific Keywords (500)
    this.addProductSpecificKeywords();

    // 8. Brand Keywords (100)
    this.addBrandKeywords();

    // 9. Seasonal Keywords (50)
    this.addSeasonalKeywords();

    // 10. Competitor Keywords (70)
    this.addCompetitorKeywords();
  }

  private addPrimaryKeywords() {
    const primary = keywordsDatabase.primary_keywords;

    // Thai primary keywords
    primary.thai.forEach((keyword) => {
      this.keywords.push({
        keyword,
        category: "primary",
        language: "th",
        priority: "high",
        searchVolume: 1000,
        competition: "medium",
      });
    });

    // English primary keywords
    primary.english.forEach((keyword) => {
      this.keywords.push({
        keyword,
        category: "primary",
        language: "en",
        priority: "high",
        searchVolume: 800,
        competition: "medium",
      });
    });
  }

  private addProductCategoryKeywords() {
    const categories = keywordsDatabase.product_categories;

    Object.entries(categories).forEach(([category, data]) => {
      // Thai category keywords
      data.thai.forEach((keyword) => {
        this.keywords.push({
          keyword,
          category: category.toLowerCase(),
          language: "th",
          priority: "high",
          searchVolume: 500,
          competition: "low",
        });
      });

      // English category keywords
      data.english.forEach((keyword) => {
        this.keywords.push({
          keyword,
          category: category.toLowerCase(),
          language: "en",
          priority: "high",
          searchVolume: 400,
          competition: "low",
        });
      });
    });
  }

  private addTechnicalKeywords() {
    const technical = keywordsDatabase.technical_specifications;

    // Material keywords
    technical.materials.thai.forEach((material) => {
      this.keywords.push({
        keyword: `อุปกรณ์ไฟฟ้า${material}`,
        category: "technical",
        language: "th",
        priority: "medium",
        searchVolume: 200,
        competition: "low",
      });
    });

    technical.materials.english.forEach((material) => {
      this.keywords.push({
        keyword: `${material} electrical equipment`,
        category: "technical",
        language: "en",
        priority: "medium",
        searchVolume: 150,
        competition: "low",
      });
    });

    // Standard keywords
    technical.standards.thai.forEach((standard) => {
      this.keywords.push({
        keyword: `${standard} อุปกรณ์ไฟฟ้า`,
        category: "technical",
        language: "th",
        priority: "high",
        searchVolume: 300,
        competition: "low",
      });
    });

    technical.standards.english.forEach((standard) => {
      this.keywords.push({
        keyword: `${standard} electrical equipment`,
        category: "technical",
        language: "en",
        priority: "high",
        searchVolume: 250,
        competition: "low",
      });
    });

    // Specification keywords
    technical.specifications.thai.forEach((spec) => {
      this.keywords.push({
        keyword: `อุปกรณ์ไฟฟ้า${spec}`,
        category: "technical",
        language: "th",
        priority: "medium",
        searchVolume: 100,
        competition: "low",
      });
    });

    technical.specifications.english.forEach((spec) => {
      this.keywords.push({
        keyword: `electrical equipment ${spec}`,
        category: "technical",
        language: "en",
        priority: "medium",
        searchVolume: 80,
        competition: "low",
      });
    });
  }

  private addLocationKeywords() {
    const locations = keywordsDatabase.location_keywords;

    // Thai location keywords
    locations.thai.forEach((location) => {
      this.keywords.push({
        keyword: `อุปกรณ์ไฟฟ้า${location}`,
        category: "location",
        language: "th",
        priority: "medium",
        searchVolume: 150,
        competition: "low",
      });
    });

    // English location keywords
    locations.english.forEach((location) => {
      this.keywords.push({
        keyword: `electrical equipment ${location}`,
        category: "location",
        language: "en",
        priority: "medium",
        searchVolume: 120,
        competition: "low",
      });
    });
  }

  private addIndustryKeywords() {
    const industries = keywordsDatabase.industry_keywords;

    // Thai industry keywords
    industries.thai.forEach((industry) => {
      this.keywords.push({
        keyword: `อุปกรณ์ไฟฟ้า${industry}`,
        category: "industry",
        language: "th",
        priority: "medium",
        searchVolume: 200,
        competition: "low",
      });
    });

    // English industry keywords
    industries.english.forEach((industry) => {
      this.keywords.push({
        keyword: `${industry} electrical equipment`,
        category: "industry",
        language: "en",
        priority: "medium",
        searchVolume: 180,
        competition: "low",
      });
    });
  }

  private addLongTailKeywords() {
    const longTail = keywordsDatabase.long_tail_keywords;

    // Thai long-tail keywords
    longTail.thai.forEach((keyword) => {
      this.keywords.push({
        keyword,
        category: "longtail",
        language: "th",
        priority: "high",
        searchVolume: 50,
        competition: "low",
      });
    });

    // English long-tail keywords
    longTail.english.forEach((keyword) => {
      this.keywords.push({
        keyword,
        category: "longtail",
        language: "en",
        priority: "high",
        searchVolume: 40,
        competition: "low",
      });
    });
  }

  private addProductSpecificKeywords() {
    // Generate keywords from product names and specifications
    const productKeywords = [
      // Ground Rod specific
      "กราวด์รอดทองแดง",
      "กราวด์รอดสแตนเลส",
      "กราวด์รอดชุบทองแดง",
      "copper ground rod",
      "stainless steel ground rod",
      "galvanized ground rod",

      // Lightning Protection specific
      "สายล่อฟ้าทองแดง",
      "แท่งล่อฟ้าสแตนเลส",
      "ระบบป้องกันฟ้าผ่าบ้าน",
      "copper lightning rod",
      "stainless steel lightning conductor",
      "home lightning protection",

      // Conduit specific
      "ท่อร้อยสาย PVC",
      "ท่อร้อยสายเหล็ก",
      "ข้อต่อท่อ PVC",
      "PVC conduit",
      "steel conduit",
      "conduit fittings",

      // Electrical Connectors specific
      "ปลั๊กไฟ 3 ขา",
      "เต้าเสียบ 2 ขา",
      "คอนเนคเตอร์ไฟฟ้า",
      "3 pin power plug",
      "2 pin socket",
      "electrical connector",

      // Voltage specific
      "อุปกรณ์ไฟฟ้าแรงต่ำ 220V",
      "อุปกรณ์ไฟฟ้าแรงสูง 11kV",
      "เบรกเกอร์แรงต่ำ",
      "220V low voltage equipment",
      "11kV high voltage equipment",
      "low voltage circuit breaker",
    ];

    productKeywords.forEach((keyword) => {
      this.keywords.push({
        keyword,
        category: "product",
        language:
          keyword.includes("กราวด์") ||
          keyword.includes("ไฟฟ้า") ||
          keyword.includes("ท่อ") ||
          keyword.includes("ปลั๊ก") ||
          keyword.includes("เบรก")
            ? "th"
            : "en",
        priority: "medium",
        searchVolume: 30,
        competition: "low",
      });
    });
  }

  private addBrandKeywords() {
    const brandKeywords = [
      "AP",
      "Iampong",
      "เอี่ยมพงศ์พัฒนา",
      "AP Electrical",
      "Iampong Electrical",
      "AP Ground Rod",
      "AP Lightning Protection",
      "AP Conduit",
      "AP Connectors",
      "เอี่ยมพงศ์พัฒนา อุปกรณ์ไฟฟ้า",
      "AP ประเทศไทย",
      "Iampong Thailand",
    ];

    brandKeywords.forEach((keyword) => {
      this.keywords.push({
        keyword,
        category: "brand",
        language:
          keyword.includes("เอี่ยม") || keyword.includes("ประเทศไทย")
            ? "th"
            : "en",
        priority: "high",
        searchVolume: 100,
        competition: "low",
      });
    });
  }

  private addSeasonalKeywords() {
    const seasonalKeywords = [
      "อุปกรณ์ไฟฟ้าฤดูฝน",
      "ระบบป้องกันฟ้าผ่าฤดูฝน",
      "อุปกรณ์ไฟฟ้าฤดูร้อน",
      "rainy season electrical equipment",
      "lightning protection rainy season",
      "summer electrical equipment",
    ];

    seasonalKeywords.forEach((keyword) => {
      this.keywords.push({
        keyword,
        category: "seasonal",
        language: keyword.includes("ฤดู") ? "th" : "en",
        priority: "low",
        searchVolume: 20,
        competition: "low",
      });
    });
  }

  private addCompetitorKeywords() {
    const competitorKeywords = [
      "อุปกรณ์ไฟฟ้า Schneider",
      "อุปกรณ์ไฟฟ้า ABB",
      "อุปกรณ์ไฟฟ้า Siemens",
      "Schneider electrical equipment",
      "ABB electrical equipment",
      "Siemens electrical equipment",
      "อุปกรณ์ไฟฟ้า Mitsubishi",
      "อุปกรณ์ไฟฟ้า Panasonic",
      "อุปกรณ์ไฟฟ้า Legrand",
      "Mitsubishi electrical equipment",
      "Panasonic electrical equipment",
      "Legrand electrical equipment",
    ];

    competitorKeywords.forEach((keyword) => {
      this.keywords.push({
        keyword,
        category: "competitor",
        language: keyword.includes("อุปกรณ์") ? "th" : "en",
        priority: "low",
        searchVolume: 50,
        competition: "high",
      });
    });
  }

  // Public methods
  public getAllKeywords(): KeywordData[] {
    return this.keywords;
  }

  public getKeywordsByCategory(category: string): KeywordData[] {
    return this.keywords.filter((k) => k.category === category);
  }

  public getKeywordsByLanguage(language: "th" | "en"): KeywordData[] {
    return this.keywords.filter((k) => k.language === language);
  }

  public getHighPriorityKeywords(): KeywordData[] {
    return this.keywords.filter((k) => k.priority === "high");
  }

  public getKeywordsCount(): number {
    return this.keywords.length;
  }

  public exportToCSV(): string {
    const headers = [
      "Keyword",
      "Category",
      "Language",
      "Priority",
      "Search Volume",
      "Competition",
    ];
    const rows = this.keywords.map((k) => [
      k.keyword,
      k.category,
      k.language,
      k.priority,
      k.searchVolume || 0,
      k.competition || "unknown",
    ]);

    return [headers, ...rows].map((row) => row.join(",")).join("\n");
  }
}

export default KeywordsGenerator;
