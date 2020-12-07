import { locationActionTypes } from './locationActionTypes';
export const setCurrentLocation = (location) => ({
  type: locationActionTypes.SET_CURRENT_LOCATION,
  payload: location,
});
