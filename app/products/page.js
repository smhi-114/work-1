import ProductGrid from '@/components/ProductGridNew'
import { products } from '@/lib/data'

export default function ProductsPage(){
	return (
		<div className="container px-4 py-6">
			<h1 className="text-2xl font-bold mb-4">All Products</h1>
			<ProductGrid items={products} />
		</div>
	)
}
