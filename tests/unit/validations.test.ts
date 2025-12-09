import { describe, it, expect } from '@jest/globals'
import { registerSchema, loginSchema, createOrderSchema, createReviewSchema, addressSchema } from '@/lib/validations'

describe('Validation Schemas', () => {
  describe('registerSchema', () => {
    it('should accept valid registration data', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'SecurePass123!',
      }
      expect(registerSchema.safeParse(validData).success).toBe(true)
    })

    it('should reject invalid email', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'SecurePass123!',
      }
      expect(registerSchema.safeParse(invalidData).success).toBe(false)
    })

    it('should reject weak password', () => {
      const weakPassword = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123',
      }
      expect(registerSchema.safeParse(weakPassword).success).toBe(false)
    })

    it('should reject missing name', () => {
      const noName = {
        email: 'john@example.com',
        password: 'SecurePass123!',
      }
      expect(registerSchema.safeParse(noName).success).toBe(false)
    })
  })

  describe('loginSchema', () => {
    it('should accept valid login data', () => {
      const validData = {
        email: 'john@example.com',
        password: 'SecurePass123!',
      }
      expect(loginSchema.safeParse(validData).success).toBe(true)
    })

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'not-an-email',
        password: 'SecurePass123!',
      }
      expect(loginSchema.safeParse(invalidData).success).toBe(false)
    })

    it('should reject empty password', () => {
      const noPassword = {
        email: 'john@example.com',
        password: '',
      }
      expect(loginSchema.safeParse(noPassword).success).toBe(false)
    })
  })

  describe('createOrderSchema', () => {
    it('should accept valid order data', () => {
      const validData = {
        items: [
          { productId: 'clxxx123456789', quantity: 2, price: 99.99, name: 'Product', image: 'https://example.com/image.jpg' }
        ],
        total: 199.98,
        subtotal: 199.98,
        shipping: 0,
        tax: 0,
        paymentMethod: 'mpesa' as const,
        shippingAddress: {
          fullName: 'John Doe',
          phone: '0712345678',
          address: '123 Street',
          city: 'Nairobi',
          state: 'Nairobi',
          zipCode: '00100',
        },
        billingAddress: {
          fullName: 'John Doe',
          phone: '0712345678',
          address: '123 Street',
          city: 'Nairobi',
          state: 'Nairobi',
          zipCode: '00100',
        },
      }
      expect(createOrderSchema.safeParse(validData).success).toBe(true)
    })

    it('should reject empty items array', () => {
      const invalidData = {
        items: [],
        total: 0,
        subtotal: 0,
        shipping: 0,
        tax: 0,
        paymentMethod: 'mpesa' as const,
        shippingAddress: {
          fullName: 'John Doe',
          phone: '0712345678',
          address: '123 Street',
          city: 'Nairobi',
          state: 'Nairobi',
          zipCode: '00100',
        },
        billingAddress: {
          fullName: 'John Doe',
          phone: '0712345678',
          address: '123 Street',
          city: 'Nairobi',
          state: 'Nairobi',
          zipCode: '00100',
        },
      }
      expect(createOrderSchema.safeParse(invalidData).success).toBe(false)
    })

    it('should reject invalid payment method', () => {
      const invalidData = {
        items: [
          { productId: 'clxxx123456789', quantity: 2, price: 99.99, name: 'Product', image: '' }
        ],
        total: 199.98,
        subtotal: 199.98,
        shipping: 0,
        tax: 0,
        paymentMethod: 'invalid',
        shippingAddress: {
          fullName: 'John Doe',
          phone: '0712345678',
          address: '123 Street',
          city: 'Nairobi',
          state: 'Nairobi',
          zipCode: '00100',
        },
        billingAddress: {
          fullName: 'John Doe',
          phone: '0712345678',
          address: '123 Street',
          city: 'Nairobi',
          state: 'Nairobi',
          zipCode: '00100',
        },
      }
      expect(createOrderSchema.safeParse(invalidData).success).toBe(false)
    })
  })

  describe('createReviewSchema', () => {
    it('should accept valid review data', () => {
      const validData = {
        productId: 'clxxx123456789',
        rating: 5,
        comment: 'This is a great product! Highly recommended.',
      }
      expect(createReviewSchema.safeParse(validData).success).toBe(true)
    })

    it('should reject invalid rating', () => {
      const invalidData = {
        productId: 'clxxx123456789',
        rating: 6,
        comment: 'This is a great product!',
      }
      expect(createReviewSchema.safeParse(invalidData).success).toBe(false)
    })

    it('should reject short comment', () => {
      const invalidData = {
        productId: 'clxxx123456789',
        rating: 5,
        comment: 'Too short',
      }
      expect(createReviewSchema.safeParse(invalidData).success).toBe(false)
    })
  })
})
