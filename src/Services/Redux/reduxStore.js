import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistedReducer } from './rootReducer';
import { persistStore } from 'redux-persist';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [logger, sagaMiddleware];
const composedEnhancers = compose(applyMiddleware(...middleware));
export const store = createStore(persistedReducer, composedEnhancers);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store, [{ manualPersist: true }, null]);
