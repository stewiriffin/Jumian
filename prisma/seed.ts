import { PrismaClient } from '../lib/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Generate consistent placeholder image URL
function getPlaceholderImage(seed: string, width: number = 800, height: number = 800): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

// Generate product-specific placeholder with text
function getProductPlaceholder(name: string): string {
  const encoded = encodeURIComponent(name.substring(0, 30));
  return `https://placehold.co/800x800/F68B1E/white?text=${encoded}`;
}

async function main() {
  console.log('🌱 Seeding database with complete products...');

  // Create admin user
  const adminEmail = 'ian@fedora.com';
  const adminPassword = 'YourSecurePassword123!';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log('✅ Admin user created:', adminEmail);
  }

  // Create demo admin for easy testing
  const demoAdminEmail = 'admin@jumian.com';
  const demoAdminPassword = 'admin123';

  const existingDemoAdmin = await prisma.user.findUnique({
    where: { email: demoAdminEmail },
  });

  if (!existingDemoAdmin) {
    const hashedPassword = await bcrypt.hash(demoAdminPassword, 10);
    await prisma.user.create({
      data: {
        name: 'Demo Admin',
        email: demoAdminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log('✅ Demo admin user created:', demoAdminEmail);
  }

  // Create categories with fast placeholder images
  const categories = [
    { name: 'Electronics', slug: 'electronics', icon: '📱', image: getPlaceholderImage('electronics', 400, 400) },
    { name: 'Fashion', slug: 'fashion', icon: '👗', image: getPlaceholderImage('fashion', 400, 400) },
    { name: 'Home & Kitchen', slug: 'home-kitchen', icon: '🏠', image: getPlaceholderImage('home', 400, 400) },
    { name: 'Beauty', slug: 'beauty', icon: '💄', image: getPlaceholderImage('beauty', 400, 400) },
    { name: 'Sports', slug: 'sports', icon: '⚽', image: getPlaceholderImage('sports', 400, 400) },
    { name: 'Baby Products', slug: 'baby', icon: '👶', image: getPlaceholderImage('baby', 400, 400) },
    { name: 'Gaming', slug: 'gaming', icon: '🎮', image: getPlaceholderImage('gaming', 400, 400) },
    { name: 'Books', slug: 'books', icon: '📚', image: getPlaceholderImage('books', 400, 400) },
  ];

  const categoryMap: Record<string, string> = {};

  for (const cat of categories) {
    const existingCat = await prisma.category.findUnique({ where: { slug: cat.slug } });
    if (!existingCat) {
      const created = await prisma.category.create({ data: cat });
      categoryMap[cat.slug] = created.id;
      console.log('✅ Category created:', cat.name);
    } else {
      categoryMap[cat.slug] = existingCat.id;
    }
  }

  // Products with fast placeholder images
  const products = [
    {
      name: 'iPhone 15 Pro Max 256GB', slug: 'iphone-15-pro-max-256gb', price: 1299, originalPrice: 1499, discount: 13,
      description: 'The iPhone 15 Pro Max features a stunning titanium design, powerful A17 Pro chip, and advanced camera system with 48MP main camera. Dynamic Island brings new ways to interact with your phone.',
      images: JSON.stringify([getProductPlaceholder('iPhone 15 Pro Max'), getProductPlaceholder('iPhone Back'), getProductPlaceholder('iPhone Front')]),
      specs: { 'Screen': '6.7 inches OLED', 'Storage': '256GB', 'Camera': '48MP Main', 'Processor': 'A17 Pro', 'Battery': 'All-day', '5G': 'Yes', 'Water Resistant': 'IP68' },
      rating: 4.8, reviewCount: 2341, inStock: true, stock: 50, seller: 'Apple Store', categorySlug: 'electronics', featured: true, flashSale: true
    },
    {
      name: 'Samsung Galaxy S24 Ultra', slug: 'samsung-galaxy-s24-ultra', price: 1299, originalPrice: 1499, discount: 13,
      description: 'The Samsung Galaxy S24 Ultra features a 200MP camera, built-in S Pen, and powerful Galaxy AI. The titanium frame makes it our most durable phone yet.',
      images: JSON.stringify([getProductPlaceholder('Samsung S24 Ultra'), getProductPlaceholder('Samsung S24')]),
      specs: { 'Screen': '6.8 inches', 'Storage': '256GB', 'Camera': '200MP Main', 'Processor': 'Snapdragon 8 Gen 3', 'RAM': '12GB', 'Battery': '5000mAh', '5G': 'Yes' },
      rating: 4.8, reviewCount: 1876, inStock: true, stock: 35, seller: 'Samsung Official', categorySlug: 'electronics', featured: true, flashSale: true
    },
    {
      name: 'MacBook Air M3 13-inch', slug: 'macbook-air-m3-13', price: 1099, originalPrice: 1299, discount: 15,
      description: 'The MacBook Air M3 is impossibly thin with incredible performance. Up to 18 hours of battery life, stunning 13.6-inch Liquid Retina display.',
      images: JSON.stringify([getProductPlaceholder('MacBook Air M3'), getProductPlaceholder('MacBook Open')]),
      specs: { 'Display': '13.6-inch Retina', 'Processor': 'Apple M3', 'RAM': '8GB', 'Storage': '256GB SSD', 'Battery': '18 hours', 'Weight': '1.24kg' },
      rating: 4.9, reviewCount: 3124, inStock: true, stock: 25, seller: 'Apple Store', categorySlug: 'electronics', featured: true, flashSale: true
    },
    {
      name: 'iPad Pro M4 12.9-inch', slug: 'ipad-pro-m4-12-9', price: 1099, originalPrice: 1299, discount: 15,
      description: 'The iPad Pro with M4 chip delivers extraordinary performance. Ultra Retina XDR display with Tandem OLED technology.',
      images: JSON.stringify([getProductPlaceholder('iPad Pro M4'), getProductPlaceholder('iPad Pro')]),
      specs: { 'Display': '12.9-inch XDR', 'Processor': 'Apple M4', 'Storage': '256GB', 'Camera': '12MP Wide', 'Weight': '684g', '5G': 'Optional' },
      rating: 4.8, reviewCount: 1876, inStock: true, stock: 30, seller: 'Apple Store', categorySlug: 'electronics', featured: true, flashSale: true
    },
    {
      name: 'Apple Watch Series 9', slug: 'apple-watch-series-9', price: 399, originalPrice: 499, discount: 20,
      description: 'Apple Watch Series 9 with S9 chip, Double Tap, and brighter Always-On Retina display. Advanced health features.',
      images: JSON.stringify([getProductPlaceholder('Apple Watch S9')]),
      specs: { 'Case Size': '45mm', 'Display': 'Always-On Retina', 'Processor': 'S9 SiP', 'Storage': '64GB', 'Water Resistant': '50m', 'Battery': '18 hours' },
      rating: 4.8, reviewCount: 3421, inStock: true, stock: 75, seller: 'Apple Store', categorySlug: 'electronics', featured: true, flashSale: true
    },
    {
      name: 'AirPods Pro 2nd Gen', slug: 'airpods-pro-2nd-gen', price: 249, originalPrice: 299, discount: 17,
      description: 'AirPods Pro with Adaptive Audio, Personalized Spatial Audio, and powerful H2 chip for smarter noise cancellation.',
      images: JSON.stringify([getProductPlaceholder('AirPods Pro 2')]),
      specs: { 'Audio': 'Active Noise Cancellation', 'Battery': '6 hours (ANC)', 'Case': '24+ hours', 'Chip': 'H2', 'Water Resistant': 'IP54' },
      rating: 4.8, reviewCount: 5632, inStock: true, stock: 150, seller: 'Apple Store', categorySlug: 'electronics', featured: true, flashSale: true
    },
    {
      name: 'PlayStation 5', slug: 'playstation-5', price: 499, originalPrice: 549, discount: 9,
      description: 'The PS5 console with lightning-fast load times, ray tracing, and 4K gaming at up to 120fps. Includes DualSense controller.',
      images: JSON.stringify([getProductPlaceholder('PlayStation 5')]),
      specs: { 'GPU': '10.28 TFLOPs', 'CPU': '8-core Zen 2', 'Storage': '825GB SSD', 'Resolution': '4K at 120fps', 'Disc Drive': '4K UHD Blu-ray' },
      rating: 4.9, reviewCount: 8234, inStock: true, stock: 10, seller: 'Sony Gaming', categorySlug: 'electronics', featured: true, flashSale: true
    },
    {
      name: 'Xbox Series X', slug: 'xbox-series-x', price: 499, originalPrice: 549, discount: 9,
      description: 'The most powerful Xbox ever with 12 TFLOPs of processing power. 4K gaming at up to 120fps with 1TB SSD.',
      images: JSON.stringify([getProductPlaceholder('Xbox Series X')]),
      specs: { 'GPU': '12 TFLOPS', 'CPU': '8-core Zen 2', 'Storage': '1TB NVMe SSD', 'Resolution': '4K at 60fps', 'Disc Drive': '4K UHD Blu-ray' },
      rating: 4.9, reviewCount: 6543, inStock: true, stock: 15, seller: 'Microsoft', categorySlug: 'electronics', featured: true, flashSale: true
    },
    {
      name: 'Sony WH-1000XM5', slug: 'sony-wh-1000xm5', price: 349, originalPrice: 399, discount: 13,
      description: 'Industry-leading noise cancellation with 8 microphones. Crystal-clear hands-free calling and 30-hour battery.',
      images: JSON.stringify([getProductPlaceholder('Sony WH-1000XM5')]),
      specs: { 'Driver': '30mm', 'Noise Cancellation': 'Industry-leading', 'Battery': '30 hours', 'Bluetooth': '5.2', 'Weight': '250g' },
      rating: 4.9, reviewCount: 5421, inStock: true, stock: 100, seller: 'Sony Store', categorySlug: 'electronics', featured: true, flashSale: true
    },
    {
      name: 'Nintendo Switch OLED', slug: 'nintendo-switch-oled', price: 349, originalPrice: 399, discount: 13,
      description: 'Nintendo Switch with vibrant 7-inch OLED screen, wide adjustable stand, and enhanced audio.',
      images: JSON.stringify([getProductPlaceholder('Switch OLED')]),
      specs: { 'Screen': '7" OLED', 'Storage': '64GB', 'Battery': '4.5-9 hours', 'Weight': '0.32kg', 'Includes': 'Joy-Con pair' },
      rating: 4.8, reviewCount: 4321, inStock: true, stock: 30, seller: 'Nintendo', categorySlug: 'electronics', featured: false, flashSale: false
    },
    {
      name: 'Samsung 55" QLED 4K TV', slug: 'samsung-qled-55-4k', price: 699, originalPrice: 999, discount: 30,
      description: 'Stunning 4K QLED TV with Quantum Dot technology. Neural Quantum Processor upscales content to 4K.',
      images: JSON.stringify([getProductPlaceholder('Samsung QLED TV')]),
      specs: { 'Screen Size': '55 inches', 'Resolution': '4K UHD', 'Panel': 'QLED', 'Refresh Rate': '120Hz', 'Smart TV': 'Tizen' },
      rating: 4.5, reviewCount: 876, inStock: true, stock: 30, seller: 'Samsung Official', categorySlug: 'electronics', featured: true, flashSale: true
    },
    {
      name: 'Dell XPS 15', slug: 'dell-xps-15', price: 1499, originalPrice: 1799, discount: 17,
      description: 'Dell XPS 15 with stunning 15.6" FHD+ InfinityEdge display. Intel Core i7 and NVIDIA RTX 4050.',
      images: JSON.stringify([getProductPlaceholder('Dell XPS 15')]),
      specs: { 'Display': '15.6" FHD+', 'Processor': 'Intel Core i7-13700H', 'RAM': '16GB DDR5', 'Storage': '512GB NVMe SSD', 'GPU': 'NVIDIA RTX 4050' },
      rating: 4.6, reviewCount: 1234, inStock: true, stock: 20, seller: 'Dell Official', categorySlug: 'electronics', featured: true, flashSale: true
    },
    {
      name: 'Canon EOS R6 Mark II', slug: 'canon-eos-r6-mark-ii', price: 2499, originalPrice: 2799, discount: 11,
      description: 'Full-frame mirrorless camera with 24.2MP sensor. 4K 60p video with no recording limits.',
      images: JSON.stringify([getProductPlaceholder('Canon EOS R6')]),
      specs: { 'Sensor': '24.2MP Full-frame', 'Processor': 'DIGIC X', 'ISO': '100-204800', 'Video': '4K 60p', 'AF': 'Dual Pixel CMOS AF II' },
      rating: 4.9, reviewCount: 432, inStock: true, stock: 10, seller: 'Canon', categorySlug: 'electronics', featured: false, flashSale: false
    },
    {
      name: 'DJI Mini 4 Pro', slug: 'dji-mini-4-pro', price: 999, originalPrice: 1149, discount: 13,
      description: 'Advanced mini drone with 4K/60fps video. Omnidirectional obstacle sensing and 10km transmission.',
      images: JSON.stringify([getProductPlaceholder('DJI Mini 4 Pro')]),
      specs: { 'Weight': 'Under 249g', 'Video': '4K/60fps', 'Flight Time': '34 minutes', 'Transmission': '10km', 'Obstacle Sensing': 'Omnidirectional' },
      rating: 4.8, reviewCount: 876, inStock: true, stock: 20, seller: 'DJI', categorySlug: 'electronics', featured: true, flashSale: true
    },
    {
      name: 'Nike Air Max 270', slug: 'nike-air-max-270', price: 150, originalPrice: 180, discount: 17,
      description: 'Iconic running shoes with Max Air cushioning. Engineered mesh upper for breathability.',
      images: JSON.stringify([getProductPlaceholder('Nike Air Max')]),
      specs: { 'Upper': 'Engineered Mesh', 'Midsole': 'Max Air', 'Outsole': 'Rubber', 'Cushioning': 'Max Air', 'Surface': 'Road', 'Style': 'Running' },
      rating: 4.6, reviewCount: 892, inStock: true, stock: 200, seller: 'Nike Official', categorySlug: 'fashion', featured: true, flashSale: true
    },
    {
      name: 'Nike Air Force 1 \'07', slug: 'nike-air-force-1-07', price: 110, originalPrice: 130, discount: 15,
      description: 'Classic sneakers with full-grain leather upper and Air-Sole unit for lightweight cushioning.',
      images: JSON.stringify([getProductPlaceholder('Nike Air Force 1')]),
      specs: { 'Upper': 'Full-grain Leather', 'Midsole': 'Air-Sole', 'Outsole': 'Rubber', 'Style': 'High-top', 'Surface': 'Court' },
      rating: 4.7, reviewCount: 2345, inStock: true, stock: 300, seller: 'Nike Official', categorySlug: 'fashion', featured: false, flashSale: true
    },
    {
      name: 'Adidas Ultraboost 23', slug: 'adidas-ultraboost-23', price: 190, originalPrice: 220, discount: 14,
      description: 'Premium running with Boost midsole for incredible energy return. Primeknit upper for sock-like fit.',
      images: JSON.stringify([getProductPlaceholder('Adidas Ultraboost')]),
      specs: { 'Upper': 'Primeknit+', 'Midsole': 'Boost', 'Outsole': 'Continental Rubber', 'Weight': '290g', 'Cushioning': 'Boost' },
      rating: 4.7, reviewCount: 2134, inStock: true, stock: 120, seller: 'Adidas Official', categorySlug: 'fashion', featured: true, flashSale: true
    },
    {
      name: "Levi's 501 Original Jeans", slug: 'levis-501-original', price: 60, originalPrice: 79, discount: 24,
      description: 'Iconic straight fit jeans with authentic details. Button fly and signature Levis tab.',
      images: JSON.stringify([getProductPlaceholder("Levi's 501")]),
      specs: { 'Fit': 'Original Straight', 'Rise': 'Mid', 'Material': '100% Cotton Denim', 'Wash': 'Medium Blue', 'Closure': 'Button Fly' },
      rating: 4.5, reviewCount: 4321, inStock: true, stock: 300, seller: "Levi's", categorySlug: 'fashion', featured: true, flashSale: true
    },
    {
      name: "Levi's 511 Slim Fit", slug: 'levis-511-slim', price: 55, originalPrice: 75, discount: 27,
      description: 'Modern slim fit jeans with stretch for comfort. The most versatile fit for any occasion.',
      images: JSON.stringify([getProductPlaceholder("Levi's 511")]),
      specs: { 'Fit': 'Slim', 'Rise': 'Mid', 'Material': '98% Cotton 2% Elastane', 'Closure': 'Button Fly', 'Stretch': 'Yes' },
      rating: 4.4, reviewCount: 3210, inStock: true, stock: 280, seller: "Levi's", categorySlug: 'fashion', featured: false, flashSale: true
    },
    {
      name: 'KitchenAid Stand Mixer', slug: 'kitchenaid-stand-mixer', price: 379, originalPrice: 449, discount: 16,
      description: 'KitchenAid 5-Qt Stand Mixer with 325-watt motor. Includes flat beater, dough hook, and wire whip.',
      images: JSON.stringify([getProductPlaceholder('KitchenAid Mixer')]),
      specs: { 'Capacity': '5 Quart', 'Motor': '325 Watts', 'Speeds': '10 + Pulse', 'Bowl': 'Stainless Steel', 'Warranty': '5 years' },
      rating: 4.8, reviewCount: 2156, inStock: true, stock: 40, seller: 'KitchenAid', categorySlug: 'home-kitchen', featured: true, flashSale: true
    },
    {
      name: 'Dyson V15 Detect Vacuum', slug: 'dyson-v15-detect', price: 649, originalPrice: 749, discount: 13,
      description: 'Dyson V15 with laser dust detection and piezo sensor for scientific proof of deep clean.',
      images: JSON.stringify([getProductPlaceholder('Dyson V15')]),
      specs: { 'Suction': '240 AW', 'Battery': '60 minutes', 'Bin': '0.76L', 'Filtration': 'HEPA', 'Display': 'LCD with reports' },
      rating: 4.7, reviewCount: 1432, inStock: true, stock: 25, seller: 'Dyson Official', categorySlug: 'home-kitchen', featured: true, flashSale: false
    },
    {
      name: 'Instant Pot Duo 7-in-1', slug: 'instant-pot-duo-7', price: 89, originalPrice: 119, discount: 25,
      description: 'Multi-use pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, warmer.',
      images: JSON.stringify([getProductPlaceholder('Instant Pot')]),
      specs: { 'Capacity': '6 Quart', 'Functions': '7-in-1', 'Power': '1000W', 'Programs': '12', 'Material': 'Stainless Steel' },
      rating: 4.6, reviewCount: 8765, inStock: true, stock: 150, seller: 'Instant Pot', categorySlug: 'home-kitchen', featured: true, flashSale: true
    },
    {
      name: 'Vitamix 5200 Blender', slug: 'vitamix-5200', price: 399, originalPrice: 499, discount: 20,
      description: 'Professional-grade blender with 2 HP motor. Makes hot soups, frozen desserts, and more.',
      images: JSON.stringify([getProductPlaceholder('Vitamix 5200')]),
      specs: { 'Motor': '2 HP', 'Container': '64 oz', 'Blades': 'Stainless steel', 'Speeds': 'Variable + Pulse', 'Warranty': '7 years' },
      rating: 4.9, reviewCount: 3210, inStock: true, stock: 35, seller: 'Vitamix', categorySlug: 'home-kitchen', featured: true, flashSale: true
    },
    {
      name: 'Estée Lauder Advanced Night Repair', slug: 'el-advanced-night-repair', price: 89, originalPrice: 105, discount: 15,
      description: 'Iconic serum with ChronoluxCB Technology. Repairs visible signs of past damage.',
      images: JSON.stringify([getProductPlaceholder('Estée Lauder Serum')]),
      specs: { 'Size': '50ml', 'Type': 'Serum', 'Skin Type': 'All', 'Key Ingredients': 'Hyaluronic Acid', 'Benefits': 'Repairs, Hydrates' },
      rating: 4.6, reviewCount: 3421, inStock: true, stock: 200, seller: 'Estée Lauder', categorySlug: 'beauty', featured: true, flashSale: true
    },
    {
      name: 'Olaplex No.3 Hair Perfector', slug: 'olaplex-no3', price: 30, originalPrice: 38, discount: 21,
      description: 'At-home hair repair treatment that rebuilds broken disulfide bonds. Weekly treatment.',
      images: JSON.stringify([getProductPlaceholder('Olaplex No.3')]),
      specs: { 'Size': '100ml', 'Use': 'Weekly treatment', 'Hair Type': 'All types', 'Key Tech': 'Bis-Aminopropyl', 'Results': 'Rebuilds bonds' },
      rating: 4.7, reviewCount: 5432, inStock: true, stock: 300, seller: 'Olaplex', categorySlug: 'beauty', featured: false, flashSale: true
    },
    {
      name: 'Dyson Airwrap Complete', slug: 'dyson-airwrap', price: 599, originalPrice: 699, discount: 14,
      description: 'Hair styling with Coanda airflow. No extreme heat. Intelligent heat control.',
      images: JSON.stringify([getProductPlaceholder('Dyson Airwrap')]),
      specs: { 'Attachments': '6 pieces', 'Heat Settings': '3', 'Motor': 'V9 digital', 'Negative Ions': 'Yes', 'Cold Shot': 'Yes' },
      rating: 4.6, reviewCount: 4532, inStock: true, stock: 45, seller: 'Dyson Official', categorySlug: 'beauty', featured: true, flashSale: true
    },
    {
      name: 'Fitbit Charge 5', slug: 'fitbit-charge-5', price: 119, originalPrice: 149, discount: 20,
      description: 'Advanced fitness tracker with built-in GPS, EDA Scan, and stress management tools.',
      images: JSON.stringify([getProductPlaceholder('Fitbit Charge 5')]),
      specs: { 'Display': 'AMOLED', 'Battery': '7 days', 'GPS': 'Built-in', 'Water Resistant': '50m', 'Sensors': 'HR, SpO2, EDA' },
      rating: 4.4, reviewCount: 4532, inStock: true, stock: 200, seller: 'Fitbit', categorySlug: 'sports', featured: true, flashSale: true
    },
    {
      name: 'Garmin Fenix 7', slug: 'garmin-fenix-7', price: 699, originalPrice: 899, discount: 22,
      description: 'Premium multisport GPS watch with multi-band GNSS, TOPO maps, and solar charging.',
      images: JSON.stringify([getProductPlaceholder('Garmin Fenix 7')]),
      specs: { 'Display': '1.4" AMOLED', 'Battery': '22 days', 'GPS': 'Multi-band GNSS', 'Maps': 'TopoActive', 'Water': '10 ATM' },
      rating: 4.8, reviewCount: 543, inStock: true, stock: 30, seller: 'Garmin', categorySlug: 'sports', featured: true, flashSale: true
    },
    {
      name: 'Baby Stroller 3-in-1', slug: 'baby-stroller-3in1', price: 299, originalPrice: 399, discount: 25,
      description: 'Versatile 3-in-1 stroller with infant car seat, toddler seat, and bassinet included.',
      images: JSON.stringify([getProductPlaceholder('Baby Stroller')]),
      specs: { 'Capacity': '22 kg', 'Modes': '3 (infant, toddler, bassinet)', 'Fold': 'One-hand', 'Wheels': 'All-terrain', 'Safety': '5-point harness' },
      rating: 4.7, reviewCount: 1234, inStock: true, stock: 40, seller: 'BabyCare', categorySlug: 'baby', featured: true, flashSale: true
    },
    {
      name: 'Pampers Premium Diapers', slug: 'pampers-premium', price: 35, originalPrice: 45, discount: 22,
      description: 'Pampers Premium with Blowout Barrier and wetness indicator. Up to 12 hours protection.',
      images: JSON.stringify([getProductPlaceholder('Pampers Diapers')]),
      specs: { 'Size': 'Newborn-6', 'Count': '198', 'Features': 'Blowout Barrier', 'Absorbency': '12 hours', 'Hypoallergenic': 'Yes' },
      rating: 4.6, reviewCount: 5432, inStock: true, stock: 200, seller: 'Pampers', categorySlug: 'baby', featured: false, flashSale: true
    },
    {
      name: 'Logitech G Pro X Mouse', slug: 'logitech-g-pro-x', price: 79, originalPrice: 99, discount: 20,
      description: 'Ultra-lightweight 63g esports mouse with HERO 25K sensor and Lightspeed wireless.',
      images: JSON.stringify([getProductPlaceholder('Logitech G Pro X')]),
      specs: { 'Sensor': 'HERO 25K', 'DPI': '100-25,600', 'Weight': '63g', 'Buttons': '8 programmable', 'Battery': '60 hours' },
      rating: 4.7, reviewCount: 3210, inStock: true, stock: 150, seller: 'Logitech', categorySlug: 'gaming', featured: true, flashSale: true
    },
    {
      name: 'Razer BlackShark V2 Pro', slug: 'razer-blackshark-v2-pro', price: 149, originalPrice: 179, discount: 17,
      description: 'Esports headset with THX Spatial Audio and 70+ hour battery life.',
      images: JSON.stringify([getProductPlaceholder('Razer BlackShark')]),
      specs: { 'Drivers': '50mm Titanium', 'Frequency': '12Hz-28kHz', 'Mic': 'HyperClear', 'Battery': '70+ hours', 'Surround': 'THX Spatial' },
      rating: 4.7, reviewCount: 1876, inStock: true, stock: 100, seller: 'Razer', categorySlug: 'gaming', featured: true, flashSale: true
    },
    {
      name: 'Atomic Habits', slug: 'atomic-habits', price: 14, originalPrice: 18, discount: 22,
      description: 'Atomic Habits by James Clear. Proven framework for building good habits.',
      images: JSON.stringify([getProductPlaceholder('Atomic Habits')]),
      specs: { 'Pages': '320', 'Author': 'James Clear', 'Publisher': 'Penguin', 'Format': 'Hardcover', 'Genre': 'Self-help' },
      rating: 4.8, reviewCount: 87654, inStock: true, stock: 500, seller: 'BookWorld', categorySlug: 'books', featured: true, flashSale: true
    },
    {
      name: 'Rich Dad Poor Dad', slug: 'rich-dad-poor-dad', price: 12, originalPrice: 16, discount: 25,
      description: 'Rich Dad Poor Dad by Robert Kiyosaki. Guide to financial independence.',
      images: JSON.stringify([getProductPlaceholder('Rich Dad Poor Dad')]),
      specs: { 'Pages': '336', 'Author': 'Robert Kiyosaki', 'Publisher': 'Warner Books', 'Format': 'Paperback', 'Genre': 'Personal Finance' },
      rating: 4.5, reviewCount: 98765, inStock: true, stock: 400, seller: 'BookWorld', categorySlug: 'books', featured: true, flashSale: true
    },
  ];

  for (const product of products) {
    const existingProduct = await prisma.product.findUnique({ where: { slug: product.slug } });
    if (!existingProduct) {
      const categoryId = categoryMap[product.categorySlug];
      if (categoryId) {
        await prisma.product.create({
          data: {
            name: product.name,
            slug: product.slug,
            price: product.price,
            originalPrice: product.originalPrice,
            discount: product.discount,
            description: product.description,
            images: product.images,
            specifications: JSON.stringify(product.specs),
            rating: product.rating,
            reviewCount: product.reviewCount,
            inStock: product.inStock,
            stock: product.stock,
            seller: product.seller,
            featured: product.featured,
            flashSale: product.flashSale,
            categoryId: categoryId,
          },
        });
        console.log('✅ Product created:', product.name);
      }
    }
  }

  console.log('🌱 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
