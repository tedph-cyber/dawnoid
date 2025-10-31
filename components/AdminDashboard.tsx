'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FaPlus, FaEdit, FaTrash, FaBox, FaUsers, FaChartLine, FaImage, FaList, FaUpload } from 'react-icons/fa'
import { productService, SupabaseProduct } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import AdminProductUpload from './AdminProductUpload'
import AdminProductEdit from './AdminProductEdit'

type TabType = 'dashboard' | 'products' | 'upload'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const [products, setProducts] = useState<SupabaseProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setIsLoading(true)
      const data = await productService.getAllProducts()
      setProducts(data || [])
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const categories = ['all', 'shoes', 'perfumes', 'clothes', 'accessories']
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.available).length,
    draftProducts: products.filter(p => !p.available).length,
    totalRevenue: products.reduce((sum, p) => sum + (p.available ? p.price : 0), 0)
  }

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId)
        await loadProducts() // Reload products after deletion
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const handleProductUploadSuccess = () => {
    loadProducts() // Reload products when a new one is uploaded
    setActiveTab('products') // Switch to products tab to see the new product
  }

  const handleEditProduct = (productId: string) => {
    <AdminProductEdit productId={productId} />
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header with Tabs */}
      <div>
        <div className="mb-4 sm:mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Product Management
            </h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Manage your DawnOID product catalog and inventory
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 border-b border-border overflow-x-auto">
          <Button
            variant={activeTab === "dashboard" ? "default" : "ghost"}
            onClick={() => setActiveTab("dashboard")}
            className="flex items-center gap-1 sm:gap-2 rounded-b-none whitespace-nowrap text-xs sm:text-sm"
          >
            <FaChartLine className="text-xs sm:text-sm" />
            <span className="hidden xs:inline">Dashboard</span>
            <span className="xs:hidden">Stats</span>
          </Button>
          <Button
            variant={activeTab === "products" ? "default" : "ghost"}
            onClick={() => setActiveTab("products")}
            className="flex items-center gap-1 sm:gap-2 rounded-b-none whitespace-nowrap text-xs sm:text-sm"
          >
            <FaList className="text-xs sm:text-sm" />
            <span className="hidden xs:inline">
              Products ({products.length})
            </span>
            <span className="xs:hidden">List ({products.length})</span>
          </Button>
          <Button
            variant={activeTab === "upload" ? "default" : "ghost"}
            onClick={() => setActiveTab("upload")}
            className="flex items-center gap-1 sm:gap-2 rounded-b-none whitespace-nowrap text-xs sm:text-sm"
          >
            <FaUpload className="text-xs sm:text-sm" />
            <span className="hidden xs:inline">Add Product</span>
            <span className="xs:hidden">Add</span>
          </Button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "upload" && (
        <div>
          <AdminProductUpload onUploadSuccess={handleProductUploadSuccess} />
        </div>
      )}

      {activeTab === "dashboard" && (
        <div className="space-y-4 sm:space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <Card className="p-3 sm:p-4 lg:p-6 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium">
                    Total Products
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {stats.totalProducts}
                  </p>
                </div>
                <div className="p-2 sm:p-3 bg-blue-200 dark:bg-blue-800 rounded-full">
                  <FaBox className="text-blue-600 dark:text-blue-300 text-sm sm:text-base" />
                </div>
              </div>
            </Card>

            <Card className="p-3 sm:p-4 lg:p-6 bg-linear-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 dark:text-green-400 text-xs sm:text-sm font-medium">
                    Active Products
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-900 dark:text-green-100">
                    {stats.activeProducts}
                  </p>
                </div>
                <div className="p-2 sm:p-3 bg-green-200 dark:bg-green-800 rounded-full">
                  <FaChartLine className="text-green-600 dark:text-green-300 text-sm sm:text-base" />
                </div>
              </div>
            </Card>

            <Card className="p-3 sm:p-4 lg:p-6 bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 dark:text-orange-400 text-xs sm:text-sm font-medium">
                    Draft Products
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-900 dark:text-orange-100">
                    {stats.draftProducts}
                  </p>
                </div>
                <div className="p-2 sm:p-3 bg-orange-200 dark:bg-orange-800 rounded-full">
                  <FaEdit className="text-orange-600 dark:text-orange-300 text-sm sm:text-base" />
                </div>
              </div>
            </Card>

            <Card className="p-3 sm:p-4 lg:p-6 bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 dark:text-purple-400 text-xs sm:text-sm font-medium">
                    Total Value
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-900 dark:text-purple-100">
                    ₦{stats.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="p-2 sm:p-3 bg-purple-200 dark:bg-purple-800 rounded-full">
                  <FaUsers className="text-purple-600 dark:text-purple-300 text-sm sm:text-base" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "products" && (
        <div className="space-y-4 sm:space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize text-xs sm:text-sm"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Mobile Product Cards (shown on small screens) */}
          <div className="block lg:hidden space-y-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaImage className="text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-medium text-foreground text-sm truncate">
                        {product.title}
                      </h3>
                      <div className="flex gap-1 shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => router.push(`/admin/manage/edit/${product.id}`)}
                          className="h-8 w-8 p-0"
                        >
                          <FaEdit className="text-xs" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteProduct(product.id!)}
                          className="h-8 w-8 p-0"
                        >
                          <FaTrash className="text-xs text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="capitalize text-xs">
                        {product.category}
                      </Badge>
                      <Badge
                        variant={product.available ? "default" : "secondary"}
                        className="capitalize text-xs"
                      >
                        {product.available ? "Active" : "Draft"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">
                        {product.currency} {product.price.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {product.created_at
                          ? new Date(product.created_at).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>

                    {/* Description (preserve newlines) */}
                    {product.description && (
                      <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            {filteredProducts.length === 0 && (
              <Card className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaBox className="text-muted-foreground text-xl" />
                  </div>
                  <p className="text-muted-foreground">
                    No products found in this category
                  </p>
                </div>
              </Card>
            )}
          </div>

          {/* Desktop Table (hidden on small screens) */}
          <Card className="overflow-hidden hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-foreground">
                      Product
                    </th>
                    <th className="text-left p-4 font-medium text-foreground">Description</th>
                    <th className="text-left p-4 font-medium text-foreground">
                      Category
                    </th>
                    <th className="text-left p-4 font-medium text-foreground">
                      Price
                    </th>
                    <th className="text-left p-4 font-medium text-foreground">
                      Status
                    </th>
                    <th className="text-left p-4 font-medium text-foreground">
                      Created
                    </th>
                    <th className="text-left p-4 font-medium text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-t border-border hover:bg-muted/30"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                            {product.image_url ? (
                              <img
                                src={product.image_url}
                                alt={product.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <FaImage className="text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {product.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ID: {product.id}
                            </p>
                          </div>
                        </div>
                        </td>
                        <td className="p-4 max-w-xs">
                          <div className="text-sm text-muted-foreground whitespace-pre-line max-h-20 overflow-auto">
                            {product.description}
                          </div>
                        </td>
                      <td className="p-4">
                        <Badge variant="outline" className="capitalize">
                          {product.category}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-foreground">
                          {product.currency} {product.price.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={product.available ? "default" : "secondary"}
                          className="capitalize"
                        >
                          {product.available ? "Active" : "Draft"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className="text-muted-foreground">
                          {product.created_at
                            ? new Date(product.created_at).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => router.push(`/admin/manage/edit/${product.id}`)}>
                            <FaEdit className="text-xs" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteProduct(product.id!)}
                          >
                            <FaTrash className="text-xs text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaBox className="text-muted-foreground text-xl" />
                </div>
                <p className="text-muted-foreground">
                  No products found in this category
                </p>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}