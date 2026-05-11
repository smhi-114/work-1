"use client";

import Link from "next/link";
import { useCartStore } from "../store/cart-store";

export default function Navbar() {
  const items = useCartStore((state) => state.items || []);

  const count = items.reduce((s, i) => s + (i.quantity || 0), 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container px-4 py-3 flex items-center gap-4">
        {/* لوگو */}
        <div className="font-extrabold text-2xl text-red-600">دیجی‌کالا</div>

        {/* سرچ */}
        <div className="flex-1 px-4">
          <div className="relative">
            <input
              placeholder="جستجو در بین میلیون‌ها محصول..."
              className="w-full rounded-full border border-gray-200 px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100"
            />

            <button className="absolute left-3 top-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-2 rounded-full shadow">
              جستجو
            </button>
          </div>
        </div>

        {/* منو */}
        <div className="flex items-center gap-5 shrink-0">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-red-600"
          >
            خانه
          </Link>

          <Link
            href="/login"
            className="text-sm text-gray-700 whitespace-nowrap"
          >
            ورود / ثبت‌نام
          </Link>

          {/* سبد خرید */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
          >
            <span className="text-2xl">🛒</span>

            {count > 0 && (
              <span className="absolute -top-1 -left-1 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
