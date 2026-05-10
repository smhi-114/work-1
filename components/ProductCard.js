'use client';

import Link from "next/link";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const addToCart = async () => {
    try {
      const response = await fetch('/api/user/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.title,
          price: Math.floor(
            product.price * (1 - product.discount / 100)
          ),
          quantity: quantity,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      } else {
        alert(data.error || 'خطا در افزودن به سبد خرید');
      }
    } catch (error) {
      alert('خطا در ارتباط با سرور');
    }
  };

  const price = Math.floor(
    product.price * (1 - product.discount / 100)
  );

  return (
    <div className="border rounded-lg bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-medium text-gray-900 line-clamp-2">{product.title}</h3>
          <div className="mt-2">
            <span className="text-lg font-bold text-indigo-600">
              {price.toLocaleString()} تومان
            </span>
            {product.discount > 0 && (
              <span className="mr-2 text-sm text-gray-500 line-through">
                {product.price.toLocaleString()} تومان
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4 flex items-center space-x-3">
        <div className="flex items-center border rounded">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1 hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-2">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 hover:bg-gray-100"
          >
            +
          </button>
        </div>
        <button
          onClick={addToCart}
          disabled={added}
          className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {added ? 'افزوده شد ✓' : 'افزودن به سبد خرید'}
        </button>
      </div>
    </div>
  );
}
