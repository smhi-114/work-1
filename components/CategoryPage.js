import CategorySection from "./CategorySection";
import ProductGridNew from "./ProductGridNew";
import { categories } from "../lib/categories";
import { products } from "../lib/data";

export default function CategoryPage({ categoryId }) {
  const category = categories.find((item) => item.id === categoryId);
  const pageProducts = products.filter((product) => product.category === categoryId);

  return (
    <div className="container px-4 py-6">
      <CategorySection />

      <section className="mt-6">
        <h1 className="text-2xl font-bold mb-4">{category?.title || "دسته‌بندی"}</h1>
        {pageProducts.length > 0 ? (
          <ProductGridNew items={pageProducts} />
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-600">
            محصولی برای این دسته‌بندی ثبت نشده است.
          </div>
        )}
      </section>
    </div>
  );
}

