import Redis from 'ioredis'
import { env } from './env'
import logger from './logger'

// Initialize Redis client (only if REDIS_URL is configured)
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
      logger.info('Redis connected for caching')
    })
  } catch (error) {
    logger.error('Failed to initialize Redis for caching:', error)
  }
}

/**
 * Get data from cache or execute fallback function
 * @param key Cache key
 * @param fallback Function to execute if cache misses
 * @param ttl Time to live in seconds (default: 300 = 5 minutes)
 */
export async function getCached<T>(
  key: string,
  fallback: () => Promise<T>,
  ttl: number = 300
): Promise<T> {
  // If Redis is not configured, always execute fallback
  if (!redis) {
    logger.debug('Redis not configured, executing fallback', { key })
    return fallback()
  }

  try {
    // Try to get from cache
    const cached = await redis.get(key)

    if (cached) {
      logger.debug('Cache hit', { key })
      return JSON.parse(cached) as T
    }

    // Cache miss - execute fallback
    logger.debug('Cache miss', { key })
    const data = await fallback()

    // Store in cache
    await redis.setex(key, ttl, JSON.stringify(data))

    return data
  } catch (error) {
    logger.error('Cache error, falling back to direct execution', error as Error, { key })
    return fallback()
  }
}

/**
 * Set a value in cache
 * @param key Cache key
 * @param value Value to cache
 * @param ttl Time to live in seconds (default: 300 = 5 minutes)
 */
export async function setCache<T>(
  key: string,
  value: T,
  ttl: number = 300
): Promise<void> {
  if (!redis) return

  try {
    await redis.setex(key, ttl, JSON.stringify(value))
    logger.debug('Cache set', { key, ttl })
  } catch (error) {
    logger.error('Failed to set cache', error as Error, { key })
  }
}

/**
 * Delete a specific cache key
 * @param key Cache key to delete
 */
export async function deleteCache(key: string): Promise<void> {
  if (!redis) return

  try {
    await redis.del(key)
    logger.debug('Cache deleted', { key })
  } catch (error) {
    logger.error('Failed to delete cache', error as Error, { key })
  }
}

/**
 * Invalidate cache by pattern
 * @param pattern Pattern to match keys (e.g., "products:*")
 */
export async function invalidateCache(pattern: string): Promise<void> {
  if (!redis) return

  try {
    const keys = await redis.keys(pattern)

    if (keys.length > 0) {
      await redis.del(...keys)
      logger.info('Cache invalidated', { pattern, count: keys.length })
    } else {
      logger.debug('No cache keys found to invalidate', { pattern })
    }
  } catch (error) {
    logger.error('Cache invalidation error', error as Error, { pattern })
  }
}

/**
 * Clear all cache
 * WARNING: Use with caution in production
 */
export async function clearAllCache(): Promise<void> {
  if (!redis) return

  try {
    await redis.flushdb()
    logger.warn('All cache cleared')
  } catch (error) {
    logger.error('Failed to clear all cache', error as Error)
  }
}

/**
 * Get cache statistics
 */
export async function getCacheStats(): Promise<{
  connected: boolean
  keyCount?: number
  memoryUsage?: string
} | null> {
  if (!redis) {
    return { connected: false }
  }

  try {
    const keyCount = await redis.dbsize()
    const info = await redis.info('memory')
    const memoryMatch = info.match(/used_memory_human:(.+)/)
    const memoryUsage = memoryMatch ? memoryMatch[1].trim() : 'unknown'

    return {
      connected: true,
      keyCount,
      memoryUsage,
    }
  } catch (error) {
    logger.error('Failed to get cache stats', error as Error)
    return { connected: false }
  }
}

/**
 * Graceful shutdown - close Redis connection
 */
export async function disconnectCache(): Promise<void> {
  if (redis) {
    await redis.quit()
    logger.info('Redis cache disconnected')
  }
}

/**
 * Common cache keys
 */
export const CACHE_KEYS = {
  PRODUCTS: (filters?: string) => `products:${filters || 'all'}`,
  PRODUCT: (id: string) => `product:${id}`,
  CATEGORIES: 'categories:all',
  CATEGORY: (id: string) => `category:${id}`,
  USER_ORDERS: (userId: string) => `orders:user:${userId}`,
  FEATURED_PRODUCTS: 'products:featured',
  FLASH_SALE_PRODUCTS: 'products:flash-sale',
  PRODUCT_REVIEWS: (productId: string) => `reviews:product:${productId}`,
}

/**
 * Common cache TTLs (in seconds)
 */
export const CACHE_TTL = {
  SHORT: 30, // 30 seconds - for frequently changing data
  MEDIUM: 180, // 3 minutes - for homepage and product lists
  LONG: 600, // 10 minutes - for static content
  HOUR: 3600, // 1 hour - for rarely changing data
  DAY: 86400, // 24 hours - for very static content
}
