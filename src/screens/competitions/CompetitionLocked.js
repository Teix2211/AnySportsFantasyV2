// src/screens/competitions/CompetitionLocked.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';

const CompetitionLocked = () => {
  const navigation = useNavigation();
  const { theme, isDarkMode } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Icon name="lock-closed" size={80} color={isDarkMode ? '#555' : '#ddd'} />
      
      <Text style={[styles.title, { color: theme.text }]}>
        No Competition Selected
      </Text>
      
      <Text style={[styles.description, { color: theme.textSecondary }]}>
        Please select a competition first to access this feature.
      </Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Competitions')}
      >
        <Text style={styles.buttonText}>Select Competition</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#e10600',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default CompetitionLocked;