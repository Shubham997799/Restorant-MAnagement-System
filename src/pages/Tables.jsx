import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import OrderModal from '../components/OrderModal';

const SAMPLE_MENU_ITEMS = [
  { id: 1, name: 'Butter Chicken', price: 320, section: 'maincourse', type: 'nonveg' },
  { id: 2, name: 'Paneer Tikka', price: 280, section: 'starters', type: 'veg' },
  { id: 3, name: 'Veg Biryani', price: 250, section: 'rice', type: 'veg' },
  { id: 4, name: 'Chicken Biryani', price: 300, section: 'rice', type: 'nonveg' },
  { id: 5, name: 'Butter Naan', price: 40, section: 'roti', type: 'veg' },
  { id: 6, name: 'Masala Dosa', price: 120, section: 'starters', type: 'veg' },
  { id: 7, name: 'Cold Coffee', price: 80, section: 'beverages', type: 'veg' },
  { id: 8, name: 'Gulab Jamun', price: 60, section: 'desserts', type: 'veg' },
];

const Tables = () => {
  const [tables, setTables] = useState([]);
  const [showAddTable, setShowAddTable] = useState(false);
  const [newTable, setNewTable] = useState({ number: '', capacity: '' });
  const [selectedTable, setSelectedTable] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const handleAddTable = (e) => {
    e.preventDefault();
    const table = {
      id: Date.now(),
      number: newTable.number,
      capacity: newTable.capacity,
      status: 'available',
      orders: []
    };
    setTables([...tables, table]);
    setNewTable({ number: '', capacity: '' });
    setShowAddTable(false);
    toast.success('Table added successfully!');
  };

  const handleDeleteTable = (tableId) => {
    setTables(tables.filter(table => table.id !== tableId));
    toast.success('Table deleted successfully!');
  };

  const handleOpenOrderModal = (table) => {
    setSelectedTable(table);
    setShowOrderModal(true);
  };

  const handleCloseOrderModal = () => {
    setSelectedTable(null);
    setShowOrderModal(false);
  };

  const handleSaveOrder = (order) => {
    const updatedTables = tables.map(table => {
      if (table.id === selectedTable.id) {
        return {
          ...table,
          orders: [...table.orders, order],
          status: 'occupied'
        };
      }
      return table;
    });
    setTables(updatedTables);
    setShowOrderModal(false);
    toast.success('Order added successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tables Management</h1>
        <button
          onClick={() => setShowAddTable(true)}
          className="button-primary"
        >
          Add New Table
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tables.map(table => (
          <motion.div
            key={table.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-soft p-6 card-hover"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Table {table.number}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                table.status === 'available' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {table.status}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-gray-600">Capacity: {table.capacity} persons</p>
              <p className="text-gray-600">
                Orders: {table.orders.length}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleOpenOrderModal(table)}
                className="flex-1 button-primary"
              >
                Add Order
              </button>
              <button
                onClick={() => handleDeleteTable(table.id)}
                className="flex-1 button-secondary text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Table Modal */}
      {showAddTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-lg w-96"
          >
            <h2 className="text-2xl font-bold mb-4">Add New Table</h2>
            <form onSubmit={handleAddTable}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Table Number
                </label>
                <input
                  type="text"
                  value={newTable.number}
                  onChange={(e) => setNewTable({...newTable, number: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity
                </label>
                <input
                  type="number"
                  value={newTable.capacity}
                  onChange={(e) => setNewTable({...newTable, capacity: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTable(false)}
                  className="button-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="button-primary"
                >
                  Add Table
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Order Modal */}
      {showOrderModal && selectedTable && (
        <OrderModal
          table={selectedTable}
          onClose={handleCloseOrderModal}
          onSave={handleSaveOrder}
          menuItems={SAMPLE_MENU_ITEMS}
        />
      )}
    </div>
  );
};

export default Tables;