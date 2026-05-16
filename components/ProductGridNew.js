"use client"
import ProductCardNew from '@/components/ProductCardNew'

export default function ProductGridNew({ items }){
  return (
    <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map(p=> <ProductCardNew key={p.id} product={p} />)}
    </div>
  )
}
