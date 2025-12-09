import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AutoRefresh } from '@/components/admin/auto-refresh';

export const revalidate = 0; // Disable caching for real-time data
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  // Check if user is logged in and is an admin
  if (!session || !session.user || !session.user.email) {
    redirect('/auth/signin?callbackUrl=/admin');
  }

  // At this point, TypeScript knows session.user.email exists
  const userEmail = session.user.email;

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { role: true },
  });

  if (!user || user.role !== 'admin') {
    redirect('/?error=unauthorized');
  }

  // Fetch dashboard statistics
  const [
    totalProducts,
    totalOrders,
    totalUsers,
    totalRevenue,
    recentOrders,
    lowStockProducts,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { not: 'cancelled' } },
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        items: { include: { product: { select: { name: true } } } },
      },
    }),
    prisma.product.findMany({
      where: { stock: { lt: 20 } },
      take: 10,
      orderBy: { stock: 'asc' },
      select: { id: true, name: true, stock: true, price: true },
    }),
  ]);

  const revenue = totalRevenue._sum.total || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <AutoRefresh interval={30} />
              <span className="text-sm text-gray-600">
                {session.user.name || session.user.email}
              </span>
              <a
                href="/"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Back to Store
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`KES ${revenue.toLocaleString()}`}
            icon="💰"
            color="bg-green-50 text-green-700"
          />
          <StatCard
            title="Total Orders"
            value={totalOrders.toString()}
            icon="📦"
            color="bg-blue-50 text-blue-700"
          />
          <StatCard
            title="Total Products"
            value={totalProducts.toString()}
            icon="📱"
            color="bg-purple-50 text-purple-700"
          />
          <StatCard
            title="Total Users"
            value={totalUsers.toString()}
            icon="👥"
            color="bg-orange-50 text-orange-700"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActionButton href="/admin/products" label="Manage Products" icon="📦" />
            <ActionButton href="/admin/orders" label="View Orders" icon="🛒" />
            <ActionButton href="/admin/users" label="Manage Users" icon="👥" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Orders
            </h2>
            <div className="space-y-4">
              {recentOrders.length === 0 ? (
                <p className="text-gray-500 text-sm">No orders yet</p>
              ) : (
                recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-start border-b pb-4 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.user.name || order.user.email}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.items.length} items • KES{' '}
                        {order.total.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                ))
              )}
            </div>
            {recentOrders.length > 0 && (
              <div className="mt-4">
                <a
                  href="/admin/orders"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all orders →
                </a>
              </div>
            )}
          </div>

          {/* Low Stock Products */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Low Stock Alert
            </h2>
            <div className="space-y-4">
              {lowStockProducts.length === 0 ? (
                <p className="text-gray-500 text-sm">All products in stock</p>
              ) : (
                lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex justify-between items-center border-b pb-4 last:border-b-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        KES {product.price.toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        product.stock < 10
                          ? 'bg-red-50 text-red-700'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}
                    >
                      {product.stock} left
                    </span>
                  </div>
                ))
              )}
            </div>
            {lowStockProducts.length > 0 && (
              <div className="mt-4">
                <a
                  href="/admin/products"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Manage inventory →
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`text-4xl ${color} rounded-full w-16 h-16 flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-medium text-gray-900">{label}</span>
    </a>
  );
}

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-50 text-yellow-700',
    processing: 'bg-blue-50 text-blue-700',
    shipped: 'bg-purple-50 text-purple-700',
    delivered: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-700',
  };
  return colors[status] || 'bg-gray-50 text-gray-700';
}
