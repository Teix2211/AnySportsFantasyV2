import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use your server URL (localhost for development, deployed URL for production)
const API_URL = 'http://192.168.1.100:5000/api'; // Use your dev machine's IP

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
export const fetchConstructors = async (season = '2024') => {
  try {
    const response = await api.get(`/constructors?season=${season}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server error' };
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

// More API functions as needed...

export default api;