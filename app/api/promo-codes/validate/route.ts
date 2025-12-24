import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimiters, getClientIdentifier, createRateLimitResponse } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const identifier = getClientIdentifier(request);
    const rateLimitResult = rateLimiters.api(identifier);

    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult.resetTime);
    }

    const { code, subtotal } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Promo code is required' },
        { status: 400 }
      );
    }

    if (!subtotal || typeof subtotal !== 'number' || subtotal <= 0) {
      return NextResponse.json(
        { error: 'Valid subtotal is required' },
        { status: 400 }
      );
    }

    const promoCode = await prisma.promoCode.findFirst({
      where: {
        code: code.toUpperCase(),
      },
    });

    if (!promoCode) {
      return NextResponse.json(
        { error: 'Invalid promo code' },
        { status: 404 }
      );
    }

    if (!promoCode.active) {
      return NextResponse.json(
        { error: 'This promo code is no longer active' },
        { status: 400 }
      );
    }

    if (promoCode.startsAt && new Date() < promoCode.startsAt) {
      return NextResponse.json(
        { error: 'This promo code is not yet valid' },
        { status: 400 }
      );
    }

    if (promoCode.expiresAt && new Date() > promoCode.expiresAt) {
      return NextResponse.json(
        { error: 'This promo code has expired' },
        { status: 400 }
      );
    }

    if (promoCode.usageLimit && promoCode.usageCount >= promoCode.usageLimit) {
      return NextResponse.json(
        { error: 'This promo code has reached its usage limit' },
        { status: 400 }
      );
    }

    if (promoCode.minPurchase && subtotal < promoCode.minPurchase) {
      return NextResponse.json(
        {
          error: `Minimum purchase of ${promoCode.minPurchase.toFixed(2)} required for this promo code`,
        },
        { status: 400 }
      );
    }

    let discount = 0;
    if (promoCode.type === 'percentage') {
      discount = (subtotal * promoCode.value) / 100;
      if (promoCode.maxDiscount && discount > promoCode.maxDiscount) {
        discount = promoCode.maxDiscount;
      }
    } else if (promoCode.type === 'fixed') {
      discount = promoCode.value;
      if (discount > subtotal) {
        discount = subtotal;
      }
    }

    return NextResponse.json({
      valid: true,
      code: promoCode.code,
      description: promoCode.description,
      type: promoCode.type,
      value: promoCode.value,
      discount: parseFloat(discount.toFixed(2)),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to validate promo code' },
      { status: 500 }
    );
  }
}
