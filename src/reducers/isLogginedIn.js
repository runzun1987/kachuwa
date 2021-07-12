import { SIGN_IN, SIGN_OUT } from '../constants/action-types';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  isLoggedIn: false,
};

const isLoggedIn = (state = initialState, action) => {
  
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isLoggedIn: true,
        userId: action.payload.userId,
        email: action.payload.email,
        token: action.payload.token,
      };

    case SIGN_OUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
const persistConfig = {
  keyPrefix: 'kachuwa-',
  key: 'isLoggedIn',
  storage,
};

export default persistReducer(persistConfig, isLoggedIn);
