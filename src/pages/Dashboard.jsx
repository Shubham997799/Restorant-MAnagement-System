import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FaTable, FaUtensils, FaUser } from 'react-icons/fa';

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'Sample Restaurant',
    todaySales: 0,
    activeOrders: 0
  });

  useEffect(() => {
    // Simulate fetching sales data
    const mockSalesData = [
      { date: '2024-03-01', sales: 4500 },
      { date: '2024-03-02', sales: 5200 },
      { date: '2024-03-03', sales: 4800 },
      { date: '2024-03-04', sales: 6000 },
      { date: '2024-03-05', sales: 5500 }
    ];
    setSalesData(mockSalesData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <nav className="bg-white shadow-lg p-4 mb-6 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{restaurantInfo.name}</h1>
          <div className="flex gap-4">
            <Link to="/tables" className="flex items-center gap-2 hover:text-blue-600">
              <FaTable /> Tables
            </Link>
            <Link to="/menu" className="flex items-center gap-2 hover:text-blue-600">
              <FaUtensils /> Menu
            </Link>
            <Link to="/profile" className="flex items-center gap-2 hover:text-blue-600">
              <FaUser /> Profile
            </Link>
          </div>
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Today's Sales</h3>
          <p className="text-3xl font-bold">₹{restaurantInfo.todaySales}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Active Orders</h3>
          <p className="text-3xl font-bold">{restaurantInfo.activeOrders}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Sales Trend</h2>
        <div className="w-full h-[400px]">
          <LineChart
            width={800}
            height={400}
            data={salesData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;