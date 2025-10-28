'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import { FaWhatsapp } from "react-icons/fa6";

export type Product = {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  currency?: string;
  link: string;
  rating?: number; // 0-5
  reviews?: number;
  available: boolean;
};

export type ProductCategory = 'shoes' | 'perfumes' | 'clothes' | 'accessories';

export interface CategorizedProduct extends Product {
  category: ProductCategory;
}

export const productCategories: Record<ProductCategory, { label: string; icon: string }> = {
  shoes: { label: 'Shoes', icon: '👟' },
  perfumes: { label: 'Perfumes', icon: '🌸' },
  clothes: { label: 'Clothes', icon: '👕' },
  accessories: { label: 'Accessories', icon: '💎' }
};

function formatPrice(price: number, currency = "NGN") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price);
}

function renderStars(rating = 0) {
  const filled = "★".repeat(Math.round(rating));
  const empty = "☆".repeat(5 - Math.round(rating));
  return `${filled}${empty}`;
}

export default function ShopSimple({ products }: { products: CategorizedProduct[] }) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Get unique categories from products
  const availableCategories = Array.from(new Set(products.map(p => p.category)));

  return (
    <section className="px-8 py-10 max-w-6xl mx-auto font-sans min-h-screen">
      <header className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Shop Our Products</h2>
        <p className="text-gray-600">
          Discover our carefully curated selection of luxury footwear and
          exquisite fragrances.
        </p>
      </header>

      {/* Simple Category Filter Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start border-b border-gray-200">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
              selectedCategory === 'all'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            🛍️ All Products
          </button>
          {availableCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`-z-10 px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 flex items-center gap-2 ${
                selectedCategory === category
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <span>{productCategories[category].icon}</span>
              {productCategories[category].label}
            </button>
          ))}
        </div>
        
        {/* Category indicator */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {selectedCategory === 'all' 
              ? `Showing all ${filteredProducts.length} products`
              : `Showing ${filteredProducts.length} ${productCategories[selectedCategory as ProductCategory]?.label.toLowerCase()}`
            }
          </p>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-sm text-blue-600 hover:text-blue-800 underline transition-colors"
            >
              Clear filter
            </button>
          )}
        </div>
      </div>

      {!filteredProducts || filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            {selectedCategory === 'all' 
              ? 'No products available right now.'
              : `No ${productCategories[selectedCategory as ProductCategory]?.label.toLowerCase()} available right now.`
            }
          </p>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              View all products
            </button>
          )}
        </div>
      ) : (
        <div
          className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 transition-all duration-300"
          role="list"
        >
          {filteredProducts.map((p, index) => (
            <article
              key={p.id}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col h-full transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              role="listitem"
              aria-labelledby={`title-${p.id}`}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="w-full pt-[60%] relative bg-gray-50">
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                {/* Category badge */}
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full text-gray-700">
                    {productCategories[p.category].icon} {productCategories[p.category].label}
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3
                  id={`title-${p.id}`}
                  className="text-base font-semibold mb-1"
                >
                  {p.title}
                </h3>

                <p
                  className="text-sm text-gray-600 mb-3 flex-1"
                  title={p.description}
                >
                  {p.description.length > 140
                    ? `${p.description.slice(0, 137)}…`
                    : p.description}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center">
                    <span
                      className="text-yellow-500 font-semibold mr-2"
                      aria-hidden
                    >
                      {renderStars(p.rating)}
                    </span>
                    {typeof p.reviews === "number" && (
                      <small className="text-gray-500">({p.reviews})</small>
                    )}
                  </div>

                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatPrice(p.price, p.currency)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                      p.available
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-200 text-gray-700 pointer-events-auto"
                    }`}
                    aria-disabled={!p.available}
                  >
                    {p.available ? "Order" : "View"}
                  </a>

                  <button
                    type="button"
                    className="px-3 py-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => window.alert(`Quick view: ${p.title}`)}
                    aria-label={`Quick view ${p.title}`}
                  >
                    Quick view
                  </button>

                  <div className="ml-auto flex items-center">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        p.available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {p.available ? "In stock" : "Out of stock"}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
      
      <div className="p-2 py-4 mx-auto flex justify-center">
        <span>
          <Button className="rounded-full">
            <FaWhatsapp /> View Full Catalog on Whatsapp
          </Button>
        </span>
      </div>
    </section>
  );
}