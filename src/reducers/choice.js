import { CHOICE } from '../constants/action-types';

// import { persistReducer } from "redux-persist";
// import storage from 'redux-persist/lib/storage';

const initialState = {
  userChoice: '',
};

const choice = (state = initialState, action) => {
  switch (action.type) {
    case CHOICE:
      return {
        ...state,
        userChoice: action.choice,
      };
    default:
      return state;
  }
};
// const persistConfig = {
//     keyPrefix: "kachuwa-",
//     key: "whichList",
//     storage
// }

export default choice;
