import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/lib/validations';
import { rateLimiters, getClientIdentifier, createRateLimitResponse } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const identifier = getClientIdentifier(request);
    const rateLimitResult = rateLimiters.auth(identifier);

    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult.resetTime);
    }

    const body = await request.json();

    // Validate input with Zod
    const validationResult = registerSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    const { name, email, password } = validationResult.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}
