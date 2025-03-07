import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { RESET_TEAM } from '../store/actions/types';
import { fetchUserTeam } from '../store/actions/teamActions';
import { registerUser, loginUser, loadUser } from '../api';

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for stored auth on app start
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const storedToken = await AsyncStorage.getItem('token');
        
        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          
          // Update Redux state
          dispatch({ type: 'SET_USER', payload: userData });
          
          // Fetch this user's team data
          dispatch(fetchUserTeam());
        }
      } catch (e) {
        console.error('Failed to load auth info', e);
      } finally {
        setLoading(false);
      }
    };

    loadStoredAuth();
  }, [dispatch]);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      dispatch({ type: 'AUTH_LOADING' });
      setError(null);
      
      // Make API call to login endpoint
      const response = await loginUser(email, password);
      
      // Store the JWT token
      await AsyncStorage.setItem('token', response.token);
      
      // Fetch user data using the token
      const userData = await loadUser();
      
      // Store user data
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      
      // Update Redux state
      dispatch({ type: 'SET_USER', payload: userData });
      
      // Fetch this user's team
      dispatch(fetchUserTeam());
      
      return true;
    } catch (e) {
      const errorMsg = e.message || 'Invalid credentials';
      setError(errorMsg);
      dispatch({ type: 'AUTH_ERROR', payload: errorMsg });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (username, email, password) => {
    try {
      setLoading(true);
      dispatch({ type: 'AUTH_LOADING' });
      setError(null);
      
      // Make the actual API call to register
      const response = await registerUser({ username, email, password });
      
      // Store the token from the API
      await AsyncStorage.setItem('token', response.token);
      
      // Fetch user data with the token
      const userData = await loadUser();
      
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      // Update Redux state
      dispatch({ type: 'SET_USER', payload: userData });
      
      return true;
    } catch (e) {
      const errorMsg = e.message || 'An error occurred during registration';
      setError(errorMsg);
      dispatch({ type: 'AUTH_ERROR', payload: errorMsg });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      setUser(null);
      
      // Clear auth state in Redux
      dispatch({ type: 'AUTH_LOGOUT' });
      
      // Clear team state in Redux
      dispatch({ type: RESET_TEAM });
      
    } catch (e) {
      console.error('Error during logout', e);
    }
  };

  // Update profile
  const updateProfile = async (updatedData) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedUser = { ...user, ...updatedData };
      
      // Store updated user data
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      
      setUser(updatedUser);
      
      // Update Redux state
      dispatch({ type: 'SET_USER', payload: updatedUser });
      
      return true;
    } catch (e) {
      const errorMsg = 'An error occurred while updating profile: ' + e.message;
      setError(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;