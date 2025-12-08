import { PrismaClient } from '../lib/generated/prisma';

const prisma = new PrismaClient();

// Generate product-specific images using a curated image mapping
// This approach maps specific products to their actual representative images
function generateCategoryImages(category: string, productName: string, count: number = 3): string {
  const images: string[] = [];

  // Product-specific image mappings using high-quality, relevant sources
  // Using a combination of brand-specific and product-specific identifiers

  const productKey = productName.toLowerCase();

  // Brand-specific logic for more accurate images
  if (productKey.includes('iphone')) {
    // Apple iPhone images - using generic tech images that represent phones well
    images.push('https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=800&fit=crop'); // iPhone dark
    images.push('https://images.unsplash.com/photo-1592286927773-9ee01ec30baf?w=800&h=800&fit=crop'); // iPhone hand
    images.push('https://images.unsplash.com/photo-1511707001-dff6d5d67f17?w=800&h=800&fit=crop'); // iPhone on table
  } else if (productKey.includes('samsung') && productKey.includes('galaxy') && (productKey.includes('s24') || productKey.includes('s23'))) {
    images.push('https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=800&fit=crop'); // Samsung phone
    images.push('https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop'); // Modern smartphone
    images.push('https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=800&fit=crop'); // Phone closeup
  } else if (productKey.includes('pixel')) {
    images.push('https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop'); // Google Pixel style
    images.push('https://images.unsplash.com/photo-1511707001-dff6d5d67f17?w=800&h=800&fit=crop'); // Phone on desk
    images.push('https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=800&fit=crop'); // Phone detail
  } else if (productKey.includes('macbook')) {
    images.push('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop'); // MacBook Pro
    images.push('https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=800&fit=crop'); // MacBook workspace
    images.push('https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop'); // MacBook desk
  } else if (productKey.includes('dell') || productKey.includes('xps')) {
    images.push('https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=800&fit=crop'); // Dell laptop
    images.push('https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=800&fit=crop'); // Modern laptop
    images.push('https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop'); // Laptop workspace
  } else if (productKey.includes('airpods')) {
    images.push('https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&h=800&fit=crop'); // AirPods
    images.push('https://images.unsplash.com/photo-1625228972204-8e3e4bff5415?w=800&h=800&fit=crop'); // AirPods case
    images.push('https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=800&fit=crop'); // Earbuds
  } else if (productKey.includes('apple watch')) {
    images.push('https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop'); // Apple Watch
    images.push('https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop'); // Smart watch
    images.push('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop'); // Apple Watch wrist
  } else if (productKey.includes('ipad')) {
    images.push('https://images.unsplash.com/photo-1544244015-0ab664f8e0c8?w=800&h=800&fit=crop'); // iPad
    images.push('https://images.unsplash.com/photo-1585790050230-5dd28404a8f3?w=800&h=800&fit=crop'); // Tablet use
    images.push('https://images.unsplash.com/photo-1561154464-82e1c7d6e04d?w=800&h=800&fit=crop'); // iPad workspace
  } else if (productKey.includes('playstation') || productKey.includes('ps5')) {
    images.push('https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=800&fit=crop'); // PlayStation console
    images.push('https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=800&fit=crop'); // Gaming setup
    images.push('https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&h=800&fit=crop'); // Controller
  } else if (productKey.includes('xbox')) {
    images.push('https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&h=800&fit=crop'); // Xbox
    images.push('https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=800&fit=crop'); // Gaming console
    images.push('https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=800&fit=crop'); // Gaming
  } else if (productKey.includes('nintendo') || productKey.includes('switch')) {
    images.push('https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&h=800&fit=crop'); // Nintendo Switch
    images.push('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=800&fit=crop'); // Switch gaming
    images.push('https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=800&fit=crop'); // Console
  } else {
    // Fallback to category-specific images
    const categoryImages: Record<string, string[]> = {
      phone: [
        'https://images.unsplash.com/photo-1511707001-dff6d5d67f17?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=800&fit=crop',
      ],
      laptop: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=800&fit=crop',
      ],
      tv: [
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=800&fit=crop',
      ],
      headphones: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&h=800&fit=crop',
      ],
      watch: [
        'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop',
      ],
      camera: [
        'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1606983340126-99ab4a870e2e?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop',
      ],
      gaming: [
        'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&h=800&fit=crop',
      ],
      tablet: [
        'https://images.unsplash.com/photo-1544244015-0ab664f8e0c8?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1585790050230-5dd28404a8f3?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1561154464-82e1c7d6e04d?w=800&h=800&fit=crop',
      ],
    };

    const categoryUrls = categoryImages[category] || categoryImages.phone;
    images.push(...categoryUrls);
  }

  // Ensure we have exactly the requested number of images
  return JSON.stringify(images.slice(0, count));
}

// Product data - MASSIVELY EXPANDED
const phoneProducts = [
  // Premium iPhones
  { name: 'iPhone 15 Pro Max 1TB', brand: 'Apple', price: 159999, discount: 0 },
  { name: 'iPhone 15 Pro Max 512GB', brand: 'Apple', price: 144999, discount: 5 },
  { name: 'iPhone 15 Pro Max 256GB', brand: 'Apple', price: 129999, discount: 5 },
  { name: 'iPhone 15 Pro 512GB', brand: 'Apple', price: 124999, discount: 5 },
  { name: 'iPhone 15 Pro 256GB', brand: 'Apple', price: 114999, discount: 5 },
  { name: 'iPhone 15 Pro 128GB', brand: 'Apple', price: 104999, discount: 8 },
  { name: 'iPhone 15 Plus 256GB', brand: 'Apple', price: 99999, discount: 8 },
  { name: 'iPhone 15 Plus 128GB', brand: 'Apple', price: 94999, discount: 8 },
  { name: 'iPhone 15 256GB', brand: 'Apple', price: 89999, discount: 8 },
  { name: 'iPhone 15 128GB', brand: 'Apple', price: 84999, discount: 10 },
  { name: 'iPhone 14 Pro Max 512GB', brand: 'Apple', price: 119999, discount: 12 },
  { name: 'iPhone 14 Pro Max 256GB', brand: 'Apple', price: 109999, discount: 15 },
  { name: 'iPhone 14 Pro 256GB', brand: 'Apple', price: 99999, discount: 15 },
  { name: 'iPhone 14 Plus 256GB', brand: 'Apple', price: 89999, discount: 18 },
  { name: 'iPhone 14 128GB', brand: 'Apple', price: 79999, discount: 20 },
  { name: 'iPhone 13 Pro Max 256GB', brand: 'Apple', price: 94999, discount: 22 },
  { name: 'iPhone 13 128GB', brand: 'Apple', price: 69999, discount: 25 },

  // Samsung Galaxy S Series
  { name: 'Samsung Galaxy S24 Ultra 1TB', brand: 'Samsung', price: 139999, discount: 8 },
  { name: 'Samsung Galaxy S24 Ultra 512GB', brand: 'Samsung', price: 129999, discount: 10 },
  { name: 'Samsung Galaxy S24 Ultra 256GB', brand: 'Samsung', price: 119999, discount: 10 },
  { name: 'Samsung Galaxy S24 Plus 512GB', brand: 'Samsung', price: 104999, discount: 10 },
  { name: 'Samsung Galaxy S24 Plus 256GB', brand: 'Samsung', price: 94999, discount: 10 },
  { name: 'Samsung Galaxy S24 256GB', brand: 'Samsung', price: 84999, discount: 12 },
  { name: 'Samsung Galaxy S24 128GB', brand: 'Samsung', price: 79999, discount: 12 },
  { name: 'Samsung Galaxy S23 Ultra 512GB', brand: 'Samsung', price: 109999, discount: 15 },
  { name: 'Samsung Galaxy S23 Ultra 256GB', brand: 'Samsung', price: 99999, discount: 18 },
  { name: 'Samsung Galaxy S23 Plus 256GB', brand: 'Samsung', price: 84999, discount: 20 },
  { name: 'Samsung Galaxy S23 256GB', brand: 'Samsung', price: 74999, discount: 22 },

  // Samsung Foldables
  { name: 'Samsung Galaxy Z Fold 6 512GB', brand: 'Samsung', price: 179999, discount: 5 },
  { name: 'Samsung Galaxy Z Fold 6 256GB', brand: 'Samsung', price: 169999, discount: 5 },
  { name: 'Samsung Galaxy Z Fold 5 512GB', brand: 'Samsung', price: 159999, discount: 8 },
  { name: 'Samsung Galaxy Z Fold 5 256GB', brand: 'Samsung', price: 149999, discount: 10 },
  { name: 'Samsung Galaxy Z Flip 6 512GB', brand: 'Samsung', price: 109999, discount: 8 },
  { name: 'Samsung Galaxy Z Flip 6 256GB', brand: 'Samsung', price: 99999, discount: 10 },
  { name: 'Samsung Galaxy Z Flip 5 512GB', brand: 'Samsung', price: 104999, discount: 12 },
  { name: 'Samsung Galaxy Z Flip 5 256GB', brand: 'Samsung', price: 94999, discount: 15 },

  // Google Pixel
  { name: 'Google Pixel 9 Pro XL 512GB', brand: 'Google', price: 109999, discount: 10 },
  { name: 'Google Pixel 9 Pro XL 256GB', brand: 'Google', price: 99999, discount: 12 },
  { name: 'Google Pixel 9 Pro 256GB', brand: 'Google', price: 94999, discount: 12 },
  { name: 'Google Pixel 9 256GB', brand: 'Google', price: 84999, discount: 15 },
  { name: 'Google Pixel 9 128GB', brand: 'Google', price: 79999, discount: 15 },
  { name: 'Google Pixel 8 Pro 512GB', brand: 'Google', price: 94999, discount: 18 },
  { name: 'Google Pixel 8 Pro 256GB', brand: 'Google', price: 89999, discount: 20 },
  { name: 'Google Pixel 8 256GB', brand: 'Google', price: 74999, discount: 22 },
  { name: 'Google Pixel 8 128GB', brand: 'Google', price: 69999, discount: 25 },
  { name: 'Google Pixel 7a 128GB', brand: 'Google', price: 54999, discount: 28 },

  // OnePlus
  { name: 'OnePlus 12 512GB', brand: 'OnePlus', price: 84999, discount: 10 },
  { name: 'OnePlus 12 256GB', brand: 'OnePlus', price: 74999, discount: 12 },
  { name: 'OnePlus 12R 256GB', brand: 'OnePlus', price: 64999, discount: 15 },
  { name: 'OnePlus 11 512GB', brand: 'OnePlus', price: 74999, discount: 18 },
  { name: 'OnePlus 11 256GB', brand: 'OnePlus', price: 64999, discount: 20 },
  { name: 'OnePlus Nord 3 256GB', brand: 'OnePlus', price: 49999, discount: 22 },

  // Xiaomi
  { name: 'Xiaomi 14 Ultra 512GB', brand: 'Xiaomi', price: 89999, discount: 15 },
  { name: 'Xiaomi 14 Ultra 256GB', brand: 'Xiaomi', price: 79999, discount: 18 },
  { name: 'Xiaomi 14 Pro 512GB', brand: 'Xiaomi', price: 74999, discount: 18 },
  { name: 'Xiaomi 14 Pro 256GB', brand: 'Xiaomi', price: 69999, discount: 20 },
  { name: 'Xiaomi 14 256GB', brand: 'Xiaomi', price: 64999, discount: 20 },
  { name: 'Xiaomi 14 128GB', brand: 'Xiaomi', price: 59999, discount: 22 },
  { name: 'Xiaomi 13T Pro 512GB', brand: 'Xiaomi', price: 64999, discount: 25 },
  { name: 'Xiaomi 13T 256GB', brand: 'Xiaomi', price: 54999, discount: 28 },

  // Other Brands
  { name: 'Oppo Find X7 Ultra 512GB', brand: 'Oppo', price: 94999, discount: 12 },
  { name: 'Oppo Find X7 Pro 256GB', brand: 'Oppo', price: 84999, discount: 15 },
  { name: 'Oppo Find X6 Pro 256GB', brand: 'Oppo', price: 74999, discount: 18 },
  { name: 'Vivo X100 Pro 512GB', brand: 'Vivo', price: 89999, discount: 10 },
  { name: 'Vivo X100 256GB', brand: 'Vivo', price: 79999, discount: 12 },
  { name: 'Realme GT 6 Pro 256GB', brand: 'Realme', price: 54999, discount: 20 },
  { name: 'Realme GT 6 256GB', brand: 'Realme', price: 49999, discount: 22 },
  { name: 'Realme GT 5 256GB', brand: 'Realme', price: 44999, discount: 25 },
  { name: 'Tecno Phantom X2 Pro 256GB', brand: 'Tecno', price: 44999, discount: 25 },
  { name: 'Tecno Camon 30 Pro 256GB', brand: 'Tecno', price: 39999, discount: 28 },
  { name: 'Infinix Note 40 Pro+ 256GB', brand: 'Infinix', price: 34999, discount: 30 },
  { name: 'Infinix Note 40 Pro 256GB', brand: 'Infinix', price: 29999, discount: 30 },
];

const laptopProducts = [
  // MacBooks
  { name: 'MacBook Pro 16" M3 Max 128GB/4TB', brand: 'Apple', price: 549999, discount: 0 },
  { name: 'MacBook Pro 16" M3 Max 96GB/2TB', brand: 'Apple', price: 449999, discount: 0 },
  { name: 'MacBook Pro 16" M3 Max 48GB/1TB', brand: 'Apple', price: 349999, discount: 0 },
  { name: 'MacBook Pro 16" M3 Pro 36GB/512GB', brand: 'Apple', price: 299999, discount: 0 },
  { name: 'MacBook Pro 14" M3 Max 96GB/2TB', brand: 'Apple', price: 399999, discount: 0 },
  { name: 'MacBook Pro 14" M3 Max 48GB/1TB', brand: 'Apple', price: 299999, discount: 0 },
  { name: 'MacBook Pro 14" M3 Pro 36GB/1TB', brand: 'Apple', price: 259999, discount: 0 },
  { name: 'MacBook Pro 14" M3 Pro 18GB/512GB', brand: 'Apple', price: 229999, discount: 0 },
  { name: 'MacBook Pro 14" M3 16GB/1TB', brand: 'Apple', price: 199999, discount: 0 },
  { name: 'MacBook Pro 14" M3 16GB/512GB', brand: 'Apple', price: 179999, discount: 0 },
  { name: 'MacBook Air 15" M3 24GB/1TB', brand: 'Apple', price: 189999, discount: 5 },
  { name: 'MacBook Air 15" M3 16GB/512GB', brand: 'Apple', price: 159999, discount: 5 },
  { name: 'MacBook Air 15" M3 16GB/256GB', brand: 'Apple', price: 149999, discount: 5 },
  { name: 'MacBook Air 13" M3 24GB/1TB', brand: 'Apple', price: 169999, discount: 5 },
  { name: 'MacBook Air 13" M3 16GB/512GB', brand: 'Apple', price: 139999, discount: 5 },
  { name: 'MacBook Air 13" M3 16GB/256GB', brand: 'Apple', price: 129999, discount: 5 },
  { name: 'MacBook Air 13" M2 16GB/512GB', brand: 'Apple', price: 119999, discount: 10 },
  { name: 'MacBook Air 13" M2 8GB/256GB', brand: 'Apple', price: 99999, discount: 12 },

  // Dell XPS
  { name: 'Dell XPS 17 i9/64GB/2TB RTX 4080', brand: 'Dell', price: 349999, discount: 5 },
  { name: 'Dell XPS 17 i7/32GB/1TB RTX 4070', brand: 'Dell', price: 279999, discount: 8 },
  { name: 'Dell XPS 15 i9/32GB/1TB RTX 4060', brand: 'Dell', price: 239999, discount: 10 },
  { name: 'Dell XPS 15 i7/16GB/512GB RTX 4050', brand: 'Dell', price: 189999, discount: 10 },
  { name: 'Dell XPS 13 Plus i7/32GB/1TB', brand: 'Dell', price: 169999, discount: 12 },
  { name: 'Dell XPS 13 Plus i7/16GB/512GB', brand: 'Dell', price: 144999, discount: 12 },
  { name: 'Dell XPS 13 i7/16GB/512GB', brand: 'Dell', price: 134999, discount: 15 },
  { name: 'Dell XPS 13 i5/16GB/512GB', brand: 'Dell', price: 119999, discount: 15 },

  // HP Spectre & Envy
  { name: 'HP Spectre x360 16" i9/32GB/2TB RTX 4050', brand: 'HP', price: 259999, discount: 10 },
  { name: 'HP Spectre x360 16" i7/16GB/1TB', brand: 'HP', price: 189999, discount: 12 },
  { name: 'HP Spectre x360 14" i7/32GB/1TB', brand: 'HP', price: 169999, discount: 15 },
  { name: 'HP Spectre x360 14" i7/16GB/512GB', brand: 'HP', price: 149999, discount: 15 },
  { name: 'HP Envy 16 i9/32GB/1TB RTX 4060', brand: 'HP', price: 179999, discount: 18 },
  { name: 'HP Envy 16 i7/16GB/512GB RTX 3050', brand: 'HP', price: 139999, discount: 18 },
  { name: 'HP Envy 14 i7/16GB/512GB', brand: 'HP', price: 114999, discount: 20 },
  { name: 'HP Envy x360 14 i5/16GB/512GB', brand: 'HP', price: 99999, discount: 22 },

  // Lenovo ThinkPad & Yoga
  { name: 'Lenovo ThinkPad X1 Carbon Gen 12 i7/32GB/1TB', brand: 'Lenovo', price: 199999, discount: 8 },
  { name: 'Lenovo ThinkPad X1 Carbon Gen 12 i7/16GB/512GB', brand: 'Lenovo', price: 169999, discount: 10 },
  { name: 'Lenovo ThinkPad X1 Yoga Gen 9 i7/32GB/1TB', brand: 'Lenovo', price: 189999, discount: 10 },
  { name: 'Lenovo ThinkPad X1 Extreme Gen 6 i9/64GB/2TB RTX 4070', brand: 'Lenovo', price: 329999, discount: 5 },
  { name: 'Lenovo Yoga 9i 16" i9/32GB/1TB', brand: 'Lenovo', price: 179999, discount: 12 },
  { name: 'Lenovo Yoga 9i 14" i7/16GB/512GB', brand: 'Lenovo', price: 144999, discount: 12 },
  { name: 'Lenovo Yoga 7i 16" i7/16GB/512GB', brand: 'Lenovo', price: 119999, discount: 15 },
  { name: 'Lenovo IdeaPad Pro 5 16" Ryzen 7/32GB/1TB', brand: 'Lenovo', price: 109999, discount: 18 },

  // ASUS
  { name: 'ASUS ROG Zephyrus G16 i9/32GB/2TB RTX 4090', brand: 'ASUS', price: 399999, discount: 5 },
  { name: 'ASUS ROG Zephyrus G16 i9/16GB/1TB RTX 4080', brand: 'ASUS', price: 299999, discount: 8 },
  { name: 'ASUS ROG Zephyrus G14 Ryzen 9/32GB/1TB RTX 4070', brand: 'ASUS', price: 229999, discount: 8 },
  { name: 'ASUS ROG Zephyrus G14 Ryzen 9/16GB/512GB RTX 4060', brand: 'ASUS', price: 179999, discount: 10 },
  { name: 'ASUS ZenBook 14 OLED i9/32GB/1TB', brand: 'ASUS', price: 149999, discount: 12 },
  { name: 'ASUS ZenBook 14 OLED i7/16GB/512GB', brand: 'ASUS', price: 119999, discount: 15 },
  { name: 'ASUS ZenBook S 13 OLED i7/16GB/1TB', brand: 'ASUS', price: 134999, discount: 15 },
  { name: 'ASUS VivoBook S 15 OLED i7/16GB/512GB', brand: 'ASUS', price: 99999, discount: 18 },

  // Gaming Laptops
  { name: 'Razer Blade 18 i9/64GB/4TB RTX 4090', brand: 'Razer', price: 549999, discount: 0 },
  { name: 'Razer Blade 16 i9/32GB/2TB RTX 4080', brand: 'Razer', price: 399999, discount: 5 },
  { name: 'Razer Blade 15 i9/32GB/1TB RTX 4070', brand: 'Razer', price: 299999, discount: 5 },
  { name: 'Razer Blade 14 Ryzen 9/32GB/1TB RTX 4070', brand: 'Razer', price: 269999, discount: 8 },
  { name: 'MSI Titan 18 HX i9/128GB/4TB RTX 4090', brand: 'MSI', price: 649999, discount: 0 },
  { name: 'MSI Raider GE78 i9/64GB/2TB RTX 4080', brand: 'MSI', price: 449999, discount: 5 },
  { name: 'MSI Stealth 16 i9/32GB/1TB RTX 4070', brand: 'MSI', price: 299999, discount: 8 },
  { name: 'Alienware m18 R2 i9/64GB/4TB RTX 4090', brand: 'Dell', price: 599999, discount: 0 },
  { name: 'Alienware x16 R2 i9/32GB/2TB RTX 4080', brand: 'Dell', price: 449999, discount: 5 },

  // Budget & Mid-range
  { name: 'Acer Swift X 14 i7/16GB/1TB RTX 4050', brand: 'Acer', price: 119999, discount: 20 },
  { name: 'Acer Swift X 14 i5/16GB/512GB RTX 3050', brand: 'Acer', price: 89999, discount: 22 },
  { name: 'Microsoft Surface Laptop 5 i7/16GB/512GB', brand: 'Microsoft', price: 149999, discount: 10 },
  { name: 'Microsoft Surface Laptop 5 i5/16GB/256GB', brand: 'Microsoft', price: 119999, discount: 12 },
  { name: 'Microsoft Surface Laptop Go 3 i5/16GB/256GB', brand: 'Microsoft', price: 89999, discount: 15 },
  { name: 'LG Gram 17 i7/32GB/1TB', brand: 'LG', price: 179999, discount: 12 },
  { name: 'LG Gram 16 i7/16GB/512GB', brand: 'LG', price: 139999, discount: 15 },
  { name: 'Samsung Galaxy Book4 Pro i7/16GB/512GB', brand: 'Samsung', price: 149999, discount: 15 },
];

const tvProducts = [
  // Samsung Neo QLED & QLED
  { name: 'Samsung 98" Neo QLED 8K QN900D', brand: 'Samsung', price: 899999, discount: 0 },
  { name: 'Samsung 85" Neo QLED 8K QN900D', brand: 'Samsung', price: 549999, discount: 5 },
  { name: 'Samsung 85" Neo QLED 8K QN800D', brand: 'Samsung', price: 449999, discount: 5 },
  { name: 'Samsung 77" Neo QLED 4K QN95D', brand: 'Samsung', price: 379999, discount: 8 },
  { name: 'Samsung 75" Neo QLED 4K QN95D', brand: 'Samsung', price: 329999, discount: 10 },
  { name: 'Samsung 75" Neo QLED 4K QN90D', brand: 'Samsung', price: 279999, discount: 10 },
  { name: 'Samsung 65" Neo QLED 4K QN95D', brand: 'Samsung', price: 249999, discount: 12 },
  { name: 'Samsung 65" Neo QLED 4K QN90D', brand: 'Samsung', price: 199999, discount: 15 },
  { name: 'Samsung 65" QLED 4K Q80D', brand: 'Samsung', price: 179999, discount: 15 },
  { name: 'Samsung 55" Neo QLED 4K QN90D', brand: 'Samsung', price: 169999, discount: 18 },
  { name: 'Samsung 55" QLED 4K Q80D', brand: 'Samsung', price: 129999, discount: 18 },
  { name: 'Samsung 50" QLED 4K Q60D', brand: 'Samsung', price: 94999, discount: 20 },

  // LG OLED
  { name: 'LG 97" OLED evo M4', brand: 'LG', price: 1299999, discount: 0 },
  { name: 'LG 83" OLED evo G4', brand: 'LG', price: 699999, discount: 5 },
  { name: 'LG 77" OLED evo G4', brand: 'LG', price: 499999, discount: 8 },
  { name: 'LG 77" OLED evo C4', brand: 'LG', price: 399999, discount: 10 },
  { name: 'LG 65" OLED evo G4', brand: 'LG', price: 349999, discount: 10 },
  { name: 'LG 65" OLED evo C4', brand: 'LG', price: 269999, discount: 12 },
  { name: 'LG 65" OLED evo C3', brand: 'LG', price: 229999, discount: 15 },
  { name: 'LG 55" OLED evo C4', brand: 'LG', price: 199999, discount: 15 },
  { name: 'LG 55" OLED evo C3', brand: 'LG', price: 169999, discount: 18 },
  { name: 'LG 55" OLED B4', brand: 'LG', price: 149999, discount: 20 },
  { name: 'LG 48" OLED evo C4', brand: 'LG', price: 139999, discount: 20 },

  // Sony Bravia
  { name: 'Sony 85" Bravia XR A95L QD-OLED', brand: 'Sony', price: 649999, discount: 5 },
  { name: 'Sony 77" Bravia XR A95L QD-OLED', brand: 'Sony', price: 549999, discount: 5 },
  { name: 'Sony 75" Bravia XR A95K QD-OLED', brand: 'Sony', price: 449999, discount: 8 },
  { name: 'Sony 65" Bravia XR A95L QD-OLED', brand: 'Sony', price: 399999, discount: 8 },
  { name: 'Sony 77" Bravia XR A80L OLED', brand: 'Sony', price: 379999, discount: 10 },
  { name: 'Sony 65" Bravia XR A80L OLED', brand: 'Sony', price: 269999, discount: 10 },
  { name: 'Sony 65" Bravia XR A80K OLED', brand: 'Sony', price: 239999, discount: 12 },
  { name: 'Sony 55" Bravia XR A80L OLED', brand: 'Sony', price: 199999, discount: 15 },
  { name: 'Sony 75" Bravia XR X95L Mini LED', brand: 'Sony', price: 329999, discount: 10 },
  { name: 'Sony 65" Bravia XR X95L Mini LED', brand: 'Sony', price: 249999, discount: 12 },

  // TCL & Hisense (Budget to Mid-range)
  { name: 'TCL 98" QM8 Mini LED QLED', brand: 'TCL', price: 349999, discount: 15 },
  { name: 'TCL 85" QM8 Mini LED QLED', brand: 'TCL', price: 249999, discount: 18 },
  { name: 'TCL 75" QM8 Mini LED QLED', brand: 'TCL', price: 179999, discount: 20 },
  { name: 'TCL 65" QM8 Mini LED QLED', brand: 'TCL', price: 129999, discount: 22 },
  { name: 'TCL 75" Q7 QLED', brand: 'TCL', price: 149999, discount: 25 },
  { name: 'TCL 65" Q7 QLED', brand: 'TCL', price: 99999, discount: 28 },
  { name: 'TCL 55" Q6 QLED', brand: 'TCL', price: 74999, discount: 30 },
  { name: 'Hisense 85" U8K Mini LED ULED', brand: 'Hisense', price: 229999, discount: 20 },
  { name: 'Hisense 75" U8K Mini LED ULED', brand: 'Hisense', price: 169999, discount: 22 },
  { name: 'Hisense 65" U8K Mini LED ULED', brand: 'Hisense', price: 119999, discount: 25 },
  { name: 'Hisense 65" U7K ULED', brand: 'Hisense', price: 94999, discount: 28 },
  { name: 'Hisense 55" U7K ULED', brand: 'Hisense', price: 74999, discount: 30 },
];

const headphoneProducts = [
  // Premium Over-Ear
  { name: 'AirPods Max Silver', brand: 'Apple', price: 59999, discount: 0 },
  { name: 'AirPods Max Space Gray', brand: 'Apple', price: 59999, discount: 0 },
  { name: 'Sony WH-1000XM5 Black', brand: 'Sony', price: 39999, discount: 12 },
  { name: 'Sony WH-1000XM5 Silver', brand: 'Sony', price: 39999, discount: 12 },
  { name: 'Sony WH-1000XM4 Black', brand: 'Sony', price: 34999, discount: 15 },
  { name: 'Bose QuietComfort Ultra Black', brand: 'Bose', price: 44999, discount: 10 },
  { name: 'Bose QuietComfort Ultra White', brand: 'Bose', price: 44999, discount: 10 },
  { name: 'Bose QuietComfort 45 Black', brand: 'Bose', price: 34999, discount: 15 },
  { name: 'Sennheiser Momentum 4 Black', brand: 'Sennheiser', price: 37999, discount: 15 },
  { name: 'Sennheiser Momentum 4 White', brand: 'Sennheiser', price: 37999, discount: 15 },
  { name: 'Bowers & Wilkins Px8', brand: 'Bowers & Wilkins', price: 74999, discount: 10 },
  { name: 'Bang & Olufsen Beoplay H95', brand: 'Bang & Olufsen', price: 99999, discount: 5 },
  { name: 'Focal Bathys', brand: 'Focal', price: 84999, discount: 8 },
  { name: 'Mark Levinson No. 5909', brand: 'Mark Levinson', price: 119999, discount: 0 },

  // Premium Earbuds
  { name: 'AirPods Pro (2nd Gen) USB-C', brand: 'Apple', price: 29999, discount: 5 },
  { name: 'AirPods Pro (2nd Gen) Lightning', brand: 'Apple', price: 27999, discount: 8 },
  { name: 'AirPods (3rd Gen) Lightning', brand: 'Apple', price: 19999, discount: 10 },
  { name: 'AirPods (3rd Gen) MagSafe', brand: 'Apple', price: 21999, discount: 10 },
  { name: 'Sony WF-1000XM5 Black', brand: 'Sony', price: 32999, discount: 12 },
  { name: 'Sony WF-1000XM5 Silver', brand: 'Sony', price: 32999, discount: 12 },
  { name: 'Sony WF-1000XM4 Black', brand: 'Sony', price: 27999, discount: 18 },
  { name: 'Bose QuietComfort Earbuds II Black', brand: 'Bose', price: 31999, discount: 12 },
  { name: 'Bose QuietComfort Earbuds II White', brand: 'Bose', price: 31999, discount: 12 },
  { name: 'Sennheiser Momentum True Wireless 3', brand: 'Sennheiser', price: 27999, discount: 15 },
  { name: 'Samsung Galaxy Buds2 Pro Graphite', brand: 'Samsung', price: 24999, discount: 18 },
  { name: 'Samsung Galaxy Buds2 Pro White', brand: 'Samsung', price: 24999, discount: 18 },
  { name: 'Samsung Galaxy Buds FE Graphite', brand: 'Samsung', price: 14999, discount: 25 },
  { name: 'Google Pixel Buds Pro Charcoal', brand: 'Google', price: 22999, discount: 20 },
  { name: 'Google Pixel Buds Pro Bay', brand: 'Google', price: 22999, discount: 20 },

  // Mid-range
  { name: 'JBL Live 770NC', brand: 'JBL', price: 19999, discount: 20 },
  { name: 'JBL Live 660NC', brand: 'JBL', price: 14999, discount: 25 },
  { name: 'JBL Tune 770NC', brand: 'JBL', price: 12999, discount: 28 },
  { name: 'Beats Studio Pro Black', brand: 'Beats', price: 37999, discount: 15 },
  { name: 'Beats Solo 4', brand: 'Beats', price: 22999, discount: 18 },
  { name: 'Beats Fit Pro', brand: 'Beats', price: 21999, discount: 20 },
  { name: 'Jabra Elite 10', brand: 'Jabra', price: 27999, discount: 18 },
  { name: 'Jabra Elite 8 Active', brand: 'Jabra', price: 24999, discount: 20 },
  { name: 'Anker Soundcore Space Q45', brand: 'Anker', price: 14999, discount: 30 },
  { name: 'Anker Soundcore Liberty 4 NC', brand: 'Anker', price: 11999, discount: 32 },
];

const watchProducts = [
  // Apple Watch
  { name: 'Apple Watch Ultra 2 49mm Titanium GPS + Cellular', brand: 'Apple', price: 89999, discount: 0 },
  { name: 'Apple Watch Ultra 2 49mm Titanium Trail Loop', brand: 'Apple', price: 92999, discount: 0 },
  { name: 'Apple Watch Series 9 GPS + Cellular 45mm Stainless Steel', brand: 'Apple', price: 69999, discount: 0 },
  { name: 'Apple Watch Series 9 GPS + Cellular 45mm Aluminum', brand: 'Apple', price: 54999, discount: 0 },
  { name: 'Apple Watch Series 9 GPS + Cellular 41mm Aluminum', brand: 'Apple', price: 49999, discount: 0 },
  { name: 'Apple Watch Series 9 GPS 45mm Aluminum', brand: 'Apple', price: 47999, discount: 0 },
  { name: 'Apple Watch Series 9 GPS 41mm Aluminum', brand: 'Apple', price: 44999, discount: 0 },
  { name: 'Apple Watch SE (2nd Gen) GPS + Cellular 44mm', brand: 'Apple', price: 34999, discount: 5 },
  { name: 'Apple Watch SE (2nd Gen) GPS + Cellular 40mm', brand: 'Apple', price: 32999, discount: 5 },
  { name: 'Apple Watch SE (2nd Gen) GPS 44mm', brand: 'Apple', price: 29999, discount: 5 },
  { name: 'Apple Watch SE (2nd Gen) GPS 40mm', brand: 'Apple', price: 27999, discount: 5 },

  // Samsung Galaxy Watch
  { name: 'Samsung Galaxy Watch 6 Classic 47mm LTE', brand: 'Samsung', price: 49999, discount: 12 },
  { name: 'Samsung Galaxy Watch 6 Classic 47mm Bluetooth', brand: 'Samsung', price: 42999, discount: 15 },
  { name: 'Samsung Galaxy Watch 6 Classic 43mm LTE', brand: 'Samsung', price: 44999, discount: 15 },
  { name: 'Samsung Galaxy Watch 6 Classic 43mm Bluetooth', brand: 'Samsung', price: 39999, discount: 18 },
  { name: 'Samsung Galaxy Watch 6 44mm LTE', brand: 'Samsung', price: 39999, discount: 18 },
  { name: 'Samsung Galaxy Watch 6 44mm Bluetooth', brand: 'Samsung', price: 34999, discount: 18 },
  { name: 'Samsung Galaxy Watch 6 40mm LTE', brand: 'Samsung', price: 37999, discount: 20 },
  { name: 'Samsung Galaxy Watch 6 40mm Bluetooth', brand: 'Samsung', price: 32999, discount: 20 },
  { name: 'Samsung Galaxy Watch FE 40mm Bluetooth', brand: 'Samsung', price: 22999, discount: 25 },

  // Garmin
  { name: 'Garmin Fenix 7X Pro Sapphire Solar', brand: 'Garmin', price: 109999, discount: 5 },
  { name: 'Garmin Fenix 7X Pro Solar', brand: 'Garmin', price: 99999, discount: 5 },
  { name: 'Garmin Fenix 7 Pro Sapphire Solar', brand: 'Garmin', price: 94999, discount: 8 },
  { name: 'Garmin Fenix 7 Pro Solar', brand: 'Garmin', price: 84999, discount: 8 },
  { name: 'Garmin Epix Pro (Gen 2) 51mm Sapphire', brand: 'Garmin', price: 119999, discount: 5 },
  { name: 'Garmin Epix Pro (Gen 2) 47mm Sapphire', brand: 'Garmin', price: 109999, discount: 5 },
  { name: 'Garmin Venu 3', brand: 'Garmin', price: 54999, discount: 10 },
  { name: 'Garmin Forerunner 965', brand: 'Garmin', price: 74999, discount: 10 },
  { name: 'Garmin Forerunner 265', brand: 'Garmin', price: 54999, discount: 12 },
  { name: 'Garmin Instinct 2 Solar', brand: 'Garmin', price: 44999, discount: 15 },

  // Other Brands
  { name: 'Fitbit Sense 2', brand: 'Fitbit', price: 32999, discount: 18 },
  { name: 'Fitbit Versa 4', brand: 'Fitbit', price: 24999, discount: 20 },
  { name: 'Fitbit Charge 6', brand: 'Fitbit', price: 19999, discount: 22 },
  { name: 'Amazfit T-Rex Ultra', brand: 'Amazfit', price: 34999, discount: 25 },
  { name: 'Amazfit GTR 4', brand: 'Amazfit', price: 24999, discount: 28 },
  { name: 'Amazfit GTS 4', brand: 'Amazfit', price: 22999, discount: 28 },
  { name: 'Amazfit Bip 5', brand: 'Amazfit', price: 14999, discount: 30 },
  { name: 'Huawei Watch GT 4 46mm', brand: 'Huawei', price: 29999, discount: 25 },
  { name: 'Huawei Watch Fit 3', brand: 'Huawei', price: 19999, discount: 28 },
];

const cameraProducts = [
  // Canon
  { name: 'Canon EOS R5 C Body', brand: 'Canon', price: 499999, discount: 0 },
  { name: 'Canon EOS R5 Body', brand: 'Canon', price: 429999, discount: 5 },
  { name: 'Canon EOS R5 + RF 24-105mm f/4L', brand: 'Canon', price: 499999, discount: 5 },
  { name: 'Canon EOS R6 Mark II Body', brand: 'Canon', price: 299999, discount: 8 },
  { name: 'Canon EOS R6 Mark II + RF 24-105mm f/4L', brand: 'Canon', price: 369999, discount: 8 },
  { name: 'Canon EOS R8 Body', brand: 'Canon', price: 189999, discount: 10 },
  { name: 'Canon EOS R8 + RF 24-50mm', brand: 'Canon', price: 219999, discount: 10 },
  { name: 'Canon EOS R7 Body', brand: 'Canon', price: 179999, discount: 12 },
  { name: 'Canon EOS R50 + RF-S 18-45mm', brand: 'Canon', price: 89999, discount: 15 },

  // Sony
  { name: 'Sony Alpha 1 Body', brand: 'Sony', price: 699999, discount: 0 },
  { name: 'Sony Alpha 7R V Body', brand: 'Sony', price: 449999, discount: 5 },
  { name: 'Sony Alpha 7R V + FE 24-70mm f/2.8 GM II', brand: 'Sony', price: 599999, discount: 5 },
  { name: 'Sony Alpha 7 IV Body', brand: 'Sony', price: 299999, discount: 10 },
  { name: 'Sony Alpha 7 IV + FE 28-70mm', brand: 'Sony', price: 339999, discount: 10 },
  { name: 'Sony Alpha 7C II Body', brand: 'Sony', price: 269999, discount: 10 },
  { name: 'Sony Alpha 6700 Body', brand: 'Sony', price: 169999, discount: 12 },
  { name: 'Sony Alpha 6700 + E 16-50mm', brand: 'Sony', price: 194999, discount: 12 },
  { name: 'Sony ZV-E1 Body', brand: 'Sony', price: 279999, discount: 10 },

  // Nikon
  { name: 'Nikon Z9 Body', brand: 'Nikon', price: 649999, discount: 0 },
  { name: 'Nikon Z8 Body', brand: 'Nikon', price: 469999, discount: 5 },
  { name: 'Nikon Z8 + Z 24-120mm f/4 S', brand: 'Nikon', price: 539999, discount: 5 },
  { name: 'Nikon Z6 III Body', brand: 'Nikon', price: 299999, discount: 8 },
  { name: 'Nikon Z6 III + Z 24-120mm f/4 S', brand: 'Nikon', price: 369999, discount: 8 },
  { name: 'Nikon Z5 Body', brand: 'Nikon', price: 149999, discount: 15 },
  { name: 'Nikon Z5 + Z 24-50mm', brand: 'Nikon', price: 169999, discount: 15 },
  { name: 'Nikon Zfc + Z DX 16-50mm', brand: 'Nikon', price: 129999, discount: 18 },

  // Fujifilm
  { name: 'Fujifilm X-H2S Body', brand: 'Fujifilm', price: 299999, discount: 10 },
  { name: 'Fujifilm X-H2 Body', brand: 'Fujifilm', price: 249999, discount: 12 },
  { name: 'Fujifilm X-T5 Body', brand: 'Fujifilm', price: 209999, discount: 10 },
  { name: 'Fujifilm X-T5 + XF 18-55mm', brand: 'Fujifilm', price: 249999, discount: 10 },
  { name: 'Fujifilm X-S20 Body', brand: 'Fujifilm', price: 159999, discount: 12 },
  { name: 'Fujifilm X-S20 + XF 18-55mm', brand: 'Fujifilm', price: 189999, discount: 12 },

  // Action Cameras
  { name: 'GoPro HERO 12 Black Creator Edition', brand: 'GoPro', price: 64999, discount: 10 },
  { name: 'GoPro HERO 12 Black', brand: 'GoPro', price: 54999, discount: 15 },
  { name: 'GoPro HERO 11 Black', brand: 'GoPro', price: 44999, discount: 20 },
  { name: 'DJI Osmo Action 4 Adventure Combo', brand: 'DJI', price: 49999, discount: 12 },
  { name: 'DJI Osmo Action 4', brand: 'DJI', price: 39999, discount: 15 },
  { name: 'Insta360 X3', brand: 'Insta360', price: 54999, discount: 18 },
  { name: 'Insta360 Ace Pro', brand: 'Insta360', price: 49999, discount: 20 },
];

const gamingProducts = [
  // PlayStation
  { name: 'PlayStation 5 Slim 1TB', brand: 'Sony', price: 59999, discount: 0 },
  { name: 'PlayStation 5 Slim Digital Edition 1TB', brand: 'Sony', price: 49999, discount: 0 },
  { name: 'PlayStation 5 Standard Edition', brand: 'Sony', price: 54999, discount: 5 },
  { name: 'PlayStation Portal Remote Player', brand: 'Sony', price: 24999, discount: 5 },
  { name: 'PlayStation VR2', brand: 'Sony', price: 64999, discount: 10 },
  { name: 'PlayStation VR2 Horizon Call Bundle', brand: 'Sony', price: 69999, discount: 10 },

  // Xbox
  { name: 'Xbox Series X 1TB', brand: 'Microsoft', price: 59999, discount: 0 },
  { name: 'Xbox Series X 1TB Forza Bundle', brand: 'Microsoft', price: 64999, discount: 0 },
  { name: 'Xbox Series S 1TB Black', brand: 'Microsoft', price: 39999, discount: 5 },
  { name: 'Xbox Series S 512GB White', brand: 'Microsoft', price: 34999, discount: 5 },

  // Nintendo
  { name: 'Nintendo Switch OLED Model White', brand: 'Nintendo', price: 42999, discount: 5 },
  { name: 'Nintendo Switch OLED Model Neon', brand: 'Nintendo', price: 42999, discount: 5 },
  { name: 'Nintendo Switch OLED Zelda Edition', brand: 'Nintendo', price: 46999, discount: 5 },
  { name: 'Nintendo Switch Standard Neon', brand: 'Nintendo', price: 34999, discount: 8 },
  { name: 'Nintendo Switch Lite Coral', brand: 'Nintendo', price: 24999, discount: 10 },
  { name: 'Nintendo Switch Lite Blue', brand: 'Nintendo', price: 24999, discount: 10 },

  // Handheld PC Gaming
  { name: 'Steam Deck OLED 1TB', brand: 'Valve', price: 74999, discount: 0 },
  { name: 'Steam Deck OLED 512GB', brand: 'Valve', price: 64999, discount: 0 },
  { name: 'Steam Deck 512GB', brand: 'Valve', price: 54999, discount: 5 },
  { name: 'ASUS ROG Ally Z1 Extreme 512GB', brand: 'ASUS', price: 74999, discount: 10 },
  { name: 'ASUS ROG Ally Z1 256GB', brand: 'ASUS', price: 59999, discount: 12 },
  { name: 'Lenovo Legion Go 1TB', brand: 'Lenovo', price: 79999, discount: 10 },
  { name: 'MSI Claw A1M 512GB', brand: 'MSI', price: 69999, discount: 15 },
];

const tabletProducts = [
  // iPad Pro
  { name: 'iPad Pro 12.9" M2 2TB Wi-Fi + Cellular', brand: 'Apple', price: 249999, discount: 0 },
  { name: 'iPad Pro 12.9" M2 1TB Wi-Fi + Cellular', brand: 'Apple', price: 199999, discount: 0 },
  { name: 'iPad Pro 12.9" M2 512GB Wi-Fi + Cellular', brand: 'Apple', price: 169999, discount: 0 },
  { name: 'iPad Pro 12.9" M2 256GB Wi-Fi + Cellular', brand: 'Apple', price: 154999, discount: 0 },
  { name: 'iPad Pro 12.9" M2 128GB Wi-Fi + Cellular', brand: 'Apple', price: 144999, discount: 0 },
  { name: 'iPad Pro 12.9" M2 1TB Wi-Fi', brand: 'Apple', price: 169999, discount: 0 },
  { name: 'iPad Pro 12.9" M2 512GB Wi-Fi', brand: 'Apple', price: 149999, discount: 0 },
  { name: 'iPad Pro 12.9" M2 256GB Wi-Fi', brand: 'Apple', price: 139999, discount: 0 },
  { name: 'iPad Pro 12.9" M2 128GB Wi-Fi', brand: 'Apple', price: 129999, discount: 0 },
  { name: 'iPad Pro 11" M2 2TB Wi-Fi + Cellular', brand: 'Apple', price: 199999, discount: 0 },
  { name: 'iPad Pro 11" M2 1TB Wi-Fi + Cellular', brand: 'Apple', price: 159999, discount: 0 },
  { name: 'iPad Pro 11" M2 512GB Wi-Fi + Cellular', brand: 'Apple', price: 129999, discount: 0 },
  { name: 'iPad Pro 11" M2 256GB Wi-Fi + Cellular', brand: 'Apple', price: 114999, discount: 0 },
  { name: 'iPad Pro 11" M2 128GB Wi-Fi + Cellular', brand: 'Apple', price: 104999, discount: 0 },
  { name: 'iPad Pro 11" M2 1TB Wi-Fi', brand: 'Apple', price: 129999, discount: 0 },
  { name: 'iPad Pro 11" M2 512GB Wi-Fi', brand: 'Apple', price: 109999, discount: 0 },
  { name: 'iPad Pro 11" M2 256GB Wi-Fi', brand: 'Apple', price: 99999, discount: 0 },
  { name: 'iPad Pro 11" M2 128GB Wi-Fi', brand: 'Apple', price: 94999, discount: 0 },

  // iPad Air
  { name: 'iPad Air (5th Gen) 256GB Wi-Fi + Cellular', brand: 'Apple', price: 89999, discount: 5 },
  { name: 'iPad Air (5th Gen) 256GB Wi-Fi', brand: 'Apple', price: 79999, discount: 5 },
  { name: 'iPad Air (5th Gen) 64GB Wi-Fi + Cellular', brand: 'Apple', price: 74999, discount: 5 },
  { name: 'iPad Air (5th Gen) 64GB Wi-Fi', brand: 'Apple', price: 69999, discount: 5 },

  // iPad
  { name: 'iPad (10th Gen) 256GB Wi-Fi + Cellular', brand: 'Apple', price: 64999, discount: 8 },
  { name: 'iPad (10th Gen) 256GB Wi-Fi', brand: 'Apple', price: 54999, discount: 8 },
  { name: 'iPad (10th Gen) 64GB Wi-Fi + Cellular', brand: 'Apple', price: 54999, discount: 8 },
  { name: 'iPad (10th Gen) 64GB Wi-Fi', brand: 'Apple', price: 44999, discount: 8 },

  // Samsung Galaxy Tab S9 Series
  { name: 'Samsung Galaxy Tab S9 Ultra 1TB 5G', brand: 'Samsung', price: 159999, discount: 8 },
  { name: 'Samsung Galaxy Tab S9 Ultra 512GB 5G', brand: 'Samsung', price: 139999, discount: 10 },
  { name: 'Samsung Galaxy Tab S9 Ultra 256GB 5G', brand: 'Samsung', price: 119999, discount: 10 },
  { name: 'Samsung Galaxy Tab S9 Ultra 512GB Wi-Fi', brand: 'Samsung', price: 119999, discount: 12 },
  { name: 'Samsung Galaxy Tab S9+ 512GB 5G', brand: 'Samsung', price: 114999, discount: 10 },
  { name: 'Samsung Galaxy Tab S9+ 256GB 5G', brand: 'Samsung', price: 104999, discount: 12 },
  { name: 'Samsung Galaxy Tab S9+ 256GB Wi-Fi', brand: 'Samsung', price: 94999, discount: 12 },
  { name: 'Samsung Galaxy Tab S9 256GB 5G', brand: 'Samsung', price: 94999, discount: 12 },
  { name: 'Samsung Galaxy Tab S9 256GB Wi-Fi', brand: 'Samsung', price: 84999, discount: 15 },
  { name: 'Samsung Galaxy Tab S9 128GB Wi-Fi', brand: 'Samsung', price: 79999, discount: 15 },
  { name: 'Samsung Galaxy Tab S9 FE+ 256GB 5G', brand: 'Samsung', price: 74999, discount: 18 },
  { name: 'Samsung Galaxy Tab S9 FE 256GB 5G', brand: 'Samsung', price: 64999, discount: 20 },
  { name: 'Samsung Galaxy Tab S9 FE 128GB Wi-Fi', brand: 'Samsung', price: 54999, discount: 22 },

  // Microsoft Surface
  { name: 'Microsoft Surface Pro 9 i7/32GB/1TB 5G', brand: 'Microsoft', price: 189999, discount: 8 },
  { name: 'Microsoft Surface Pro 9 i7/16GB/512GB 5G', brand: 'Microsoft', price: 149999, discount: 10 },
  { name: 'Microsoft Surface Pro 9 i7/16GB/256GB', brand: 'Microsoft', price: 129999, discount: 10 },
  { name: 'Microsoft Surface Pro 9 i5/16GB/256GB', brand: 'Microsoft', price: 109999, discount: 12 },
  { name: 'Microsoft Surface Go 3 8GB/128GB', brand: 'Microsoft', price: 54999, discount: 18 },
];

function generateDescription(name: string, brand: string): string {
  return `Experience the latest in technology with the ${name}. ${brand} brings you cutting-edge features, premium build quality, and exceptional performance. Perfect for both personal and professional use.`;
}

function generateSpecifications(category: string, brand: string): string {
  const specs: Record<string, string> = {};

  if (category === 'Electronics') {
    specs['Brand'] = brand;
    specs['Warranty'] = '1 Year Manufacturer Warranty';
    specs['Color'] = 'Multiple Options Available';
    specs['Condition'] = 'Brand New';
  }

  return JSON.stringify(specs);
}

function getRandomRating(): number {
  return parseFloat((3.5 + Math.random() * 1.5).toFixed(1));
}

function getRandomReviewCount(): number {
  return Math.floor(Math.random() * 500) + 10;
}

async function main() {
  console.log('🌱 Starting expanded product seed...');
  console.log('📦 This will add 200+ products with category-specific images\n');

  // Get all categories
  const categories = await prisma.category.findMany();
  const categoryMap = new Map(categories.map(c => [c.name, c.id]));

  const electronicsId = categoryMap.get('Electronics')!;

  // Seed phones
  console.log('📱 Seeding phones (' + phoneProducts.length + ' products)...');
  for (let i = 0; i < phoneProducts.length; i++) {
    const product = phoneProducts[i];
    const originalPrice = product.price / (1 - product.discount / 100);

    await prisma.product.create({
      data: {
        name: product.name,
        slug: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i}`,
        description: generateDescription(product.name, product.brand),
        price: product.price,
        originalPrice: parseFloat(originalPrice.toFixed(2)),
        discount: product.discount,
        images: generateCategoryImages('phone', product.name, 3),
        categoryId: electronicsId,
        rating: getRandomRating(),
        reviewCount: getRandomReviewCount(),
        inStock: true,
        stock: Math.floor(Math.random() * 100) + 20,
        seller: product.brand,
        specifications: generateSpecifications('Electronics', product.brand),
        featured: i < 5,
        flashSale: product.discount >= 15,
      },
    });
  }

  // Seed laptops
  console.log('💻 Seeding laptops (' + laptopProducts.length + ' products)...');
  for (let i = 0; i < laptopProducts.length; i++) {
    const product = laptopProducts[i];
    const originalPrice = product.price / (1 - product.discount / 100);

    await prisma.product.create({
      data: {
        name: product.name,
        slug: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-laptop-${i}`,
        description: generateDescription(product.name, product.brand),
        price: product.price,
        originalPrice: parseFloat(originalPrice.toFixed(2)),
        discount: product.discount,
        images: generateCategoryImages('laptop', product.name, 3),
        categoryId: electronicsId,
        rating: getRandomRating(),
        reviewCount: getRandomReviewCount(),
        inStock: true,
        stock: Math.floor(Math.random() * 50) + 10,
        seller: product.brand,
        specifications: generateSpecifications('Electronics', product.brand),
        featured: i < 4,
        flashSale: product.discount >= 15,
      },
    });
  }

  // Seed TVs
  console.log('📺 Seeding TVs (' + tvProducts.length + ' products)...');
  for (let i = 0; i < tvProducts.length; i++) {
    const product = tvProducts[i];
    const originalPrice = product.price / (1 - product.discount / 100);

    await prisma.product.create({
      data: {
        name: product.name,
        slug: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-tv-${i}`,
        description: generateDescription(product.name, product.brand),
        price: product.price,
        originalPrice: parseFloat(originalPrice.toFixed(2)),
        discount: product.discount,
        images: generateCategoryImages('tv', product.name, 3),
        categoryId: electronicsId,
        rating: getRandomRating(),
        reviewCount: getRandomReviewCount(),
        inStock: true,
        stock: Math.floor(Math.random() * 30) + 5,
        seller: product.brand,
        specifications: generateSpecifications('Electronics', product.brand),
        featured: i < 3,
        flashSale: product.discount >= 15,
      },
    });
  }

  // Seed headphones
  console.log('🎧 Seeding headphones (' + headphoneProducts.length + ' products)...');
  for (let i = 0; i < headphoneProducts.length; i++) {
    const product = headphoneProducts[i];
    const originalPrice = product.price / (1 - product.discount / 100);

    await prisma.product.create({
      data: {
        name: product.name,
        slug: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-headphones-${i}`,
        description: generateDescription(product.name, product.brand),
        price: product.price,
        originalPrice: parseFloat(originalPrice.toFixed(2)),
        discount: product.discount,
        images: generateCategoryImages('headphones', product.name, 3),
        categoryId: electronicsId,
        rating: getRandomRating(),
        reviewCount: getRandomReviewCount(),
        inStock: true,
        stock: Math.floor(Math.random() * 150) + 50,
        seller: product.brand,
        specifications: generateSpecifications('Electronics', product.brand),
        featured: i < 3,
        flashSale: product.discount >= 20,
      },
    });
  }

  // Seed watches
  console.log('⌚ Seeding watches (' + watchProducts.length + ' products)...');
  for (let i = 0; i < watchProducts.length; i++) {
    const product = watchProducts[i];
    const originalPrice = product.price / (1 - product.discount / 100);

    await prisma.product.create({
      data: {
        name: product.name,
        slug: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-watch-${i}`,
        description: generateDescription(product.name, product.brand),
        price: product.price,
        originalPrice: parseFloat(originalPrice.toFixed(2)),
        discount: product.discount,
        images: generateCategoryImages('watch', product.name, 3),
        categoryId: electronicsId,
        rating: getRandomRating(),
        reviewCount: getRandomReviewCount(),
        inStock: true,
        stock: Math.floor(Math.random() * 80) + 20,
        seller: product.brand,
        specifications: generateSpecifications('Electronics', product.brand),
        featured: i < 2,
        flashSale: product.discount >= 18,
      },
    });
  }

  // Seed cameras
  console.log('📷 Seeding cameras (' + cameraProducts.length + ' products)...');
  for (let i = 0; i < cameraProducts.length; i++) {
    const product = cameraProducts[i];
    const originalPrice = product.price / (1 - product.discount / 100);

    await prisma.product.create({
      data: {
        name: product.name,
        slug: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-camera-${i}`,
        description: generateDescription(product.name, product.brand),
        price: product.price,
        originalPrice: parseFloat(originalPrice.toFixed(2)),
        discount: product.discount,
        images: generateCategoryImages('camera', product.name, 3),
        categoryId: electronicsId,
        rating: getRandomRating(),
        reviewCount: getRandomReviewCount(),
        inStock: true,
        stock: Math.floor(Math.random() * 40) + 10,
        seller: product.brand,
        specifications: generateSpecifications('Electronics', product.brand),
        featured: i < 2,
        flashSale: product.discount >= 15,
      },
    });
  }

  // Seed gaming products
  console.log('🎮 Seeding gaming products (' + gamingProducts.length + ' products)...');
  for (let i = 0; i < gamingProducts.length; i++) {
    const product = gamingProducts[i];
    const originalPrice = product.price / (1 - product.discount / 100);

    await prisma.product.create({
      data: {
        name: product.name,
        slug: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-gaming-${i}`,
        description: generateDescription(product.name, product.brand),
        price: product.price,
        originalPrice: parseFloat(originalPrice.toFixed(2)),
        discount: product.discount,
        images: generateCategoryImages('gaming', product.name, 3),
        categoryId: electronicsId,
        rating: getRandomRating(),
        reviewCount: getRandomReviewCount(),
        inStock: true,
        stock: Math.floor(Math.random() * 60) + 15,
        seller: product.brand,
        specifications: generateSpecifications('Electronics', product.brand),
        featured: i < 3,
        flashSale: product.discount >= 10,
      },
    });
  }

  // Seed tablets
  console.log('📱 Seeding tablets (' + tabletProducts.length + ' products)...');
  for (let i = 0; i < tabletProducts.length; i++) {
    const product = tabletProducts[i];
    const originalPrice = product.price / (1 - product.discount / 100);

    await prisma.product.create({
      data: {
        name: product.name,
        slug: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-tablet-${i}`,
        description: generateDescription(product.name, product.brand),
        price: product.price,
        originalPrice: parseFloat(originalPrice.toFixed(2)),
        discount: product.discount,
        images: generateCategoryImages('tablet', product.name, 3),
        categoryId: electronicsId,
        rating: getRandomRating(),
        reviewCount: getRandomReviewCount(),
        inStock: true,
        stock: Math.floor(Math.random() * 70) + 20,
        seller: product.brand,
        specifications: generateSpecifications('Electronics', product.brand),
        featured: i < 3,
        flashSale: product.discount >= 12,
      },
    });
  }

  const totalProducts = phoneProducts.length + laptopProducts.length + tvProducts.length +
    headphoneProducts.length + watchProducts.length + cameraProducts.length +
    gamingProducts.length + tabletProducts.length;

  console.log(`\n✅ Successfully seeded ${totalProducts} products!`);
  console.log('\n📊 Product Breakdown:');
  console.log(`  📱 Phones: ${phoneProducts.length}`);
  console.log(`  💻 Laptops: ${laptopProducts.length}`);
  console.log(`  📺 TVs: ${tvProducts.length}`);
  console.log(`  🎧 Headphones: ${headphoneProducts.length}`);
  console.log(`  ⌚ Watches: ${watchProducts.length}`);
  console.log(`  📷 Cameras: ${cameraProducts.length}`);
  console.log(`  🎮 Gaming: ${gamingProducts.length}`);
  console.log(`  📱 Tablets: ${tabletProducts.length}`);
  console.log(`\n🎉 Total: ${totalProducts} products with category-specific images!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
