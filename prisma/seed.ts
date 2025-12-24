import { PrismaClient } from '../lib/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting enhanced seed...');

  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.promoCode.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const hashedAdminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@jumian.com',
      name: 'Admin User',
      password: hashedAdminPassword,
      role: 'admin',
    },
  });

  console.log('Admin user created:', admin.email, '| Password: Admin@123');

  // Create test users
  const testUsers = [];
  for (let i = 1; i <= 5; i++) {
    const hashedPassword = await bcrypt.hash(`User${i}@123`, 10);
    const user = await prisma.user.create({
      data: {
        email: `user${i}@example.com`,
        name: `Test User ${i}`,
        password: hashedPassword,
        role: 'user',
      },
    });
    testUsers.push(user);
  }

  console.log(`Created ${testUsers.length} test users`);

  // Enhanced categories with IAN placeholder
  const IAN_IMAGE = 'https://placehold.co/800x800/FF6B00/white?text=IAN&font=raleway';

  const categories = [
    {
      name: 'Electronics',
      slug: 'electronics',
      icon: '📱',
      image: IAN_IMAGE,
      description: 'Latest smartphones, laptops, tablets, and smart devices'
    },
    {
      name: 'Fashion',
      slug: 'fashion',
      icon: '👕',
      image: IAN_IMAGE,
      description: 'Trending clothes, shoes, and accessories for all occasions'
    },
    {
      name: 'Home & Kitchen',
      slug: 'home-kitchen',
      icon: '🏠',
      image: IAN_IMAGE,
      description: 'Furniture, appliances, and home decor essentials'
    },
    {
      name: 'Beauty & Health',
      slug: 'beauty',
      icon: '💄',
      image: IAN_IMAGE,
      description: 'Skincare, makeup, wellness and personal care products'
    },
    {
      name: 'Sports & Outdoors',
      slug: 'sports',
      icon: '⚽',
      image: IAN_IMAGE,
      description: 'Sports equipment, fitness gear, and outdoor essentials'
    },
    {
      name: 'Baby & Kids',
      slug: 'baby',
      icon: '👶',
      image: IAN_IMAGE,
      description: 'Products for babies, toddlers, and children'
    },
    {
      name: 'Gaming',
      slug: 'gaming',
      icon: '🎮',
      image: IAN_IMAGE,
      description: 'Gaming consoles, accessories, and video games'
    },
    {
      name: 'Books & Media',
      slug: 'books',
      icon: '📚',
      image: IAN_IMAGE,
      description: 'Books, audiobooks, and educational materials'
    },
    {
      name: 'Automotive',
      slug: 'automotive',
      icon: '🚗',
      image: IAN_IMAGE,
      description: 'Car accessories, parts, and maintenance products'
    },
    {
      name: 'Pet Supplies',
      slug: 'pets',
      icon: '🐾',
      image: IAN_IMAGE,
      description: 'Food, toys, and accessories for your furry friends'
    },
  ];

  for (const category of categories) {
    await prisma.category.create({ data: category });
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
  const booksCategory = await prisma.category.findUnique({ where: { slug: 'books' } });
  const automotiveCategory = await prisma.category.findUnique({ where: { slug: 'automotive' } });
  const petsCategory = await prisma.category.findUnique({ where: { slug: 'pets' } });

  // Massively enhanced products with realistic data
  const products = [
    // ELECTRONICS (15 products)
    {
      name: 'iPhone 15 Pro Max 256GB',
      slug: 'iphone-15-pro-max-256gb',
      description: 'The most advanced iPhone ever. Forged in titanium with the powerful A17 Pro chip. Features a stunning Super Retina XDR display with ProMotion, advanced triple-camera system with 48MP main sensor, and up to 29 hours of video playback. Available in Natural Titanium, Blue Titanium, White Titanium, and Black Titanium.',
      price: 189999,
      originalPrice: 219999,
      discount: 14,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE,
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: electronicsCategory!.id,
      rating: 4.8,
      reviewCount: 2341,
      inStock: true,
      stock: 50,
      seller: 'Apple Store Kenya',
      specifications: JSON.stringify({
        'Display': '6.7" Super Retina XDR',
        'Processor': 'A17 Pro Chip',
        'Storage': '256GB',
        'Camera': '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
        'Battery': 'Up to 29 hours video playback',
        'Connectivity': '5G, Wi-Fi 6E, Bluetooth 5.3',
        'Operating System': 'iOS 17',
        'Colors': 'Natural, Blue, White, Black Titanium',
        'Weight': '221 grams',
        'Water Resistance': 'IP68'
      }),
      featured: true,
      flashSale: true,
    },
    {
      name: 'Samsung Galaxy S24 Ultra 512GB',
      slug: 'samsung-galaxy-s24-ultra',
      description: 'Meet Galaxy AI. The most epic Galaxy S ever with built-in Galaxy AI, S Pen, and 200MP camera. Features a stunning 6.8" Dynamic AMOLED 2X display, Snapdragon 8 Gen 3 processor, and all-day intelligent battery. Perfect for creativity and productivity on the go.',
      price: 169999,
      originalPrice: 199999,
      discount: 15,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: electronicsCategory!.id,
      rating: 4.7,
      reviewCount: 1823,
      inStock: true,
      stock: 35,
      seller: 'Samsung Official Store',
      specifications: JSON.stringify({
        'Display': '6.8" QHD+ Dynamic AMOLED 2X',
        'Processor': 'Snapdragon 8 Gen 3',
        'RAM': '12GB',
        'Storage': '512GB',
        'Camera': '200MP Main + 50MP Periscope + 12MP Ultra Wide + 10MP Telephoto',
        'S Pen': 'Built-in',
        'Battery': '5000mAh with 45W fast charging',
        'Operating System': 'One UI 6.1 (Android 14)',
        'Colors': 'Titanium Black, Gray, Violet, Yellow'
      }),
      featured: true,
      flashSale: true,
    },
    {
      name: 'MacBook Air M3 13-inch',
      slug: 'macbook-air-m3-13',
      description: 'Supercharged by the next-generation M3 chip. The incredibly thin and light MacBook Air delivers exceptional performance with up to 18 hours of battery life. Features a brilliant 13.6-inch Liquid Retina display, 1080p FaceTime HD camera, and an immersive six-speaker sound system.',
      price: 154999,
      originalPrice: 184999,
      discount: 16,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: electronicsCategory!.id,
      rating: 4.9,
      reviewCount: 3124,
      inStock: true,
      stock: 25,
      seller: 'Apple Store Kenya',
      specifications: JSON.stringify({
        'Processor': 'Apple M3 Chip (8-core CPU, 10-core GPU)',
        'Display': '13.6" Liquid Retina (2560 x 1664)',
        'RAM': '8GB Unified Memory',
        'Storage': '256GB SSD',
        'Battery': 'Up to 18 hours',
        'Ports': '2x Thunderbolt / USB 4, MagSafe 3, 3.5mm jack',
        'Camera': '1080p FaceTime HD',
        'Weight': '1.24 kg',
        'Colors': 'Midnight, Starlight, Space Gray, Silver'
      }),
      featured: true,
    },
    {
      name: 'Sony WH-1000XM5 Wireless Headphones',
      slug: 'sony-wh-1000xm5',
      description: 'Industry-leading noise cancellation with two processors controlling eight microphones. Premium sound quality with Hi-Res Audio support. All-day comfort with ultra-soft fit leather, intuitive touch controls, and Speak-to-Chat technology.',
      price: 44999,
      originalPrice: 52999,
      discount: 15,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: electronicsCategory!.id,
      rating: 4.9,
      reviewCount: 5421,
      inStock: true,
      stock: 120,
      seller: 'Sony Official Store',
      specifications: JSON.stringify({
        'Noise Cancellation': 'Industry-leading dual noise sensor',
        'Battery Life': 'Up to 30 hours',
        'Quick Charge': '3 min charge = 3 hours playback',
        'Connectivity': 'Bluetooth 5.2, multipoint connection',
        'Audio': 'Hi-Res Audio, LDAC, DSEE Extreme',
        'Weight': '250g',
        'Colors': 'Black, Silver'
      }),
      featured: true,
      flashSale: true,
    },
    {
      name: 'Dell XPS 15 Laptop',
      slug: 'dell-xps-15',
      description: 'The ultimate laptop for creators. Features a stunning 15.6" 4K OLED display, 13th Gen Intel Core i7 processor, NVIDIA GeForce RTX 4050 graphics, and premium build quality. Perfect for video editing, design work, and gaming.',
      price: 249999,
      originalPrice: 279999,
      discount: 11,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: electronicsCategory!.id,
      rating: 4.7,
      reviewCount: 892,
      inStock: true,
      stock: 18,
      seller: 'Dell Official',
      specifications: JSON.stringify({
        'Processor': 'Intel Core i7-13700H (14 cores)',
        'Graphics': 'NVIDIA GeForce RTX 4050 6GB',
        'Display': '15.6" 4K OLED Touch (3840 x 2400)',
        'RAM': '16GB DDR5',
        'Storage': '512GB PCIe NVMe SSD',
        'Battery': 'Up to 11 hours',
        'Weight': '1.86 kg',
        'Ports': 'Thunderbolt 4, USB-C, SD card reader'
      }),
      featured: true,
    },
    {
      name: 'iPad Pro 11-inch M2',
      slug: 'ipad-pro-11-m2',
      description: 'Astonishing performance with the M2 chip. Features an advanced Liquid Retina display, ProMotion, True Tone, and P3 wide color. Works perfectly with Apple Pencil and Magic Keyboard. The ultimate mobile creative studio.',
      price: 124999,
      originalPrice: 139999,
      discount: 11,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: electronicsCategory!.id,
      rating: 4.8,
      reviewCount: 2156,
      inStock: true,
      stock: 40,
      seller: 'Apple Store Kenya',
      specifications: JSON.stringify({
        'Display': '11" Liquid Retina (2388 x 1668)',
        'Processor': 'Apple M2 Chip',
        'Storage': '128GB',
        'Camera': '12MP Wide + 10MP Ultra Wide',
        'Front Camera': '12MP TrueDepth with Face ID',
        'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3',
        'Battery': 'Up to 10 hours',
        'Compatibility': 'Apple Pencil (2nd gen), Magic Keyboard'
      }),
    },
    {
      name: 'Samsung 55" QLED 4K Smart TV',
      slug: 'samsung-55-qled-tv',
      description: 'Experience vibrant colors and deep blacks with Quantum Dot technology. Features 4K AI Upscaling, Motion Xcelerator Turbo+, and Object Tracking Sound Lite. Smart TV with built-in streaming apps and voice control.',
      price: 84999,
      originalPrice: 99999,
      discount: 15,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: electronicsCategory!.id,
      rating: 4.6,
      reviewCount: 1432,
      inStock: true,
      stock: 22,
      seller: 'Samsung Official Store',
      specifications: JSON.stringify({
        'Screen Size': '55 inches',
        'Resolution': '4K UHD (3840 x 2160)',
        'Display Technology': 'QLED with Quantum Dot',
        'HDR': 'HDR10+',
        'Refresh Rate': '120Hz',
        'Smart Features': 'Tizen OS, voice control, streaming apps',
        'Sound': 'Object Tracking Sound Lite, 20W',
        'Ports': '4x HDMI 2.1, 2x USB, Ethernet'
      }),
      flashSale: true,
    },
    {
      name: 'Canon EOS R6 Mark II Mirrorless Camera',
      slug: 'canon-eos-r6-mark2',
      description: 'Full-frame mirrorless camera with 24.2MP sensor and advanced autofocus. Perfect for both photography and videography with 4K 60p video, in-body image stabilization, and dual card slots.',
      price: 329999,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: electronicsCategory!.id,
      rating: 4.9,
      reviewCount: 567,
      inStock: true,
      stock: 12,
      seller: 'Camera Store Kenya',
      specifications: JSON.stringify({
        'Sensor': '24.2MP Full-Frame CMOS',
        'Autofocus': 'Dual Pixel CMOS AF II',
        'Video': '4K 60p, Full HD 180p',
        'Image Stabilization': 'In-Body 8 stops',
        'ISO Range': '100-102400 (expandable)',
        'Continuous Shooting': 'Up to 40 fps',
        'Viewfinder': '3.69M-dot OLED EVF',
        'LCD': '3.0" Vari-angle touchscreen'
      }),
    },
    {
      name: 'Bose QuietComfort Earbuds II',
      slug: 'bose-qc-earbuds-2',
      description: 'World-class noise cancellation in wireless earbuds. Personalized sound with CustomTune technology, comfortable all-day wear, and up to 6 hours of battery life.',
      price: 34999,
      originalPrice: 39999,
      discount: 13,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: electronicsCategory!.id,
      rating: 4.7,
      reviewCount: 2341,
      inStock: true,
      stock: 85,
      seller: 'Bose Official',
      specifications: JSON.stringify({
        'Noise Cancellation': 'Personalized with CustomTune',
        'Battery Life': '6 hours (24 hours with case)',
        'Connectivity': 'Bluetooth 5.3, multipoint',
        'Audio': 'Hi-Fi sound, dynamic EQ',
        'Water Resistance': 'IPX4',
        'Ear Tips': '3 sizes included',
        'Colors': 'Black, White, Eclipse Gray'
      }),
      flashSale: true,
    },
    {
      name: 'Google Pixel 8 Pro',
      slug: 'google-pixel-8-pro',
      description: 'The most helpful phone ever with Google AI. Features the new Google Tensor G3 chip, exceptional camera with Magic Editor, and 7 years of OS updates. Pure Android experience.',
      price: 134999,
      originalPrice: 154999,
      discount: 13,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: electronicsCategory!.id,
      rating: 4.6,
      reviewCount: 1234,
      inStock: true,
      stock: 45,
      seller: 'Google Store',
      specifications: JSON.stringify({
        'Display': '6.7" LTPO OLED (2992 x 1344)',
        'Processor': 'Google Tensor G3',
        'RAM': '12GB',
        'Storage': '256GB',
        'Camera': '50MP Wide + 48MP Telephoto + 48MP Ultra Wide',
        'Battery': '5050mAh with 30W charging',
        'Operating System': 'Android 14',
        'Updates': '7 years of OS & security updates',
        'Features': 'Magic Editor, Best Take, Audio Magic Eraser'
      }),
    },

    // FASHION (12 products)
    {
      name: 'Nike Air Max 270 React',
      slug: 'nike-air-max-270',
      description: 'Iconic running shoes with the biggest Max Air unit yet for unparalleled comfort. Features React foam cushioning, breathable mesh upper, and modern design. Perfect for everyday wear and light workouts.',
      price: 14999,
      originalPrice: 17999,
      discount: 17,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: fashionCategory!.id,
      rating: 4.6,
      reviewCount: 892,
      inStock: true,
      stock: 200,
      seller: 'Nike Official Kenya',
      specifications: JSON.stringify({
        'Material': 'Mesh & Synthetic upper',
        'Sole': 'React Foam with Max Air unit',
        'Style': 'Running/Lifestyle',
        'Sizes Available': 'US 6-13 (Men), 5-12 (Women)',
        'Colors': 'Black/White, Triple Black, White/Blue',
        'Weight': '310 grams (size 9)',
        'Use': 'Running, Casual wear'
      }),
      featured: true,
      flashSale: true,
    },
    {
      name: "Men's Premium Cotton T-Shirt Pack (3pcs)",
      slug: 'mens-premium-cotton-tshirt-3pack',
      description: 'High-quality 100% cotton t-shirts in a convenient 3-pack. Pre-shrunk, breathable, and durable fabric perfect for everyday wear. Classic crew neck design with reinforced seams. Available in multiple color combinations.',
      price: 3999,
      originalPrice: 5999,
      discount: 33,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: fashionCategory!.id,
      rating: 4.4,
      reviewCount: 2156,
      inStock: true,
      stock: 500,
      seller: 'Fashion Hub Kenya',
      specifications: JSON.stringify({
        'Material': '100% Premium Cotton',
        'GSM': '180 GSM (Medium weight)',
        'Fit': 'Regular fit',
        'Neck': 'Crew neck',
        'Sizes': 'S, M, L, XL, XXL',
        'Pack Contents': '3 t-shirts',
        'Care': 'Machine washable',
        'Colors': 'Black, White, Gray / Navy, White, Red'
      }),
      flashSale: true,
    },
    {
      name: "Women's Yoga Leggings High Waist",
      slug: 'womens-yoga-leggings',
      description: 'Premium high-waisted yoga leggings with tummy control and squat-proof fabric. Moisture-wicking, stretchy, and perfect for yoga, gym, or casual wear. Features hidden pocket.',
      price: 2999,
      originalPrice: 4499,
      discount: 33,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: fashionCategory!.id,
      rating: 4.7,
      reviewCount: 3421,
      inStock: true,
      stock: 300,
      seller: 'Active Wear Co',
      specifications: JSON.stringify({
        'Material': '87% Polyester, 13% Spandex',
        'Waist': 'High-rise (covers navel)',
        'Features': 'Moisture-wicking, 4-way stretch, squat-proof',
        'Pocket': 'Hidden waistband pocket',
        'Sizes': 'XS, S, M, L, XL',
        'Length': 'Full length (ankle)',
        'Use': 'Yoga, gym, casual, running',
        'Colors': 'Black, Navy, Gray, Purple, Teal'
      }),
      featured: true,
    },
    {
      name: "Men's Leather Dress Shoes Oxford",
      slug: 'mens-leather-oxford-shoes',
      description: 'Genuine leather Oxford shoes with classic cap-toe design. Perfect for formal occasions, office wear, or weddings. Comfortable cushioned insole and non-slip rubber sole.',
      price: 8999,
      originalPrice: 12999,
      discount: 31,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: fashionCategory!.id,
      rating: 4.5,
      reviewCount: 678,
      inStock: true,
      stock: 120,
      seller: 'Classic Shoes Kenya',
      specifications: JSON.stringify({
        'Upper Material': '100% Genuine Leather',
        'Sole': 'Rubber (non-slip)',
        'Style': 'Cap-toe Oxford',
        'Lining': 'Breathable fabric',
        'Insole': 'Cushioned comfort',
        'Sizes': '39-46 (EU)',
        'Colors': 'Black, Brown, Tan',
        'Occasion': 'Formal, Business, Wedding'
      }),
    },
    {
      name: "Women's Elegant Maxi Dress",
      slug: 'womens-elegant-maxi-dress',
      description: 'Flowing maxi dress with elegant floral print. Features adjustable straps, elastic waist, and side pockets. Perfect for summer occasions, beach wear, or casual outings.',
      price: 4999,
      originalPrice: 7999,
      discount: 38,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: fashionCategory!.id,
      rating: 4.6,
      reviewCount: 1567,
      inStock: true,
      stock: 180,
      seller: 'Elegance Fashion',
      specifications: JSON.stringify({
        'Material': 'Polyester & Chiffon blend',
        'Length': 'Maxi (floor-length)',
        'Waist': 'Elastic waist',
        'Straps': 'Adjustable spaghetti straps',
        'Features': 'Side pockets, lined',
        'Sizes': 'S, M, L, XL',
        'Patterns': 'Floral, Solid, Bohemian',
        'Care': 'Hand wash or gentle machine wash'
      }),
      featured: true,
    },
    {
      name: 'Adidas Ultraboost 23 Running Shoes',
      slug: 'adidas-ultraboost-23',
      description: 'Premium running shoes with BOOST cushioning for incredible energy return. Features Primeknit+ upper, Continental rubber outsole, and Torsion System for stability.',
      price: 21999,
      originalPrice: 26999,
      discount: 19,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: fashionCategory!.id,
      rating: 4.8,
      reviewCount: 2890,
      inStock: true,
      stock: 95,
      seller: 'Adidas Official',
      specifications: JSON.stringify({
        'Technology': 'BOOST midsole, Primeknit+',
        'Outsole': 'Continental Rubber',
        'Drop': '10mm',
        'Weight': '310g (US 9)',
        'Fit': 'True to size',
        'Use': 'Road running, training',
        'Colors': 'Core Black, Cloud White, Solar Red'
      }),
      flashSale: true,
    },
    {
      name: "Men's Slim Fit Denim Jeans",
      slug: 'mens-slim-fit-jeans',
      description: 'Classic slim-fit denim jeans with stretch for comfort. Features 5-pocket design, zip fly, and button closure. Versatile style perfect for casual or smart-casual occasions.',
      price: 5999,
      originalPrice: 8999,
      discount: 33,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: fashionCategory!.id,
      rating: 4.4,
      reviewCount: 1890,
      inStock: true,
      stock: 250,
      seller: 'Denim World',
      specifications: JSON.stringify({
        'Material': '98% Cotton, 2% Elastane',
        'Fit': 'Slim fit with stretch',
        'Rise': 'Mid-rise',
        'Closure': 'Zip fly with button',
        'Pockets': '5-pocket design',
        'Waist Sizes': '28-40 inches',
        'Inseam': '30", 32", 34"',
        'Colors': 'Dark Blue, Light Blue, Black, Gray'
      }),
    },
    {
      name: "Women's Leather Handbag Tote",
      slug: 'womens-leather-handbag',
      description: 'Spacious genuine leather tote bag with multiple compartments. Perfect for work, shopping, or travel. Features top handles and detachable shoulder strap.',
      price: 7999,
      originalPrice: 11999,
      discount: 33,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: fashionCategory!.id,
      rating: 4.6,
      reviewCount: 1234,
      inStock: true,
      stock: 140,
      seller: 'Leather Luxe',
      specifications: JSON.stringify({
        'Material': '100% Genuine Leather',
        'Dimensions': '35cm x 28cm x 12cm',
        'Straps': 'Dual handles + shoulder strap',
        'Pockets': 'Interior zip pocket, phone slots',
        'Closure': 'Magnetic snap',
        'Lining': 'Fabric lined',
        'Colors': 'Black, Brown, Tan, Navy',
        'Capacity': 'Laptop (13"), wallet, books, cosmetics'
      }),
      featured: true,
    },

    // HOME & KITCHEN (10 products)
    {
      name: 'KitchenAid Artisan Stand Mixer 5QT',
      slug: 'kitchenaid-stand-mixer',
      description: 'Professional-grade stand mixer perfect for baking and cooking. Features 10-speed settings, 5-quart stainless steel bowl, and planetary mixing action. Includes dough hook, flat beater, and wire whip.',
      price: 54999,
      originalPrice: 64999,
      discount: 15,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: homeKitchenCategory!.id,
      rating: 4.9,
      reviewCount: 5678,
      inStock: true,
      stock: 45,
      seller: 'KitchenAid Official',
      specifications: JSON.stringify({
        'Capacity': '5 Quart (4.8L)',
        'Power': '325 Watts',
        'Speeds': '10 speeds',
        'Bowl': 'Stainless Steel',
        'Attachments': 'Dough Hook, Flat Beater, Wire Whip',
        'Hub': 'Power hub for 15+ attachments',
        'Colors': 'Empire Red, Silver, Black, Aqua Sky',
        'Warranty': '1 year'
      }),
      featured: true,
      flashSale: true,
    },
    {
      name: 'Dyson V15 Detect Cordless Vacuum',
      slug: 'dyson-v15-detect',
      description: 'Most powerful cordless vacuum with laser dust detection. Features piezo sensor that counts and sizes dust particles, LCD screen showing real-time proof of deep clean, and whole-machine HEPA filtration.',
      price: 89999,
      originalPrice: 104999,
      discount: 14,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: homeKitchenCategory!.id,
      rating: 4.8,
      reviewCount: 2345,
      inStock: true,
      stock: 30,
      seller: 'Dyson Official Store',
      specifications: JSON.stringify({
        'Suction Power': '230 AW',
        'Battery': 'Up to 60 minutes',
        'Dust Detection': 'Laser illumination + piezo sensor',
        'Display': 'LCD screen with real-time data',
        'Filtration': 'Whole-machine HEPA',
        'Weight': '3kg',
        'Bin Capacity': '0.76L',
        'Attachments': '7 tools included'
      }),
      featured: true,
    },
    {
      name: 'Nespresso Vertuo Next Coffee Maker',
      slug: 'nespresso-vertuo-next',
      description: 'Smart coffee and espresso maker with barcode reading technology. Brews 5 cup sizes from espresso to Alto. Features one-touch brewing, Bluetooth connectivity, and eco-friendly design.',
      price: 24999,
      originalPrice: 29999,
      discount: 17,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: homeKitchenCategory!.id,
      rating: 4.6,
      reviewCount: 3456,
      inStock: true,
      stock: 75,
      seller: 'Nespresso Store',
      specifications: JSON.stringify({
        'Brewing': 'Centrifusion technology',
        'Cup Sizes': 'Espresso, Double, Gran Lungo, Mug, Alto',
        'Water Tank': '1.1L',
        'Capsule Recognition': 'Barcode reading',
        'Connectivity': 'Bluetooth',
        'Heat-up Time': '30 seconds',
        'Power': '1500W',
        'Material': '54% recycled plastic'
      }),
      flashSale: true,
    },
    {
      name: 'Philips Air Fryer XXL',
      slug: 'philips-air-fryer-xxl',
      description: 'Large capacity air fryer for families. Fry, bake, grill, and roast with up to 90% less fat. Features Smart Sensing technology, digital touchscreen, and dishwasher-safe parts.',
      price: 32999,
      originalPrice: 39999,
      discount: 18,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: homeKitchenCategory!.id,
      rating: 4.7,
      reviewCount: 4567,
      inStock: true,
      stock: 60,
      seller: 'Philips Official',
      specifications: JSON.stringify({
        'Capacity': '1.4kg / 7.3L',
        'Power': '2225W',
        'Temperature Range': '60-200°C',
        'Technology': 'Rapid Air + Smart Sensing',
        'Presets': '13 cooking modes',
        'Display': 'Digital touchscreen',
        'Cleaning': 'Dishwasher-safe parts',
        'Accessories': 'Baking tray, grill pan included'
      }),
    },
    {
      name: 'Roomba j7+ Robot Vacuum',
      slug: 'roomba-j7-plus',
      description: 'Smart robot vacuum that avoids obstacles and pet waste. Features automatic dirt disposal, smart mapping, and voice control compatibility. Cleans on schedule even when you\'re away.',
      price: 74999,
      originalPrice: 89999,
      discount: 17,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: homeKitchenCategory!.id,
      rating: 4.7,
      reviewCount: 2890,
      inStock: true,
      stock: 25,
      seller: 'iRobot Official',
      specifications: JSON.stringify({
        'Navigation': 'PrecisionVision + Smart Mapping',
        'Obstacle Avoidance': 'P.O.O.P guarantee (Pet Owner Official Promise)',
        'Auto Empty': 'Clean Base (60 days)',
        'Battery': '90 minutes',
        'Connectivity': 'Wi-Fi, app control, voice (Alexa, Google)',
        'Cleaning': '3-stage system with dual rubber brushes',
        'Floor Types': 'All floors, carpets up to 2cm'
      }),
      featured: true,
    },
    {
      name: 'Le Creuset Cast Iron Dutch Oven 5.5QT',
      slug: 'le-creuset-dutch-oven',
      description: 'Premium enameled cast iron Dutch oven perfect for braising, roasting, and baking. Superior heat retention and distribution. Oven safe up to 260°C. Lifetime warranty.',
      price: 42999,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: homeKitchenCategory!.id,
      rating: 4.9,
      reviewCount: 1567,
      inStock: true,
      stock: 35,
      seller: 'Le Creuset Store',
      specifications: JSON.stringify({
        'Material': 'Enameled Cast Iron',
        'Capacity': '5.5 Quart (5.2L)',
        'Diameter': '26cm',
        'Weight': '6.3kg',
        'Oven Safe': 'Up to 260°C',
        'Stovetop': 'All types including induction',
        'Colors': 'Flame, Caribbean, White, Black',
        'Warranty': 'Lifetime'
      }),
    },

    // Continue with more products...
    // BEAUTY & HEALTH (8 products)
    {
      name: 'Estée Lauder Advanced Night Repair Serum',
      slug: 'estee-lauder-night-repair',
      description: 'The #1 night serum. Reduces the look of multiple signs of aging with powerful technology that synchronizes with skin\'s natural repair cycle. Delivers 8-hour anti-oxidant power.',
      price: 12499,
      originalPrice: 14999,
      discount: 17,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: beautyCategory!.id,
      rating: 4.8,
      reviewCount: 6789,
      inStock: true,
      stock: 150,
      seller: 'Beauty & Glow',
      specifications: JSON.stringify({
        'Size': '50ml',
        'Type': 'Serum',
        'Skin Type': 'All skin types',
        'Benefits': 'Anti-aging, hydration, repair',
        'Key Ingredients': 'ChronoluxCB Technology',
        'Application': 'Morning and night',
        'Texture': 'Lightweight serum',
        'Dermatologist Tested': 'Yes'
      }),
      featured: true,
      flashSale: true,
    },
    {
      name: 'CeraVe Hydrating Facial Cleanser',
      slug: 'cerave-hydrating-cleanser',
      description: 'Gentle non-foaming cleanser developed with dermatologists. Contains ceramides and hyaluronic acid to help retain skin\'s moisture. Fragrance-free and non-comedogenic.',
      price: 1999,
      originalPrice: 2499,
      discount: 20,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: beautyCategory!.id,
      rating: 4.7,
      reviewCount: 8901,
      inStock: true,
      stock: 300,
      seller: 'Skincare Plus',
      specifications: JSON.stringify({
        'Size': '355ml',
        'Type': 'Facial Cleanser',
        'Skin Type': 'Normal to Dry',
        'Key Ingredients': '3 Essential Ceramides, Hyaluronic Acid',
        'pH': 'Balanced',
        'Features': 'Fragrance-free, non-comedogenic',
        'Developed With': 'Dermatologists',
        'Awards': 'Multiple Allure Best of Beauty awards'
      }),
      flashSale: true,
    },
    {
      name: 'The Ordinary Niacinamide 10% + Zinc 1%',
      slug: 'the-ordinary-niacinamide',
      description: 'High-strength vitamin and mineral blemish formula. Reduces appearance of blemishes and congestion. Balances visible sebum production.',
      price: 1299,
      originalPrice: 1699,
      discount: 24,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: beautyCategory!.id,
      rating: 4.5,
      reviewCount: 12345,
      inStock: true,
      stock: 400,
      seller: 'The Ordinary Store',
      specifications: JSON.stringify({
        'Size': '30ml',
        'Type': 'Serum',
        'Active Ingredients': '10% Niacinamide, 1% Zinc',
        'Skin Concerns': 'Blemishes, enlarged pores, uneven tone',
        'Application': 'AM and PM before oils/creams',
        'Vegan': 'Yes',
        'Cruelty-Free': 'Yes',
        'Alcohol-Free': 'Yes'
      }),
      featured: true,
    },

    // GAMING (8 products)
    {
      name: 'PlayStation 5 Console (Slim)',
      slug: 'playstation-5-console',
      description: 'Experience lightning-fast loading with an ultra-high-speed SSD, stunning 4K graphics, and ray tracing. Features haptic feedback and adaptive triggers with DualSense controller.',
      price: 72999,
      originalPrice: 79999,
      discount: 9,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: gamingCategory!.id,
      rating: 4.9,
      reviewCount: 15678,
      inStock: true,
      stock: 8,
      seller: 'Sony Gaming Kenya',
      specifications: JSON.stringify({
        'Storage': '1TB SSD',
        'GPU': 'Custom RDNA 2',
        'CPU': 'AMD Ryzen Zen 2',
        'Resolution': 'Up to 8K',
        'Frame Rate': 'Up to 120fps',
        'Ray Tracing': 'Yes',
        'Controller': 'DualSense with haptic feedback',
        'Backward Compatible': 'PS4 games'
      }),
      featured: true,
    },
    {
      name: 'Xbox Series X Console',
      slug: 'xbox-series-x',
      description: 'The fastest, most powerful Xbox ever. 12 teraflops of raw GPU power, 4K gaming at 60fps (up to 120fps), and Quick Resume for multiple games.',
      price: 69999,
      originalPrice: 74999,
      discount: 7,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: gamingCategory!.id,
      rating: 4.8,
      reviewCount: 12456,
      inStock: true,
      stock: 12,
      seller: 'Xbox Official',
      specifications: JSON.stringify({
        'Storage': '1TB NVMe SSD',
        'GPU': '12 TFLOPS RDNA 2',
        'CPU': 'Custom AMD Zen 2',
        'Resolution': '4K native, up to 8K',
        'Frame Rate': 'Up to 120fps',
        'Ray Tracing': 'Hardware-accelerated',
        'Quick Resume': 'Multiple games',
        'Game Pass': 'Compatible'
      }),
      featured: true,
    },
    {
      name: 'Nintendo Switch OLED Model',
      slug: 'nintendo-switch-oled',
      description: 'Vivid 7-inch OLED screen with enhanced audio. Play at home or on the go. Includes dock with wired LAN port, enhanced kickstand, and 64GB internal storage.',
      price: 44999,
      originalPrice: 49999,
      discount: 10,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: gamingCategory!.id,
      rating: 4.8,
      reviewCount: 9876,
      inStock: true,
      stock: 28,
      seller: 'Nintendo Store',
      specifications: JSON.stringify({
        'Screen': '7" OLED touchscreen',
        'Resolution': '1280 x 720 (handheld), 1920 x 1080 (docked)',
        'Storage': '64GB internal',
        'Battery': '4.5 - 9 hours',
        'Controllers': 'Joy-Con (L) and (R)',
        'Modes': 'TV mode, Tabletop mode, Handheld mode',
        'Colors': 'White, Neon Blue/Red',
        'Audio': 'Enhanced speakers'
      }),
    },
    {
      name: 'Logitech G Pro X Superlight Wireless Gaming Mouse',
      slug: 'logitech-g-pro-x-superlight',
      description: 'Ultra-lightweight wireless gaming mouse under 63 grams. HERO 25K sensor, LIGHTSPEED wireless, 70-hour battery. Used by pro esports players.',
      price: 18999,
      originalPrice: 21999,
      discount: 14,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: gamingCategory!.id,
      rating: 4.9,
      reviewCount: 5678,
      inStock: true,
      stock: 55,
      seller: 'Logitech G Official',
      specifications: JSON.stringify({
        'Weight': '< 63 grams',
        'Sensor': 'HERO 25K (100-25,600 DPI)',
        'Connectivity': 'LIGHTSPEED Wireless',
        'Battery': 'Up to 70 hours',
        'Buttons': '5 programmable',
        'Skates': 'Zero-additive PTFE feet',
        'Colors': 'Black, White, Magenta',
        'Compatibility': 'PC, Mac'
      }),
      flashSale: true,
    },

    // SPORTS & OUTDOORS (8 products)
    {
      name: 'Adidas Gym Duffel Bag Large',
      slug: 'adidas-gym-duffel-bag',
      description: 'Spacious and durable gym bag with multiple compartments. Features ventilated shoe compartment, padded shoulder strap, and water-resistant base. Perfect for gym, sports, or travel.',
      price: 5999,
      originalPrice: 7999,
      discount: 25,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: sportsCategory!.id,
      rating: 4.6,
      reviewCount: 2345,
      inStock: true,
      stock: 300,
      seller: 'Adidas Official',
      specifications: JSON.stringify({
        'Capacity': '50 Liters',
        'Material': 'Durable Polyester',
        'Dimensions': '55cm x 28cm x 28cm',
        'Compartments': 'Main, shoe, wet gear, valuables',
        'Strap': 'Adjustable padded shoulder strap',
        'Base': 'Water-resistant',
        'Colors': 'Black, Navy, Gray, Red'
      }),
      flashSale: true,
    },
    {
      name: 'Yoga Mat Premium Non-Slip 6mm',
      slug: 'yoga-mat-premium',
      description: 'Eco-friendly yoga mat with superior grip and cushioning. Non-slip textured surface, lightweight, and includes carrying strap. Perfect for yoga, pilates, and fitness.',
      price: 3499,
      originalPrice: 4999,
      discount: 30,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: sportsCategory!.id,
      rating: 4.7,
      reviewCount: 4567,
      inStock: true,
      stock: 200,
      seller: 'Fit & Active',
      specifications: JSON.stringify({
        'Thickness': '6mm',
        'Dimensions': '183cm x 61cm',
        'Material': 'TPE (Eco-friendly)',
        'Surface': 'Non-slip textured both sides',
        'Weight': '900g',
        'Features': 'Moisture-resistant, easy to clean',
        'Includes': 'Carrying strap',
        'Colors': 'Purple, Blue, Green, Pink, Black'
      }),
      featured: true,
    },
    {
      name: 'Adjustable Dumbbells Set 5-52.5lbs',
      slug: 'adjustable-dumbbells-set',
      description: 'Space-saving adjustable dumbbells replace 15 sets. Quick weight adjustment with turn dial. Perfect for home gym workouts.',
      price: 44999,
      originalPrice: 54999,
      discount: 18,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: sportsCategory!.id,
      rating: 4.8,
      reviewCount: 3456,
      inStock: true,
      stock: 45,
      seller: 'Home Gym Pro',
      specifications: JSON.stringify({
        'Weight Range': '2.5kg - 24kg per dumbbell',
        'Adjustments': '15 weight settings',
        'Mechanism': 'Turn dial selection',
        'Material': 'Steel plates with rubber coating',
        'Replaces': '15 sets of weights',
        'Storage': 'Includes storage trays',
        'Warranty': '2 years'
      }),
    },

    // BABY & KIDS (6 products)
    {
      name: 'Baby Stroller 3-in-1 Travel System',
      slug: 'baby-stroller-3in1',
      description: 'Complete travel system that grows with your child. Includes stroller, car seat, and bassinet. Features one-hand fold, adjustable handlebar, and large storage basket.',
      price: 39999,
      originalPrice: 52999,
      discount: 25,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: babyCategory!.id,
      rating: 4.7,
      reviewCount: 2890,
      inStock: true,
      stock: 40,
      seller: 'Baby Care Pro',
      specifications: JSON.stringify({
        'System': '3-in-1 (Stroller, Car Seat, Bassinet)',
        'Weight Limit': '0-22kg',
        'Car Seat': 'Rear-facing for infants',
        'Stroller': 'Reversible seat, reclining',
        'Fold': 'One-hand compact fold',
        'Wheels': 'All-terrain with suspension',
        'Storage': 'Large basket + parent organizer',
        'Safety': '5-point harness, meets safety standards'
      }),
      featured: true,
      flashSale: true,
    },
    {
      name: 'Baby Monitor with Camera & Audio',
      slug: 'baby-monitor-camera',
      description: 'Smart baby monitor with 1080p HD camera, two-way audio, night vision, and temperature sensor. View from your smartphone anywhere.',
      price: 14999,
      originalPrice: 19999,
      discount: 25,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: babyCategory!.id,
      rating: 4.6,
      reviewCount: 1890,
      inStock: true,
      stock: 85,
      seller: 'Smart Baby Tech',
      specifications: JSON.stringify({
        'Video': '1080p HD camera',
        'Audio': 'Two-way communication',
        'Night Vision': 'Infrared LED',
        'Sensors': 'Temperature, humidity, sound',
        'Connectivity': 'Wi-Fi, smartphone app',
        'Features': 'Motion detection, lullabies, alerts',
        'Storage': 'Cloud & local',
        'Viewing': '360° pan, 110° tilt'
      }),
    },

    // BOOKS (4 products)
    {
      name: 'Atomic Habits by James Clear',
      slug: 'atomic-habits-book',
      description: 'The #1 New York Times bestseller. Tiny Changes, Remarkable Results. Learn how to build good habits and break bad ones with this transformative guide.',
      price: 2499,
      originalPrice: 2999,
      discount: 17,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: booksCategory!.id,
      rating: 4.9,
      reviewCount: 45678,
      inStock: true,
      stock: 150,
      seller: 'Books & More',
      specifications: JSON.stringify({
        'Author': 'James Clear',
        'Format': 'Paperback',
        'Pages': '320 pages',
        'Language': 'English',
        'Publisher': 'Avery',
        'ISBN': '978-0735211292',
        'Dimensions': '14cm x 21cm',
        'Category': 'Self-Help, Personal Development'
      }),
      featured: true,
    },

    // AUTOMOTIVE (3 products)
    {
      name: 'Car Dash Cam 4K Front and Rear',
      slug: 'car-dash-cam-4k',
      description: 'Dual camera dash cam with 4K front camera and 1080p rear camera. Features night vision, parking mode, GPS, and G-sensor for emergency recording.',
      price: 19999,
      originalPrice: 24999,
      discount: 20,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: automotiveCategory!.id,
      rating: 4.7,
      reviewCount: 3456,
      inStock: true,
      stock: 90,
      seller: 'Auto Tech Kenya',
      specifications: JSON.stringify({
        'Front Camera': '4K UHD (3840x2160)',
        'Rear Camera': '1080p Full HD',
        'Lens': '170° wide angle',
        'Screen': '3" LCD touchscreen',
        'Night Vision': 'Advanced WDR',
        'Storage': 'Up to 256GB microSD',
        'GPS': 'Built-in for location tracking',
        'G-Sensor': 'Emergency lock recording',
        'Loop Recording': 'Yes'
      }),
      featured: true,
    },

    // PET SUPPLIES (3 products)
    {
      name: 'Automatic Pet Feeder with Camera',
      slug: 'automatic-pet-feeder',
      description: 'Smart pet feeder with 1080p camera, portion control, and scheduling via app. See, talk to, and feed your pet from anywhere. Suitable for cats and dogs.',
      price: 17999,
      originalPrice: 22999,
      discount: 22,
      images: JSON.stringify([
        IAN_IMAGE,
        IAN_IMAGE
      ]),
      categoryId: petsCategory!.id,
      rating: 4.6,
      reviewCount: 2345,
      inStock: true,
      stock: 65,
      seller: 'Pet Tech Store',
      specifications: JSON.stringify({
        'Capacity': '4 Liters (6kg dry food)',
        'Camera': '1080p HD with night vision',
        'Audio': 'Two-way communication',
        'Portions': '1-10 portions per meal',
        'Meals': 'Up to 10 meals per day',
        'Power': 'AC adapter + battery backup',
        'App': 'iOS & Android compatible',
        'For': 'Cats and small to medium dogs'
      }),
      featured: true,
    },
  ];

  // Create products in batches
  console.log('Creating products...');
  let createdCount = 0;
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
    createdCount++;
    if (createdCount % 10 === 0) {
      console.log(`  ${createdCount}/${products.length} products created...`);
    }
  }

  console.log(`${products.length} products created`);

  // Create promo codes
  const promoCodes = [
    {
      code: 'WELCOME10',
      description: 'Welcome discount for new customers',
      type: 'percentage',
      value: 10,
      minPurchase: 5000,
      usageLimit: 1000,
      active: true,
      expiresAt: new Date('2025-12-31'),
    },
    {
      code: 'FLASH25',
      description: 'Flash sale special discount',
      type: 'percentage',
      value: 25,
      minPurchase: 10000,
      maxDiscount: 5000,
      usageLimit: 500,
      active: true,
      expiresAt: new Date('2025-03-31'),
    },
    {
      code: 'FREESHIP',
      description: 'Free shipping on orders over 20000',
      type: 'fixed',
      value: 1000,
      minPurchase: 20000,
      usageLimit: null,
      active: true,
    },
  ];

  for (const promo of promoCodes) {
    await prisma.promoCode.create({ data: promo });
  }

  console.log('Promo codes created');

  // Create sample reviews
  const sampleProducts = await prisma.product.findMany({ take: 20 });
  const reviewTexts = [
    'Excellent product! Exceeded my expectations. Highly recommend!',
    'Good quality for the price. Fast delivery and well packaged.',
    'Amazing! This is exactly what I was looking for. Love it!',
    'Decent product. Does what it says. Happy with purchase.',
    'Outstanding quality and performance. Worth every penny!',
    'Great value for money. Would definitely buy again.',
    'Perfect! Fast shipping and exactly as described.',
    'Very satisfied with this purchase. Good quality product.',
  ];

  let reviewCount = 0;
  for (const product of sampleProducts) {
    const numReviews = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < numReviews; i++) {
      const randomUser = testUsers[Math.floor(Math.random() * testUsers.length)];
      await prisma.review.create({
        data: {
          rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
          comment: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
          productId: product.id,
          userId: randomUser.id,
        },
      });
      reviewCount++;
    }
  }

  console.log(`${reviewCount} reviews created`);

  console.log('\nEnhanced seed completed successfully!');
  console.log('\nAdmin Login:');
  console.log('   Email: admin@jumian.com');
  console.log('   Password: Admin@123');
  console.log('\nStatistics:');
  console.log(`   Categories: ${categories.length}`);
  console.log(`   Products: ${products.length}`);
  console.log(`   Promo Codes: ${promoCodes.length}`);
  console.log(`   Test Users: ${testUsers.length}`);
  console.log(`   Reviews: ${reviewCount}`);
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
