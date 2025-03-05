// src/store/reducers/raceReducer.js
import {
  FETCH_RACES,
  FETCH_RACES_SUCCESS,
  FETCH_RACES_FAILURE,
  SET_SELECTED_RACE,
  FETCH_RACE_RESULTS,
  FETCH_RACE_RESULTS_SUCCESS,
  FETCH_RACE_RESULTS_FAILURE,
  FETCH_DRIVER_STANDINGS,
  FETCH_CONSTRUCTOR_STANDINGS,
  SET_CURRENT_SEASON
} from '../actions/types';

const initialState = {
  races: [],
  upcomingRace: null,
  selectedRaceId: null,
  raceResults: [],
  driverStandings: [],
  constructorStandings: [],
  currentSeason: '2024',
  availableSeasons: ['2023', '2024'],
  loading: false,
  resultsLoading: false,
  error: null
};

const raceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RACES:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case FETCH_RACES_SUCCESS:
      // Find the upcoming race
      const currentDate = new Date();
      const sortedRaces = [...action.payload].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      
      const upcomingRaces = sortedRaces.filter(
        race => new Date(race.date) > currentDate
      );
      
      const upcomingRace = upcomingRaces.length > 0 ? upcomingRaces[0] : null;
      
      // Calculate days until the race
      let daysUntil = null;
      if (upcomingRace) {
        const raceDate = new Date(upcomingRace.date);
        const timeDiff = raceDate.getTime() - currentDate.getTime();
        daysUntil = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        // Add daysUntil to the upcomingRace object
        upcomingRace.daysUntil = daysUntil;
      }
      
      return {
        ...state,
        races: action.payload,
        upcomingRace,
        loading: false
      };
      
    case FETCH_RACES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    case SET_SELECTED_RACE:
      return {
        ...state,
        selectedRaceId: action.payload
      };
      
    case FETCH_RACE_RESULTS:
      return {
        ...state,
        resultsLoading: true,
        error: null
      };
      
    case FETCH_RACE_RESULTS_SUCCESS:
      return {
        ...state,
        raceResults: action.payload,
        resultsLoading: false
      };
      
    case FETCH_RACE_RESULTS_FAILURE:
      return {
        ...state,
        resultsLoading: false,
        error: action.payload
      };
      
    case FETCH_DRIVER_STANDINGS:
      return {
        ...state,
        driverStandings: action.payload
      };
      
    case FETCH_CONSTRUCTOR_STANDINGS:
      return {
        ...state,
        constructorStandings: action.payload
      };
      
    case SET_CURRENT_SEASON:
      return {
        ...state,
        currentSeason: action.payload
      };
      
    default:
      return state;
  }
};

export default raceReducer;