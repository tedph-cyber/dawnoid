'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import { FaWhatsapp } from "react-icons/fa6";
import CategorySlider from "./CategorySlider";

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

export default function Shop({ products }: { products: CategorizedProduct[] }) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <section className="px-8 py-10 max-w-6xl mx-auto font-sans min-h-screen bg-background">
      <header className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-foreground">Shop Our Products</h2>
        <p className="text-muted-foreground">
          Discover our carefully curated selection of luxury footwear and
          exquisite fragrances.
        </p>
      </header>

      {/* Category Filter with Sliding/Swipe Functionality */}
      <CategorySlider
        products={products}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Category indicator */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {selectedCategory === 'all'
            ? `Showing all ${filteredProducts.length} products`
            : `Showing ${filteredProducts.length} ${productCategories[selectedCategory as ProductCategory]?.label.toLowerCase()}`
          }
        </p>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-sm text-primary hover:text-primary/80 underline transition-colors"
          >
            Clear filter
          </button>
        )}
      </div>

      {!filteredProducts || filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {selectedCategory === 'all'
              ? 'No products available right now.'
              : `No ${productCategories[selectedCategory as ProductCategory]?.label.toLowerCase()} available right now.`
            }
          </p>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-primary hover:text-primary/80 underline"
            >
              View all products
            </button>
          )}
        </div>
      ) : (
        <div
          className="-z-10 grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 transition-all duration-300 gap-x-8 gap-y-4"
          role="list"
        >
          {filteredProducts.map((p, index) => (
            <article
              key={p.id}
              className="border border-border rounded-lg overflow-hidden bg-card flex flex-col h-full transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative z-0 will-change-transform"
              role="listitem"
              aria-labelledby={`title-${p.id}`}
            >
              <div className="w-full pt-[60%] relative bg-muted">
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3
                  id={`title-${p.id}`}
                  className="text-base font-semibold mb-1 text-card-foreground"
                >
                  {p.title}
                </h3>

                <p
                  className="text-sm text-muted-foreground mb-3 flex-1"
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
                      <small className="text-muted-foreground">({p.reviews})</small>
                    )}
                  </div>

                  <div>
                    <div className="text-lg font-bold text-foreground">
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
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-muted text-muted-foreground pointer-events-auto"
                    }`}
                    aria-disabled={!p.available}
                  >
                    {p.available ? "Order" : "View"}
                  </a>

                  <button
                    type="button"
                    className="px-3 py-2 rounded-md border border-border bg-card text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={() => window.alert(`Quick view: ${p.title}`)}
                    aria-label={`Quick view ${p.title}`}
                  >
                    Quick view
                  </button>

                  <div className="ml-auto flex items-center">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        p.available
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
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
          <Button className="rounded-full ">
            <FaWhatsapp /> View Full Catalog on Whatsapp
          </Button>
        </span>
      </div>
    </section>
  );
}
