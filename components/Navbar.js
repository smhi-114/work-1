"use client";

import Link from "next/link";
import { useCartStore } from "../store/cart-store";
import { useEffect, useState } from "react";

export default function Navbar() {
  const items = useCartStore((state) => state.items || []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const count = items.reduce((s, i) => s + (i.quantity || 0), 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container px-4 py-3 flex items-center gap-4">
        <div className="ml-auto flex items-center gap-4">
          <div className="font-extrabold text-2xl text-red-600">دیجی‌کالا</div>
        </div>

        <div className="flex-1 px-4">
          {/* Search Section */}
          <div className="flex flex-col gap-3">
            {/* Search Box */}
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو در بین میلیون‌ها محصول..."
                className="
					w-full
					h-12
					rounded-full
					bg-gray-100
					border border-gray-200
					pr-5
					pl-24
					text-sm
					outline-none
					transition
					duration-200
					focus:border-red-400
					focus:bg-white
					focus:ring-4
					focus:ring-red-50
				"
              />

              <button
                className="
					absolute
					left-2
					top-1/2
					-translate-y-1/2
					bg-red-500
					hover:bg-red-600
					text-white
					text-sm
					px-5
					h-9
					rounded-full
					transition
					duration-200
					shadow-sm
				"
              >
                جستجو
              </button>
            </div>

            {/* Bottom Navigation */}
            <div
              className="
				flex
				items-center
				gap-4
				overflow-x-auto
				whitespace-nowrap
				text-sm
				text-gray-600
				scrollbar-hide
				pr-1
			"
            >
              <a
                href="#"
                className="
					flex items-center gap-1
					text-red-500
					font-medium
					border-b-2
					border-red-500
					pb-1
					flex-shrink-0
				"
              >
                ☰<span>دسته‌بندی کالاها</span>
              </a>

              <span className="text-gray-300">|</span>

              <a
                href="#"
                className="hover:text-red-500 transition duration-200 flex-shrink-0"
              >
                🔥 شگفت‌انگیزها
              </a>

              <span className="text-gray-300">|</span>

              <a
                href="#"
                className="hover:text-red-500 transition duration-200 flex-shrink-0"
              >
                🛒 سوپرمارکت
              </a>

              <span className="text-gray-300">|</span>

              <a
                href="#"
                className="hover:text-red-500 transition duration-200 flex-shrink-0"
              >
                💎 طلای دیجیتال
              </a>

              <span className="text-gray-300">|</span>

              <a
                href="#"
                className="hover:text-red-500 transition duration-200 flex-shrink-0"
              >
                📈 پرفروش‌ترین‌ها
              </a>

              <span className="text-gray-300">|</span>

              <a
                href="#"
                className="hover:text-red-500 transition duration-200 flex-shrink-0"
              >
                ❓ سوالی دارید؟
              </a>

              <span className="text-gray-300">|</span>

              <a
                href="#"
                className="hover:text-red-500 transition duration-200 flex-shrink-0"
              >
                🏪 در دیجی‌کالا بفروشید!
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-red-600"
          >
            خانه
          </Link>

          <Link href="/login" className="text-sm text-gray-700">
            ورود / ثبت‌نام
          </Link>

          <Link href="/cart" className="relative text-gray-700">
            <span className="text-2xl">🛒</span>

            {mounted && count > 0 && (
              <span className="absolute -top-2 left-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
