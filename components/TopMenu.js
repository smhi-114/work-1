"use client";

import Link from "next/link";
import {
  ChevronRight,
  HelpCircle,
  Store,
  Tag,
  ShoppingBag,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

export default function TopMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      name: "دسته‌بندی‌ها",
      href: "/categories",
      icon: <ChevronRight className="w-4 h-4" />,
    },
    {
      name: "پیشنهادهای ویژه",
      href: "/deals",
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      name: "سوپرمارکت",
      href: "/supermarket",
      icon: <ShoppingBag className="w-4 h-4" />,
    },
    {
      name: "طلا دیجیتال",
      href: "/digital-gold",
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      name: "پرفروش‌ترین‌ها",
      href: "/best-sellers",
      icon: <Tag className="w-4 h-4" />,
    },
    {
      name: "نیازهای من",
      href: "/my-needs",
      icon: <ShoppingBag className="w-4 h-4" />,
    },
    {
      name: "کمک می‌کنید؟",
      href: "/help",
      icon: <HelpCircle className="w-4 h-4" />,
    },
    {
      name: "فروش در دیجی‌کالا",
      href: "/sell",
      icon: <Store className="w-4 h-4" />,
    },
  ];

  return (
    <div className="bg-gray-100 border-b border-gray-200">
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-center gap-1 px-4 py-2 overflow-x-auto">
        {menuItems.map((item, index) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-200 rounded transition-colors whitespace-nowrap"
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
          >
            <span>منو</span>
            <ChevronRight
              className={`w-4 h-4 transition-transform ${isMobileMenuOpen ? "rotate-90" : ""}`}
            />
          </button>
          <Link
            href="/sell"
            className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
          >
            <Store className="w-4 h-4" />
            <span>فروش در دیجی‌کالا</span>
          </Link>
        </div>

        {isMobileMenuOpen && (
          <div className="py-2 px-4 space-y-1 max-h-96 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-200 rounded transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
