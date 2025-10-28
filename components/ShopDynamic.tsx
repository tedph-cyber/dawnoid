"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { FaWhatsapp } from "react-icons/fa6";
import CategorySlider from "./CategorySlider";
import { useProducts } from "@/hooks/useProducts";
import { ProductCategory, productCategories } from "@/data/products";

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

export interface CategorizedProduct extends Product {
  category: ProductCategory;
}

function formatPrice(price: number, currency = "NGN") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    price
  );
}

function renderStars(rating = 0) {
  const filled = "★".repeat(Math.round(rating));
  const empty = "☆".repeat(5 - Math.round(rating));
  return `${filled}${empty}`;
}

// Loading skeleton component
function ProductSkeleton() {
  return (
    <div className="bg-card rounded-xl p-4 border border-border animate-pulse">
      <div className="w-full h-48 bg-muted rounded-lg mb-4"></div>
      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-muted rounded w-full mb-2"></div>
      <div className="h-3 bg-muted rounded w-2/3 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-4 bg-muted rounded w-1/4"></div>
        <div className="h-8 bg-muted rounded w-1/3"></div>
      </div>
    </div>
  );
}

export default function ShopDynamic() {
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory | "all"
  >("all");

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (error && products.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-8">
            <h2 className="text-xl font-semibold text-destructive mb-2">
              Failed to Load Products
            </h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Premium Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of premium footwear, exquisite
            perfumes, stylish clothing, and elegant accessories.
          </p>
        </div>

        {/* Category Slider */}
        <div className="mb-8">
          <CategorySlider
            products={products}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            {/* Products Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length}
                {selectedCategory === "all"
                  ? ""
                  : ` ${productCategories[
                      selectedCategory
                    ]?.label.toLowerCase()}`}{" "}
                product{filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground">
                  {selectedCategory === "all"
                    ? "No products are currently available."
                    : `No ${productCategories[
                        selectedCategory
                      ]?.label.toLowerCase()} available at the moment.`}
                </p>
              </div>
            ) : (
              <div className="-z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    {/* Product Image */}
                    <div className="relative h-48 bg-muted">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/images/placeholder.png";
                        }}
                      />
                      {!product.available && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {product.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Rating */}
                      {product.rating && product.rating > 0 && (
                        <div className="flex items-center gap-1 mb-3">
                          <span className="text-yellow-500 text-sm">
                            {renderStars(product.rating)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviews || 0})
                          </span>
                        </div>
                      )}

                      {/* Price and Action */}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(product.price, product.currency)}
                        </span>

                        <Button
                          size="sm"
                          className="rounded-full"
                          disabled={!product.available}
                          onClick={() => {
                            if (product.link && product.link !== "#") {
                              window.open(product.link, "_blank");
                            }
                          }}
                        >
                          <FaWhatsapp className="mr-1 text-sm" />
                          {product.available ? "Order" : "Unavailable"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-card rounded-2xl p-8 border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team is here to help you find the perfect product. Contact us
            directly for personalized recommendations and exclusive offers.
          </p>

          <Button
            size="lg"
            className="rounded-full px-8"
            onClick={() =>
              window.open("https://wa.me/c/2347080982579", "_blank")
            }
          >
            <FaWhatsapp className="mr-2" />
            Chat with us
          </Button>
        </div>
      </div>
    </div>
  );
}
