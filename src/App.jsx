import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Tables from './pages/Tables';
import Menu from './pages/Menu';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'Sample Restaurant',
    address: '123 Main St',
    contact: '1234567890',
    email: 'sample@restaurant.com'
  });

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <ToastContainer 
          position="top-right" 
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
        {isAuthenticated && <Navbar restaurantName={restaurantInfo.name} />}
        
        <div className={`${isAuthenticated ? 'pt-20' : ''}`}>
          <Routes>
            <Route 
              path="/" 
              element={
                !isAuthenticated ? (
                  <AuthPage setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard restaurantInfo={restaurantInfo} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tables" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Tables />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/menu" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Menu />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile 
                    restaurantInfo={restaurantInfo}
                    setRestaurantInfo={setRestaurantInfo}
                  />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;