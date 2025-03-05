// src/store/actions/teamActions.js
import {
    SET_TEAM_NAME,
    SAVE_TEAM,
    RESET_TEAM
  } from './types';
  
  // Set team name
  export const setTeamName = (name) => {
    return {
      type: SET_TEAM_NAME,
      payload: name
    };
  };
  
  // Save the current team
  export const saveTeam = (team) => {
    return {
      type: SAVE_TEAM,
      payload: team
    };
  };
  
  // Reset the team to empty
  export const resetTeam = () => {
    return {
      type: RESET_TEAM
    };
  };