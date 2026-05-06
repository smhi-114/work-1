"use client"
import ProductCard from './ProductCard'

export default function ProductGrid({ items }){
	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
			{items.map(i => <ProductCard key={i.id} product={i} />)}
		</div>
	)
}
