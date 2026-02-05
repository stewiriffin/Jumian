import { Product, Category } from './types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    icon: '📱',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
    slug: 'electronics'
  },
  {
    id: '2',
    name: 'Fashion',
    icon: '👕',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
    slug: 'fashion'
  },
  {
    id: '3',
    name: 'Home & Kitchen',
    icon: '🏠',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
    slug: 'home-kitchen'
  },
  {
    id: '4',
    name: 'Beauty',
    icon: '💄',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    slug: 'beauty'
  },
  {
    id: '5',
    name: 'Sports',
    icon: '⚽',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
    slug: 'sports'
  },
  {
    id: '6',
    name: 'Baby Products',
    icon: '👶',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
    slug: 'baby'
  },
  {
    id: '7',
    name: 'Gaming',
    icon: '🎮',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
    slug: 'gaming'
  },
  {
    id: '8',
    name: 'Books',
    icon: '📚',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
    slug: 'books'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB',
    price: 1299,
    originalPrice: 1499,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    category: 'Electronics',
    rating: 4.8,
    reviews: 2341,
    inStock: true,
    seller: 'Apple Store',
    description: 'The iPhone 15 Pro Max features a stunning titanium design, powerful A17 Pro chip, and advanced camera system.',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      'https://images.unsplash.com/photo-1592286927505-b7cae48c9ea1?w=500'
    ],
    specifications: {
      'Screen Size': '6.7 inches',
      'Storage': '256GB',
      'Camera': '48MP Main',
      'Processor': 'A17 Pro'
    }
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 1199,
    originalPrice: 1399,
    discount: 14,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
    category: 'Electronics',
    rating: 4.7,
    reviews: 1823,
    inStock: true,
    seller: 'Samsung Official',
    description: 'Galaxy S24 Ultra with built-in S Pen, 200MP camera, and AI-powered features.',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500'
    ],
    specifications: {
      'Screen Size': '6.8 inches',
      'Storage': '256GB',
      'Camera': '200MP Main',
      'RAM': '12GB'
    }
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    price: 349,
    originalPrice: 399,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
    category: 'Electronics',
    rating: 4.9,
    reviews: 5421,
    inStock: true,
    seller: 'Sony Store',
    description: 'Industry-leading noise cancellation, exceptional sound quality, and all-day comfort.',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500'
    ],
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.2',
      'Weight': '250g'
    }
  },
  {
    id: '4',
    name: 'MacBook Air M3 13-inch',
    price: 1099,
    originalPrice: 1299,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    category: 'Electronics',
    rating: 4.9,
    reviews: 3124,
    inStock: true,
    seller: 'Apple Store',
    description: 'Supercharged by the M3 chip, incredibly thin and light design with up to 18 hours of battery life.',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'
    ],
    specifications: {
      'Processor': 'Apple M3',
      'RAM': '8GB',
      'Storage': '256GB SSD',
      'Display': '13.6-inch Liquid Retina'
    }
  },
  {
    id: '5',
    name: 'Nike Air Max 270',
    price: 150,
    originalPrice: 180,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Fashion',
    rating: 4.6,
    reviews: 892,
    inStock: true,
    seller: 'Nike Official',
    description: 'Iconic running shoes with Max Air cushioning for all-day comfort.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'
    ],
    specifications: {
      'Material': 'Mesh & Synthetic',
      'Cushioning': 'Max Air',
      'Style': 'Running/Casual'
    }
  },
  {
    id: '6',
    name: "Men's Casual Cotton T-Shirt",
    price: 25,
    originalPrice: 35,
    discount: 29,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'Fashion',
    rating: 4.3,
    reviews: 456,
    inStock: true,
    seller: 'Fashion Hub',
    description: 'Comfortable cotton t-shirt perfect for everyday wear.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
    ],
    specifications: {
      'Material': '100% Cotton',
      'Fit': 'Regular',
      'Sizes': 'S, M, L, XL, XXL'
    }
  },
  {
    id: '7',
    name: 'KitchenAid Stand Mixer',
    price: 379,
    originalPrice: 449,
    discount: 16,
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500',
    category: 'Home & Kitchen',
    rating: 4.8,
    reviews: 2156,
    inStock: true,
    seller: 'KitchenAid',
    description: 'Professional-grade stand mixer for all your baking needs.',
    images: [
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500'
    ],
    specifications: {
      'Capacity': '5 Quart',
      'Power': '325 Watts',
      'Attachments': '10+ available'
    }
  },
  {
    id: '8',
    name: 'Dyson V15 Detect Vacuum',
    price: 649,
    originalPrice: 749,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500',
    category: 'Home & Kitchen',
    rating: 4.7,
    reviews: 1432,
    inStock: true,
    seller: 'Dyson Official',
    description: 'Powerful cordless vacuum with laser detection and LCD screen.',
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500'
    ],
    specifications: {
      'Battery': '60 minutes',
      'Weight': '3kg',
      'Filtration': 'HEPA'
    }
  },
  {
    id: '9',
    name: 'Estée Lauder Advanced Night Repair',
    price: 89,
    originalPrice: 105,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
    category: 'Beauty',
    rating: 4.6,
    reviews: 3421,
    inStock: true,
    seller: 'Beauty Store',
    description: 'Powerful night serum that repairs and renews skin overnight.',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500'
    ],
    specifications: {
      'Size': '50ml',
      'Type': 'Serum',
      'Skin Type': 'All Types'
    }
  },
  {
    id: '10',
    name: 'PlayStation 5 Console',
    price: 499,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500',
    category: 'Gaming',
    rating: 4.9,
    reviews: 8234,
    inStock: false,
    seller: 'Sony Gaming',
    description: 'Next-gen gaming console with ultra-high-speed SSD and stunning graphics.',
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500'
    ],
    specifications: {
      'Storage': '825GB SSD',
      'Resolution': 'Up to 8K',
      'Ray Tracing': 'Yes'
    }
  },
  {
    id: '11',
    name: 'Adidas Gym Duffel Bag',
    price: 45,
    originalPrice: 60,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Sports',
    rating: 4.4,
    reviews: 567,
    inStock: true,
    seller: 'Adidas Official',
    description: 'Spacious and durable gym bag with multiple compartments.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    ],
    specifications: {
      'Material': 'Polyester',
      'Capacity': '50L',
      'Pockets': 'Multiple'
    }
  },
  {
    id: '12',
    name: 'Baby Stroller 3-in-1',
    price: 299,
    originalPrice: 399,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1544924893-594cf1a96e0b?w=500',
    category: 'Baby Products',
    rating: 4.7,
    reviews: 1234,
    inStock: true,
    seller: 'Baby Care',
    description: 'Versatile 3-in-1 stroller system that grows with your child.',
    images: [
      'https://images.unsplash.com/photo-1544924893-594cf1a96e0b?w=500'
    ],
    specifications: {
      'Weight Limit': '22kg',
      'Modes': 'Stroller, Car Seat, Carrier',
      'Foldable': 'Yes'
    }
  }
];
