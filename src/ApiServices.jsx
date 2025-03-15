import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Ensure this matches backend URL

// Function to get the auth token from local storage
const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Axios instance with Authorization header
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Function to fetch menu items with search query
export const searchMenuItems = async (query) => {
    try {
        const response = await apiClient.get(`/menu/search?query=${query}`);
        return response.data;
    } catch (error) {
        console.error('Error searching menu items:', error.response?.data || error.message);
        return [];
    }
};

// User Signup
export const signupUser = async (userData) => {
    try {
        if (!userData.email || !userData.password) {
            throw new Error('Email and password are required');
        }
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        return response.data;
    } catch (error) {
        console.error('Signup failed:', error.response?.data || error.message);
        return null;
    }
};

// User Login (Only if user is registered)
export const loginUser = async (credentials) => {
    try {
        if (!credentials.email || !credentials.password) {
            throw new Error('Email and password are required');
        }
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        return null;
    }
};

// Other API methods remain unchanged...
