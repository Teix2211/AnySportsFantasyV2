import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define theme colors
export const lightTheme = {
  primary: '#e10600', // F1 red
  secondary: '#15151e', // F1 dark
  background: '#f5f5f5',
  card: '#ffffff',
  text: '#333333',
  textSecondary: '#777777',
  border: '#e0e0e0',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
};

export const darkTheme = {
  primary: '#e10600', // F1 red
  secondary: '#15151e', // F1 dark
  background: '#121212',
  card: '#1e1e1e',
  text: '#ffffff',
  textSecondary: '#cccccc',
  border: '#333333',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load theme preference from storage
    const loadThemePreference = async () => {
      try {
        const themePreference = await AsyncStorage.getItem('theme_preference');
        if (themePreference !== null) {
          setIsDarkMode(themePreference === 'dark');
        } else {
          // Use device theme if no stored preference
          setIsDarkMode(deviceTheme === 'dark');
        }
      } catch (e) {
        console.error('Failed to load theme preference', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, [deviceTheme]);

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    try {
      await AsyncStorage.setItem('theme_preference', newMode ? 'dark' : 'light');
    } catch (e) {
      console.error('Failed to save theme preference', e);
    }
  };

  // Get current active theme
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider 
      value={{ 
        isDarkMode, 
        toggleTheme, 
        theme,
        isLoading
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;