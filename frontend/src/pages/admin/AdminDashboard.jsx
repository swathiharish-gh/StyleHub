import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get('/admin/stats');
      setStats(data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-500 text-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold">₹{stats?.totalRevenue || 0}</p>
        </div>

        <div className="bg-green-500 text-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
          <p className="text-3xl font-bold">{stats?.totalOrders || 0}</p>
        </div>

        <div className="bg-purple-500 text-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Total Products</h3>
          <p className="text-3xl font-bold">{stats?.totalProducts || 0}</p>
        </div>

        <div className="bg-orange-500 text-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold">{stats?.totalUsers || 0}</p>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Order Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Pending Orders</span>
              <span className="font-bold text-yellow-600">
                {stats?.pendingOrders || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Delivered Orders</span>
              <span className="font-bold text-green-600">
                {stats?.deliveredOrders || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link
              to="/admin/products/add"
              className="block w-full bg-indigo-600 text-white text-center py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Add New Product
            </Link>
            <Link
              to="/admin/orders"
              className="block w-full bg-green-600 text-white text-center py-2 rounded-md hover:bg-green-700 transition"
            >
              Manage Orders
            </Link>
            <Link
              to="/admin/users"
              className="block w-full bg-purple-600 text-white text-center py-2 rounded-md hover:bg-purple-700 transition"
            >
              Manage Users
            </Link>
          </div>
        </div>
      </div>

      {/* Management Links */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/products"
            className="border border-gray-300 rounded-lg p-4 hover:border-indigo-600 hover:shadow-md transition"
          >
            <h4 className="font-semibold mb-2">View All Products</h4>
            <p className="text-sm text-gray-600">
              Browse and manage product catalog
            </p>
          </Link>

          <Link
            to="/admin/orders"
            className="border border-gray-300 rounded-lg p-4 hover:border-indigo-600 hover:shadow-md transition"
          >
            <h4 className="font-semibold mb-2">Order Management</h4>
            <p className="text-sm text-gray-600">
              View and update order status
            </p>
          </Link>

          <Link
            to="/admin/users"
            className="border border-gray-300 rounded-lg p-4 hover:border-indigo-600 hover:shadow-md transition"
          >
            <h4 className="font-semibold mb-2">User Management</h4>
            <p className="text-sm text-gray-600">
              Manage users and admin roles
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;