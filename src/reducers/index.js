import { combineReducers } from 'redux';

// Import custom components
import productReducer from './products';
import cartReducer from './cart';
import wishlistReducer from './wishlist';
import compareReducer from './compare';
import filterReducer from './filter';
import modalReducer from './modal';
import searchReducer from './search';
import whichListReducer from './whichList';
import isLoggedInReducer from './isLogginedIn';
import prodDetailReducer from './productDetails';
import imageSetReducer from './imageFile';
import uploadPercentageReducer from './uploadPercentage';
import authReducer from './auth';
import choiceReducer from './choice';
import cognitoIsLoggedIn from './cognito_auth';

const rootReducer = combineReducers({
  data: productReducer,
  cartlist: cartReducer,
  wishlist: wishlistReducer,
  compare: compareReducer,
  filters: filterReducer,
  modal: modalReducer,
  search: searchReducer,
  whichList: whichListReducer,
  isLoggedIn: isLoggedInReducer,
  productDetail: prodDetailReducer,
  imageSet: imageSetReducer,
  uploadPercentage: uploadPercentageReducer,
  auth: authReducer,
  choice: choiceReducer,
  cognitoIsLoggedIn,
});

export default rootReducer;
