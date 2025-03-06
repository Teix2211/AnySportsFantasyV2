// src/components/team-selection/SelectedConstructor.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';

const SelectedConstructor = ({ constructor, onRemove }) => {
  const { theme, isDarkMode } = useTheme();
  
  if (!constructor) {
    return (
      <View style={[styles.emptyContainer, { 
        backgroundColor: theme.card,
        shadowColor: isDarkMode ? '#000' : '#000',
        shadowOpacity: isDarkMode ? 0.3 : 0.1 
      }]}>
        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
          No constructor selected
        </Text>
        <Text style={[styles.emptySub, { color: theme.textSecondary }]}>
          Select a constructor from the list below
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { 
      backgroundColor: theme.card,
      shadowColor: isDarkMode ? '#000' : '#000',
      shadowOpacity: isDarkMode ? 0.3 : 0.1 
    }]}>
      <Text style={[styles.title, { color: theme.text }]}>Selected Constructor</Text>
      
      <View style={styles.constructorContent}>
        <View style={[styles.colorBar, { backgroundColor: constructor.color || '#e10600' }]} />
        
        <Image 
          source={{ uri: constructor.logoUrl }} 
          style={styles.constructorLogo} 
        />
        
        <View style={styles.constructorInfo}>
          <Text style={[styles.constructorName, { color: theme.text }]}>
            {constructor.name}
          </Text>
          <Text style={[styles.constructorDrivers, { color: theme.textSecondary }]}>
            {constructor.drivers.join(' • ')}
          </Text>
          <View style={styles.statsRow}>
            <Text style={[styles.statItem, { color: theme.textSecondary }]}>
              Points: <Text style={{ fontWeight: 'bold', color: isDarkMode ? '#fff' : '#333' }}>{constructor.points}</Text>
            </Text>
            <Text style={[styles.statItem, { color: theme.textSecondary }]}>
              Form: <Text style={{ fontWeight: 'bold', color: isDarkMode ? '#fff' : '#333' }}>{constructor.form}/10</Text>
            </Text>
          </View>
        </View>
        
        <Text style={styles.constructorPrice}>${constructor.price}M</Text>
        
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <Icon name="close-circle" size={22} color="#e10600" />
        </TouchableOpacity>
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  constructorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
  },
  colorBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: '#e10600',
  },
  constructorLogo: {
    width: 50,
    height: 50,
    marginLeft: 5,
    resizeMode: 'contain',
  },
  constructorInfo: {
    flex: 1,
    marginLeft: 10,
  },
  constructorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  constructorDrivers: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  statItem: {
    fontSize: 12,
    color: '#666',
    marginRight: 10,
  },
  constructorPrice: {
    fontWeight: 'bold',
    marginRight: 10,
    color: '#e10600',
  },
  removeButton: {
    padding: 5,
  },
  emptyContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 25,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 5,
  },
  emptySub: {
    fontSize: 14,
    color: '#999',
  },
});

export default SelectedConstructor;