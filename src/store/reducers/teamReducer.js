// src/store/reducers/teamReducer.js
import {
  SELECT_DRIVER,
  REMOVE_DRIVER,
  SET_TEAM_NAME,
  SAVE_TEAM,
  RESET_TEAM
} from '../actions/types';

const initialState = {
  selectedDrivers: [],
  teamName: '',
  teamSaved: false,
  error: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SELECT_DRIVER:
      // Check if the driver is already selected
      if (state.selectedDrivers.some(driver => driver.id === action.payload.id)) {
        return state;
      }
      
      return {
        ...state,
        selectedDrivers: [...state.selectedDrivers, action.payload],
        teamSaved: false
      };
      
    case REMOVE_DRIVER:
      return {
        ...state,
        selectedDrivers: state.selectedDrivers.filter(
          driver => driver.id !== action.payload.id
        ),
        teamSaved: false
      };
      
    case SET_TEAM_NAME:
      return {
        ...state,
        teamName: action.payload,
        teamSaved: false
      };
      
    case SAVE_TEAM:
      return {
        ...state,
        teamSaved: true
      };
      
    case RESET_TEAM:
      return {
        ...state,
        selectedDrivers: [],
        teamName: '',
        teamSaved: false
      };
      
    default:
      return state;
  }
}