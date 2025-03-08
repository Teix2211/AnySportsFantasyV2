import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';

const DriverItem = ({ driver, onRemove }) => {
  const { theme } = useTheme();
  
  return (
    <View style={styles.driverItem}>
      <Image 
        source={{ uri: driver.imageUrl || 'https://via.placeholder.com/40?text=F1' }} 
        style={styles.driverImage} 
      />
      <View style={styles.driverInfo}>
        <Text style={[styles.driverName, { color: theme.text }]}>
          {driver.firstName} {driver.lastName}
        </Text>
        <Text style={[styles.driverTeam, { color: theme.textSecondary }]}>
          {driver.team}
        </Text>
      </View>
      <Text style={styles.driverPrice}>${driver.price}M</Text>
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <Icon name="close-circle" size={22} color="#e10600" />
      </TouchableOpacity>
    </View>
  );
};

const SelectedDriversList = ({ drivers, onRemoveDriver }) => {
  const { theme, isDarkMode } = useTheme();
  
  if (drivers.length === 0) {
    return (
      <View style={[styles.emptyContainer, { 
        backgroundColor: theme.card,
        shadowColor: isDarkMode ? '#000' : '#000',
        shadowOpacity: isDarkMode ? 0.3 : 0.1 
      }]}>
        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
          No drivers selected yet
        </Text>
        <Text style={[styles.emptySub, { color: theme.textSecondary }]}>
          Select drivers from the list below
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
      <Text style={[styles.title, { color: theme.text }]}>Selected Drivers</Text>
      
      {/* Render drivers directly instead of using FlatList */}
      {drivers.map((driver, index) => (
        <React.Fragment key={driver.id}>
          <DriverItem 
            driver={driver} 
            onRemove={() => onRemoveDriver(driver)}
          />
          {index < drivers.length - 1 && (
            <View style={[styles.separator, { backgroundColor: theme.border }]} />
          )}
        </React.Fragment>
      ))}
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
  driverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  driverImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  driverInfo: {
    flex: 1,
    marginLeft: 10,
  },
  driverName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  driverTeam: {
    fontSize: 12,
    color: '#666',
  },
  driverPrice: {
    fontWeight: 'bold',
    marginRight: 10,
    color: '#e10600',
  },
  removeButton: {
    padding: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
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

export default SelectedDriversList;