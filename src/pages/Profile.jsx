import { useState } from 'react';
import { toast } from 'react-toastify';

const Profile = () => {
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'Sample Restaurant',
    address: '123 Main St',
    contact: '1234567890',
    email: 'sample@restaurant.com'
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleInfoUpdate = (e) => {
    e.preventDefault();
    // In a real app, you would make an API call here
    toast.success('Restaurant information updated successfully!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      toast.error('New passwords do not match!');
      return;
    }
    // In a real app, you would make an API call here
    setPassword({ current: '', new: '', confirm: '' });
    toast.success('Password updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Restaurant Profile</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Restaurant Information</h2>
          <form onSubmit={handleInfoUpdate}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
                <input
                  type="text"
                  value={restaurantInfo.name}
                  onChange={(e) => setRestaurantInfo({...restaurantInfo, name: e.target.value})}
                  className="mt-1 w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  value={restaurantInfo.address}
                  onChange={(e) => setRestaurantInfo({...restaurantInfo, address: e.target.value})}
                  className="mt-1 w-full p-2 border rounded"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  type="tel"
                  value={restaurantInfo.contact}
                  onChange={(e) => setRestaurantInfo({...restaurantInfo, contact: e.target.value})}
                  className="mt-1 w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={restaurantInfo.email}
                  onChange={(e) => setRestaurantInfo({...restaurantInfo, email: e.target.value})}
                  className="mt-1 w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Update Information
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form onSubmit={handlePasswordChange}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  value={password.current}
                  onChange={(e) => setPassword({...password, current: e.target.value})}
                  className="mt-1 w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  value={password.new}
                  onChange={(e) => setPassword({...password, new: e.target.value})}
                  className="mt-1 w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  value={password.confirm}
                  onChange={(e) => setPassword({...password, confirm: e.target.value})}
                  className="mt-1 w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;