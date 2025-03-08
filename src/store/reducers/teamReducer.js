// src/store/reducers/teamReducer.js
import {
  SELECT_DRIVER,
  REMOVE_DRIVER,
  SET_TEAM_NAME,
  SAVE_TEAM,
  RESET_TEAM,
  SELECT_CONSTRUCTOR,
  REMOVE_CONSTRUCTOR
} from '../actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  selectedDrivers: [],
  selectedConstructor: null,
  teamName: '',
  teamSaved: false,
  userTeam: null,
  error: null,
  loading: false
};

// Helper to save team data for the current user
const saveTeamToStorage = async (team, userId) => {
  try {
    // Store teams by user ID
    const teamsStr = await AsyncStorage.getItem('fantasy_teams');
    const teams = teamsStr ? JSON.parse(teamsStr) : {};
    
    // Update this user's team
    teams[userId] = team;
    
    // Save back to storage
    await AsyncStorage.setItem('fantasy_teams', JSON.stringify(teams));
  } catch (e) {
    console.error('Error saving team to storage', e);
  }
};

// Helper to load team data for a specific user
export const loadTeamFromStorage = async (userId) => {
  try {
    const teamsStr = await AsyncStorage.getItem('fantasy_teams');
    if (!teamsStr) return null;
    
    const teams = JSON.parse(teamsStr);
    return teams[userId] || null;
  } catch (e) {
    console.error('Error loading team from storage', e);
    return null;
  }
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SELECT_DRIVER:
      // Create an ID-normalized version of the driver
        const normalizedDriver = {
          ...action.payload,
          id: action.payload.id || action.payload._id
        };
  
      // Check if driver is already selected using both id types
      const isDriverSelected = state.selectedDrivers.some(d => 
        (d.id && normalizedDriver.id && d.id === normalizedDriver.id) ||
        (d._id && normalizedDriver._id && d._id === normalizedDriver._id)
      );
  
      if (isDriverSelected) {
        return state;
      }
  
      console.log('Adding driver to team:', normalizedDriver.id);
      console.log('Current team size:', state.selectedDrivers.length);
  
      return {
        ...state,
        selectedDrivers: [...state.selectedDrivers, normalizedDriver],
        teamSaved: false
      };
      
      case REMOVE_DRIVER:
        const driverToRemove = action.payload;
        const driverId = driverToRemove.id || driverToRemove._id;
        
        return {
          ...state,
          selectedDrivers: state.selectedDrivers.filter(driver => {
            const currentId = driver.id || driver._id;
            return currentId !== driverId;
          }),
          teamSaved: false
        };
    
      case SELECT_CONSTRUCTOR:
        // Normalize constructor ID
        const normalizedConstructor = {
          ...action.payload,
          id: action.payload.id || action.payload._id
        };
          
        return {
          ...state,
          selectedConstructor: normalizedConstructor,
          teamSaved: false
        };
    
    case REMOVE_CONSTRUCTOR:
      return {
        ...state,
        selectedConstructor: null,
        teamSaved: false
      };
      
    case SET_TEAM_NAME:
      return {
        ...state,
        teamName: action.payload,
        teamSaved: false
      };
      
    case SAVE_TEAM:
      // Create a team object with user info
      const driverPoints = state.selectedDrivers.reduce((sum, driver) => sum + driver.points, 0);
      const constructorPoints = state.selectedConstructor ? state.selectedConstructor.points : 0;
      
      const userTeam = {
        id: action.payload?.userId || 1,
        name: state.teamName,
        totalPoints: driverPoints + constructorPoints,
        rank: Math.floor(Math.random() * 1000) + 1, // Random rank for demo
        totalValue: state.selectedDrivers.reduce((sum, driver) => sum + driver.price, 0) + 
                   (state.selectedConstructor ? state.selectedConstructor.price : 0),
        form: Math.floor(Math.random() * 10) + 1, // Random form for demo
        drivers: state.selectedDrivers,
        constructor: state.selectedConstructor,
        userId: action.payload?.userId || 1
      };
      
      // Save team to AsyncStorage
      if (action.payload?.userId) {
        saveTeamToStorage(userTeam, action.payload.userId);
      }
      
      return {
        ...state,
        teamSaved: true,
        userTeam: userTeam
      };
      
    case RESET_TEAM:
      return {
        ...initialState
      };
      
    case 'FETCH_USER_TEAM':
      return {
        ...state,
        userTeam: action.payload,
        // If there's a user team, set up the selected drivers and constructor
        selectedDrivers: action.payload?.drivers || [],
        selectedConstructor: action.payload?.constructor || null,
        teamName: action.payload?.name || '',
        loading: false
      };
      
    case 'FETCH_USER_TEAM_START':
      return {
        ...state,
        loading: true
      };
      
    default:
      return state;
  }
}