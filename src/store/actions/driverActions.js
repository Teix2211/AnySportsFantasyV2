// src/store/actions/driverActions.js
import { fetchDrivers as apiGetDrivers } from '../../api';
import { 
  FETCH_DRIVERS,
  FETCH_DRIVERS_SUCCESS,
  FETCH_DRIVERS_FAILURE,
  SELECT_DRIVER,
  REMOVE_DRIVER  // Make sure this is defined in your types.js
} from './types';

export const fetchDrivers = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DRIVERS });
    
    try {
      const data = await apiGetDrivers();
      dispatch({
        type: FETCH_DRIVERS_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: FETCH_DRIVERS_FAILURE,
        payload: error.message
      });
    }
  };
};

export const selectDriver = (driver) => {
  return {
    type: SELECT_DRIVER,
    payload: driver
  };
};

// Remove a driver from the user's team
export const removeDriver = (driver) => {
  return {
    type: REMOVE_DRIVER,
    payload: driver
  };
};