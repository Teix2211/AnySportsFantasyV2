// src/components/team-selection/TeamNameInput.js
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const TeamNameInput = ({ value, onChangeText, maxLength = 25 }) => {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <View style={[styles.container, { 
      backgroundColor: theme.card,
      shadowColor: isDarkMode ? '#000' : '#000',
      shadowOpacity: isDarkMode ? 0.3 : 0.1 
    }]}>
      <Text style={[styles.label, { color: theme.text }]}>Team Name</Text>
      <TextInput
        style={[styles.input, { 
          borderColor: theme.border,
          backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
          color: theme.text 
        }]}
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter your team name"
        placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
        maxLength={maxLength}
      />
      <Text style={[styles.counter, { color: theme.textSecondary }]}>{value.length}/{maxLength}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  counter: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});

export default TeamNameInput;