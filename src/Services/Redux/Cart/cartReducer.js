import { cartActionTypes } from './cartActionTypes';
import {
  updateItemInCart,
  removeItemFrom,
  totalPrice,
  totalPriceAfterDiscount,
  totalItemsInCart,
  updateSavedItem,
} from './cartUtils';
const INITIAL_STATE = {
  cartItems: {},
  savedItems: {},
  isEmpty: true,
  totalCostOfCart: 0,
  totalCostOfCartAfterDiscount: 0,
  totalItemsInCart: 0,
};
export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.PUT_CART_ITEMS_NO_AUTH:
      return {
        ...state,
        cartItems: updateItemInCart(action.payload, state.cartItems),
      };
    case cartActionTypes.REMOVE_ITEM_NO_AUTH:
      return {
        ...state,
        cartItems: removeItemFrom(action.payload, state.cartItems),
      };
    case cartActionTypes.PUT_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case cartActionTypes.UPDATE_CART:
      return {
        ...state,
        totalCostOfCart: totalPrice(state.cartItems),
        totalCostOfCartAfterDiscount: totalPriceAfterDiscount(state.cartItems),
        totalItemsInCart: totalItemsInCart(state.cartItems),
      };
    case cartActionTypes.TOGGLE_EMPTY:
      return {
        ...state,
        isEmpty: action.payload,
      };

    case cartActionTypes.PUT_SAVED_ITEMS_NO_AUTH:
      return {
        ...state,
        savedItems: updateSavedItem(action.payload, state.savedItems, action.flag),
      };
    case cartActionTypes.PUT_SAVED_ITEMS:
      return {
        ...state,
        savedItems: action.payload,
      };

    default:
      return state;
  }
};
