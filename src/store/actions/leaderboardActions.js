// src/store/actions/leaderboardActions.js
import {
    FETCH_LEADERBOARD,
    FETCH_LEADERBOARD_SUCCESS,
    FETCH_LEADERBOARD_FAILURE
  } from './types';
  
  // Generate mock data based on the type requested
  const generateMockLeaderboardData = (type) => {
    // Common names pool
    const names = ['Speed Demons', 'Red Bull Wings', 'Ferrari Force', 'Silver Arrows', 
                  'McLaren Maniacs', 'Alpine Avengers', 'Aston Advantage', 'Williams Warriors',
                  'Haas Heroes', 'Sauber Squad', 'Racing Legends', 'F1 Masters'];
    
    // User names pool
    const userNames = ['max_fan', 'lewis44', 'leclerc16', 'lando4', 'gasly10', 
                       'alonso14', 'russell63', 'perez11', 'vettel5', 'ricciardo3'];
    
    // Generate data based on type
    let data = [];
    
    switch(type) {
      case 'global':
        // Global rankings have higher scores and many users
        for (let i = 0; i < 50; i++) {
          data.push({
            id: i + 1,
            name: `${names[i % names.length]} ${Math.floor(Math.random() * 999)}`,
            owner: `${userNames[i % userNames.length]}${Math.floor(Math.random() * 999)}`,
            points: 1000 - Math.floor(Math.random() * 300),
            change: Math.floor(Math.random() * 10) - 5, // Random position change
          });
        }
        break;
        
      case 'friends':
        // Friends list is smaller
        for (let i = 0; i < 15; i++) {
          data.push({
            id: i + 100,
            name: `${names[i % names.length]} ${Math.floor(Math.random() * 99)}`,
            owner: `${userNames[i % userNames.length]}${Math.floor(Math.random() * 99)}`,
            points: 950 - Math.floor(Math.random() * 400),
            isFriend: true,
            change: Math.floor(Math.random() * 6) - 2, // Random position change
          });
        }
        break;
        
      case 'leagues':
        // Leagues are user groups
        for (let i = 0; i < 10; i++) {
          data.push({
            id: i + 200,
            name: `${names[i % names.length]} League`,
            owner: `${userNames[i % userNames.length]}`,
            members: 5 + Math.floor(Math.random() * 10),
            points: Math.floor(Math.random() * 500),
            change: Math.floor(Math.random() * 4) - 1, // Random position change
          });
        }
        break;
        
      default:
        data = [];
    }
    
    // Sort by points (highest first)
    return data.sort((a, b) => b.points - a.points);
  };
  
  // Fetch leaderboard data
  export const fetchLeaderboard = (type = 'global') => {
    return async (dispatch) => {
      dispatch({ type: FETCH_LEADERBOARD });
      
      try {
        // In a real app, this would be an API call
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const data = generateMockLeaderboardData(type);
        
        dispatch({
          type: FETCH_LEADERBOARD_SUCCESS,
          payload: {
            data,
            type
          }
        });
      } catch (error) {
        dispatch({
          type: FETCH_LEADERBOARD_FAILURE,
          payload: error.message || 'Failed to load leaderboard'
        });
      }
    };
  };