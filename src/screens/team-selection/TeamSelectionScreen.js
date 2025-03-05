// src/screens/team-selection/TeamSelectionScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

// Import components
import DriverCard from '../../components/drivers/DriverCard';
import TeamBudgetBar from '../../components/team-selection/TeamBudgetBar';
import TeamNameInput from '../../components/team-selection/TeamNameInput';
import SelectedDriversList from '../../components/team-selection/SelectedDriversList';
import DriverFilters from '../../components/team-selection/DriverFilters';

// Import actions
import { fetchDrivers, selectDriver, removeDriver } from '../../store/actions/driverActions';
import { setTeamName, saveTeam } from '../../store/actions/teamActions';

// Import constants
import { TEAM_BUDGET, MAX_DRIVERS } from '../../constants';

const TeamSelectionScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  
  // Redux state
  const { drivers, loading: driversLoading } = useSelector(state => state.drivers);
  const { selectedDrivers, teamName, teamSaved } = useSelector(state => state.team);
  
  // Local state
  const [displayDrivers, setDisplayDrivers] = useState([]);
  const [remainingBudget, setRemainingBudget] = useState(TEAM_BUDGET);
  const [sortOption, setSortOption] = useState('price-desc');
  
  // Fetch drivers on mount
  useEffect(() => {
    dispatch(fetchDrivers());
  }, [dispatch]);
  
  // Update display drivers when drivers change or sort option changes
  useEffect(() => {
    if (drivers.length > 0) {
      const sortedDrivers = [...drivers].sort((a, b) => {
        switch (sortOption) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'points':
            return b.points - a.points;
          case 'form':
            return b.form - a.form;
          default:
            return b.price - a.price;
        }
      });
      
      setDisplayDrivers(sortedDrivers);
    }
  }, [drivers, sortOption]);
  
  // Calculate remaining budget when selected drivers change
  useEffect(() => {
    const totalCost = selectedDrivers.reduce((sum, driver) => sum + driver.price, 0);
    setRemainingBudget(parseFloat((TEAM_BUDGET - totalCost).toFixed(1)));
  }, [selectedDrivers]);
  
  // Handle driver selection
  const handleDriverSelection = (driver) => {
    const isSelected = selectedDrivers.some(d => d.id === driver.id);
    
    if (isSelected) {
      dispatch(removeDriver(driver));
    } else {
      // Check if team is full
      if (selectedDrivers.length >= MAX_DRIVERS) {
        Alert.alert(
          'Team Full',
          `You can only select ${MAX_DRIVERS} drivers.`,
          [{ text: 'OK' }]
        );
        return;
      }
      
      // Check if enough budget
      if (remainingBudget < driver.price) {
        Alert.alert(
          'Budget Exceeded',
          'You don\'t have enough budget to add this driver.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      dispatch(selectDriver(driver));
    }
  };
  
  // Handle team name change
  const handleTeamNameChange = (name) => {
    dispatch(setTeamName(name));
  };
  
  // Handle saving team
  const handleSaveTeam = () => {
    // Validate team
    if (selectedDrivers.length < MAX_DRIVERS) {
      Alert.alert(
        'Incomplete Team',
        `You need to select ${MAX_DRIVERS} drivers.`,
        [{ text: 'OK' }]
      );
      return;
    }
    
    if (!teamName.trim()) {
      Alert.alert(
        'Team Name Required',
        'Please enter a name for your team.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    // Save team
    dispatch(saveTeam());
    
    Alert.alert(
      'Team Saved',
      'Your fantasy F1 team has been saved successfully!',
      [{ text: 'OK' }]
    );
  };
  
  // Handle driver details view
  const handleViewDriverDetails = (driverId) => {
    navigation.navigate('DriverDetail', { driverId });
  };
  
  // Show loading indicator while fetching drivers
  if (driversLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e10600" />
        <Text style={styles.loadingText}>Loading drivers...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Build Your F1 Dream Team</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        {/* Budget Bar */}
        <TeamBudgetBar 
          budget={remainingBudget}
          maxBudget={TEAM_BUDGET}
          driverCount={selectedDrivers.length}
          maxDrivers={MAX_DRIVERS}
        />
        
        {/* Team Name Input */}
        <TeamNameInput 
          value={teamName}
          onChangeText={handleTeamNameChange}
        />
        
        {/* Selected Drivers List */}
        <SelectedDriversList 
          drivers={selectedDrivers}
          onRemoveDriver={handleDriverSelection}
        />
        
        {/* Sorting Controls */}
        <DriverFilters onSortChange={setSortOption} />
        
        {/* Available Drivers List */}
        <Text style={styles.sectionTitle}>Available Drivers</Text>
        {displayDrivers.map(driver => (
          <DriverCard 
            key={driver.id}
            driver={driver}
            isSelected={selectedDrivers.some(d => d.id === driver.id)}
            onPress={() => handleDriverSelection(driver)}
            onViewDetails={() => handleViewDriverDetails(driver.id)}
          />
        ))}
      </ScrollView>
      
      {/* Save Team Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.saveButton, 
            (selectedDrivers.length < MAX_DRIVERS || !teamName.trim()) && styles.saveButtonDisabled
          ]}
          onPress={handleSaveTeam}
          disabled={selectedDrivers.length < MAX_DRIVERS || !teamName.trim()}
        >
          <Icon name="save-outline" size={20} color="#fff" style={styles.saveIcon} />
          <Text style={styles.saveButtonText}>
            {teamSaved ? 'Team Saved' : 'Save Team'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: '#e10600',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContainer: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 15,
    elevation: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  saveButton: {
    backgroundColor: '#e10600',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#999',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveIcon: {
    marginRight: 8,
  },
});

export default TeamSelectionScreen;