import { combineReducers } from 'redux';
import authReducer from './authReducer';
import driversReducer from './driversReducer';
import constructorsReducer from './constructorsReducer';
import racesReducer from './raceReducer';
import teamReducer from './teamReducer';
import leaderboardReducer from './leaderboardReducer';
import newsReducer from './newsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  drivers: driversReducer,
  constructors: constructorsReducer,
  races: racesReducer,
  team: teamReducer,
  leaderboard: leaderboardReducer,
  news: newsReducer,
});

export default rootReducer;
