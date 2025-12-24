import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const wishlist = await prisma.wishlistItem.findMany({
      where: {
        userId: (session.user as any).id,
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });

    const items = wishlist.map((item) => ({
      ...item.product,
      images: JSON.parse(item.product.images),
      specifications: item.product.specifications
        ? JSON.parse(item.product.specifications)
        : null,
    }));

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch wishlist' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId } = await request.json();

    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        userId: (session.user as any).id,
        productId,
      },
    });

    return NextResponse.json(wishlistItem);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Item already in wishlist' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to add to wishlist' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID required' },
        { status: 400 }
      );
    }

    await prisma.wishlistItem.delete({
      where: {
        userId_productId: {
          userId: (session.user as any).id,
          productId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove from wishlist' },
      { status: 500 }
    );
  }
}
