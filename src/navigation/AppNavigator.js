import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

// Auth Context
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Main App Screens
import HomeScreen from '../screens/home/HomeScreen';
import TeamSelectionScreen from '../screens/team-selection/TeamSelectionScreen';
import RacesNavigator from './RacesNavigator';
import LeaderboardNavigator from './LeaderboardNavigator';
import ProfileScreen from '../screens/profile/ProfileScreen';
import RaceDetailScreen from '../screens/race-schedule/RaceDetailScreen';
import DriverDetailScreen from '../screens/team-selection/DriverDetailScreen';
import CompetitionSelectorScreen from '../screens/competitions/CompetitionSelectorScreen';
import CompetitionLocked from '../screens/competitions/CompetitionLocked';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main tab navigator
const MainTabNavigator = () => {
  const { theme, isDarkMode } = useTheme();
  const { activeCompetition } = useSelector(state => state.competitions);
  
  // Component to show when competition is locked
  const LockedScreen = () => <CompetitionLocked />;
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'My Team') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Schedule') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Leaderboard') {
            iconName = focused ? 'podium' : 'podium-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Competitions') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e10600', // F1 red
        tabBarInactiveTintColor: isDarkMode ? '#999' : 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Competitions" component={CompetitionSelectorScreen} />
      
      {/* My Team tab - show locked screen if no competition selected */}
      <Tab.Screen 
        name="My Team" 
        component={activeCompetition ? TeamSelectionScreen : LockedScreen} 
        options={{
          tabBarBadge: !activeCompetition ? '🔒' : null,
          tabBarBadgeStyle: { backgroundColor: 'transparent' }
        }}
      />
      
      {/* Schedule tab (formerly Races) - always show races navigator */}
      <Tab.Screen name="Schedule" component={RacesNavigator} />
      
      <Tab.Screen name="Leaderboard" component={LeaderboardNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Root navigator
const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();
  const { theme } = useTheme();
  
  if (loading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: theme.background
      }}>
        <ActivityIndicator size="large" color="#e10600" />
      </View>
    );
  }
  
  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        // Auth Stack
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Group>
      ) : (
        // Main App Stack
        <>
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabNavigator} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="RaceDetail" 
            component={RaceDetailScreen}
            options={{ 
              headerTitle: 'Race Details',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#e10600',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen 
            name="DriverDetail" 
            component={DriverDetailScreen}
            options={{ 
              headerTitle: 'Driver Profile',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#e10600',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;