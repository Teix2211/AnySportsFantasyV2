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
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

// Import components
import DriverCard from '../../components/drivers/DriverCard';
import ConstructorCard from '../../components/constructors/ConstructorCard';
import TeamBudgetBar from '../../components/team-selection/TeamBudgetBar';
import TeamNameInput from '../../components/team-selection/TeamNameInput';
import SelectedDriversList from '../../components/team-selection/SelectedDriversList';
import SelectedConstructor from '../../components/team-selection/SelectedConstructor';
import DriverFilters from '../../components/team-selection/DriverFilters';
import SegmentedControl from '../../components/common/SegmentedControl';

// Import actions
import { fetchDrivers, selectDriver, removeDriver } from '../../store/actions/driverActions';
import { fetchConstructors, selectConstructor, removeConstructor } from '../../store/actions/constructorActions';
import { setTeamName, saveTeam, fetchUserTeam } from '../../store/actions/teamActions';

// Import constants
import { TEAM_BUDGET, MAX_DRIVERS, MAX_CONSTRUCTORS } from '../../constants';

const TeamSelectionScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { theme, isDarkMode } = useTheme();
  const { user } = useAuth();
  
  // Redux state
  const { drivers, loading: driversLoading } = useSelector(state => state.drivers);
  const { constructors, loading: constructorsLoading } = useSelector(state => state.constructors || { constructors: [], loading: false });
  const { selectedDrivers, selectedConstructor, teamName, teamSaved, userTeam } = useSelector(state => state.team);
  
  // Local state
  const [displayDrivers, setDisplayDrivers] = useState([]);
  const [displayConstructors, setDisplayConstructors] = useState([]);
  const [remainingBudget, setRemainingBudget] = useState(TEAM_BUDGET);
  const [sortOption, setSortOption] = useState('price-desc');
  const [selectionTab, setSelectionTab] = useState(0); // 0 = drivers, 1 = constructors
  
  // Fetch data on mount and when user changes
  useEffect(() => {
    dispatch(fetchDrivers());
    dispatch(fetchConstructors());
    dispatch(fetchUserTeam());
  }, [dispatch, user?.id]);
  
  // If user has a team, load it into the editor
  useEffect(() => {
    if (userTeam && userTeam.name) {
      // Set team name
      dispatch(setTeamName(userTeam.name));
      
      // Add each driver to selection (if not already there)
      if (selectedDrivers.length === 0 && userTeam.drivers && userTeam.drivers.length > 0) {
        userTeam.drivers.forEach(driver => {
          if (!selectedDrivers.some(d => d.id === driver.id)) {
            dispatch(selectDriver(driver));
          }
        });
      }
      
      // Add constructor if exists and not already selected
      if (!selectedConstructor && userTeam.constructor) {
        dispatch(selectConstructor(userTeam.constructor));
      }
    }
  }, [userTeam, dispatch, selectedDrivers, selectedConstructor]);
  
  // Update display drivers when drivers change or sort option changes
  useEffect(() => {
    if (drivers && drivers.length > 0) {
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
  
  // Update display constructors when constructors change or sort option changes
  useEffect(() => {
    if (constructors && constructors.length > 0) {
      const sortedConstructors = [...constructors].sort((a, b) => {
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
      
      setDisplayConstructors(sortedConstructors);
    } else {
      console.log('No constructors data available');
    }
  }, [constructors, sortOption]);

  useEffect(() => {
    console.log('Constructor state:', constructors);
  }, [constructors]);
  
  // Calculate remaining budget when selected drivers or constructor changes
  useEffect(() => {
    const driversCost = selectedDrivers.reduce((sum, driver) => sum + driver.price, 0);
    const constructorCost = selectedConstructor ? selectedConstructor.price : 0;
    setRemainingBudget(parseFloat((TEAM_BUDGET - driversCost - constructorCost).toFixed(1)));
  }, [selectedDrivers, selectedConstructor]);
  
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
  
  // Handle constructor selection
  const handleConstructorSelection = (constructor) => {
    const isSelected = selectedConstructor && selectedConstructor.id === constructor.id;
    
    if (isSelected) {
      dispatch(removeConstructor());
    } else {
      // Check if already have a constructor
      if (selectedConstructor) {
        Alert.alert(
          'Constructor Already Selected',
          'You can only select one constructor. Remove the current one first.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      // Check if enough budget
      if (remainingBudget < constructor.price) {
        Alert.alert(
          'Budget Exceeded',
          'You don\'t have enough budget to add this constructor.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      dispatch(selectConstructor(constructor));
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
    
    if (!selectedConstructor) {
      Alert.alert(
        'Constructor Required',
        'You need to select a constructor for your team.',
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
  
  // Handle constructor details view
  const handleViewConstructorDetails = (constructorId) => {
    // You would need to create a ConstructorDetailScreen
    // navigation.navigate('ConstructorDetail', { constructorId });
    
    // For now, just show basic info
    const constructor = constructors.find(c => c.id === constructorId);
    if (constructor) {
      Alert.alert(
        constructor.name,
        `Drivers: ${constructor.drivers.join(', ')}\nPoints: ${constructor.points}\nForm: ${constructor.form}/10\nPrice: $${constructor.price}M`
      );
    }
  };
  
  // Show loading indicator while fetching data
  if ((driversLoading || constructorsLoading) && 
      displayDrivers.length === 0 && 
      displayConstructors.length === 0) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color="#e10600" />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Loading team data...</Text>
      </View>
    );
  }
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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
          constructorCount={selectedConstructor ? 1 : 0}
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
        
        {/* Selected Constructor */}
        <SelectedConstructor 
          constructor={selectedConstructor}
          onRemove={() => dispatch(removeConstructor())}
        />
        
        {/* Sorting Controls */}
        <DriverFilters onSortChange={setSortOption} />
        
        {/* Tab selector for Drivers/Constructors */}
        <View style={[styles.tabContainer, { backgroundColor: theme.card }]}>
          <SegmentedControl
            values={['Drivers', 'Constructors']}
            selectedIndex={selectionTab}
            onChange={setSelectionTab}
          />
        </View>
        
        {/* Available Drivers or Constructors based on selected tab */}
        {selectionTab === 0 ? (
          // Drivers Tab
          <>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Available Drivers</Text>
            {displayDrivers.map(driver => (
              <DriverCard 
              key={drivers._id}
                driver={driver}
                isSelected={selectedDrivers.some(d => d.id === driver.id)}
                onPress={() => handleDriverSelection(driver)}
                onViewDetails={() => handleViewDriverDetails(driver.id)}
              />
            ))}
          </>
        ) : (
          // Constructors Tab
          <>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Available Constructors</Text>
            {displayConstructors.map(constructor => (
              <ConstructorCard 
                key={constructors._id}
                constructor={constructor}
                isSelected={selectedConstructor && selectedConstructor.id === constructor.id}
                onPress={() => handleConstructorSelection(constructor)}
                onViewDetails={() => handleViewConstructorDetails(constructor.id)}
              />
            ))}
          </>
        )}
      </ScrollView>
      
      {/* Save Team Button */}
      <View style={[styles.footer, { 
        backgroundColor: theme.card,
        borderTopColor: theme.border
      }]}>
        <TouchableOpacity 
          style={[styles.saveButton, 
            (selectedDrivers.length < MAX_DRIVERS || 
             !selectedConstructor || 
             !teamName.trim()) && styles.saveButtonDisabled
          ]}
          onPress={handleSaveTeam}
          disabled={selectedDrivers.length < MAX_DRIVERS || !selectedConstructor || !teamName.trim()}
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
    marginTop: 5,
    color: '#333',
  },
  tabContainer: {
    marginBottom: 15,
    marginTop: 5,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
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