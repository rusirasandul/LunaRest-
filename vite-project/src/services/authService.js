import axios from 'axios';

// Base URL for API calls
const API_URL = 'http://localhost:8080/api/auth';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Important for cookies/session
});

// Register a new user
export const register = async (firstName, lastName, email, password) => {
  try {
    const response = await api.post('/register', {
      firstName,
      lastName,
      email,
      password
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Registration failed. Please try again.'
    };
  }
};

// Login user
export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    
    // Store token in localStorage if your backend returns one
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Login failed. Please check your credentials.'
    };
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
  // You might also want to call an API endpoint to invalidate the token on the server
};

// Get current authenticated user
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { success: false, error: 'No authentication token found' };
    }
    
    const response = await api.get('/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to get user information'
    };
  }
}; 