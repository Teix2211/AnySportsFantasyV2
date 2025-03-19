// src/store/reducers/competitionReducer.js
import {
    FETCH_COMPETITIONS,
    FETCH_COMPETITIONS_SUCCESS,
    FETCH_COMPETITIONS_FAILURE,
    SET_ACTIVE_COMPETITION
  } from '../actions/types';
  
  const initialState = {
    competitions: [],
    activeCompetition: null,
    loading: false,
    error: null
  };
  
  export default function(state = initialState, action) {
    switch(action.type) {
      case FETCH_COMPETITIONS:
        return {
          ...state,
          loading: true,
          error: null
        };
        
      case FETCH_COMPETITIONS_SUCCESS:
        // Find the active competition from the payload
        const activeComp = action.payload.find(comp => comp.active) || 
                          (action.payload.length > 0 ? action.payload[0] : null);
        
        return {
          ...state,
          competitions: action.payload,
          activeCompetition: activeComp,
          loading: false,
          error: null
        };
        
      case FETCH_COMPETITIONS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
        
      case SET_ACTIVE_COMPETITION:
        // Update active state for all competitions
        const updatedCompetitions = state.competitions.map(comp => ({
          ...comp,
          active: comp.id === action.payload
        }));
        
        // Find the new active competition
        const newActiveComp = state.competitions.find(comp => comp.id === action.payload);
        
        return {
          ...state,
          competitions: updatedCompetitions,
          activeCompetition: newActiveComp || state.activeCompetition
        };
        
      default:
        return state;
    }
  }