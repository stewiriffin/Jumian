import { z } from 'zod';

// User validation schemas
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Address validation schema
export const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name required'),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number'),
  address: z.string().min(5, 'Address required'),
  city: z.string().min(2, 'City required'),
  state: z.string().min(2, 'State required'),
  zipCode: z.string().min(3, 'Zip code required'),
});

// Order validation schemas
export const orderItemSchema = z.object({
  productId: z.string().min(1, 'Product ID required'),
  quantity: z.number().int().positive('Quantity must be positive').max(100, 'Quantity too large'),
  price: z.number().positive('Price must be positive'),
  name: z.string().min(1, 'Product name required'),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
});

export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'Order must contain at least one item'),
  subtotal: z.number().positive('Invalid subtotal'),
  shipping: z.number().nonnegative('Invalid shipping cost'),
  tax: z.number().nonnegative('Invalid tax amount'),
  total: z.number().positive('Invalid total'),
  paymentMethod: z.enum(['card', 'mpesa', 'cod']),
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
});

// Review validation schema
export const createReviewSchema = z.object({
  productId: z.string().min(1, 'Product ID required'),
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  comment: z.string().min(10, 'Review must be at least 10 characters').max(500, 'Review too long'),
});

// Wishlist validation schema
export const wishlistItemSchema = z.object({
  productId: z.string().min(1, 'Product ID required'),
});
