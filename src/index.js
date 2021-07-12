import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  transitions,
  positions,
  types,
  Provider as AlertProvider,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import 'react-app-polyfill/ie11';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

import { PersistGate } from 'redux-persist/integration/react';

// import store
import store, { persistor } from './store';

// import action
import { getAllProducts, refreshStore, signOut } from './actions';

// import routes
import AppRoute from './routes';

// import Utils
import { initFunctions } from './utils';

import LoadingOverlay from './components/features/loading-overlay';
import comingSoon from './components/pages/others/coming-soon';

Amplify.configure(aws_exports);
export function Root() {
  const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    type: types.ERROR,
    // you can also just use 'scale'
    transition: transitions.SCALE,
  };
  initFunctions();
  store.dispatch(getAllProducts());

  useEffect(() => {
    const auth = store.getState().auth;

    if (auth.token) {
      jwt.verify(auth.token, process.env.REACT_APP_JWT_KEY, (err, decode) => {
        if (err) {
          store.dispatch(signOut());
        }
      });
    }

    if (store.getState().modal.current !== 14) {
      store.dispatch(refreshStore(14));
    }
  }, []);

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <PersistGate persistor={persistor} loading={<LoadingOverlay />}>
          <BrowserRouter basename={'/'}>
            <AppRoute />
          </BrowserRouter>
        </PersistGate>
      </AlertProvider>
    </Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
