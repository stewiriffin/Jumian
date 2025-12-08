export interface Product {
  id: string;
  name: string;
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
