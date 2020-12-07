import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import HomePage from './Layouts/HomePage/HomePage.jsx';
import * as serviceWorker from './Services/serviceWorker';
import './Layouts/Root/index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './Services/Redux/reduxStore';
import { delayFunction } from './Services/Redux/General/generalUtils';
import { auth } from 'Services/Firebase/firebaseAuth';
import { PersistGate } from 'redux-persist/integration/react';

const loader = document.querySelector('.sk-cube-grid');
const background = document.querySelector('.blur-bg');
const rooter = document.querySelector('html');

export const GlobalContext = createContext({
  setDelay: delayFunction,
  auth: auth,
});

// if yo
// if you want to show the loader when React loads data again

const showLoader = () => {
  loader.classList.remove('initialLoader--hide');
  background.classList.remove('blur-bg--hide');
  rooter.classList.add('hide-root');
};
const hideLoader = () => {
  loader.classList.add('initialLoader--hide');
  background.classList.add('blur-bg--hide');
  rooter.classList.remove('hide-root');
};
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <GlobalContext.Provider value={{ setDelay: delayFunction, auth, showLoader, hideLoader }}>
          <HomePage hideLoader={hideLoader} showLoader={showLoader} persistor={persistor} />{' '}
        </GlobalContext.Provider>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
