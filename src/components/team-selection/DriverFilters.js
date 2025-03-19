// src/components/team-selection/DriverFilters.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';

const SortOption = ({ title, isActive, onPress, iconName }) => {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[
        styles.sortOption, 
        { backgroundColor: isDarkMode ? (isActive ? theme.primary : '#2c2c2c') : (isActive ? theme.primary : '#f5f5f5') },
      ]} 
      onPress={onPress}
    >
      <Icon 
        name={iconName} 
        size={16} 
        color={isActive ? '#fff' : (isDarkMode ? '#aaa' : '#666')} 
      />
      <Text 
        style={[
          styles.sortText, 
          { color: isActive ? '#fff' : (isDarkMode ? '#aaa' : '#666') }
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const DriverFilters = ({ onSortChange }) => {
  const { theme, isDarkMode } = useTheme();
  const [activeSort, setActiveSort] = useState('price-desc');

  const handleSortChange = (sortOption) => {
    setActiveSort(sortOption);
    onSortChange(sortOption);
  };

  return (
    <View style={[styles.container, { 
      backgroundColor: theme.card,
      shadowColor: isDarkMode ? '#000' : '#000',
      shadowOpacity: isDarkMode ? 0.3 : 0.1 
    }]}>
      <Text style={[styles.title, { color: theme.text }]}>Sort By:</Text>
      <View style={styles.sortOptions}>
        <SortOption 
          title="Price ↑" 
          isActive={activeSort === 'price-asc'} 
          onPress={() => handleSortChange('price-asc')}
          iconName="trending-up"
        />
        <SortOption 
          title="Price ↓" 
          isActive={activeSort === 'price-desc'} 
          onPress={() => handleSortChange('price-desc')}
          iconName="trending-down"
        />
        <SortOption 
          title="Points" 
          isActive={activeSort === 'points'} 
          onPress={() => handleSortChange('points')}
          iconName="podium"
        />
        <SortOption 
          title="ELO" 
          isActive={activeSort === 'ELO'} 
          onPress={() => handleSortChange('ELO')}
          iconName="speedometer"
        />
      </View>
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
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sortOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  sortText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#666',
  },
});

export default DriverFilters;