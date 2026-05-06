"use client"
import Link from 'next/link'

export default function ProductCard({ product }){
	return (
		<div className="border rounded p-3 bg-white">
			<Link href={`/products/${product.id}`}>
				<img src={product.image} className="w-full h-40 object-cover rounded" />
				<div className="mt-2 font-medium">{product.title}</div>
			</Link>
			<div className="mt-1">${(product.price*(1-product.discount/100)).toFixed(2)}</div>
		</div>
	)
}
