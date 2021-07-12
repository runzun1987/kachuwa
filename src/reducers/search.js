import {
  SHOW_QUICKVIEW,
  CLOSE_QUICKVIEW,
  SEARCH_PRODUCTS,
  LOADING_STATE,
  RESET_SEARCH,
  APPEND_SEARCH_PRODUCTS,
} from '../constants/action-types';
import { findIndex } from '../utils';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  products: [],
  productDetail: [],
  totalProducts: '',
  page: '',
  pageSize: '',
  pageCount: '',
  searchedKeyword: '',
  quickView: false,
  isLoading: true,
  errorMesage: '',
  error: false,
};

const searchReducer = (state = initialState, action) => {
 
  switch (action.type) {
    case SEARCH_PRODUCTS:
   
      return {
        ...state,
        products: action.products.products || [],
        errorMesage: action.products.error  ? action.products.message : '',
        error: action.products.error,
        totalProducts: action.products.totalProducts,
        pageSize: action.products.pageSize,
        page: action.products.page,
        pageCount: action.products.pageCount,
        searchedKeyword: action.products.searchedKeyword,
        isLoading: false,
      };
    case LOADING_STATE:
      return {
        ...state,
        isLoading: true,
      };

    case SHOW_QUICKVIEW:
      let index = findIndex(
        state.products,
        (product) => product.id === action.productId
      );
      if (-1 !== index) {
        const item = state.products[index];
        return {
          ...state,
          quickView: true,
          productDetail: item,
          isLoading: true,
        };
      }
      break;
    case RESET_SEARCH:
    
      return {
        ...state,
        products: [],
        productDetail: [],
        totalProducts: '',
        page: '',
        pageSize: '',
        pageCount: '',
        searchedKeyword: '',
        quickView: false,
        isLoading: true,
        errorMesage: '',
        error: false,
      };
    case CLOSE_QUICKVIEW:
      return { ...state, quickView: false };

    case APPEND_SEARCH_PRODUCTS:
  
      return {
        ...state,
        products: state.products.concat(action.products.products),
        errorMesage: action.products.error ? action.products.message : '',
        error: action.products.error,
        totalProducts: action.products.totalProducts,
        pageSize: action.products.pageSize,
        page: parseInt(action.products.page),
        pageCount: action.products.pageCount,
      };
    default:
      return state;
  }
};
const persistConfig = {
  keyPrefix: 'kachuwa-',
  key: 'searched-products',
  storage,
};

export default persistReducer(persistConfig, searchReducer);
