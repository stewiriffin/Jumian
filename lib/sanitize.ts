/**
 * Input sanitization utilities
 * Helps prevent XSS and injection attacks
 */

/**
 * Sanitize string input
 * Removes potentially dangerous characters
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers like onclick=
}

/**
 * Sanitize HTML content
 * Strips all HTML tags
 */
export function stripHtml(input: string): string {
  if (typeof input !== 'string') return '';

  return input
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/&[a-z]+;/gi, '') // Remove HTML entities
    .trim();
}

/**
 * Sanitize email
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') return '';

  return email.toLowerCase().trim();
}

/**
 * Sanitize phone number
 * Removes all non-digit characters except + at start
 */
export function sanitizePhone(phone: string): string {
  if (typeof phone !== 'string') return '';

  phone = phone.trim();

  // Keep + at start if present
  const hasPlus = phone.startsWith('+');
  const digits = phone.replace(/\D/g, '');

  return hasPlus ? `+${digits}` : digits;
}

/**
 * Sanitize URL
 * Ensures URL is safe and well-formed
 */
export function sanitizeUrl(url: string): string {
  if (typeof url !== 'string') return '';

  url = url.trim();

  // Block dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
  const lowerUrl = url.toLowerCase();

  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      return '';
    }
  }

  // Only allow http(s) and mailto
  if (!url.match(/^(https?:\/\/|mailto:)/i)) {
    return '';
  }

  return url;
}

/**
 * Sanitize filename
 * Removes path traversal and dangerous characters
 */
export function sanitizeFilename(filename: string): string {
  if (typeof filename !== 'string') return '';

  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_') // Replace invalid chars with underscore
    .replace(/\.{2,}/g, '.') // Prevent directory traversal
    .replace(/^\.+/, '') // Remove leading dots
    .substring(0, 255); // Limit length
}

/**
 * Sanitize search query
 * Makes search query safe for database queries
 */
export function sanitizeSearchQuery(query: string): string {
  if (typeof query !== 'string') return '';

  return query
    .trim()
    .replace(/[%_\\]/g, '\\$&') // Escape SQL LIKE wildcards
    .substring(0, 100); // Limit length
}

/**
 * Sanitize number input
 * Ensures input is a valid number within range
 */
export function sanitizeNumber(
  input: unknown,
  min?: number,
  max?: number
): number | null {
  const num = Number(input);

  if (isNaN(num) || !isFinite(num)) {
    return null;
  }

  if (min !== undefined && num < min) {
    return min;
  }

  if (max !== undefined && num > max) {
    return max;
  }

  return num;
}

/**
 * Sanitize integer input
 */
export function sanitizeInteger(
  input: unknown,
  min?: number,
  max?: number
): number | null {
  const num = sanitizeNumber(input, min, max);

  if (num === null) {
    return null;
  }

  return Math.floor(num);
}

/**
 * Sanitize boolean input
 */
export function sanitizeBoolean(input: unknown): boolean {
  if (typeof input === 'boolean') {
    return input;
  }

  if (typeof input === 'string') {
    const lower = input.toLowerCase().trim();
    return lower === 'true' || lower === '1' || lower === 'yes';
  }

  return Boolean(input);
}

/**
 * Sanitize object keys
 * Removes potentially dangerous keys
 */
export function sanitizeObjectKeys<T extends Record<string, unknown>>(
  obj: T,
  allowedKeys: string[]
): Partial<T> {
  const sanitized: Record<string, unknown> = {};

  for (const key of allowedKeys) {
    if (key in obj) {
      sanitized[key] = obj[key];
    }
  }

  return sanitized as Partial<T>;
}

/**
 * Sanitize array
 * Ensures input is an array and sanitizes each element
 */
export function sanitizeArray<T>(
  input: unknown,
  sanitizer: (item: unknown) => T
): T[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input.map(sanitizer).filter(item => item !== null && item !== undefined);
}
