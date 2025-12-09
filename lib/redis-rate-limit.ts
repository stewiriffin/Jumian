import Redis from 'ioredis'
import { NextResponse } from 'next/server'
import { env } from './env'
import logger from './logger'

// Initialize Redis client (fallback to in-memory if not configured)
let redis: Redis | null = null

if (env.REDIS_URL) {
  try {
    redis = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        if (times > 3) {
          logger.error('Redis connection failed after 3 retries')
          return null
        }
        return Math.min(times * 100, 3000)
      },
    })

    redis.on('error', (err) => {
      logger.error('Redis error:', err)
    })

    redis.on('connect', () => {
      logger.info('Redis connected successfully')
    })
  } catch (error) {
    logger.error('Failed to initialize Redis:', error)
  }
}

interface RateLimitOptions {
  interval: number // Time window in milliseconds
  maxRequests: number // Max requests per interval
}

interface RateLimitResult {
  success: boolean
  remaining: number
  resetTime: number
}

/**
 * Redis-based rate limiter with sliding window
 */
export async function redisRateLimit(
  identifier: string,
  options: RateLimitOptions
): Promise<RateLimitResult> {
  const { interval, maxRequests } = options
  const now = Date.now()
  const key = `rate_limit:${identifier}`

  if (!redis) {
    // Fallback to in-memory (for development without Redis)
    logger.warn('Redis not configured, using in-memory rate limiting (not recommended for production)')
    return fallbackRateLimit(identifier, options)
  }

  try {
    // Use sliding window algorithm with sorted sets
    const pipeline = redis.pipeline()

    // Remove old entries outside the window
    pipeline.zremrangebyscore(key, 0, now - interval)

    // Count current requests in window
    pipeline.zcard(key)

    // Add current request
    pipeline.zadd(key, now, `${now}:${Math.random()}`)

    // Set expiry on key
    pipeline.expire(key, Math.ceil(interval / 1000))

    const results = await pipeline.exec()

    if (!results) {
      throw new Error('Pipeline execution failed')
    }

    // Get count from pipeline results
    const count = results[1][1] as number

    if (count >= maxRequests) {
      // Get oldest entry to calculate reset time
      const oldest = await redis.zrange(key, 0, 0, 'WITHSCORES')
      const resetTime = oldest.length > 1
        ? parseInt(oldest[1]) + interval
        : now + interval

      return {
        success: false,
        remaining: 0,
        resetTime,
      }
    }

    return {
      success: true,
      remaining: maxRequests - count - 1,
      resetTime: now + interval,
    }
  } catch (error) {
    logger.error('Rate limit error:', error)
    // On error, allow the request (fail open)
    return {
      success: true,
      remaining: maxRequests,
      resetTime: now + interval,
    }
  }
}

// Fallback in-memory rate limiter
const memoryStore = new Map<string, { count: number; resetTime: number }>()

function fallbackRateLimit(
  identifier: string,
  options: RateLimitOptions
): RateLimitResult {
  const { interval, maxRequests } = options
  const now = Date.now()
  const record = memoryStore.get(identifier)

  if (!record || now > record.resetTime) {
    memoryStore.set(identifier, {
      count: 1,
      resetTime: now + interval,
    })
    return {
      success: true,
      remaining: maxRequests - 1,
      resetTime: now + interval,
    }
  }

  if (record.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: record.resetTime,
    }
  }

  record.count++
  return {
    success: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime,
  }
}

// Clean up in-memory store periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of memoryStore.entries()) {
    if (value.resetTime < now) {
      memoryStore.delete(key)
    }
  }
}, 60000)

/**
 * Rate limit configurations
 */
export const rateLimiters = {
  auth: (identifier: string) =>
    redisRateLimit(identifier, {
      interval: 15 * 60 * 1000, // 15 minutes
      maxRequests: 5,
    }),

  api: (identifier: string) =>
    redisRateLimit(identifier, {
      interval: 60 * 1000, // 1 minute
      maxRequests: 60,
    }),

  read: (identifier: string) =>
    redisRateLimit(identifier, {
      interval: 60 * 1000, // 1 minute
      maxRequests: 120,
    }),

  strict: (identifier: string) =>
    redisRateLimit(identifier, {
      interval: 60 * 1000, // 1 minute
      maxRequests: 10,
    }),
}

/**
 * Helper to create rate limit response
 */
export function createRateLimitResponse(resetTime: number) {
  const retryAfter = Math.ceil((resetTime - Date.now()) / 1000)
  return NextResponse.json(
    {
      error: 'Too many requests',
      message: 'You have exceeded the rate limit. Please try again later.',
      retryAfter,
    },
    {
      status: 429,
      headers: {
        'Retry-After': retryAfter.toString(),
        'X-RateLimit-Reset': new Date(resetTime).toISOString(),
      },
    }
  )
}

/**
 * Get client identifier from request
 */
export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded
    ? forwarded.split(',')[0]
    : request.headers.get('x-real-ip') || 'unknown'
  return ip
}

/**
 * Graceful shutdown
 */
export async function disconnectRedis() {
  if (redis) {
    await redis.quit()
    logger.info('Redis disconnected')
  }
}
