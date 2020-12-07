import { generalActionTypes } from './generalActionTypes';

export const setLoading = (data) => ({
  type: generalActionTypes.SET_LOADING,
  payload: data,
});
export const toggleHidden = () => ({
  type: generalActionTypes.TOGGLE_HIDDEN,
});
export const showDetails = (data, fromCollection) => ({
  type: generalActionTypes.SHOW_DETAILS,
  payload: data,
  fromCollection,
});
export const setFetching = (data) => ({
  type: generalActionTypes.SET_FETCHING,
  payload: data,
});
