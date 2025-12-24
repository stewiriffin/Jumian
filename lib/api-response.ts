import { NextResponse } from 'next/server';

/**
 * Standard API response format
 */
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: unknown;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    [key: string]: unknown;
  };
}

/**
 * Success response helper
 */
export function successResponse<T>(
  data: T,
  message?: string,
  meta?: ApiResponse['meta']
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    message,
    meta,
  });
}

/**
 * Error response helper
 */
export function errorResponse(
  error: string,
  status: number = 400,
  details?: unknown
): NextResponse<ApiResponse> {
  const response: ApiResponse = {
    success: false,
    error,
  };

  if (details) {
    response.details = details;
  }

  return NextResponse.json(response, { status });
}

/**
 * Validation error response
 */
export function validationError(
  message: string,
  errors: Array<{ field: string; message: string }>
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
      details: errors,
    },
    { status: 400 }
  );
}

/**
 * Unauthorized response
 */
export function unauthorizedResponse(
  message: string = 'Unauthorized'
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 401 }
  );
}

/**
 * Forbidden response
 */
export function forbiddenResponse(
  message: string = 'Forbidden'
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 403 }
  );
}

/**
 * Not found response
 */
export function notFoundResponse(
  message: string = 'Resource not found'
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 404 }
  );
}

/**
 * Server error response
 */
export function serverErrorResponse(
  message: string = 'Internal server error',
  error?: unknown
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 500 }
  );
}

/**
 * Created response (201)
 */
export function createdResponse<T>(
  data: T,
  message?: string
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status: 201 }
  );
}

/**
 * No content response (204)
 */
export function noContentResponse(): NextResponse {
  return new NextResponse(null, { status: 204 });
}

/**
 * Paginated response helper
 */
export function paginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): NextResponse<ApiResponse<T[]>> {
  return NextResponse.json({
    success: true,
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  });
}
