import { call, takeLatest, all, put } from 'redux-saga/effects';
import { cartActionTypes } from './cartActionTypes';
import {
  fetchDataFirebase,
  deleteDocument,
  addDocumentToCart,
  modifySavedDocument,
} from 'Services/Firebase/firebaseAuth';
import { generalActionTypes } from '../General/generalActionTypes';
const { SET_LOADING } = generalActionTypes;
const {
  UPDATE_CART,
  PUT_CART_ITEMS,
  PUT_CART_ITEMS_NO_AUTH,
  REMOVE_ITEM,
  REMOVE_ITEM_NO_AUTH,
  PUT_SAVED_ITEMS,
  PUT_SAVED_ITEMS_NO_AUTH,
  UPDATE_SAVED_ITEM,
  UPDATE_ITEM,
} = cartActionTypes;
function* updateCart(action) {
  const [cartItemSnapshot, cartRef] = yield call(fetchDataFirebase, 'cartItems');
  if (cartItemSnapshot && Object.keys(cartItemSnapshot).length >= 0) {
    yield put({ type: SET_LOADING, payload: true });
    const cartItemsUpdated = yield call(
      addDocumentToCart,
      action.payload,
      cartItemSnapshot,
      cartRef,
    );
    yield put({ type: PUT_CART_ITEMS, payload: cartItemsUpdated });
    yield put({ type: SET_LOADING, payload: false });
  } else {
    yield put({ type: PUT_CART_ITEMS_NO_AUTH, payload: action.payload });
  }
  yield put({ type: UPDATE_CART });
}
function* removeCart(action) {
  const [cartItemSnapshot, cartRef] = yield call(fetchDataFirebase, 'cartItems');
  if (cartItemSnapshot && Object.keys(cartItemSnapshot).length >= 0) {
    yield put({ type: SET_LOADING, payload: true });
    const cartItemsUpdated = yield call(deleteDocument, action.payload, cartItemSnapshot, cartRef);
    yield put({ type: PUT_CART_ITEMS, payload: cartItemsUpdated });
    yield put({ type: SET_LOADING, payload: false });
  } else {
    yield put({ type: REMOVE_ITEM_NO_AUTH, payload: action.payload });
  }
  yield put({ type: UPDATE_CART });
}
function* updateSaved(action) {
  const [savedItemsSnapshot, snapshotRef] = yield call(fetchDataFirebase, 'savedItems');
  if (savedItemsSnapshot && Object.keys(savedItemsSnapshot).length >= 0) {
    yield put({ type: SET_LOADING, payload: true });
    const savedItemsUpdated = yield call(
      modifySavedDocument,
      action.payload,
      savedItemsSnapshot,
      snapshotRef,
      action.flag,
    );
    console.log(savedItemsUpdated);
    yield put({ type: PUT_SAVED_ITEMS, payload: savedItemsUpdated });

    yield put({ type: SET_LOADING, payload: false });
  } else {
    yield put({ type: PUT_SAVED_ITEMS_NO_AUTH, payload: action.payload, flag: action.flag });
  }
}
function* cartWatcher() {
  yield takeLatest(UPDATE_ITEM, updateCart);
  yield takeLatest(REMOVE_ITEM, removeCart);
  yield takeLatest(UPDATE_SAVED_ITEM, updateSaved);
}
export function* cartSaga() {
  yield all([call(cartWatcher)]);
}
