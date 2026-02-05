import { z } from 'zod'

// Environment variable schema
const envSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Database (optional in development)
  DATABASE_URL: z.string().min(1).optional(),

  // Authentication
  NEXTAUTH_SECRET: z.string().min(32).optional(),
  NEXTAUTH_URL: z.string().url().optional(),

  // Redis (optional in development, required in production)
  REDIS_URL: z.string().optional(),

  // Email (optional)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM: z.string().optional(),

  // M-Pesa (optional)
  MPESA_CONSUMER_KEY: z.string().optional(),
  MPESA_CONSUMER_SECRET: z.string().optional(),
  MPESA_SHORTCODE: z.string().optional(),
  MPESA_PASSKEY: z.string().optional(),
  MPESA_ENVIRONMENT: z.enum(['sandbox', 'production']).optional(),

  // Stripe (optional)
  STRIPE_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),

  // Sentry (optional)
  SENTRY_DSN: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),

  // UploadThing (optional)
  UPLOADTHING_SECRET: z.string().optional(),
  UPLOADTHING_APP_ID: z.string().optional(),
})

// Parse and validate environment variables
function validateEnv() {
  const parsed = envSchema.safeParse(process.env)

  if (!parsed.success) {
    throw new Error('Invalid environment variables')
  }

  return parsed.data
}

// Export validated environment variables
export const env = validateEnv()

// Helper to check if we're in production
export const isProduction = env.NODE_ENV === 'production'
export const isDevelopment = env.NODE_ENV === 'development'
export const isTest = env.NODE_ENV === 'test'
