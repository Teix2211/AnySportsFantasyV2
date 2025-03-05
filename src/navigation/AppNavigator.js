import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet } from 'react-native';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Main App Screens
import HomeScreen from '../screens/home/HomeScreen';
import TeamSelectionScreen from '../screens/team-selection/TeamSelectionScreen';
import RaceScheduleScreen from '../screens/race-schedule/RaceScheduleScreen';
import LeaderboardScreen from '../screens/leaderboard/LeaderboardScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import RaceDetailScreen from '../screens/race-schedule/RaceDetailScreen';
import DriverDetailScreen from '../screens/team-selection/DriverDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main tab navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // Simple placeholder for icons
          return <Text style={{ color }}>•</Text>;
        },
        tabBarActiveTintColor: '#e10600', // F1 red
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Team" component={TeamSelectionScreen} />
      <Tab.Screen name="Races" component={RaceScheduleScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Root navigator
const AppNavigator = () => {
  // For testing, set to true to bypass login screen
  const isAuthenticated = true;
  
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
            options={{ headerTitle: 'Race Details' }}
          />
          <Stack.Screen 
            name="DriverDetail" 
            component={DriverDetailScreen}
            options={{ headerTitle: 'Driver Profile' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default AppNavigator;