import { databaseActionTypes } from './databaseActionTypes';
import { updateQuantity, removeItemFromCollection, updateSaved } from './databaseUtils';

const INITIAL_STATE = {
  summerData: {},
  winterData: {},
  // userSummerData: {},
  // userWinterData: {},
};
export const databaseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case databaseActionTypes.SET_WINTER_DATA:
      return {
        ...state,
        winterData: action.payload,
      };
    case databaseActionTypes.SET_SUMMER_DATA:
      return {
        ...state,
        summerData: action.payload,
      };

    case databaseActionTypes.UPDATE_PRODUCT_SUMMER:
      return {
        ...state,
        summerData: updateQuantity(action.payload, state.summerData, action.flag),
      };
    case databaseActionTypes.UPDATE_PRODUCT_WINTER:
      return {
        ...state,
        winterData: updateQuantity(action.payload, state.winterData, action.flag),
      };
    case databaseActionTypes.REMOVE_PRODUCT_SUMMER:
      return {
        ...state,
        summerData: removeItemFromCollection(action.payload, state.summerData),
      };
    case databaseActionTypes.REMOVE_PRODUCT_WINTER:
      return {
        ...state,
        winterData: removeItemFromCollection(action.payload, state.winterData),
      };
    case databaseActionTypes.UPDATE_SAVED_SUMMER:
      return {
        ...state,
        summerData: updateSaved(action.payload, state.summerData, action.flag),
      };
    case databaseActionTypes.UPDATE_SAVED_WINTER:
      return {
        ...state,
        winterData: updateSaved(action.payload, state.winterData, action.flag),
      };
    default:
      return state;
  }
};
