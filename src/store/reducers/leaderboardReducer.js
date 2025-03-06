// src/store/reducers/leaderboardReducer.js
import {
  FETCH_LEADERBOARD,
  FETCH_LEADERBOARD_SUCCESS,
  FETCH_LEADERBOARD_FAILURE
} from '../actions/types';

const initialState = {
  leaderboard: [],
  type: 'global', // 'global', 'friends', 'leagues'
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_LEADERBOARD:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case FETCH_LEADERBOARD_SUCCESS:
      return {
        ...state,
        leaderboard: action.payload.data,
        type: action.payload.type,
        loading: false
      };
      
    case FETCH_LEADERBOARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    default:
      return state;
  }
}