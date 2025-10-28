"use client";

import { useState, useRef, useEffect } from "react";
import {
  CategorizedProduct,
  ProductCategory,
  productCategories,
} from "@/data/products";

interface CategorySliderProps {
  products: CategorizedProduct[];
  onCategoryChange: (category: ProductCategory | "all") => void;
  selectedCategory: ProductCategory | "all";
}

export default function CategorySlider({
  products,
  onCategoryChange,
  selectedCategory,
}: CategorySliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Get unique categories from products
  const availableCategories = Array.from(
    new Set(products.map((p) => p.category))
  );
  const allCategories = ["all", ...availableCategories] as const;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const x = e.touches[0].pageX - (sliderRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="mb-8">
      <div
        ref={sliderRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-3 mx-auto rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap select-none -z-10 ${
              selectedCategory === category
                ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
            }`}
          >
            {category === "all" ? (
              <>
                <span>🛍️</span>
                All Products
              </>
            ) : (
              <>
                <span>
                  {productCategories[category as ProductCategory].icon}
                </span>
                {productCategories[category as ProductCategory].label}
              </>
            )}
          </button>
        ))}
      </div>

      {/* Scroll indicator dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {allCategories.map((category, index) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              selectedCategory === category
                ? "bg-blue-600 w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
