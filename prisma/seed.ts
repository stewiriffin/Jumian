import { PrismaClient } from '../lib/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@jumian.com' },
    update: {},
    create: {
      email: 'admin@jumian.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('Admin user created:', admin.email);

  // Create categories
  const categories = [
    {
      name: 'Electronics',
      slug: 'electronics',
      icon: '📱',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
      description: 'Latest smartphones, laptops, and gadgets'
    },
    {
      name: 'Fashion',
      slug: 'fashion',
      icon: '👕',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
      description: 'Trending clothes and accessories'
    },
    {
      name: 'Home & Kitchen',
      slug: 'home-kitchen',
      icon: '🏠',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
      description: 'Everything for your home'
    },
    {
      name: 'Beauty',
      slug: 'beauty',
      icon: '💄',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
      description: 'Cosmetics and skincare products'
    },
    {
      name: 'Sports',
      slug: 'sports',
      icon: '⚽',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
      description: 'Sports equipment and fitness gear'
    },
    {
      name: 'Baby Products',
      slug: 'baby',
      icon: '👶',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
      description: 'Products for babies and toddlers'
    },
    {
      name: 'Gaming',
      slug: 'gaming',
      icon: '🎮',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
      description: 'Gaming consoles and accessories'
    },
    {
      name: 'Books',
      slug: 'books',
      icon: '📚',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
      description: 'Books and educational materials'
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log('Categories created');

  // Get category IDs
  const electronicsCategory = await prisma.category.findUnique({ where: { slug: 'electronics' } });
  const fashionCategory = await prisma.category.findUnique({ where: { slug: 'fashion' } });
  const homeKitchenCategory = await prisma.category.findUnique({ where: { slug: 'home-kitchen' } });
  const beautyCategory = await prisma.category.findUnique({ where: { slug: 'beauty' } });
  const sportsCategory = await prisma.category.findUnique({ where: { slug: 'sports' } });
  const babyCategory = await prisma.category.findUnique({ where: { slug: 'baby' } });
  const gamingCategory = await prisma.category.findUnique({ where: { slug: 'gaming' } });

  // Create products (Prices in KES - Kenyan Shillings)
  const products = [
    {
      name: 'iPhone 15 Pro Max 256GB',
      slug: 'iphone-15-pro-max-256gb',
      description: 'The iPhone 15 Pro Max features a stunning titanium design, powerful A17 Pro chip, and advanced camera system with 48MP main sensor.',
      price: 189999,
      originalPrice: 219999,
      discount: 13,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500',
        'https://images.unsplash.com/photo-1592286927505-b7cae48c9ea1?w=500'
      ]),
      categoryId: electronicsCategory!.id,
      rating: 4.8,
      reviewCount: 2341,
      inStock: true,
      stock: 50,
      seller: 'Apple Store',
      specifications: JSON.stringify({
        'Screen Size': '6.7 inches',
        'Storage': '256GB',
        'Camera': '48MP Main',
        'Processor': 'A17 Pro',
        'Battery': '4422 mAh'
      }),
      featured: true,
      flashSale: true,
    },
    {
      name: 'Samsung Galaxy S24 Ultra',
      slug: 'samsung-galaxy-s24-ultra',
      description: 'Galaxy S24 Ultra with built-in S Pen, 200MP camera, and AI-powered features for the ultimate smartphone experience.',
      price: 169999,
      originalPrice: 199999,
      discount: 14,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500'
      ]),
      categoryId: electronicsCategory!.id,
      rating: 4.7,
      reviewCount: 1823,
      inStock: true,
      stock: 35,
      seller: 'Samsung Official',
      specifications: JSON.stringify({
        'Screen Size': '6.8 inches',
        'Storage': '256GB',
        'Camera': '200MP Main',
        'RAM': '12GB'
      }),
      featured: true,
    },
    {
      name: 'Sony WH-1000XM5 Wireless Headphones',
      slug: 'sony-wh-1000xm5',
      description: 'Industry-leading noise cancellation, exceptional sound quality, and all-day comfort in premium wireless headphones.',
      price: 44999,
      originalPrice: 52999,
      discount: 13,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500'
      ]),
      categoryId: electronicsCategory!.id,
      rating: 4.9,
      reviewCount: 5421,
      inStock: true,
      stock: 120,
      seller: 'Sony Store',
      specifications: JSON.stringify({
        'Battery Life': '30 hours',
        'Connectivity': 'Bluetooth 5.2',
        'Weight': '250g'
      }),
      featured: true,
      flashSale: true,
    },
    {
      name: 'MacBook Air M3 13-inch',
      slug: 'macbook-air-m3-13',
      description: 'Supercharged by the M3 chip, incredibly thin and light design with up to 18 hours of battery life.',
      price: 154999,
      originalPrice: 184999,
      discount: 15,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'
      ]),
      categoryId: electronicsCategory!.id,
      rating: 4.9,
      reviewCount: 3124,
      inStock: true,
      stock: 25,
      seller: 'Apple Store',
      specifications: JSON.stringify({
        'Processor': 'Apple M3',
        'RAM': '8GB',
        'Storage': '256GB SSD',
        'Display': '13.6-inch Liquid Retina'
      }),
      flashSale: true,
    },
    {
      name: 'Nike Air Max 270',
      slug: 'nike-air-max-270',
      description: 'Iconic running shoes with Max Air cushioning for all-day comfort and style.',
      price: 14999,
      originalPrice: 17999,
      discount: 17,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'
      ]),
      categoryId: fashionCategory!.id,
      rating: 4.6,
      reviewCount: 892,
      inStock: true,
      stock: 200,
      seller: 'Nike Official',
      specifications: JSON.stringify({
        'Material': 'Mesh & Synthetic',
        'Cushioning': 'Max Air',
        'Style': 'Running/Casual'
      }),
      flashSale: true,
    },
    {
      name: "Men's Casual Cotton T-Shirt",
      slug: 'mens-casual-cotton-tshirt',
      description: 'Comfortable 100% cotton t-shirt perfect for everyday wear. Available in multiple colors.',
      price: 1999,
      originalPrice: 2999,
      discount: 29,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
      ]),
      categoryId: fashionCategory!.id,
      rating: 4.3,
      reviewCount: 456,
      inStock: true,
      stock: 500,
      seller: 'Fashion Hub',
      specifications: JSON.stringify({
        'Material': '100% Cotton',
        'Fit': 'Regular',
        'Sizes': 'S, M, L, XL, XXL'
      }),
      flashSale: true,
    },
    {
      name: 'KitchenAid Stand Mixer',
      slug: 'kitchenaid-stand-mixer',
      description: 'Professional-grade stand mixer for all your baking needs. 5-quart capacity with multiple attachments.',
      price: 54999,
      originalPrice: 64999,
      discount: 16,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500'
      ]),
      categoryId: homeKitchenCategory!.id,
      rating: 4.8,
      reviewCount: 2156,
      inStock: true,
      stock: 45,
      seller: 'KitchenAid',
      specifications: JSON.stringify({
        'Capacity': '5 Quart',
        'Power': '325 Watts',
        'Attachments': '10+ available'
      }),
      flashSale: true,
    },
    {
      name: 'Dyson V15 Detect Vacuum',
      slug: 'dyson-v15-detect-vacuum',
      description: 'Powerful cordless vacuum with laser detection technology and LCD screen showing real-time cleaning stats.',
      price: 89999,
      originalPrice: 104999,
      discount: 13,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500'
      ]),
      categoryId: homeKitchenCategory!.id,
      rating: 4.7,
      reviewCount: 1432,
      inStock: true,
      stock: 30,
      seller: 'Dyson Official',
      specifications: JSON.stringify({
        'Battery': '60 minutes',
        'Weight': '3kg',
        'Filtration': 'HEPA'
      }),
    },
    {
      name: 'Estée Lauder Advanced Night Repair',
      slug: 'estee-lauder-night-repair',
      description: 'Powerful night serum that repairs and renews skin overnight for a radiant complexion.',
      price: 12499,
      originalPrice: 14999,
      discount: 15,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500'
      ]),
      categoryId: beautyCategory!.id,
      rating: 4.6,
      reviewCount: 3421,
      inStock: true,
      stock: 150,
      seller: 'Beauty Store',
      specifications: JSON.stringify({
        'Size': '50ml',
        'Type': 'Serum',
        'Skin Type': 'All Types'
      }),
      flashSale: true,
    },
    {
      name: 'PlayStation 5 Console',
      slug: 'playstation-5-console',
      description: 'Next-gen gaming console with ultra-high-speed SSD, stunning 4K graphics, and ray tracing.',
      price: 72999,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500'
      ]),
      categoryId: gamingCategory!.id,
      rating: 4.9,
      reviewCount: 8234,
      inStock: false,
      stock: 0,
      seller: 'Sony Gaming',
      specifications: JSON.stringify({
        'Storage': '825GB SSD',
        'Resolution': 'Up to 8K',
        'Ray Tracing': 'Yes'
      }),
    },
    {
      name: 'Adidas Gym Duffel Bag',
      slug: 'adidas-gym-duffel-bag',
      description: 'Spacious and durable gym bag with multiple compartments for all your workout essentials.',
      price: 5999,
      originalPrice: 7999,
      discount: 25,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
      ]),
      categoryId: sportsCategory!.id,
      rating: 4.4,
      reviewCount: 567,
      inStock: true,
      stock: 300,
      seller: 'Adidas Official',
      specifications: JSON.stringify({
        'Material': 'Polyester',
        'Capacity': '50L',
        'Pockets': 'Multiple'
      }),
      flashSale: true,
    },
    {
      name: 'Baby Stroller 3-in-1',
      slug: 'baby-stroller-3in1',
      description: 'Versatile 3-in-1 stroller system that grows with your child. Includes car seat and carrier.',
      price: 39999,
      originalPrice: 52999,
      discount: 25,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1544924893-594cf1a96e0b?w=500'
      ]),
      categoryId: babyCategory!.id,
      rating: 4.7,
      reviewCount: 1234,
      inStock: true,
      stock: 40,
      seller: 'Baby Care',
      specifications: JSON.stringify({
        'Weight Limit': '22kg',
        'Modes': 'Stroller, Car Seat, Carrier',
        'Foldable': 'Yes'
      }),
      flashSale: true,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log('Products created');
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
