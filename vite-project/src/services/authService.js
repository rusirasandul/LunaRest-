import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; // Adjust this to your backend URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // Important for cookies/session
});

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

export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
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

export const logout = () => {
    localStorage.removeItem('token');
};

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