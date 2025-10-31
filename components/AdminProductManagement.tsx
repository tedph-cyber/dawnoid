"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { productService, SupabaseProduct } from "@/lib/supabase";
import { productCategories } from "@/data/products";
import { FaEdit, FaTrash, FaEye, FaPlus, FaSpinner } from "react-icons/fa";
import Link from "next/link";

export default function AdminProductManagement() {
  const [products, setProducts] = useState<SupabaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${title}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setDeleteLoading(id);
      await productService.deleteProduct(id);
      await fetchProducts(); // Refresh the list
    } catch (err: any) {
      alert("Failed to delete product: " + err.message);
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatPrice = (price: number, currency = "NGN") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(price);
  };

  const renderStars = (rating = 0) => {
    const filled = "★".repeat(Math.round(rating));
    const empty = "☆".repeat(5 - Math.round(rating));
    return `${filled}${empty}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <FaSpinner className="animate-spin mx-auto text-4xl text-primary mb-4" />
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center flex-col justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Product Management
            </h1>
            <p className="text-muted-foreground">
              Manage your DawnOID store products ({products.length} total)
            </p>
          </div>
          <Link href="/admin">
            <Button className="px-6 py-3">
              <FaPlus className="mr-2" />
              Add New Product
            </Button>
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {/* Products Grid */}
        {products.length === 0 ? (
          <Card className="p-12 text-center bg-card border border-border">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Products Found
            </h3>
            <p className="text-muted-foreground mb-6">
              You haven't added any products yet. Start by adding your first
              product!
            </p>
            <Link href="/admin">
              <Button>
                <FaPlus className="mr-2" />
                Add Your First Product
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden border border-border hover:shadow-lg transition-shadow"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-muted">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/images/placeholder.png";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <FaEye className="mx-auto mb-2 text-2xl" />
                        <p className="text-sm">No Image</p>
                      </div>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs rounded-full font-medium">
                      {productCategories[product.category]?.icon}{" "}
                      {productCategories[product.category]?.label}
                    </span>
                  </div>

                  {/* Availability Badge */}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        product.available
                          ? "bg-green-500/90 text-white"
                          : "bg-red-500/90 text-white"
                      }`}
                    >
                      {product.available ? "Available" : "Out of Stock"}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">
                    {product.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-3 whitespace-pre-line">
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

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(product.price, product.currency)}
                    </span>
                  </div>

                  {/* Actions */}
                  <ActionsBlock
                    product={product}
                    deleteLoading={deleteLoading}
                    onDelete={handleDelete}
                  />

                  {/* Metadata */}
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Added: {product.created_at ? new Date(product.created_at).toLocaleDateString() : "Unknown"}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        {products.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center bg-card border border-border">
              <div className="text-2xl font-bold text-primary">
                {products.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Products
              </div>
            </Card>

            <Card className="p-4 text-center bg-card border border-border">
              <div className="text-2xl font-bold text-green-600">
                {products.filter((p) => p.available).length}
              </div>
              <div className="text-sm text-muted-foreground">Available</div>
            </Card>

            <Card className="p-4 text-center bg-card border border-border">
              <div className="text-2xl font-bold text-red-600">
                {products.filter((p) => !p.available).length}
              </div>
              <div className="text-sm text-muted-foreground">Out of Stock</div>
            </Card>

            <Card className="p-4 text-center bg-card border border-border">
              <div className="text-2xl font-bold text-blue-600">
                {Object.keys(productCategories).length}
              </div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function ActionsBlock({
  product,
  deleteLoading,
  onDelete,
}: {
  product: SupabaseProduct;
  deleteLoading: string | null;
  onDelete: (id: string, title: string) => void;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button
        variant="outline"
        size="sm"
        className="w-full sm:flex-1"
        onClick={() => router.push(`/admin/manage/edit/${product.id}`)}
      >
        <FaEdit className="mr-1" />
        Edit
      </Button>

      <Button
        variant="destructive"
        size="sm"
        className="w-full sm:flex-1"
        disabled={deleteLoading === product.id}
        onClick={() => onDelete(product.id!, product.title)}
      >
        {deleteLoading === product.id ? (
          <FaSpinner className="mr-1 animate-spin" />
        ) : (
          <FaTrash className="mr-1" />
        )}
        Delete
      </Button>
    </div>
  );
}
