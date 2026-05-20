import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import TabProductDetail from "@/components/TabProductDetail";
import type { Metadata } from "next";

interface Product {
  id: string;
  name: string;
  summary?: string;
  fullDescription?: string;
  category?: string;
  image?: string;
  specImage?: string;
  general?: {
    summary?: string;
    fullDescription?: string;
  };
  specification?: Record<string, string>;
}

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { locale, id } = await params;
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
  const messagesPath = path.join(
    process.cwd(),
    "src/messages",
    `${localeSafe}.json`
  );

  const [productsRaw, translationsRaw, messagesRaw] = await Promise.all([
    fs.readFile(productsPath, "utf-8"),
    fs.readFile(localesPath, "utf-8"),
    fs.readFile(messagesPath, "utf-8"),
  ]);

  const products: Product[] = JSON.parse(productsRaw);
  const product = products.find((p) => p.id === id);
  if (!product) return notFound();

  const translations = JSON.parse(translationsRaw);
  const messages = JSON.parse(messagesRaw);
  const tabSpec = messages.product?.tabSpec || "Product Specification";

  // fallback สำหรับสินค้าเก่า
  const general: { summary?: string; fullDescription?: string } =
    product.general || {
      summary: product.summary,
      fullDescription: product.fullDescription,
    };
  const specification: Record<string, string | number> | undefined =
    product.specification || undefined;

  // ตรวจสอบว่า translations มี backButton หรือไม่
  if (!translations.backButton) {
    throw new Error("Missing 'backButton' in translations");
  }

  // --- UI ---
  // ใช้ useState แบบ client component
  // (เนื่องจากไฟล์นี้เป็น async server component ต้องแยก Tab เป็น client component)

  return (
    <TabProductDetail
      product={product}
      general={general}
      specification={specification}
      tabSpec={tabSpec}
      locale={localeSafe}
      allProducts={products}
      dictionary={{
        relatedProductsTitle:
          messages.product?.relatedProductsTitle || "Related Products",
        viewMoreProducts:
          messages.product?.viewMoreProducts || "View More Products",
        noRelatedProducts:
          messages.product?.noRelatedProducts || "No related products found",
      }}
    />
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const localeSafe = locale === "th" ? "th" : "en";

  const productsPath = path.join(
    process.cwd(),
    "src/data/product",
    `products-${localeSafe}.json`
  );

  try {
    const productsRaw = await fs.readFile(productsPath, "utf-8");
    const products: Product[] = JSON.parse(productsRaw);
    const product = products.find((p) => p.id === id);

    if (!product) {
      // ถ้าไม่เจอสินค้า ให้แสดง 404
      notFound();
    }

    const siteName = "Iampong"; // หรือ process.env.NEXT_PUBLIC_SITE_NAME
    const title = product?.name ? `${product.name} | ${siteName}` : siteName;
    const description =
      product?.summary ||
      (localeSafe === "th" ? "รายละเอียดสินค้า" : "Product details");

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        // ถ้ามีรูปหลักของสินค้า ให้ใส่ url ของรูปที่นี่
        // images: product?.image ? [new URL(product.image, process.env.NEXT_PUBLIC_SITE_URL).toString()] : undefined,
      },
    };
  } catch {
    // ถ้าไฟล์ข้อมูลมีปัญหา ให้ fallback เป็นชื่อไซต์
    return { title: "Iampong" };
  }
}
