// src/components/team-selection/DriverFilters.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SortOption = ({ title, isActive, onPress, iconName }) => (
  <TouchableOpacity 
    style={[styles.sortOption, isActive && styles.activeSortOption]} 
    onPress={onPress}
  >
    <Icon name={iconName} size={16} color={isActive ? '#fff' : '#666'} />
    <Text style={[styles.sortText, isActive && styles.activeSortText]}>{title}</Text>
  </TouchableOpacity>
);

const DriverFilters = ({ onSortChange }) => {
  const [activeSort, setActiveSort] = useState('price-desc');

  const handleSortChange = (sortOption) => {
    setActiveSort(sortOption);
    onSortChange(sortOption);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sort By:</Text>
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
          title="Form" 
          isActive={activeSort === 'form'} 
          onPress={() => handleSortChange('form')}
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
  activeSortOption: {
    backgroundColor: '#e10600',
  },
  sortText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#666',
  },
  activeSortText: {
    color: '#fff',
  },
});

export default DriverFilters;