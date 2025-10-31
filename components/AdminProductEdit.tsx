"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { productService, SupabaseProduct } from "@/lib/supabase";
import { ProductCategory, productCategories } from "@/data/products";
import {
  FaSpinner,
  FaSave,
  FaUpload,
  FaTrash,
  FaArrowLeft,
} from "react-icons/fa";

interface Props {
  productId: string;
}

export default function AdminProductEdit({ productId }: Props) {
  const router = useRouter();
  const [product, setProduct] = useState<SupabaseProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    currency: "NGN",
    category: "shoes" as ProductCategory,
    available: true,
    link: "",
    rating: "0",
    reviews: "0",
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(productId);
        setProduct(data as SupabaseProduct);
        setForm({
          title: data.title || "",
          description: data.description || "",
          price: (data.price || 0).toString(),
          currency: data.currency || "NGN",
          category: (data.category || "shoes") as ProductCategory,
          available: !!data.available,
          link: data.link || "",
          rating: (data.rating || 0).toString(),
          reviews: (data.reviews || 0).toString(),
        });
        setImagePreview(data.image_url || "");
      } catch (err: any) {
        alert("Failed to load product: " + (err.message || err));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [productId]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(f);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let imageUrl = product?.image_url || "";
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        imageUrl = await productService.uploadImage(imageFile, fileName);
      }

      const updates: Partial<SupabaseProduct> = {
        title: form.title,
        description: form.description,
        price: parseFloat(form.price) || 0,
        currency: form.currency,
        category: form.category,
        available: form.available,
        link: form.link || undefined,
        rating: parseFloat(form.rating) || 0,
        reviews: parseInt(form.reviews) || 0,
        image_url: imageUrl || undefined,
      };

      await productService.updateProduct(productId, updates);
      router.push("/admin/manage");
    } catch (err: any) {
      alert("Failed to save product: " + (err.message || err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit Product</h1>
            <p className="text-sm text-muted-foreground">
              Update product details
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push("/admin/manage")}
          >
            <FaArrowLeft className="mr-2" />
            Back
          </Button>
        </div>

  <Card className="p-6 -z-10">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Title
              </label>
              <input
                className="w-full px-3 py-2 rounded border border-border"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 rounded border border-border"
                rows={5}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                className="px-3 py-2 rounded border border-border"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="Price"
              />
              <select
                className="px-3 py-2 rounded border border-border"
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
              >
                <option value="NGN">NGN</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
              <select
                className="px-3 py-2 rounded border border-border"
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as ProductCategory,
                  })
                }
              >
                {Object.keys(productCategories).map((k) => (
                  <option key={k} value={k}>
                    {productCategories[k as ProductCategory].label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Image
              </label>
              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    className="w-36 h-36 object-cover rounded"
                    alt="preview"
                  />
                ) : (
                  <div className="w-36 h-36 bg-muted rounded flex items-center justify-center text-sm">
                    No image
                  </div>
                )}
                <div>
                  <input type="file" accept="image/*" onChange={handleFile} />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </form>
          {/* Live Preview */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Preview</h3>
            <Card className="p-4 -z-10">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="w-full md:w-48 h-auto bg-muted rounded overflow-hidden">
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="w-full h-48 object-cover" />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center text-muted-foreground">No image</div>
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">{form.title || "Untitled"}</h4>
                  <div className="text-sm text-muted-foreground whitespace-pre-line">
                    {form.description || "No description"}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}
