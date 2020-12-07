import { generalActionTypes } from './generalActionTypes';
const INITIAL_STATE = {
  isLoading: false,
  isFetching: true,
  isHidden: true,
};
export const generalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case generalActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case generalActionTypes.TOGGLE_HIDDEN:
      return {
        ...state,
        isHidden: !state.isHidden,
      };
    case generalActionTypes.SET_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case generalActionTypes.SHOW_DETAILS:
      return {
        ...state,
        detailID: { id: action.payload, fromCollection: action.fromCollection },
      };
    default:
      return state;
  }
};
