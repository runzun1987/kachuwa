import { SET_IMAGE } from "../constants/action-types";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';



const initialState = {
   file:''
};

const imageSet = ( state = initialState, action ) => {
  
    switch ( action.type ) {
        case SET_IMAGE:
            return {
                ...state,
                file: action.image
            };
        default:
            return state;
    }
};


// const persistConfig = {
//     keyPrefix: "molla-",
//     key: "imageFile",
//     storage
// }

// export default persistReducer( persistConfig, imageSet ) ;

export default(imageSet)