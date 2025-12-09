import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

describe('Authentication Integration Tests', () => {
  beforeAll(async () => {
    // Clean up test database
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('User Registration', () => {
    it('should create a new user with hashed password', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: await bcrypt.hash('Password123!', 10),
        role: 'user',
      }

      const user = await prisma.user.create({
        data: userData,
      })

      expect(user).toBeDefined()
      expect(user.email).toBe('test@example.com')
      expect(user.name).toBe('Test User')
      expect(user.role).toBe('user')
      expect(user.password).not.toBe('Password123!')
    })

    it('should not allow duplicate email addresses', async () => {
      const userData = {
        name: 'Duplicate User',
        email: 'test@example.com',
        password: await bcrypt.hash('Password123!', 10),
        role: 'user',
      }

      await expect(
        prisma.user.create({ data: userData })
      ).rejects.toThrow()
    })
  })

  describe('User Login', () => {
    it('should verify correct password', async () => {
      const user = await prisma.user.findUnique({
        where: { email: 'test@example.com' },
      })

      expect(user).toBeDefined()
      if (user && user.password) {
        const isValid = await bcrypt.compare('Password123!', user.password)
        expect(isValid).toBe(true)
      }
    })

    it('should reject incorrect password', async () => {
      const user = await prisma.user.findUnique({
        where: { email: 'test@example.com' },
      })

      expect(user).toBeDefined()
      if (user && user.password) {
        const isValid = await bcrypt.compare('WrongPassword', user.password)
        expect(isValid).toBe(false)
      }
    })
  })

  describe('Role-Based Access', () => {
    it('should create admin user', async () => {
      const adminData = {
        name: 'Admin User',
        email: 'admin@example.com',
        password: await bcrypt.hash('AdminPass123!', 10),
        role: 'admin',
      }

      const admin = await prisma.user.create({
        data: adminData,
      })

      expect(admin.role).toBe('admin')
    })

    it('should retrieve users by role', async () => {
      const admins = await prisma.user.findMany({
        where: { role: 'admin' },
      })

      expect(admins.length).toBeGreaterThan(0)
      expect(admins[0].role).toBe('admin')
    })
  })
})
