// ✅ CategoryPage: src/app/[locale]/product/category/[slug]/page.tsx
import fs from "fs/promises";
import path from "path";
import ProductsView from "@/components/ProductsView";
import { notFound } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
}

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const locales = ["en", "th"];

  const params = await Promise.all(
    locales.map(async (locale) => {
      const productsPath = path.join(
        process.cwd(),
        "src/data/product",
        `products-${locale}.json`
      );
      const json = await fs.readFile(productsPath, "utf-8");
      const products: Product[] = JSON.parse(json);

      const categories = Array.from(
        new Set(products.map((p: Product) => p.category?.toLowerCase()))
      ).filter(Boolean);

      return categories.map((cat) => ({
        locale,
        slug: cat,
      }));
    })
  );

  return params.flat();
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const title =
    locale === "th" ? `สินค้าในหมวด ${slug}` : `Products in category ${slug}`;

  return {
    title,
    description: `${title} - Browse high quality products.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { locale, slug } = await params;
  const localeSafe = locale === "th" ? "th" : "en";

  const productsPath = path.join(
    process.cwd(),
    "src/data/product",
    `products-${localeSafe}.json`
  );
  const localesPath = path.join(
    process.cwd(),
    "src/data/product",
    `locales-${localeSafe}.json`
  );

  const [productsRaw, translationsRaw] = await Promise.all([
    fs.readFile(productsPath, "utf-8"),
    fs.readFile(localesPath, "utf-8"),
  ]);

  const products: Product[] = JSON.parse(productsRaw);
  const t = JSON.parse(translationsRaw);

  const slugDecoded = decodeURIComponent(slug).toLowerCase();

  const filtered = products.filter(
    (p: Product) => p.category?.toLowerCase() === slugDecoded
  );

  if (filtered.length === 0) notFound();

  // หาชื่อหมวดหมู่ที่ถูกต้องจาก locales
  const findCategoryDisplay = () => {
    if (!t?.categories) return slugDecoded;
    
    // ลองหาจาก key ที่ตรงกับ slug
    const directMatch = t.categories[slugDecoded];
    if (directMatch) return directMatch;
    
    // ลองหาจาก key ที่เป็น PascalCase (เช่น Low-High-Voltage-Hardware)
    const pascalCaseKey = Object.keys(t.categories).find(
      key => key.toLowerCase().replace(/[\s-]/g, '-') === slugDecoded.replace(/[\s-]/g, '-')
    );
    
    if (pascalCaseKey && t.categories[pascalCaseKey]) {
      return t.categories[pascalCaseKey];
    }
    
    return slugDecoded;
  };
  
  const titleDisplay = findCategoryDisplay();

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        {t.productsTitle} - {titleDisplay}
      </h1>
      <ProductsView
        products={filtered}
        categories={Object.keys(t.categories)}
        locale={localeSafe}
        translations={t}
      />
    </div>
  );
}
