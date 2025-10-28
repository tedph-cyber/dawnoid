"use client";
import { Suspense } from "react";
import ShopDynamic from "@/components/ShopDynamic";
import Shop from "@/components/Shop";
import { products } from "@/data/products";

// Loading component
function ShopLoading() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="h-12 bg-muted rounded w-1/2 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-muted rounded w-3/4 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-card rounded-xl p-4 border border-border animate-pulse">
              <div className="w-full h-48 bg-muted rounded-lg mb-4"></div>
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-full mb-2"></div>
              <div className="h-3 bg-muted rounded w-2/3 mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-8 bg-muted rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopDynamic />
    </Suspense>
  );
}
