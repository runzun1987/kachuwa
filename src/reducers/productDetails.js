import {
    SHOW_QUICKVIEW,
    CLOSE_QUICKVIEW,
    SEARCH_PRODUCTS,
    LOADING_STATE_DETAIL,
    RESET_SEARCH,
    PRODUCT_DETAILS,
    RESET_PROD_DETAILS,
    UPDATE_PROD_PRICE
  } from '../constants/action-types';
  import { findIndex } from '../utils';
  
  import { persistReducer } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';
  
  const initialState = {
    prodDetail:null,
    isLoading: true,
    errorMesage: '',
    error: false,
    errorCode:''
  };
  
  const prodDetailReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case PRODUCT_DETAILS:
   
        return {
          ...state,
          prodDetail:action.productDetails.productsDetails || null,
          errorMesage: action.productDetails.error ? action.productDetails.message : '',
          error: action.productDetails.error,
          errorCode:action.productDetails.errorCode,
  
          isLoading: false,
        };
      case LOADING_STATE_DETAIL:
     
        return {
          ...state,
          isLoading: true,
        };
  
      case RESET_PROD_DETAILS:
     
        return {
          ...state,
          prodDetail:null,
          isLoading: true,
          errorMesage: '',
          error: false,
          errorCode:''
         
        };

        case UPDATE_PROD_PRICE:
         
          const prodDetails = state.prodDetail
         
          return{
            ...state,
            prodDetail:{...prodDetails,price:action.price},
            isLoading:false,
            error:false,
            errorCode:''
            
          }
    //   case CLOSE_QUICKVIEW:
    //     return { ...state, quickView: false };
  
      default:
        return state;
    }
  };
  const persistConfig = {
    keyPrefix: 'kachuwa-',
    key: 'productDetails',
    storage,
  };
  
  export default persistReducer(persistConfig, prodDetailReducer);
  // export default prodDetailReducer