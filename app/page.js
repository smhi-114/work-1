import HeroSlider from '../components/HeroSlider'
import CategoryList from '../components/CategoryList'
import ProductGridNew from '../components/ProductGridNew'
import SpecialOffer from '../components/SpecialOffer'
import { products } from '../lib/data'

export default function Home(){
	return (
		<div className="container px-4 py-6">
			<HeroSlider />

			<section className="mt-6">
				<CategoryList />
			</section>

			<section className="mt-6">
				<h2 className="text-xl font-bold mb-4">پرفروش‌ترین‌ها</h2>
				<ProductGridNew items={products} />
			</section>

			<SpecialOffer items={products} />
		</div>
	)
}
