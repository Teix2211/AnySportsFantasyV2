// src/store/actions/teamActions.js
import {
  SET_TEAM_NAME,
  SAVE_TEAM,
  RESET_TEAM
} from './types';
import { loadTeamFromStorage } from '../reducers/teamReducer';

// Set team name
export const setTeamName = (name) => {
  return {
    type: SET_TEAM_NAME,
    payload: name
  };
};

// Save the current team
export const saveTeam = () => {
  // Get current user ID from the auth state
  return async (dispatch, getState) => {
    const { auth } = getState();
    const userId = auth?.user?.id || 1;
    
    dispatch({
      type: SAVE_TEAM,
      payload: {
        userId
      }
    });
  };
};

// Reset the team to empty
export const resetTeam = () => {
  return {
    type: RESET_TEAM
  };
};

// Fetch user's team from storage
export const fetchUserTeam = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'FETCH_USER_TEAM_START' });
      
      const { auth } = getState();
      const userId = auth?.user?.id;
      
      if (!userId) {
        return dispatch({
          type: 'FETCH_USER_TEAM',
          payload: null
        });
      }
      
      // Try to load the team from storage
      const userTeam = await loadTeamFromStorage(userId);
      
      dispatch({
        type: 'FETCH_USER_TEAM',
        payload: userTeam
      });
    } catch (error) {
      console.error('Error fetching user team:', error);
      dispatch({
        type: 'FETCH_USER_TEAM',
        payload: null
      });
    }
  };
};