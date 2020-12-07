import { put, call, all, takeEvery } from 'redux-saga/effects';
import { userActionTypes } from './userActionTypes';
import { fetchDataFirebase } from 'Services/Firebase/firebaseAuth';
import { cartActionTypes } from '../Cart/cartActionTypes';
import { generalActionTypes } from '../General/generalActionTypes';
const { SET_CURRENT_USER } = userActionTypes;
const { PUT_CART_ITEMS, UPDATE_CART, PUT_SAVED_ITEMS } = cartActionTypes;
const { SET_FETCHING } = generalActionTypes;

function* setCartItems(action) {
  yield put({ type: SET_FETCHING, payload: true });

  if (action.payload !== null) {
    const [cartItemSnapshot] = yield call(fetchDataFirebase, 'cartItems');
    if (cartItemSnapshot) {
      yield put({ type: PUT_CART_ITEMS, payload: cartItemSnapshot });
    }
    yield put({ type: UPDATE_CART });
    const [savedItemSnapshot] = yield call(fetchDataFirebase, 'savedItems');
    if (savedItemSnapshot) {
      yield put({ type: PUT_SAVED_ITEMS, payload: savedItemSnapshot });
    }
  }
  yield put({ type: SET_FETCHING, payload: false });
}

function* userWatcher() {
  //const {} = databaseActionTypes
  yield takeEvery(SET_CURRENT_USER, setCartItems);
}
export function* userSaga() {
  yield all([call(userWatcher)]);
}
