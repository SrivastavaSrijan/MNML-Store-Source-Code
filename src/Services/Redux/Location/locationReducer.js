import { locationActionTypes } from './locationActionTypes';
const INITIAL_STATE = {
  currentLocation: '/',
};
export const locationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case locationActionTypes.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      };

    default:
      return state;
  }
};
