/**
 * Safely parse JSON with fallback
 * @param jsonString - The JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback
 */
export function safeJsonParse<T>(jsonString: string | null, fallback: T): T {
  if (!jsonString) return fallback;

  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    return fallback;
  }
}

/**
 * Type-safe JSON stringify
 * @param value - Value to stringify
 * @param fallback - Fallback string if stringify fails
 * @returns JSON string or fallback
 */
export function safeJsonStringify(value: unknown, fallback: string = '{}'): string {
  try {
    return JSON.stringify(value);
  } catch (error) {
    return fallback;
  }
}
