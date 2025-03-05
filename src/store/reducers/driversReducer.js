// src/store/reducers/driversReducer.js
import { FETCH_DRIVERS } from '../actions/types';

const initialState = {
  drivers: [],
  loading: true,
  error: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_DRIVERS:
      return {
        ...state,
        drivers: action.payload,
        loading: false
      };
    default:
      return state;
  }
}