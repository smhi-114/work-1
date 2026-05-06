"use client"
export default function CartItem({ item, onIncrease, onDecrease, onRemove }){
	return (
		<div className="flex items-center gap-4 p-4 border rounded mb-3">
			<img src={item.product.image} className="w-24 h-24 object-cover" />
			<div className="flex-1">
				<div className="font-semibold">{item.product.title}</div>
				<div className="text-sm text-gray-600">${(item.product.price*(1-item.product.discount/100)).toFixed(2)}</div>
			</div>
			<div className="flex items-center gap-2">
				<button onClick={()=>onDecrease(item.product.id)} className="px-2">-</button>
				<div>{item.quantity}</div>
				<button onClick={()=>onIncrease(item.product.id)} className="px-2">+</button>
				<button onClick={()=>onRemove(item.product.id)} className="text-red-600 ml-4">Remove</button>
			</div>
		</div>
	)
}
