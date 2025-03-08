// src/store/reducers/driversReducer.js
import { 
  FETCH_DRIVERS,
  FETCH_DRIVERS_SUCCESS,
  FETCH_DRIVERS_FAILURE
} from '../actions/types';

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
        loading: true,
        error: null
      };
      
    case FETCH_DRIVERS_SUCCESS:
      return {
        ...state,
        drivers: action.payload,
        loading: false,
        error: null
      };
      
    case FETCH_DRIVERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    default:
      return state;
  }
}