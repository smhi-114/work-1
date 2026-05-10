import HeroSlider from "@/components/HeroSlider";
import CategorySection from "@/components/CategorySection";
import ProductGridNew from "@/components/ProductGridNew";
import SpecialOffer from "@/components/SpecialOffer";
import { products } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="container px-4 py-6">
      <HeroSlider />

      <section className="mt-6">
        <CategorySection />
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold mb-4">پرفروش‌ترین‌ها</h2>
        <ProductGridNew items={products} />
      </section>

      <SpecialOffer items={products} />
    </div>
  );
}
