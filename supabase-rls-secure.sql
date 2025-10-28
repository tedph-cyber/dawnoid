-- PRODUCTION-READY RLS POLICIES (Optional - more secure)
-- Use this instead if you want better security with authentication

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Public read access" ON products;
DROP POLICY IF EXISTS "Authenticated insert access" ON products;
DROP POLICY IF EXISTS "Authenticated update access" ON products;
DROP POLICY IF EXISTS "Authenticated delete access" ON products;

-- Allow public read access for the shop
CREATE POLICY "Public read access" ON products
FOR SELECT USING (true);

-- Require authentication for admin operations
CREATE POLICY "Authenticated insert access" ON products
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated update access" ON products
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated delete access" ON products
FOR DELETE USING (auth.role() = 'authenticated');

-- If you want to use this approach, you'll also need to add authentication
-- to your admin panel using Supabase Auth