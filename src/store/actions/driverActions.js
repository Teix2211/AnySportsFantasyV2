// src/store/actions/driverActions.js
import { fetchDrivers as apiGetDrivers } from '../../api';
import { 
  FETCH_DRIVERS,
  FETCH_DRIVERS_SUCCESS,
  FETCH_DRIVERS_FAILURE 
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