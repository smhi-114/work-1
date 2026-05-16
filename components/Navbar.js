"use client";

import Link from "next/link";

import {
  Percent,
  Store,
  Flame,
  MapPin,
  LogIn,
  ShoppingCart,
  House,
} from "lucide-react";

import CategoryMegaMenu from "./CategoryMegaMenu";

export default function SubHeader() {
  const cartCount = 0;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4 text-sm text-gray-700">
        {/* Home */}
        <Link
          href="/"
          className="flex items-center gap-2 font-medium hover:text-red-600 transition-colors"
        >
          <House size={18} />
          <span>خانه</span>
        </Link>

        {/* Center Menu */}
        <div className="flex items-center gap-6 whitespace-nowrap">
          <CategoryMegaMenu />

          <Link
            href="/offers"
            className="flex items-center gap-1 hover:text-red-600 transition-colors"
          >
            <Percent size={16} />
            <span>شگفت‌انگیزها</span>
          </Link>

          <Link
            href="/supermarket"
            className="flex items-center gap-1 hover:text-red-600 transition-colors"
          >
            <Store size={16} />
            <span>سوپرمارکت</span>
          </Link>

          <Link
            href="/best-selling"
            className="flex items-center gap-1 hover:text-red-600 transition-colors"
          >
            <Flame size={16} />
            <span>پرفروش‌ترین‌ها</span>
          </Link>
        </div>

        {/* Left Side */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2 hover:bg-gray-100 rounded-full transition-all"
          >
            <ShoppingCart size={22} className="text-gray-700" />

            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-md border-2 border-white font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          <span className="w-[1px] h-6 bg-gray-200"></span>

          {/* Login */}
          <Link
            href="/login"
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-all font-medium"
          >
            <LogIn size={20} className="text-gray-600" />

            <span className="hidden sm:inline">ورود | ثبت‌نام</span>
          </Link>

          <span className="w-[1px] h-6 bg-gray-200"></span>

          {/* Address */}
          <button className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors">
            <MapPin size={20} className="text-orange-500" />

            <span className="hidden lg:inline">انتخاب آدرس</span>
          </button>
        </div>
      </div>
    </header>
  );
}
