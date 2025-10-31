// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for Supabase database
export interface SupabaseProduct {
  id?: string
  title: string
  description: string
  price: number
  currency: string
  category: 'shoes' | 'perfumes' | 'clothes' | 'accessories'
  image_url?: string
  rating?: number
  reviews?: number
  available: boolean
  link?: string
  created_at?: string
  updated_at?: string
}

// Product operations
export const productService = {
  // Get all products
  async getAllProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Create new product
  async createProduct(product: Omit<SupabaseProduct, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
    
    if (error) throw error
    return data
  },

  // Update product
  async updateProduct(id: string, updates: Partial<SupabaseProduct>) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data
  },

  // Get a single product by id
  async getProductById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Delete product
  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Upload image
  async uploadImage(file: File, fileName: string) {
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file)
    
    if (error) throw error
    
    // Get public URL
    const { data: publicUrl } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)
    
    return publicUrl.publicUrl
  }
}