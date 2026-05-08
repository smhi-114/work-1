"use client"
import Link from 'next/link'
import { useCartStore } from '../store/cart-store'

export default function ProductCardNew({ product }){
  const addItem = useCartStore(state => state.addItem)
  const originalPrice = product?.price || 0
  const discount = product?.discount || 0
  const price = (originalPrice * (1 - discount / 100)).toFixed(2)

  return (
    <div className="card p-3 shadow-sm hover:shadow-lg ease-fast transform hover:-translate-y-1">
      <Link href={`/products/${product.id}`}>
        <div className="w-full aspect-square overflow-hidden rounded-lg bg-gray-50">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>
      </Link>
      <div className="mt-3">
        <div className="font-medium text-sm line-clamp-2">{product.title}</div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <div className="text-red-600 font-extrabold">{price} تومان</div>
            {discount>0 && <div className="text-xs text-gray-400 line-through">{originalPrice} تومان</div>}
          </div>
          <button onClick={()=> addItem(product,1)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">افزودن</button>
        </div>
      </div>
    </div>
  )
}
