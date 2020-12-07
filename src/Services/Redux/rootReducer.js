import { combineReducers } from 'redux';
import { userReducer } from './User/userReducer';
import { databaseReducer } from './Database/databaseReducer';
import { locationReducer } from './Location/locationReducer';
import { cartReducer } from './Cart/cartReducer';
import { generalReducer } from './General/generalReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const rootReducer = combineReducers({
  user: userReducer,
  database: databaseReducer,
  location: locationReducer,
  cart: cartReducer,
  general: generalReducer,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};
export const persistedReducer = persistReducer(persistConfig, rootReducer);
