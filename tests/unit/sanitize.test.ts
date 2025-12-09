import { describe, it, expect } from '@jest/globals'
import {
  sanitizeString,
  stripHtml,
  sanitizeEmail,
  sanitizePhone,
  sanitizeUrl,
  sanitizeNumber,
  sanitizeBoolean
} from '@/lib/sanitize'

describe('Sanitization Functions', () => {
  describe('sanitizeString', () => {
    it('should remove HTML brackets', () => {
      const malicious = '<script>alert("XSS")</script>Hello'
      expect(sanitizeString(malicious)).not.toContain('<')
      expect(sanitizeString(malicious)).not.toContain('>')
    })

    it('should remove javascript protocol', () => {
      const malicious = 'javascript:alert("XSS")'
      expect(sanitizeString(malicious)).not.toContain('javascript:')
    })

    it('should remove event handlers', () => {
      const malicious = 'onclick=alert()'
      expect(sanitizeString(malicious)).not.toContain('onclick=')
    })

    it('should trim whitespace', () => {
      const text = '  Hello World  '
      expect(sanitizeString(text)).toBe('Hello World')
    })

    it('should handle empty strings', () => {
      expect(sanitizeString('')).toBe('')
    })
  })

  describe('stripHtml', () => {
    it('should remove all HTML tags', () => {
      const html = '<div>Hello <b>World</b></div>'
      expect(stripHtml(html)).toBe('Hello World')
    })

    it('should remove script tags', () => {
      const dangerous = '<script>alert("XSS")</script>Hello'
      const result = stripHtml(dangerous)
      expect(result).not.toContain('<script>')
      expect(result).toContain('Hello')
    })

    it('should remove HTML entities', () => {
      const withEntities = 'Hello &nbsp; World &amp;'
      expect(stripHtml(withEntities)).toBe('Hello World')
    })

    it('should handle empty input', () => {
      expect(stripHtml('')).toBe('')
    })
  })

  describe('sanitizeEmail', () => {
    it('should convert to lowercase', () => {
      expect(sanitizeEmail('USER@EXAMPLE.COM')).toBe('user@example.com')
    })

    it('should trim whitespace', () => {
      expect(sanitizeEmail('  user@example.com  ')).toBe('user@example.com')
    })

    it('should handle empty string', () => {
      expect(sanitizeEmail('')).toBe('')
    })
  })

  describe('sanitizePhone', () => {
    it('should remove non-digit characters', () => {
      expect(sanitizePhone('(123) 456-7890')).toBe('1234567890')
    })

    it('should preserve leading plus', () => {
      expect(sanitizePhone('+254712345678')).toBe('+254712345678')
    })

    it('should handle spaces', () => {
      expect(sanitizePhone('123 456 7890')).toBe('1234567890')
    })
  })

  describe('sanitizeUrl', () => {
    it('should allow https URLs', () => {
      const url = 'https://example.com'
      expect(sanitizeUrl(url)).toBe(url)
    })

    it('should block javascript protocol', () => {
      expect(sanitizeUrl('javascript:alert()')).toBe('')
    })

    it('should block data protocol', () => {
      expect(sanitizeUrl('data:text/html,<script>alert()</script>')).toBe('')
    })

    it('should block file protocol', () => {
      expect(sanitizeUrl('file:///etc/passwd')).toBe('')
    })

    it('should allow mailto', () => {
      const url = 'mailto:test@example.com'
      expect(sanitizeUrl(url)).toBe(url)
    })
  })

  describe('sanitizeNumber', () => {
    it('should parse valid numbers', () => {
      expect(sanitizeNumber('123')).toBe(123)
      expect(sanitizeNumber(456)).toBe(456)
    })

    it('should enforce minimum', () => {
      expect(sanitizeNumber(5, 10)).toBe(10)
    })

    it('should enforce maximum', () => {
      expect(sanitizeNumber(100, 0, 50)).toBe(50)
    })

    it('should return null for invalid input', () => {
      expect(sanitizeNumber('not a number')).toBeNull()
      expect(sanitizeNumber(NaN)).toBeNull()
    })
  })

  describe('sanitizeBoolean', () => {
    it('should handle boolean values', () => {
      expect(sanitizeBoolean(true)).toBe(true)
      expect(sanitizeBoolean(false)).toBe(false)
    })

    it('should parse string values', () => {
      expect(sanitizeBoolean('true')).toBe(true)
      expect(sanitizeBoolean('false')).toBe(false)
      expect(sanitizeBoolean('1')).toBe(true)
      expect(sanitizeBoolean('0')).toBe(false)
    })

    it('should handle truthy/falsy values', () => {
      expect(sanitizeBoolean(1)).toBe(true)
      expect(sanitizeBoolean(0)).toBe(false)
      expect(sanitizeBoolean('')).toBe(false)
    })
  })
})
