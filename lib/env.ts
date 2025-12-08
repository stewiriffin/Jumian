import { z } from 'zod';

/**
 * Environment variable schema
 * Validates and types environment variables at runtime
 */
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // Authentication
  NEXTAUTH_URL: z.string().url('NEXTAUTH_URL must be a valid URL').optional(),
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET must be at least 32 characters'),

  // Node Environment
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  // Optional: Payment providers
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  MPESA_CONSUMER_KEY: z.string().optional(),
  MPESA_CONSUMER_SECRET: z.string().optional(),

  // Optional: File upload
  UPLOADTHING_SECRET: z.string().optional(),
  UPLOADTHING_APP_ID: z.string().optional(),

  // Optional: Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
});

/**
 * Validate environment variables
 * Throws error if validation fails
 */
function validateEnv() {
  try {
    const env = envSchema.parse(process.env);
    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map(err => {
        const path = err.path.join('.');
        return `  ❌ ${path}: ${err.message}`;
      }).join('\n');

      console.error('❌ Invalid environment variables:\n' + missingVars);
      throw new Error('Invalid environment variables. Check your .env file.');
    }
    throw error;
  }
}

/**
 * Type-safe environment variables
 * Validates on first access
 */
export const env = validateEnv();

/**
 * Check if required payment providers are configured
 */
export const isStripeConfigured = Boolean(
  env.STRIPE_SECRET_KEY && env.STRIPE_PUBLISHABLE_KEY
);

export const isMpesaConfigured = Boolean(
  env.MPESA_CONSUMER_KEY && env.MPESA_CONSUMER_SECRET
);

export const isEmailConfigured = Boolean(
  env.SMTP_HOST && env.SMTP_PORT && env.SMTP_USER && env.SMTP_PASS
);

export const isUploadThingConfigured = Boolean(
  env.UPLOADTHING_SECRET && env.UPLOADTHING_APP_ID
);

/**
 * Development mode flag
 */
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';
