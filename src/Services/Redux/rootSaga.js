import { all, call } from 'redux-saga/effects';
import { cartSaga } from './Cart/cartFetchSaga';
import { databaseSaga } from './Database/databaseFetchSaga';
import { generalSaga } from './General/generalSagas';
import { userSaga } from './User/userSagas';

export default function* rootSaga() {
  yield all([call(databaseSaga), call(cartSaga), call(generalSaga), call(userSaga)]);
}
