"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import {
  Baby,
  ChevronDown,
  Home,
  Laptop,
  Menu,
  Shirt,
  Smartphone,
} from "lucide-react";

const categoryGroups = [
  {
    title: "موبایل",
    href: "/mobile",
    icon: Smartphone,
    items: [
      "گوشی سامسونگ",
      "گوشی آیفون",
      "گوشی شیائومی",
      "لوازم جانبی موبایل",
    ],
  },

  {
    title: "کالای دیجیتال",
    href: "/laptop",
    icon: Laptop,
    items: [
      "لپ‌تاپ",
      "هدفون",
      "کیبورد",
      "ماوس",
    ],
  },

  {
    title: "خانه و آشپزخانه",
    href: "/home",
    icon: Home,
    items: [
      "تلویزیون",
      "یخچال",
      "جاروبرقی",
      "مایکروویو",
    ],
  },

  {
    title: "مد و پوشاک",
    href: "/fashion",
    icon: Shirt,
    items: [
      "کفش",
      "تیشرت",
      "شلوار",
      "ساعت",
    ],
  },

  {
    title: "کودک و اسباب‌بازی",
    href: "/kids",
    icon: Baby,
    items: [
      "اسباب‌بازی",
      "کالسکه",
      "لباس کودک",
      "لوازم مدرسه",
    ],
  },
];

export default function CategoryMegaMenu() {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 font-medium hover:text-red-600 transition-colors"
      >
        <Menu size={18} />

        <span>دسته‌بندی کالاها</span>

        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-10
            z-[100]
            flex
            w-[950px]
            max-w-[95vw]
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-2xl
          "
        >
          {/* Sidebar */}
          <div
            className="
              w-[250px]
              border-l
              bg-gray-50
              max-h-[500px]
              overflow-y-auto
            "
          >
            {categoryGroups.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.title}
                  href={category.href}
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    items-center
                    gap-3
                    border-b
                    px-4
                    py-4
                    text-sm
                    hover:bg-white
                    hover:text-red-600
                    transition-all
                  "
                >
                  <Icon size={18} />

                  <span className="font-bold">
                    {category.title}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Content */}
          <div
            className="
              grid
              flex-1
              grid-cols-1
              gap-6
              p-6
              sm:grid-cols-2
              lg:grid-cols-3
              max-h-[500px]
              overflow-y-auto
            "
          >
            {categoryGroups.map((category) => (
              <div key={category.title}>
                <Link
                  href={category.href}
                  onClick={() => setOpen(false)}
                  className="
                    mb-4
                    block
                    border-r-2
                    border-red-600
                    pr-2
                    text-sm
                    font-black
                    hover:text-red-600
                  "
                >
                  {category.title}
                </Link>

                <div className="space-y-3">
                  {category.items.map((item) => (
                    <Link
                      key={item}
                      href={category.href}
                      onClick={() => setOpen(false)}
                      className="
                        block
                        text-sm
                        text-gray-600
                        transition-colors
                        hover:text-red-600
                      "
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}