import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use your server URL (localhost for development, deployed URL for production)
const API_URL = 'https://anysportsfantasy-api-cde902d6a36d.herokuapp.com/api'; // Use your dev machine's IP

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server error' };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server error' };
  }
};

export const loadUser = async () => {
  try {
    const response = await api.get('/auth');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server error' };
  }
};

// Drivers API
export const fetchDrivers = async (season = '2024') => {
  try {
    const response = await api.get(`/drivers?season=${season}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server error' };
  }
};

export const fetchDriverById = async (id) => {
  try {
    const response = await api.get(`/drivers/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server error' };
  }
};

// Constructors API
// src/api/index.js
export const fetchConstructors = async (season = '2024') => {
  try {
    console.log('Fetching constructors from:', `${API_URL}/constructors?season=${season}`);
    const response = await api.get(`/constructors?season=${season}`);
    console.log('Constructors API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching constructors:', 
      error.response?.data || error.message);
    // Return empty array instead of throwing error
    return [];
  }
};

// Team API
export const fetchUserTeam = async () => {
  try {
    const response = await api.get('/teams/user');
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null; // No team found, return null
    }
    throw error.response?.data || { message: 'Server error' };
  }
};

export const saveTeam = async (teamData) => {
  try {
    const response = await api.post('/teams', teamData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server error' };
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    console.log('Sending password change request to:', `${API_URL}/auth/password`);
    const response = await api.put('/auth/password', { 
      currentPassword, 
      newPassword 
    });
    console.log('Password change response:', response);
    return response.data;
  } catch (error) {
    console.error('Password change error details:', error);
    throw error.response?.data || { message: 'Server error: ' + error.message };
  }
};

// More API functions as needed...

export default api;