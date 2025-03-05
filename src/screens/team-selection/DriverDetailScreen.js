// src/screens/team-selection/DriverDetailScreen.js
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

// Import actions
import { selectDriver, removeDriver } from '../../store/actions/driverActions';

// Import constants
import { TEAM_BUDGET, MAX_DRIVERS } from '../../constants';

const DriverDetailScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const driverId = route.params?.driverId;
  
  // Redux state
  const { drivers } = useSelector(state => state.drivers);
  const { selectedDrivers } = useSelector(state => state.team);
  
  // Local state
  const [driver, setDriver] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [canAddToTeam, setCanAddToTeam] = useState(false);
  
  // Get driver details
  useEffect(() => {
    const driverDetails = drivers.find(d => d.id === driverId);
    if (driverDetails) {
      setDriver(driverDetails);
      
      // Check if driver is already in team
      const selected = selectedDrivers.some(d => d.id === driverId);
      setIsSelected(selected);
      
      // Check if driver can be added to team
      if (!selected) {
        const totalCost = selectedDrivers.reduce((sum, d) => sum + d.price, 0);
        const remainingBudget = TEAM_BUDGET - totalCost;
        
        setCanAddToTeam(
          selectedDrivers.length < MAX_DRIVERS && 
          driverDetails.price <= remainingBudget
        );
      }
    }
  }, [driverId, drivers, selectedDrivers]);
  
  // Handle add/remove driver
  const handleDriverSelection = () => {
    if (isSelected) {
      dispatch(removeDriver(driver));
    } else if (canAddToTeam) {
      dispatch(selectDriver(driver));
    }
    
    // Navigate back to team selection
    navigation.goBack();
  };
  
  if (!driver) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading driver details...</Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      {/* Header with driver info */}
      <View style={styles.header}>
        <Image 
          source={{ uri: driver.imageUrl }} 
          style={styles.driverImage} 
        />
        <Text style={styles.driverName}>{driver.firstName} {driver.lastName}</Text>
        <Text style={styles.driverTeam}>{driver.team}</Text>
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>${driver.price}M</Text>
        </View>
      </View>
      
      {/* Stats section */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Season Statistics</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{driver.points}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{driver.form}/10</Text>
            <Text style={styles.statLabel}>Form</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>13</Text>
            <Text style={styles.statLabel}>Races</Text>
          </View>
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{Math.floor(driver.points / 25)}</Text>
            <Text style={styles.statLabel}>Wins</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{Math.floor(driver.points / 15)}</Text>
            <Text style={styles.statLabel}>Podiums</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{Math.floor(Math.random() * 5)}</Text>
            <Text style={styles.statLabel}>DNFs</Text>
          </View>
        </View>
      </View>
      
      {/* Performance Trends */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Performance</Text>
        <Text style={styles.performanceText}>
          {driver.firstName} {driver.lastName} has been {driver.form > 7 ? 'performing well' : 'struggling'} recently,
          with {driver.form > 7 ? 'strong' : 'inconsistent'} results in the last few races.
          Based on current form, this driver is {driver.form > 8 ? 'an excellent choice' : 
          driver.form > 6 ? 'a solid choice' : 'a risky choice'} for your team.
        </Text>
      </View>
      
      {/* Value Assessment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Value Assessment</Text>
        <View style={styles.valueContainer}>
          <View style={styles.valueBar}>
            <View 
              style={[
                styles.valueIndicator, 
                { width: `${Math.min((driver.points / driver.price) / 15 * 100, 100)}%` }
              ]} 
            />
          </View>
          <Text style={styles.valueText}>
            {driver.points / driver.price > 10 ? 'Excellent value' : 
            driver.points / driver.price > 7 ? 'Good value' : 'Average value'}
          </Text>
        </View>
      </View>
      
      {/* Add/Remove button */}
      <TouchableOpacity 
        style={[
          styles.actionButton,
          isSelected ? styles.removeButton : 
          !canAddToTeam && !isSelected ? styles.disabledButton : styles.addButton
        ]}
        onPress={handleDriverSelection}
        disabled={!isSelected && !canAddToTeam}
      >
        <Icon 
          name={isSelected ? 'remove-circle-outline' : 'add-circle-outline'} 
          size={24} 
          color="#fff" 
          style={styles.actionIcon} 
        />
        <Text style={styles.actionButtonText}>
          {isSelected ? 'Remove from Team' : 
           !canAddToTeam && !isSelected ? 'Cannot Add (Budget/Limit)' : 'Add to Team'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#e10600',
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
    position: 'relative',
  },
  driverImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'white',
    marginBottom: 10,
  },
  driverName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  driverTeam: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  priceTag: {
    position: 'absolute',
    right: 20,
    top: 40,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  priceText: {
    color: '#e10600',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statsContainer: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e10600',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  performanceText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  valueContainer: {
    marginTop: 10,
  },
  valueBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  valueIndicator: {
    height: '100%',
    backgroundColor: '#e10600',
    borderRadius: 4,
  },
  valueText: {
    fontSize: 15,
    color: '#333',
  },
  actionButton: {
    margin: 15,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    marginBottom: 30,
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
  removeButton: {
    backgroundColor: '#e10600',
  },
  disabledButton: {
    backgroundColor: '#999',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionIcon: {
    marginRight: 10,
  },
});

export default DriverDetailScreen;