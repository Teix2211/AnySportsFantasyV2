import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const DriverDetailHeader = ({ driver }) => {
  const { theme } = useTheme();
  
  if (!driver) return null;
  
  return (
    <View style={styles.header}>
      <Image 
        source={{ uri: driver.imageUrl || 'https://via.placeholder.com/150?text=F1' }} 
        style={styles.driverImage} 
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{driver.firstName} {driver.lastName}</Text>
        <Text style={styles.team}>{driver.team}</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Points</Text>
            <Text style={styles.statValue}>{driver.points}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Price</Text>
            <Text style={styles.statValue}>${driver.price}M</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Form</Text>
            <Text style={styles.statValue}>{driver.form}/10</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e10600',
    padding: 20,
    alignItems: 'center',
  },
  driverImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'white',
    marginBottom: 15,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  team: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 5,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  statLabel: {
    color: 'white',
    opacity: 0.8,
    fontSize: 12,
    marginBottom: 3,
  },
  statValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default DriverDetailHeader;