# DawnOID Admin Authentication Setup Guide

This guide walks you through setting up admin authentication for your DawnOID product management system using Supabase.

## 🎯 Overview

The admin authentication system provides:
- ✅ Secure email/password authentication via Supabase
- ✅ Admin role-based access control
- ✅ Beautiful, responsive admin interface
- ✅ Protected admin routes and dashboard
- ✅ Session management and auto-logout
- ✅ Theme-aware UI (light/dark mode)

## 📋 Prerequisites

1. **Supabase Account**: You'll need a free Supabase account at [supabase.com](https://supabase.com)
2. **Next.js Project**: Your DawnOID project (already set up)
3. **Environment Variables**: Access to your project's environment configuration

## 🚀 Step-by-Step Setup

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `dawnoid-admin`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be created (2-3 minutes)

### Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xyzcompany.supabase.co`)
   - **Anon Public Key** (starts with `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...`)

### Step 3: Configure Environment Variables

1. In your project root, create or update `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Admin Configuration
ADMIN_EMAIL=admin@dawnoid.com
```

2. Restart your development server:
```bash
npm run dev
```

### Step 4: Set Up Authentication in Supabase

1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Under **Site URL**, add your development URL:
   - `http://localhost:3000`
3. Under **Redirect URLs**, add:
   - `http://localhost:3000/admin`
   - `https://yourdomain.com/admin` (for production)

### Step 5: Create Admin User

#### Option A: Via Supabase Dashboard (Recommended)
1. Go to **Authentication** → **Users**
2. Click "Add User"
3. Fill in:
   - **Email**: `admin@dawnoid.com` (or your preferred admin email)
   - **Password**: Create a strong password
   - **Email Confirm**: Toggle ON
4. Click "Create User"

#### Option B: Via Your Application
1. Visit your admin page: `http://localhost:3000/admin`
2. Use the sign-in form with your admin credentials

### Step 6: Set Up Database Tables (Optional)

If you want to store products in Supabase, create these tables:

```sql
-- Products table
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('active', 'draft', 'archived')),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can read products
CREATE POLICY "Public products are viewable by everyone" ON products
  FOR SELECT USING (status = 'active' OR auth.uid() IS NOT NULL);

-- Policy: Only admin users can insert/update/delete
CREATE POLICY "Admin users can manage products" ON products
  FOR ALL USING (
    auth.email() = 'admin@dawnoid.com' -- Replace with your admin email
  );
```

### Step 7: Test Your Setup

1. **Visit Admin Page**: Go to `http://localhost:3000/admin`
2. **Login**: Use your admin credentials
3. **Verify Access**: You should see the admin dashboard
4. **Test Logout**: Click the logout button to verify session management

## 🔧 Customization Options

### Adding Multiple Admin Users

Update your environment variables:
```bash
# Multiple admin emails (comma-separated)
ADMIN_EMAILS=admin@dawnoid.com,manager@dawnoid.com,support@dawnoid.com
```

Then update the `checkAdminAccess` function in `/lib/auth.ts`:

```typescript
export async function checkAdminAccess() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { isAdmin: false, user: null }
  }

  // Support multiple admin emails
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [process.env.ADMIN_EMAIL]
  const isAdmin = adminEmails.includes(user.email || '')
  
  return { isAdmin, user }
}
```

### Customizing the Admin Interface

The admin components are fully customizable:

- **AdminAuthProvider**: `/components/AdminAuthProvider.tsx` - Login form and authentication logic
- **AdminDashboard**: `/components/AdminDashboard.tsx` - Main dashboard interface
- **AdminAuth**: `/lib/auth.ts` - Authentication utilities

### Adding Product Management

To connect real product data:

1. Set up Supabase tables (see Step 6)
2. Install Supabase client: `npm install @supabase/supabase-js`
3. Update `AdminDashboard.tsx` to use real data:

```typescript
import { createClient } from '@/lib/supabase'

// Replace the mock data with real Supabase queries
useEffect(() => {
  async function fetchProducts() {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching products:', error)
    } else {
      setProducts(data || [])
    }
    setIsLoading(false)
  }
  
  fetchProducts()
}, [])
```

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Strong Passwords**: Use strong, unique passwords for admin accounts
3. **Row Level Security**: Enable RLS on all Supabase tables
4. **HTTPS**: Use HTTPS in production
5. **Email Verification**: Enable email confirmation in Supabase Auth settings

## 🌐 Production Deployment

### Environment Variables for Production

Set these in your hosting platform (Vercel, Netlify, etc.):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ADMIN_EMAIL=admin@yourdomain.com
```

### Supabase Production Settings

1. Update **Site URL** to your production domain
2. Add production **Redirect URLs**
3. Configure **Email Templates** for your brand
4. Set up **Custom SMTP** (optional)

## 🔍 Troubleshooting

### Common Issues

**❌ "Invalid login credentials"**
- Verify the email exists in Supabase Auth Users
- Check if email confirmation is required
- Ensure password is correct

**❌ "Access denied. Admin privileges required."**
- Verify `ADMIN_EMAIL` environment variable matches user's email exactly
- Check if user email is confirmed in Supabase
- Restart development server after changing environment variables

**❌ "Supabase client not initialized"**
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Check that environment variables are properly formatted
- Ensure no extra spaces or quotes in the values

**❌ "User already registered"**
- This happens if you try to create a user that already exists
- Use the existing credentials or reset the password

### Getting Help

1. Check the browser console for error messages
2. Verify environment variables are loaded: `console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)`
3. Check Supabase Auth logs in the dashboard
4. Review this guide step by step

## 🎉 Success!

Once set up, you'll have a fully functional admin authentication system with:

- 🔐 Secure login/logout functionality
- 📊 Beautiful admin dashboard
- 🛡️ Role-based access control
- 🎨 Theme-aware interface
- 📱 Mobile-responsive design

Your admin panel is now accessible at `/admin` and ready for managing your DawnOID products!

---

**Next Steps**: 
- Set up product management with real Supabase data
- Add file upload for product images
- Implement order management system
- Create analytics and reporting features