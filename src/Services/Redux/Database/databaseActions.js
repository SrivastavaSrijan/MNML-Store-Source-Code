import { databaseActionTypes } from './databaseActionTypes';

export const setSummerData = (data) => ({
  type: databaseActionTypes.SET_SUMMER_DATA,
  payload: data,
});

export const setWinterData = (data) => ({
  type: databaseActionTypes.SET_WINTER_DATA,
  payload: data,
});
export const getData = () => ({
  type: databaseActionTypes.GET_DATA,
});

export const updateProductSummer = (data, flag) => ({
  type: databaseActionTypes.UPDATE_PRODUCT_SUMMER,
  payload: data,
  flag,
});
export const updateProductWinter = (data, flag) => ({
  type: databaseActionTypes.UPDATE_PRODUCT_WINTER,
  payload: data,
  flag,
});
export const removeProductWinter = (data) => ({
  type: databaseActionTypes.REMOVE_PRODUCT_WINTER,
  payload: data,
});
export const removeProductSummer = (data) => ({
  type: databaseActionTypes.REMOVE_PRODUCT_SUMMER,
  payload: data,
});
