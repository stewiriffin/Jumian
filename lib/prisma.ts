// Prisma client with mock fallback for development without database
let prismaInstance: any = null;

export const prisma = {
  getClient: () => {
    if (!prismaInstance) {
      try {
        const { PrismaClient } = require('./generated/prisma');
        prismaInstance = new PrismaClient();
      } catch (e) {
        // Create mock client for development without database
        console.warn('⚠️ Prisma client not found. Run: npx prisma generate && npx prisma db push');
        prismaInstance = createMockPrismaClient();
      }
    }
    return prismaInstance;
  },
  // Re-export for convenience
  product: {
    findMany: async (args?: any) => {
      const client = prisma.getClient();
      return client?.product?.findMany?.(args) || [];
    },
    findUnique: async (args?: any) => {
      const client = prisma.getClient();
      return client?.product?.findUnique?.(args) || null;
    },
    count: async (args?: any) => {
      const client = prisma.getClient();
      return client?.product?.count?.(args) || 0;
    },
  },
  category: {
    findMany: async (args?: any) => {
      const client = prisma.getClient();
      return client?.category?.findMany?.(args) || [];
    },
    findUnique: async (args?: any) => {
      const client = prisma.getClient();
      return client?.category?.findUnique?.(args) || null;
    },
  },
  user: {
    findUnique: async (args?: any) => {
      const client = prisma.getClient();
      return client?.user?.findUnique?.(args) || null;
    },
    create: async (args?: any) => {
      const client = prisma.getClient();
      return client?.user?.create?.(args) || args?.data;
    },
  },
  order: {
    findMany: async (args?: any) => {
      const client = prisma.getClient();
      return client?.order?.findMany?.(args) || [];
    },
    create: async (args?: any) => {
      const client = prisma.getClient();
      return client?.order?.create?.(args) || args?.data;
    },
  },
};

function createMockPrismaClient() {
  return {
    product: {
      findMany: async () => [],
      findUnique: async () => null,
      count: async () => 0,
    },
    category: {
      findMany: async () => [],
      findUnique: async () => null,
    },
    user: {
      findUnique: async () => null,
      create: async (data: any) => data,
    },
    order: {
      findMany: async () => [],
      create: async (data: any) => data,
    },
  };
}
