// src/store/reducers/constructorsReducer.js
import { FETCH_CONSTRUCTORS } from '../actions/types';

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
        constructors: action.payload,
        loading: false
      };
    default:
      return state;
  }
}