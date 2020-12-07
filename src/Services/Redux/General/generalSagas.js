import { put, call, all, takeEvery, delay } from 'redux-saga/effects';
import { generalActionTypes } from '../General/generalActionTypes';
import { cartActionTypes } from '../Cart/cartActionTypes';
const randomWithRange = (max, min) => Math.floor(Math.random() * (max - min) + min);

//import { databaseActionTypes } from '../Database/databaseActionTypes';
const { SET_LOADING, SHOW_DETAILS } = generalActionTypes;
const { PUT_CART_ITEMS_NO_AUTH, PUT_SAVED_ITEMS_NO_AUTH, REMOVE_ITEM_NO_AUTH } = cartActionTypes;
function* setLoading() {
  yield put({ type: SET_LOADING, payload: true });
  let delaySize = randomWithRange(1000, 50);

  yield delay(delaySize);
  yield put({ type: SET_LOADING, payload: false });
}

function* loadingWatcher() {
  //const {} = databaseActionTypes
  yield takeEvery(
    [PUT_CART_ITEMS_NO_AUTH, REMOVE_ITEM_NO_AUTH, SHOW_DETAILS, PUT_SAVED_ITEMS_NO_AUTH],
    setLoading,
  );
}
export function* generalSaga() {
  yield all([call(loadingWatcher)]);
}
