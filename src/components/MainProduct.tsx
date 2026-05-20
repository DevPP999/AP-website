import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

type MainProductProps = {
  dictionary: {
    title: string;
    products: {
      category: string;
      image: string;
      title: string;
      description?: string;
    }[];
  };
  locale?: string;
};

const MainProduct: React.FC<MainProductProps> = ({ dictionary, locale }) => {
  const products = dictionary.products;

  const CATEGORY_ALIAS_TO_SLUG: Record<string, string> = {
    ground: "Ground-System",
    hardware: "Low-High-Voltage-Hardware",
    lorfah: "Lightning-Protection-System",
    fire: "Street-Lighting",
    tor: "Conduit-Fittings",
    call: "Telecom-Hardware",
    lighting: "Electrical-Connectors",
    underground: "Underground-Electrical-Equipment",
  };

  return (
    <section
      id="main-product"
      className="min-h-screen relative py-16"
      style={{
        backgroundImage: `linear-gradient(rgba(240, 240, 240, 0.85), rgba(240, 240, 240, 0.85)), url('/background/3.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
      }}
    >
      <div className="container mx-auto max-w-5xl px-4 space-y-12">
        {/* Title */}
        <AnimatedSection type="slide-up" priority="important" delay={0.1}>
          <div className="">
            <h2 className="text-2xl md:text-2xl font-bold text-professional-grey">
              {dictionary.title}
            </h2>
          </div>
        </AnimatedSection>

        {/* Products Grid */}
        <AnimatedSection
          type="fade"
          priority="optional"
          stagger={0.1}
          useCSS={true}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
            {products.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-1 text-xl font-medium text-center gap-4"
              >
                <Link
                  href={`/${locale ?? ""}/product/category/${encodeURIComponent(
                    (
                      CATEGORY_ALIAS_TO_SLUG[product.category.toLowerCase()] ||
                      product.category
                    ).toLowerCase()
                  )}`}
                  className="no-underline hover:text-red-600"
                >
                  <div className="w-full max-w-[300px] aspect-square mx-auto relative rounded-full overflow-hidden transition-transform duration-300 border-0 ring-0 outline-none bg-transparent">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover scale-[1.02]"
                      priority={index < 4}
                    />
                  </div>
                  <h5 className="mt-2 font-semibold">{product.title}</h5>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default MainProduct;
