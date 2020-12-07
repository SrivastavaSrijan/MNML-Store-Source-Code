import { cartActionTypes } from './cartActionTypes';

export const updateItem = (data) => ({
  type: cartActionTypes.UPDATE_ITEM,
  payload: data,
});
export const removeItem = (data) => ({
  type: cartActionTypes.REMOVE_ITEM,
  payload: data,
});
export const toggleEmpty = (data) => ({
  type: cartActionTypes.TOGGLE_EMPTY,
  payload: data,
});

export const updateSavedItem = (data, flag) => ({
  type: cartActionTypes.UPDATE_SAVED_ITEM,
  payload: data,
  flag,
});
export const updateFirebaseCart = (data) => ({
  type: cartActionTypes.UPDATE_FIREBASE_CART,
  payload: data,
});
export const updateFirebaseSavedItems = (data) => ({
  type: cartActionTypes.UPDATE_FIREBASE_SAVED_ITEM,
  payload: data,
});
