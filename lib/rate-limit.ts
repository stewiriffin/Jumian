import { NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

interface RateLimitOptions {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Max requests per interval
}

/**
 * Simple in-memory rate limiter
 * For production, use Redis-based rate limiting
 */
export function rateLimit(options: RateLimitOptions) {
  const { interval, maxRequests } = options;

  return (identifier: string): { success: boolean; remaining: number; resetTime: number } => {
    const now = Date.now();
    const record = store[identifier];

    if (!record || now > record.resetTime) {
      // Create new record or reset expired one
      store[identifier] = {
        count: 1,
        resetTime: now + interval,
      };
      return {
        success: true,
        remaining: maxRequests - 1,
        resetTime: now + interval,
      };
    }

    if (record.count >= maxRequests) {
      // Rate limit exceeded
      return {
        success: false,
        remaining: 0,
        resetTime: record.resetTime,
      };
    }

    // Increment count
    record.count++;
    return {
      success: true,
      remaining: maxRequests - record.count,
      resetTime: record.resetTime,
    };
  };
}

/**
 * Clean up expired entries periodically
 */
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 60000); // Clean every minute

/**
 * Rate limit configurations
 */
export const rateLimiters = {
  // Strict limits for authentication
  auth: rateLimit({
    interval: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
  }),

  // Moderate limits for API calls
  api: rateLimit({
    interval: 60 * 1000, // 1 minute
    maxRequests: 60,
  }),

  // Lenient limits for reads
  read: rateLimit({
    interval: 60 * 1000, // 1 minute
    maxRequests: 120,
  }),
};

/**
 * Helper to create rate limit response
 */
export function createRateLimitResponse(resetTime: number) {
  const resetDate = new Date(resetTime);
  return NextResponse.json(
    {
      error: 'Too many requests',
      message: 'You have exceeded the rate limit. Please try again later.',
      retryAfter: Math.ceil((resetTime - Date.now()) / 1000),
    },
    {
      status: 429,
      headers: {
        'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
        'X-RateLimit-Reset': resetDate.toISOString(),
      },
    }
  );
}

/**
 * Get client identifier from request
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from headers (for proxy/load balancer scenarios)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] :
             request.headers.get('x-real-ip') ||
             'unknown';

  return ip;
}
