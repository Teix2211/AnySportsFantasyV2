import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

// Create store with a more defensive approach
const configureStore = () => {
  // Import thunk directly to avoid undefined issues
  const thunk = require('redux-thunk').default;
  
  // Make sure middleware is always an array, even if thunk is undefined
  const middlewares = thunk ? [thunk] : [];
  
  // Create store with appropriate middleware
  return createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );
};

// Create and export the store
const store = configureStore();
export default store;