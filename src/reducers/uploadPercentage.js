import { SET_UPLOAD_PER } from "../constants/action-types";

import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const initialState = {
   percentage:0
};

const uploadPercentage = ( state = initialState, action ) => {
  
    switch ( action.type ) {
        case SET_UPLOAD_PER:
            return {
                ...state,
                percentage: action.percentage
            };
        default:
            return state;
    }
};
const persistConfig = {
    keyPrefix: "kachuwa-",
    key: "uploadPercentage",
    storage
}

export default persistReducer( persistConfig, uploadPercentage );