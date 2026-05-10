"use client"
import ProductCardNew from '@/components/ProductCardNew'

export default function SpecialOffer({ items }){
  return (
    <section className="my-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-extrabold text-red-600">پیشنهاد ویژه</h3>
        <div className="text-sm text-gray-500">تا پایان زمان</div>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-4">
          {items.map(i=> (
            <div key={i.id} className="w-56 flex-shrink-0">
              <ProductCardNew product={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
