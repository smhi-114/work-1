"use client"

import { useCartStore } from '../../store/cart-store'

export default function CartPage(){
	const items = useCartStore(state => state.items)
	const increase = useCartStore(state => state.increase)
	const decrease = useCartStore(state => state.decrease)
	const removeItem = useCartStore(state => state.removeItem)
	const subtotal = useCartStore(state => state.items.reduce((s, i) => s + ((i.product.price || 0) * (1 - (i.product.discount || 0)/100)) * (i.quantity || 0), 0))

	if (!items || items.length === 0) return <div className="container p-6">Your cart is empty</div>

	return (
		<div className="container px-4 py-6">
			<h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="md:col-span-2">
					{items.map(it => (
						<div key={it.product.id} className="flex items-center gap-4 p-4 border rounded mb-3">
							<img src={it.product.image} className="w-24 h-24 object-cover" />
							<div className="flex-1">
								<div className="font-semibold">{it.product.title}</div>
								<div className="text-sm text-gray-600">${(it.product.price*(1-it.product.discount/100)).toFixed(2)}</div>
							</div>
							<div className="flex items-center gap-2">
								<button onClick={() => decrease(it.product.id)} className="px-2">-</button>
								<div>{it.quantity}</div>
								<button onClick={() => increase(it.product.id)} className="px-2">+</button>
								<button onClick={() => removeItem(it.product.id)} className="text-red-600 ml-4">Remove</button>
							</div>
						</div>
					))}
				</div>
				<aside className="p-4 border rounded">
					<div className="font-semibold">Order Summary</div>
					<div className="mt-2">Subtotal: ${Number(subtotal).toFixed(2)}</div>
				</aside>
			</div>
		</div>
	)
}
