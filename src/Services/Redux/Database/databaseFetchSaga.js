import { put, call, takeLatest, all, takeEvery } from 'redux-saga/effects';
import { databaseActionTypes } from './databaseActionTypes';
import { generalActionTypes } from '../General/generalActionTypes';
import { cartActionTypes } from '../Cart/cartActionTypes';
import { partition } from './databaseUtils';
import { fetchCollectionFirebase } from 'Services/Firebase/firebaseAuth';
const { SET_FETCHING, SET_LOADING } = generalActionTypes;
const {
  SET_SUMMER_DATA,
  SET_WINTER_DATA,
  UPDATE_SAVED_SUMMER,
  UPDATE_PRODUCT_WINTER,
  UPDATE_SAVED_WINTER,
  UPDATE_PRODUCT_SUMMER,
} = databaseActionTypes;
function* fetchItems() {
  const [summerData, winterData] = yield all([
    call(fetchCollectionFirebase, 'summerData'),
    call(fetchCollectionFirebase, 'winterData'),
  ]);
  yield put({ type: SET_SUMMER_DATA, payload: summerData });
  yield put({ type: SET_WINTER_DATA, payload: winterData });
  localStorage.setItem('summerData', JSON.stringify(summerData));
  localStorage.setItem('winterData', JSON.stringify(winterData));
  yield put({ type: SET_FETCHING, payload: false });
}
function* updateCollection(action) {
  const [summerItems, winterItems] = yield partition(action.payload);
  if (summerItems && winterItems) {
    yield put({ type: SET_LOADING, payload: true });
    if (summerItems.length > 0) {
      yield put({
        type: UPDATE_PRODUCT_SUMMER,
        payload: summerItems,
        flag: false,
      });
    }
    if (winterItems.length > 0) {
      yield put({
        type: UPDATE_PRODUCT_WINTER,
        payload: winterItems,
        flag: false,
      });
    }
    yield put({ type: SET_LOADING, payload: false });
  }
}
function* updateSaved(action) {
  const [summerItems, winterItems] = yield partition(action.payload);
  if (summerItems && winterItems) {
    yield put({ type: SET_LOADING, payload: true });

    if (summerItems.length > 0) {
      yield put({
        type: UPDATE_SAVED_SUMMER,
        payload: summerItems,
        flag: false,
      });
    }
    if (winterItems.length > 0) {
      yield put({
        type: UPDATE_SAVED_WINTER,
        payload: winterItems,
        flag: false,
      });
    }
    yield put({ type: SET_LOADING, payload: false });
  }
}
function* databaseWatcher() {
  yield takeLatest(databaseActionTypes.GET_DATA, fetchItems);
  yield takeEvery(cartActionTypes.PUT_CART_ITEMS, updateCollection);
  yield takeEvery(cartActionTypes.PUT_SAVED_ITEMS, updateSaved);
}
export function* databaseSaga() {
  yield all([call(databaseWatcher)]);
}
