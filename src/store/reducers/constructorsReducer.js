// src/store/reducers/constructorsReducer.js
import { 
  FETCH_CONSTRUCTORS,
  FETCH_CONSTRUCTORS_SUCCESS,
  FETCH_CONSTRUCTORS_FAILURE
} from '../actions/types';

const initialState = {
  constructors: [],
  loading: true,
  error: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_CONSTRUCTORS:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case FETCH_CONSTRUCTORS_SUCCESS:
      return {
        ...state,
        constructors: action.payload,
        loading: false,
        error: null
      };
      
    case FETCH_CONSTRUCTORS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    default:
      return state;
  }
}