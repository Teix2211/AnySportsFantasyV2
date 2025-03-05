// src/components/team-selection/SelectedDriversList.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DriverItem = ({ driver, onRemove }) => (
  <View style={styles.driverItem}>
    <Image 
      source={{ uri: driver.imageUrl || 'https://via.placeholder.com/40?text=F1' }} 
      style={styles.driverImage} 
    />
    <View style={styles.driverInfo}>
      <Text style={styles.driverName}>{driver.firstName} {driver.lastName}</Text>
      <Text style={styles.driverTeam}>{driver.team}</Text>
    </View>
    <Text style={styles.driverPrice}>${driver.price}M</Text>
    <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
      <Icon name="close-circle" size={22} color="#e10600" />
    </TouchableOpacity>
  </View>
);

const SelectedDriversList = ({ drivers, onRemoveDriver }) => {
  if (drivers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No drivers selected yet</Text>
        <Text style={styles.emptySub}>Select drivers from the list below</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selected Drivers</Text>
      <FlatList
        data={drivers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DriverItem 
            driver={item} 
            onRemove={() => onRemoveDriver(item)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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