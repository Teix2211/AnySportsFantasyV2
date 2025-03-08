// src/store/actions/constructorActions.js
import { fetchConstructors as apiGetConstructors } from '../../api';
import {
  FETCH_CONSTRUCTORS,
  FETCH_CONSTRUCTORS_SUCCESS,
  FETCH_CONSTRUCTORS_FAILURE,
  SELECT_CONSTRUCTOR,
  REMOVE_CONSTRUCTOR
} from './types';

// Fetch all available constructors
export const fetchConstructors = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CONSTRUCTORS });
    
    try {
      const data = await apiGetConstructors();
      
      // If API returns empty or undefined, use fallback data
      const constructorsData = data && data.length > 0 ? data : [
        {
          id: 1,
          name: 'Red Bull Racing',
          points: 620,
          price: 32.5,
          form: 9.5,
          drivers: ['Max Verstappen', 'Sergio Perez'],
          logoUrl: 'https://i.imgur.com/t6kIYsA.png',
          color: '#0600EF'
        },
        // Add more fallback constructors if needed
      ];
      
      dispatch({
        type: FETCH_CONSTRUCTORS_SUCCESS,
        payload: constructorsData
      });
    } catch (error) {
      dispatch({
        type: FETCH_CONSTRUCTORS_FAILURE,
        payload: error.message
      });
    }
  };
};

// Add a constructor to the user's team
export const selectConstructor = (constructor) => {
  // Create a consistent constructor object with both id fields
  const constructorWithConsistentId = {
    ...constructor,
    id: constructor.id || constructor._id
  };
  
  return {
    type: SELECT_CONSTRUCTOR,
    payload: constructorWithConsistentId
  };
};

// Remove a constructor from the user's team
export const removeConstructor = () => {
  return {
    type: REMOVE_CONSTRUCTOR
  };
};