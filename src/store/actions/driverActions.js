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
      
      // If API returns empty or undefined data, use fallback data
      const driversData = data && data.length > 0 ? data : fallbackDrivers;
      
      dispatch({
        type: FETCH_DRIVERS_SUCCESS,
        payload: driversData
      });
      
      console.log('Drivers fetched successfully:', driversData.length);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      
      // Use fallback data on error
      dispatch({
        type: FETCH_DRIVERS_SUCCESS,
        payload: fallbackDrivers
      });
      
      // Also dispatch failure for logging purposes
      dispatch({
        type: FETCH_DRIVERS_FAILURE,
        payload: error.message
      });
    }
  };
};

export const selectDriver = (driver) => {
  // Create a consistent driver object with both id fields
  const driverWithConsistentId = {
    ...driver,
    id: driver.id || driver._id
  };
  
  return {
    type: SELECT_DRIVER,
    payload: driverWithConsistentId
  };
};

// Remove a driver from the user's team
export const removeDriver = (driver) => {
  return {
    type: REMOVE_DRIVER,
    payload: driver
  };
};