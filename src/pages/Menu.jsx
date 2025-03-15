import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const MENU_SECTIONS = [
  { id: 'veg', name: 'Vegetarian' },
  { id: 'nonveg', name: 'Non-Vegetarian' },
  { id: 'starters', name: 'Starters' },
  { id: 'maincourse', name: 'Main Course' },
  { id: 'rice', name: 'Rice' },
  { id: 'roti', name: 'Roti' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'desserts', name: 'Desserts' }
];

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    section: '',
    type: 'veg'
  });

  const handleAddItem = (e) => {
    e.preventDefault();
    const item = {
      id: Date.now(),
      ...newItem
    };
    setMenuItems([...menuItems, item]);
    setNewItem({ name: '', price: '', section: '', type: 'veg' });
    setShowAddItem(false);
    toast.success('Menu item added successfully!');
  };

  const handleDeleteItem = (itemId) => {
    setMenuItems(menuItems.filter(item => item.id !== itemId));
    toast.success('Menu item deleted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <button
          onClick={() => setShowAddItem(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Item
        </button>
      </div>

      {MENU_SECTIONS.map(section => (
        <div key={section.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{section.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems
              .filter(item => item.section === section.id)
              .map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <span className={`px-2 py-1 rounded text-sm ${
                      item.type === 'veg' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">₹{item.price}</p>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </motion.div>
              ))}
          </div>
        </div>
      ))}

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-lg w-96"
          >
            <h2 className="text-xl font-bold mb-4">Add New Menu Item</h2>
            <form onSubmit={handleAddItem}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="mt-1 w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  className="mt-1 w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Section</label>
                <select
                  value={newItem.section}
                  onChange={(e) => setNewItem({...newItem, section: e.target.value})}
                  className="mt-1 w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Section</option>
                  {MENU_SECTIONS.map(section => (
                    <option key={section.id} value={section.id}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={newItem.type}
                  onChange={(e) => setNewItem({...newItem, type: e.target.value})}
                  className="mt-1 w-full p-2 border rounded"
                  required
                >
                  <option value="veg">Vegetarian</option>
                  <option value="nonveg">Non-Vegetarian</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddItem(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Item
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Menu;