export interface Product {
  id: string;
  name: string;
  slug?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  seller: string;
  description: string;
  images: string[];
  specifications?: { [key: string]: string };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type UserRole = 'user' | 'admin' | 'vendor';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
