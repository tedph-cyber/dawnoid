// data/products.ts
import { Product } from "@/components/Shop";

export type ProductCategory = 'shoes' | 'perfumes' | 'clothes' | 'accessories';

export interface CategorizedProduct extends Product {
  category: ProductCategory;
}

export const productCategories: Record<ProductCategory, { label: string; icon: string }> = {
  shoes: { label: 'Shoes', icon: '👟' },
  perfumes: { label: 'Perfumes', icon: '🌸' },
  clothes: { label: 'Clothes', icon: '👕' },
  accessories: { label: 'Accessories', icon: '💎' }
};

export const products: CategorizedProduct[] = [
  // Shoes
  {
    id: "1",
    image: "/images/image.png",
    title: "Nike Air Max 270",
    description:
      "Comfortable and stylish running shoes with air cushioning technology",
    price: 85000,
    currency: "NGN",
    link: "https://example.com/nike-air",
    rating: 4.5,
    reviews: 127,
    available: true,
    category: "shoes",
  },
  {
    id: "2",
    image: "/images/image.png",
    title: "Adidas Ultra Boost",
    description:
      "Premium running shoes with boost technology for maximum comfort",
    price: 95000,
    currency: "NGN",
    link: "https://example.com/adidas-boost",
    rating: 4.7,
    reviews: 89,
    available: true,
    category: "shoes",
  },
  {
    id: "3",
    image: "/images/image.png",
    title: "Leather Loafers",
    description:
      "Classic leather loafers perfect for formal and casual occasions",
    price: 45000,
    currency: "NGN",
    link: "https://example.com/loafers",
    rating: 4.2,
    reviews: 34,
    available: false,
    category: "shoes",
  },

  // Perfumes
  {
    id: "4",
    image: "/images/image.png",
    title: "Chanel No. 5",
    description: "Iconic floral fragrance with notes of jasmine and rose",
    price: 120000,
    currency: "NGN",
    link: "https://example.com/chanel-no5",
    rating: 4.8,
    reviews: 256,
    available: true,
    category: "perfumes",
  },
  {
    id: "5",
    image: "/images/image.png",
    title: "Dior Sauvage",
    description: "Fresh and spicy masculine fragrance with bergamot and pepper",
    price: 98000,
    currency: "NGN",
    link: "https://example.com/dior-sauvage",
    rating: 4.6,
    reviews: 189,
    available: true,
    category: "perfumes",
  },
  {
    id: "6",
    image: "/images/image.png",
    title: "Tom Ford Black Orchid",
    description:
      "Luxurious and mysterious fragrance with dark chocolate and orchid",
    price: 150000,
    currency: "NGN",
    link: "https://example.com/tom-ford",
    rating: 4.9,
    reviews: 78,
    available: false,
    category: "perfumes",
  },

  // Clothes
  {
    id: "7",
    image: "/images/image.png",
    title: "Premium Polo Shirt",
    description: "High-quality cotton polo shirt available in multiple colors",
    price: 25000,
    currency: "NGN",
    link: "https://example.com/polo-shirt",
    rating: 4.3,
    reviews: 145,
    available: true,
    category: "clothes",
  },
  {
    id: "8",
    image: "/images/image.png",
    title: "Classic Denim Jacket",
    description: "Timeless denim jacket perfect for layering in any season",
    price: 35000,
    currency: "NGN",
    link: "https://example.com/denim-jacket",
    rating: 4.4,
    reviews: 67,
    available: true,
    category: "clothes",
  },
  {
    id: "9",
    image: "/images/image.png",
    title: "Formal Dress Shirt",
    description: "Crisp white formal shirt perfect for business meetings",
    price: 18000,
    currency: "NGN",
    link: "https://example.com/formal-shirt",
    rating: 4.1,
    reviews: 92,
    available: false,
    category: "clothes",
  },

  // Accessories
  {
    id: "10",
    image: "/images/image.png",
    title: "Luxury Watch",
    description: "Elegant timepiece with leather strap and Swiss movement",
    price: 200000,
    currency: "NGN",
    link: "https://example.com/luxury-watch",
    rating: 4.7,
    reviews: 45,
    available: true,
    category: "accessories",
  },
  {
    id: "11",
    image: "/images/image.png",
    title: "Designer Sunglasses",
    description: "Premium UV protection sunglasses with polarized lenses",
    price: 65000,
    currency: "NGN",
    link: "https://example.com/sunglasses",
    rating: 4.5,
    reviews: 123,
    available: true,
    category: "accessories",
  },
];
