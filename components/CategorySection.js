"use client";

import Link from "next/link";
import { categories } from "../lib/categories";

export default function CategorySection() {
  return (
    <div className="overflow-x-auto py-4">
      <div className="flex gap-3 px-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="flex-shrink-0 w-28 bg-white rounded-lg p-3 text-center shadow-sm hover:shadow-lg transition transform hover:-translate-y-0.5"
          >
            <div className="text-sm font-medium">{category.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

