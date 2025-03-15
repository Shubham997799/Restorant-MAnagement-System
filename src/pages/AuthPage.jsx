import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const AuthPage = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    restaurantName: '',
    address: '',
    contact: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would make an API call here
    if (isLogin) {
      // Simulate login
      if (formData.email && formData.password) {
        setIsAuthenticated(true);
        toast.success('Login successful!');
      }
    } else {
      // Simulate registration
      if (formData.email && formData.password && formData.restaurantName) {
        setIsAuthenticated(true);
        toast.success('Registration successful!');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />

            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Restaurant Name"
                  className="w-full p-2 border rounded"
                  value={formData.restaurantName}
                  onChange={(e) => setFormData({...formData, restaurantName: e.target.value})}
                />
                
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full p-2 border rounded"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
                
                <input
                  type="tel"
                  placeholder="Contact Number"
                  className="w-full p-2 border rounded"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                />
              </>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;