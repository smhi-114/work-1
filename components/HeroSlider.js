"use client";

import { useEffect, useState } from "react";
import banner1 from "../src/assets/images/banner1.jpg";
import banner2 from "../src/assets/images/banner2.jpg";
import banner3 from "../src/assets/images/banner3.jpg";

const banners = [
  { src: banner1, alt: "بنر پیشنهادهای ویژه" },
  { src: banner2, alt: "بنر محصولات منتخب" },
  { src: banner3, alt: "بنر تخفیف‌های روز" },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((value) => (value + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const activeBanner = banners[activeIndex];

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img
          src={activeBanner.src.src}
          alt={activeBanner.alt}
          className="w-full h-56 md:h-80 object-cover"
        />
      </div>

      <button
        type="button"
        aria-label="previous"
        onClick={() => setActiveIndex((activeIndex - 1 + banners.length) % banners.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        ‹
      </button>

      <button
        type="button"
        aria-label="next"
        onClick={() => setActiveIndex((activeIndex + 1) % banners.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        ›
      </button>

      <div className="absolute left-4 bottom-4 flex items-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`go to slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === activeIndex ? "bg-red-600" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

