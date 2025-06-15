
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Package, ShoppingBag, Users } from 'lucide-react';

const AdminAnalytics = () => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      const [ordersRes, productsRes, usersRes] = await Promise.all([
        supabase.from('orders').select('total_amount, status'),
        supabase.from('products').select('id, stock_count'),
        supabase.from('profiles').select('id, created_at')
      ]);

      const orders = ordersRes.data || [];
      const products = productsRes.data || [];
      const users = usersRes.data || [];

      const totalRevenue = orders
        .filter(order => order.status !== 'cancelled')
        .reduce((sum, order) => sum + Number(order.total_amount), 0);

      const totalProducts = products.length;
      const lowStockProducts = products.filter(p => p.stock_count < 10).length;
      const totalUsers = users.length;
      const newUsersThisMonth = users.filter(user => {
        const createdAt = new Date(user.created_at);
        const now = new Date();
        return createdAt.getMonth() === now.getMonth() && 
               createdAt.getFullYear() === now.getFullYear();
      }).length;

      return {
        totalRevenue,
        totalOrders: orders.length,
        totalProducts,
        lowStockProducts,
        totalUsers,
        newUsersThisMonth,
        pendingOrders: orders.filter(o => o.status === 'pending').length
      };
    }
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="bg-gray-300 h-4 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-300 h-8 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${analytics?.totalRevenue?.toFixed(2) || '0.00'}`,
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Total Products',
      value: analytics?.totalProducts || 0,
      icon: Package,
      color: 'text-blue-600',
      subtitle: `${analytics?.lowStockProducts || 0} low stock`
    },
    {
      title: 'Total Orders',
      value: analytics?.totalOrders || 0,
      icon: ShoppingBag,
      color: 'text-purple-600',
      subtitle: `${analytics?.pendingOrders || 0} pending`
    },
    {
      title: 'Total Users',
      value: analytics?.totalUsers || 0,
      icon: Users,
      color: 'text-rose-600',
      subtitle: `${analytics?.newUsersThisMonth || 0} this month`
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              {stat.subtitle && (
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-rose-50 rounded-lg">
              <h3 className="font-semibold text-rose-800 mb-2">Low Stock Alert</h3>
              <p className="text-sm text-rose-600">
                {analytics?.lowStockProducts || 0} products have low stock
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Pending Orders</h3>
              <p className="text-sm text-blue-600">
                {analytics?.pendingOrders || 0} orders need attention
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">New Users</h3>
              <p className="text-sm text-green-600">
                {analytics?.newUsersThisMonth || 0} users joined this month
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
