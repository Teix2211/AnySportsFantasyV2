// src/store/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import driversReducer from './driversReducer';
import constructorsReducer from './constructorsReducer';
import racesReducer from './raceReducer';
import teamReducer from './teamReducer';
import leaderboardReducer from './leaderboardReducer';
import newsReducer from './newsReducer';
import competitionReducer from './competitionReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  drivers: driversReducer,
  constructors: constructorsReducer,
  races: racesReducer,
  team: teamReducer,
  leaderboard: leaderboardReducer,
  news: newsReducer,
  competitions: competitionReducer,
});

export default rootReducer;