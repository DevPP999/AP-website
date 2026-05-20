export interface ArticleDescription {
  descTitle?: string; // บทนำ
  descTitleDetail?: string; // หัวข้อย่อย
  descInfoDetail?: string; // รายละเอียดของหัวข้อย่อย
}

export interface Article {
  id: number | string;
  title: string;
  category: string;
  description: ArticleDescription[]; // array ของ object
  image: string;
  gallery?: string[];
}

export const articlesEN: Article[] = [
  {
    id: "5-benefits-ground-rod",
    title:
      "5 Advantages of Installing Ground Rods: Safety That Cannot Be Overlooked",
    category: "Article",
    description: [
      {
        descTitle:
          "The installation of ground rods is an important component that many may overlook. However, having a proper and complete grounding system is a fundamental aspect of electrical safety in homes, buildings, and industrial plants. Let's take a look at the 5 key advantages of installing ground rods that cannot be ignored.",
      },
      {
        descTitleDetail: "1. Protects Against Electric Shock",
        descInfoDetail:
          "When electrical leakage occurs from electrical equipment, the ground rod serves as a pathway for excess current to flow into the ground immediately. This significantly reduces the risk of electric shock, especially when there is a malfunction with metal-bodied electrical appliances.",
      },
      {
        descTitleDetail: "2. Protects Electrical Equipment from Damage",
        descInfoDetail:
          "When lightning strikes or there is a sudden surge of electricity, the grounding system helps dissipate these high-voltage currents into the ground quickly. This protects electrical equipment in the home from damage and extends the lifespan of electrical appliances.",
      },
      {
        descTitleDetail: "3. Helps Circuit Breakers Work Effectively",
        descInfoDetail:
          "Residual Current Devices (RCDs or Breakers) work most effectively when there is a complete grounding system in place. When a leakage current flows into the ground, the circuit breaker can detect the anomaly and cut off the electrical circuit immediately, providing dual protection.",
      },
      {
        descTitleDetail: "4. Reduces Electrical Noise",
        descInfoDetail:
          "In some cases, electrical currents that are not properly grounded can cause electrical noise, which may affect the operation of certain electronic devices or the quality of audio and video signals. Having a good grounding system helps mitigate this issue, ensuring smooth operation of various devices.",
      },
      {
        descTitleDetail: "5. Complies with Safety Standards",
        descInfoDetail:
          "Installing a grounding system, including ground rods, is a requirement according to electrical installation standards for buildings and follows international best practices. This ensures that the electrical system is as safe as possible. Adhering to these standards not only helps protect lives and property but also demonstrates a commitment to user safety.",
      },
    ],
    image: "/images/article/5-benefits/0.webp",
    gallery: [
      "/images/article/5-benefits/1.webp",
      "/images/article/5-benefits/2.webp",
      "/images/article/5-benefits/3.webp",
      "/images/article/5-benefits/4.webp",
      "/images/article/5-benefits/5.webp",
    ],
  },

  {
    id: "R9",
    title: "Join in mourning on the occasion of the passing of King Rama IX",
    category: "News and Events",
    description: [
      {
        descTitle:
          "The executives and staff of Iampong Development Co., Ltd. stood in silence to pay their respects on the occasion of the passing of His Majesty King Bhumibol Adulyadej (Rama IX), to express their deepest gratitude for His boundless benevolence and to draw inspiration from His principles to develop the organization and carry out work that contributes value to society.",
      },
    ],
    image: "/images/article/R9/0.webp",
    gallery: ["/images/article/R9/0.webp", "/images/article/R9/1.webp"],
  },

  {
    id: "travel",
    title: "Annual Tourism Activities 2023",
    category: "News and Events",
    description: [
      {
        descTitle:
          "Iampong Development Co., Ltd. organized the Annual Tourism Activities 2023 to promote good relationships between employees and management, as well as to provide relaxation after a year of hard work. This event took place from October 20-22, 2023, in Chiang Mai Province.",
      },
    ],
    image: "/images/article/travel/0.webp",
    gallery: [
      "/images/article/travel/0.webp",
      "/images/article/travel/1.webp",
      "/images/article/travel/2.webp",
      "/images/article/travel/3.webp",
      "/images/article/travel/4.webp",
    ],
  },

  {
    id: "new-year-2024",
    title: "Year-End Happiness Sharing and New Year 2024 Celebration",
    category: "News and Events",
    description: [
      {
        descTitle:
          "Iampong Development Co., Ltd. organized a year-end and New Year 2024 celebration on December 27, 2023, at the company's headquarters. The event aimed to foster good relationships between employees and management, as well as to show appreciation for their dedication and hard work throughout the past year.",
      },
    ],
    image: "/images/article/newyear2024/0.webp",
    gallery: [
      "/images/article/newyear2024/1.webp",
      "/images/article/newyear2024/2.webp",
      "/images/article/newyear2024/3.webp",
      "/images/article/newyear2024/4.webp",
      "/images/article/newyear2024/5.webp",
    ],
  },
];
