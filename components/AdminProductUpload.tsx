"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { productService, SupabaseProduct } from "@/lib/supabase";
import { ProductCategory, productCategories } from "@/data/products";
import { FaUpload, FaSpinner, FaTrash, FaEdit, FaPlus } from "react-icons/fa";

interface ProductFormData {
  title: string;
  description: string;
  price: string; // Change to string to allow empty values
  currency: string;
  category: ProductCategory;
  available: boolean;
  link: string;
  rating: string; // Change to string to allow empty values
  reviews: string; // Change to string to allow empty values
}

interface AdminProductUploadProps {
  onUploadSuccess?: () => void;
}

export default function AdminProductUpload({ onUploadSuccess }: AdminProductUploadProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    description: "",
    price: "",
    currency: "₦",
    category: "shoes",
    available: true,
    link: "",
    rating: "",
    reviews: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);

  const handleInputChange = (
    field: keyof ProductFormData,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const processImageFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WEBP)');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image file size must be less than 10MB');
      return;
    }

    setImageFile(file);
    setError('');
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Handle file input click
  const handleFileInputClick = () => {
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      processImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setError("");
    setUploadSuccess(false);

    try {
      let imageUrl = "";

      // Upload image if provided
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        imageUrl = await productService.uploadImage(imageFile, fileName);
      }

      // Create product
      const productData: Omit<
        SupabaseProduct,
        "id" | "created_at" | "updated_at"
      > = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        rating: parseFloat(formData.rating) || 0,
        reviews: parseInt(formData.reviews) || 0,
        image_url: imageUrl,
      };

      await productService.createProduct(productData);

      setUploadSuccess(true);
      
      // Call the callback to refresh the parent component
      if (onUploadSuccess) {
        onUploadSuccess();
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        currency: "₦",
        category: "shoes",
        available: true,
        link: "",
        rating: "",
        reviews: "",
      });
      setImageFile(null);
      setImagePreview("");
    } catch (err: any) {
      setError(err.message || "Failed to upload product");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Admin Product Upload
              </h1>
              <p className="text-muted-foreground">
                Add new products to your DawnOID store
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/admin/manage'}
              >
                <FaEdit className="mr-2" />
                Manage Products
              </Button>
            </div>
          </div>
        </div>

        {/* Upload Form */}
        <Card className="p-6 bg-card border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter product title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange(
                      "category",
                      e.target.value as ProductCategory
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {Object.entries(productCategories).map(
                    ([key, { label, icon }]) => (
                      <option key={key} value={key}>
                        {icon} {label}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Enter product description"
              />
            </div>

            {/* Price and Currency */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    handleInputChange("price", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) =>
                    handleInputChange("currency", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="NGN">NGN (₦)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <div className="flex items-center pt-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) =>
                      handleInputChange("available", e.target.checked)
                    }
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-foreground">
                    Available for sale
                  </span>
                </label>
              </div>
            </div>

            {/* Rating and Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) =>
                    handleInputChange("rating", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Number of Reviews
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.reviews}
                  onChange={(e) =>
                    handleInputChange("reviews", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Product Link */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Product Link (Optional)
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => handleInputChange("link", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://example.com/product-link"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Product Image
              </label>
              <div 
                className={`border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
                  isDragOver 
                    ? 'border-primary bg-primary/5 scale-[1.02]' 
                    : 'border-border hover:border-primary/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <div className="text-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-xs max-h-48 mx-auto rounded-lg mb-4 shadow-md"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview("");
                      }}
                    >
                      <FaTrash className="mr-2" />
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="text-center isolate">
                    <FaUpload className={`mx-auto h-12 w-12 mb-4 transition-colors duration-200 ${
                      isDragOver ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <div className="flex text-sm text-muted-foreground justify-center">
                      <button
                        type="button"
                        onClick={handleFileInputClick}
                        className="inset-0 relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 transition-colors underline"
                      >
                        Upload a file
                      </button>
                      <input
                        id="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      PNG, JPG, WEBP up to 10MB
                    </p>
                    {isDragOver && (
                      <p className="text-sm text-primary font-medium mt-2 animate-pulse">
                        Drop your image here!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            {uploadSuccess && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm">
                  Product uploaded successfully!
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isUploading}
                className="px-8 py-3 text-lg font-medium"
              >
                {isUploading ? (
                  <>
                    <FaSpinner className="mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <FaPlus className="mr-2" />
                    Add Product
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
