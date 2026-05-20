type Product = {
  id: string;
  name: string;
  description: string;
};

type Props = {
  products: Product[];
  locale: string;
};

export default function ProductList({ products, locale }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Products ({locale.toUpperCase()})
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((p) => (
          <li
            key={p.id}
            className="border rounded-lg p-5 shadow hover:shadow-lg transition-shadow bg-white"
          >
            <a
              href={`/${locale}/product/${p.id}`}
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {p.name}
            </a>
            <p className="mt-2 text-gray-700">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
