import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

// Create a custom thunk middleware
const thunkMiddleware = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

// Create store with custom thunk middleware
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

export default store;



/* import { createStore, applyMiddleware } from 'redux';
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
export default store; */