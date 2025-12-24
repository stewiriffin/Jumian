import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { safeJsonParse, safeJsonStringify } from '@/lib/json-helpers';
import { createOrderSchema } from '@/lib/validations';

interface Address {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image?: string;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const parsedOrders = orders.map((order) => ({
      ...order,
      shippingAddress: safeJsonParse<Address>(order.shippingAddress, {
        fullName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
      }),
      billingAddress: safeJsonParse<Address>(order.billingAddress, {
        fullName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
      }),
    }));

    return NextResponse.json(parsedOrders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
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

    const body = await request.json();

    // Validate input with Zod
    const validationResult = createOrderSchema.safeParse(body);

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

    const {
      items,
      subtotal,
      shipping,
      tax,
      total,
      paymentMethod,
      shippingAddress,
      billingAddress,
    } = validationResult.data;

    // Use transaction to ensure atomicity
    const order = await prisma.$transaction(async (tx) => {
      // Check stock availability first
      for (const item of items as OrderItem[]) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
          select: { stock: true, name: true },
        });

        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`);
        }
      }

      // Create order
      const newOrder = await tx.order.create({
        data: {
          userId: session.user.id,
          subtotal,
          shipping,
          tax,
          total,
          paymentMethod,
          shippingAddress: safeJsonStringify(shippingAddress),
          billingAddress: safeJsonStringify(billingAddress),
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              name: item.name,
              image: item.image || '',
            })),
          },
        },
        include: {
          items: true,
        },
      });

      // Update product stock atomically
      for (const item of items as OrderItem[]) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newOrder;
    });

    return NextResponse.json(order);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create order';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
