import { PrismaClient } from '../lib/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🗑️  Clearing all products and related data...');

  // Delete in order of dependencies
  console.log('  - Deleting cart items...');
  const cartItems = await prisma.cartItem.deleteMany({});
  console.log(`    ✓ Deleted ${cartItems.count} cart items`);

  console.log('  - Deleting wishlist items...');
  const wishlistItems = await prisma.wishlistItem.deleteMany({});
  console.log(`    ✓ Deleted ${wishlistItems.count} wishlist items`);

  console.log('  - Deleting order items...');
  const orderItems = await prisma.orderItem.deleteMany({});
  console.log(`    ✓ Deleted ${orderItems.count} order items`);

  console.log('  - Deleting reviews...');
  const reviews = await prisma.review.deleteMany({});
  console.log(`    ✓ Deleted ${reviews.count} reviews`);

  console.log('  - Deleting products...');
  const products = await prisma.product.deleteMany({});
  console.log(`    ✓ Deleted ${products.count} products`);

  console.log('\n✅ All products and related data cleared successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
