-- SUPABASE RLS FIX FOR PRODUCTS TABLE
-- Run this in your Supabase SQL Editor to fix the RLS policy error

-- First, let's check if RLS is enabled (this will show if RLS is the issue)
-- If this returns empty, RLS might not be enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'products';

-- Enable Row Level Security on products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public read access" ON products;
DROP POLICY IF EXISTS "Public insert access" ON products;
DROP POLICY IF EXISTS "Public update access" ON products;
DROP POLICY IF EXISTS "Public delete access" ON products;

-- Create new policies that allow all operations
-- NOTE: These are permissive policies for development
-- In production, you should restrict these to authenticated admin users

-- Allow anyone to read products (for public shop display)
CREATE POLICY "Public read access" ON products
FOR SELECT USING (true);

-- Allow anyone to insert products (for admin panel)
CREATE POLICY "Public insert access" ON products
FOR INSERT WITH CHECK (true);

-- Allow anyone to update products (for admin panel)
CREATE POLICY "Public update access" ON products
FOR UPDATE USING (true);

-- Allow anyone to delete products (for admin panel)
CREATE POLICY "Public delete access" ON products
FOR DELETE USING (true);

-- Verify policies are created
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'products';

-- Test with a simple select to ensure it works
SELECT COUNT(*) as total_products FROM products;