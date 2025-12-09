import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('Product Management Integration Tests', () => {
  let testCategoryId: string

  beforeAll(async () => {
    // Create test category
    const category = await prisma.category.create({
      data: {
        name: 'Test Electronics',
        slug: 'test-electronics',
        icon: '📱',
        image: 'test.jpg',
        description: 'Test category',
      },
    })
    testCategoryId = category.id
  })

  afterAll(async () => {
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()
    await prisma.$disconnect()
  })

  describe('Product Creation', () => {
    it('should create a new product', async () => {
      const productData = {
        name: 'Test Smartphone',
        slug: 'test-smartphone',
        description: 'A test smartphone',
        price: 29999,
        originalPrice: 39999,
        discount: 25,
        images: JSON.stringify(['image1.jpg', 'image2.jpg']),
        categoryId: testCategoryId,
        rating: 4.5,
        reviewCount: 10,
        inStock: true,
        stock: 50,
        seller: 'Test Seller',
        featured: true,
      }

      const product = await prisma.product.create({
        data: productData,
      })

      expect(product).toBeDefined()
      expect(product.name).toBe('Test Smartphone')
      expect(product.price).toBe(29999)
      expect(product.featured).toBe(true)
    })

    it('should not allow duplicate slugs', async () => {
      const productData = {
        name: 'Duplicate Product',
        slug: 'test-smartphone',
        description: 'Duplicate product',
        price: 19999,
        images: JSON.stringify(['image.jpg']),
        categoryId: testCategoryId,
        stock: 10,
        seller: 'Test Seller',
      }

      await expect(
        prisma.product.create({ data: productData })
      ).rejects.toThrow()
    })
  })

  describe('Product Queries', () => {
    it('should retrieve featured products', async () => {
      const featured = await prisma.product.findMany({
        where: { featured: true },
      })

      expect(featured.length).toBeGreaterThan(0)
      expect(featured[0].featured).toBe(true)
    })

    it('should retrieve products by category', async () => {
      const products = await prisma.product.findMany({
        where: { categoryId: testCategoryId },
        include: { category: true },
      })

      expect(products.length).toBeGreaterThan(0)
      expect(products[0].category.name).toBe('Test Electronics')
    })

    it('should filter in-stock products', async () => {
      const inStock = await prisma.product.findMany({
        where: { inStock: true, stock: { gt: 0 } },
      })

      expect(inStock.length).toBeGreaterThan(0)
      inStock.forEach(product => {
        expect(product.inStock).toBe(true)
        expect(product.stock).toBeGreaterThan(0)
      })
    })
  })

  describe('Product Updates', () => {
    it('should update product stock', async () => {
      const product = await prisma.product.findFirst()
      expect(product).toBeDefined()

      if (product) {
        const updated = await prisma.product.update({
          where: { id: product.id },
          data: { stock: product.stock - 1 },
        })

        expect(updated.stock).toBe(product.stock - 1)
      }
    })

    it('should update product price', async () => {
      const product = await prisma.product.findFirst()
      expect(product).toBeDefined()

      if (product) {
        const newPrice = 24999
        const updated = await prisma.product.update({
          where: { id: product.id },
          data: { price: newPrice },
        })

        expect(updated.price).toBe(newPrice)
      }
    })
  })
})
