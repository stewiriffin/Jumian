import { describe, it, expect } from '@jest/globals'
import { formatPrice, formatPriceSimple } from '@/lib/utils'

describe('Utility Functions', () => {
  describe('formatPrice', () => {
    it('should format price correctly with KES currency', () => {
      const result = formatPrice(1000)
      expect(result).toContain('1,000')
      expect(result).toContain('KES')
    })

    it('should handle zero', () => {
      const result = formatPrice(0)
      expect(result).toContain('0')
    })

    it('should format large numbers with commas', () => {
      const result = formatPrice(1234567)
      expect(result).toContain('1,234,567')
    })

    it('should handle decimal values by rounding', () => {
      const result = formatPrice(99.99)
      // Should round to nearest integer
      expect(result).toContain('100')
    })
  })

  describe('formatPriceSimple', () => {
    it('should format price without currency symbol', () => {
      const result = formatPriceSimple(1000)
      expect(result).toBe('1,000')
      expect(result).not.toContain('KES')
    })

    it('should handle zero', () => {
      expect(formatPriceSimple(0)).toBe('0')
    })

    it('should format with commas', () => {
      expect(formatPriceSimple(1234567)).toBe('1,234,567')
    })
  })
})
