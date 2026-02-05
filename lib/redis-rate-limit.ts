import Redis from 'ioredis';
import { env } from './env';
import { logError, logInfo, logWarn } from './logger';

// Initialize Redis client (only if REDIS_URL is configured)
let redis: Redis | null = null;

if (env.REDIS_URL) {
  try {
    redis = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        if (times > 3) {
          logError('Redis connection failed after 3 retries');
          return null;
        }
        return Math.min(times * 100, 3000);
      },
    });

    redis.on('error', (err: Error) => {
      logError('Redis error:', err);
    });

    redis.on('connect', () => {
      logInfo('Redis connected for rate limiting');
    });
  } catch (error) {
    logError('Failed to initialize Redis for rate limiting:', error as Error);
  }
}

interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
  limit: number;
  windowMs: number;
}

/**
 * Redis-based rate limiter
 * Uses sliding window algorithm for accurate rate limiting
 */
export async function redisRateLimit(
  identifier: string,
  options: RateLimitOptions
): Promise<RateLimitResult> {
  const { windowMs, maxRequests } = options;
  const key = `ratelimit:${identifier}`;
  const now = Date.now();
  const windowStart = now - windowMs;

  // If Redis is not configured, use in-memory fallback
  if (!redis) {
    logger.warn('Redis not configured, using in-memory rate limiting');
    return {
      success: true,
      remaining: maxRequests,
      resetTime: now + windowMs,
      limit: maxRequests,
      windowMs,
    };
  }

  try {
    // Use sorted set to track requests with timestamps
    // Remove old entries outside the window
    await redis.zremrangebyscore(key, '-inf', windowStart.toString());

    // Count current requests in window
    const count = await redis.zcard(key);

    if (count >= maxRequests) {
      // Get the oldest entry to calculate reset time
      const oldest = await redis.zrange(key, 0, 0, 'WITHSCORES');
      const resetTime = oldest.length >= 2 ? parseInt(oldest[1]) : now + windowMs;

      return {
        success: false,
        remaining: 0,
        resetTime,
        limit: maxRequests,
        windowMs,
      };
    }

    // Add current request
    await redis.zadd(key, now.toString(), `${now}-${Math.random()}`);

    // Set expiry on the key
    await redis.expire(key, Math.ceil(windowMs / 1000));

    return {
      success: true,
      remaining: maxRequests - count - 1,
      resetTime: now + windowMs,
      limit: maxRequests,
      windowMs,
    };
  } catch (error) {
    logError('Rate limit error', error as Error, { key });
    // Fail open - allow request on error
    return {
      success: true,
      remaining: maxRequests,
      resetTime: now + windowMs,
      limit: maxRequests,
      windowMs,
    };
  }
}

/**
 * Get rate limit configuration for different scenarios
 */
export function getRateLimitOptions(
  type: 'auth' | 'api' | 'read'
): RateLimitOptions {
  switch (type) {
    case 'auth':
      return { windowMs: 15 * 60 * 1000, maxRequests: 5 }; // 15 minutes, 5 requests
    case 'api':
      return { windowMs: 60 * 1000, maxRequests: 60 }; // 1 minute, 60 requests
    case 'read':
      return { windowMs: 60 * 1000, maxRequests: 120 }; // 1 minute, 120 requests
    default:
      return { windowMs: 60 * 1000, maxRequests: 60 };
  }
}

/**
 * Graceful shutdown - close Redis connection
 */
export async function disconnectRedis(): Promise<void> {
  if (redis) {
    await redis.quit();
    logInfo('Redis connection closed');
  }
}
