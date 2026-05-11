"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { items } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-red-600 text-white text-sm py-1">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>فروشگاه آنلاین ما</span>
          <div className="flex space-x-4">
            <Link href="/login" className="hover:text-red-200">
              ورود
            </Link>
            <Link href="/register" className="hover:text-red-200">
              ثبت‌نام
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-red-600">
            فروشگاه
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-red-600 transition"
            >
              خانه
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-red-600 transition"
            >
              محصولات
            </Link>
            <Link
              href="/fashion"
              className="text-gray-700 hover:text-red-600 transition"
            >
              مد و پوشاک
            </Link>
            <Link
              href="/mobile"
              className="text-gray-700 hover:text-red-600 transition"
            >
              موبایل
            </Link>
            <Link
              href="/laptop"
              className="text-gray-700 hover:text-red-600 transition"
            >
              لپ‌تاپ
            </Link>
            <Link
              href="/kids"
              className="text-gray-700 hover:text-red-600 transition"
            >
              کودک و نوجوان
            </Link>

            {/* Cart Link */}
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-red-600 transition"
            >
              <span className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 left-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-700 hover:text-red-600">
                خانه
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-red-600"
              >
                محصولات
              </Link>
              <Link
                href="/fashion"
                className="text-gray-700 hover:text-red-600"
              >
                مد و پوشاک
              </Link>
              <Link href="/mobile" className="text-gray-700 hover:text-red-600">
                موبایل
              </Link>
              <Link href="/laptop" className="text-gray-700 hover:text-red-600">
                لپ‌تاپ
              </Link>
              <Link href="/kids" className="text-gray-700 hover:text-red-600">
                کودک و نوجوان
              </Link>
              <Link
                href="/cart"
                className="text-gray-700 hover:text-red-600 flex items-center"
              >
                <span className="ml-2">🛒 سبد خرید</span>
                {cartCount > 0 && (
                  <span className="bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
