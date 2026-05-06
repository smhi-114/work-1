import { products } from '../../../lib/data'

export default function ProductPage({ params }){
	const product = products.find(p => p.id === params.id)
	if (!product) return <div className="container p-6">Product not found</div>

	return (
		<div className="container px-4 py-6">
			<h1 className="text-2xl font-bold">{product.title}</h1>
			<img src={product.image} className="w-full max-w-md mt-4" />
			<div className="mt-4">Price: ${(product.price * (1 - product.discount / 100)).toFixed(2)}</div>
			<div className="mt-2">{product.description}</div>
		</div>
	)
}
