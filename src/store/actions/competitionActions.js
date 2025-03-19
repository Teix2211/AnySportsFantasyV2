// src/store/actions/competitionActions.js
import {
    FETCH_COMPETITIONS,
    FETCH_COMPETITIONS_SUCCESS,
    FETCH_COMPETITIONS_FAILURE,
    SET_ACTIVE_COMPETITION
  } from './types';
  
  // Mock data - in a real app, this would come from an API
  const mockCompetitions = [
    { 
      id: 'f1-2024',
      name: 'Formula 1',
      season: '2024',
      logo: 'https://via.placeholder.com/60?text=F1',
      active: true
    },
    { 
      id: 'f2-2024',
      name: 'Formula 2',
      season: '2024',
      logo: 'https://via.placeholder.com/60?text=F2',
      active: false
    },
    { 
      id: 'f3-2024',
      name: 'Formula 3',
      season: '2024',
      logo: 'https://via.placeholder.com/60?text=F3',
      active: false
    },
    { 
      id: 'fe-2024',
      name: 'Formula E',
      season: '2024',
      logo: 'https://via.placeholder.com/60?text=FE',
      active: false
    },
    { 
      id: 'indy-2024',
      name: 'IndyCar',
      season: '2024',
      logo: 'https://via.placeholder.com/60?text=INDY',
      active: false
    }
  ];
  
  // Fetch available competitions
  export const fetchCompetitions = () => {
    return async (dispatch) => {
      dispatch({ type: FETCH_COMPETITIONS });
      
      try {
        // In a real app, this would be an API call
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        dispatch({
          type: FETCH_COMPETITIONS_SUCCESS,
          payload: mockCompetitions
        });
      } catch (error) {
        dispatch({
          type: FETCH_COMPETITIONS_FAILURE,
          payload: error.message || 'Failed to load competitions'
        });
      }
    };
  };
  
  // Set active competition
  export const setActiveCompetition = (competitionId) => {
    return {
      type: SET_ACTIVE_COMPETITION,
      payload: competitionId
    };
  };