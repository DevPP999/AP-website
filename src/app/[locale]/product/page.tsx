import fs from "fs/promises";
import path from "path";
import ProductsView from "@/components/ProductsView";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { locale } = await params;
  const localeSafe = locale === "th" ? "th" : "en";

  // โหลดข้อมูลสินค้าและข้อความแปล
  const [productsRaw, translationsRaw] = await Promise.all([
    fs.readFile(
      path.join(
        process.cwd(),
        "src/data/product",
        `products-${localeSafe}.json`
      ),
      "utf-8"
    ),
    fs.readFile(
      path.join(
        process.cwd(),
        "src/data/product",
        `locales-${localeSafe}.json`
      ),
      "utf-8"
    ),
  ]);

  type Product = {
    id: string;
    name: string;
    description: string;
    image: string;
    category: string;
  };

  const products: Product[] = JSON.parse(productsRaw);
  const t = JSON.parse(translationsRaw);

  const categories: string[] = Array.from(
    new Set(products.map((p) => p.category))
  ).filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">{t.productsTitle}</h1>

      <ProductsView
        products={products}
        categories={categories}
        locale={localeSafe}
        translations={t}
      />
    </div>
  );
}
