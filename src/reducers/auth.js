import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  SIGN_OUT,
} from '../constants/action-types';

import { updateObject } from '../utils/updateObject';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false,
    expires: action.expires,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authSignOut = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    error: action.error,
    loading: false,
    expires: null,
  });
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case SIGN_OUT:
      return authSignOut(state, action);

    default:
      return state;
  }
};
const persistConfig = {
  keyPrefix: 'kachuwa-',
  key: 'auth',
  storage,
};

export default persistReducer(persistConfig, auth);
