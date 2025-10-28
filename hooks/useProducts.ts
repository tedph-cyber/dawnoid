'use client'

import { useEffect, useState } from 'react'
import { productService, SupabaseProduct } from '@/lib/supabase'
import { CategorizedProduct } from '@/data/products'

// Convert Supabase product to your existing product format
const convertSupabaseProduct = (supabaseProduct: SupabaseProduct): CategorizedProduct => ({
  id: supabaseProduct.id || '',
  title: supabaseProduct.title,
  description: supabaseProduct.description,
  price: supabaseProduct.price,
  currency: supabaseProduct.currency,
  category: supabaseProduct.category,
  image: supabaseProduct.image_url || '/images/placeholder.png',
  rating: supabaseProduct.rating,
  reviews: supabaseProduct.reviews,
  available: supabaseProduct.available,
  link: supabaseProduct.link || '#'
})

export function useProducts() {
  const [products, setProducts] = useState<CategorizedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const supabaseProducts = await productService.getAllProducts()
      const convertedProducts = supabaseProducts.map(convertSupabaseProduct)
      
      setProducts(convertedProducts)
    } catch (err: any) {
      console.error('Error fetching products:', err)
      setError(err.message || 'Failed to fetch products')
      
      // Fallback to static products if Supabase fails
      const { products: staticProducts } = await import('@/data/products')
      setProducts(staticProducts)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const refetch = () => {
    fetchProducts()
  }

  return {
    products,
    loading,
    error,
    refetch
  }
}