"use client"

import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('week');

  // Sample data - replace with your actual data
  const salesData = [
    { name: 'Jan', sales: 4000, orders: 2400, customers: 1800 },
    { name: 'Feb', sales: 3000, orders: 1398, customers: 1200 },
    { name: 'Mar', sales: 2000, orders: 9800, customers: 800 },
    { name: 'Apr', sales: 2780, orders: 3908, customers: 1600 },
    { name: 'May', sales: 1890, orders: 4800, customers: 1400 },
    { name: 'Jun', sales: 2390, orders: 3800, customers: 1900 },
    { name: 'Jul', sales: 3490, orders: 4300, customers: 2100 },
  ];

  const topProducts = [
    { name: 'Product A', value: 400 },
    { name: 'Product B', value: 300 },
    { name: 'Product C', value: 200 },
    { name: 'Product D', value: 100 },
  ];

  const revenueByCategory = [
    { name: 'IFPD', revenue: 120000 },
    { name: 'Camers', revenue: 85000 },
    { name: 'Stem & Robotics', revenue: 65000 },
    { name: 'Stands', revenue: 35000 },
    { name: 'Mic', revenue: 45000 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF'];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', date: '2023-06-01', amount: '₹12,000', status: 'Completed' },
    { id: '#ORD-002', customer: 'Jane Smith', date: '2023-06-02', amount: '₹8,550', status: 'Processing' },
    { id: '#ORD-003', customer: 'Robert Johnson', date: '2023-06-02', amount: '₹21,000', status: 'Completed' },
    { id: '#ORD-004', customer: 'Emily Davis', date: '2023-06-03', amount: '₹6,499', status: 'Shipped' },
  ];

  // Summary cards data
  const summaryData = [
    { title: 'Total Sales', value: '₹2,47,800', change: '+12%', trend: 'up' },
    { title: 'Total Orders', value: '1,892', change: '+5%', trend: 'up' },
    { title: 'New Customers', value: '324', change: '+8%', trend: 'up' },
    { title: 'Conversion Rate', value: '3.2%', change: '-0.5%', trend: 'down' },
  ];

  // Format tooltip for rupees
  const rupeeTooltipFormatter = (value) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="p-6 ml-64 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 text-black md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {summaryData.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{item.title}</p>
                <p className="text-2xl font-bold mt-1">{item.value}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Trend Chart */}
        <div className="bg-white text-black p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={rupeeTooltipFormatter} />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} name="Sales (₹)" />
                <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-black mb-4">Top Selling Products</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topProducts}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {topProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue by Category Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-black mb-4">Revenue by Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={rupeeTooltipFormatter} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue (₹)" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Acquisition */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-black mb-4">Customer Acquisition</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="customers" stroke="#F59E0B" strokeWidth={2} name="New Customers" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-black mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;