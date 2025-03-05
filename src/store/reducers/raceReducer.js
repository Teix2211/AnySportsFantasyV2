// src/store/reducers/raceReducer.js
import {
  FETCH_RACES,
  SET_SELECTED_RACE,
  FETCH_RACE_RESULTS,
  FETCH_DRIVER_STANDINGS,
  FETCH_CONSTRUCTOR_STANDINGS,
  SET_CURRENT_SEASON
} from '../actions/types';

const initialState = {
  races: [],
  selectedRaceId: null,
  raceResults: [],
  driverStandings: [],
  constructorStandings: [],
  currentSeason: '2024',
  availableSeasons: ['2023', '2024']
};

const raceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RACES:
      return {
        ...state,
        races: action.payload
      };
    case SET_SELECTED_RACE:
      return {
        ...state,
        selectedRaceId: action.payload
      };
    case FETCH_RACE_RESULTS:
      return {
        ...state,
        raceResults: action.payload
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