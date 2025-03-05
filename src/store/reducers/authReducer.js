// src/store/reducers/authReducer.js
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        isAuthenticated: !!action.payload,
        user: action.payload,
        loading: false
      };
      
    case 'AUTH_LOADING':
      return {
        ...state,
        loading: true
      };
      
    case 'AUTH_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
      
    case 'AUTH_LOGOUT':
      return {
        ...initialState
      };
      
    default:
      return state;
  }
}