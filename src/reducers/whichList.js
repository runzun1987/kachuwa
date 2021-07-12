import { UPDATE_LIST } from "../constants/action-types";

import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const initialState = {
   list:''
};

const whichList = ( state = initialState, action ) => {
    switch ( action.type ) {
        case UPDATE_LIST:
            return {
                ...state,
                list: action.listName
            };
        default:
            return state;
    }
};
const persistConfig = {
    keyPrefix: "kachuwa-",
    key: "whichList",
    storage
}

export default persistReducer( persistConfig, whichList );