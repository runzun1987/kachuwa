import * as api from '../api';
import * as types from '../constants/action-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import getProductDetailsApi from '../api/productDetailOneBound';
import searchKeywordApi from '../api/searchKeywordApiOneBound';

/********** Product Action ********/
// recieve products
export const receiveProducts = (products) => ({
  type: types.RECEIVE_PRODUCTS,
  products,
});

// refresh local storage

export const refreshUnSafe = (current) => ({
  type: types.REFRESH_STORE,
  current,
});

export const refreshStore = (current) => (dispatch) => {
  dispatch(refreshUnSafe(current));
};

// get all products
export const getAllProducts = () => (dispatch) => {
  api.getProducts().then((products) => {
    dispatch(receiveProducts(products));
    return products;
  });
};

//Custom Search
export const receiveSearchProducts = (prod) => ({
  type: types.SEARCH_PRODUCTS,
  products: {
    products: prod.products || [],
    error: prod.products.length ? false : true,
    totalProducts: prod.totalProducts || 0,
    page: prod.page || 0,
    errorMesage: prod.products.length ? '' : 'No Product Found',
  },
});

export const appendReceiveSearchProducts = (products) => ({
  type: types.APPEND_SEARCH_PRODUCTS,
  products,
});

//search Product form server oneBound
export const searchProducts = (keyword) => async (dispatch) => {
  dispatch({
    type: types.RESET_SEARCH,
  });
  dispatch({
    type: types.LOADING_STATE,
  });
  try {
    const result = await searchKeywordApi({ keyword });
    dispatch(receiveSearchProducts(result));
    return result;
  } catch (err) {
    console.log(err);
  }
};

//dispatch products from our server

export const searchProductsLoading = () => async (dispatch) => {
  dispatch({
    type: types.RESET_SEARCH,
  });
  dispatch({
    type: types.LOADING_STATE,
  });
};

export const resetSearchProducts = () => {
  return { type: types.RESET_SEARCH };
};

export const searchImageProducts = () => (dispatch) => {
  dispatch({
    type: types.RESET_SEARCH,
  });
  dispatch({
    type: types.LOADING_STATE,
  });

  // dispatch(receiveSearchProducts(products));
};

export const addProductTosearchProducts = (keyword, page, choice, userId) => (
  dispatch
) => {
  // dispatch({
  //   type:types.LOADING_STATE
  // })
  // taobao(keyword, page, choice, userId).then((products) => {
  //   dispatch(appendReceiveSearchProducts(products));
  //   return products;
  // });
};

export const receiveProductDetails = (productDetails) => ({
  type: types.PRODUCT_DETAILS,
  productDetails,
});

export const resetProductDetails = () => ({
  type: types.RESET_PROD_DETAILS,
});

//search Product Details form server oneBound
export const getProductDetails = (productId) => (dispatch) => {
  dispatch({
    type: types.RESET_PROD_DETAILS,
  });

  // dispatch({
  //   type:types.LOADING_STATE
  // })
  getProductDetailsApi({ productId }).then((prodDetails) => {
    dispatch(receiveProductDetails(prodDetails));
    return prodDetails;
  });
};

export const updateProductPrice = (price) => ({
  type: types.UPDATE_PROD_PRICE,
  price,
});
//Which List

export const whichList = (listName) => ({
  type: types.UPDATE_LIST,
  listName,
});

//SignOut && SignIn

export const storeImage = (image) => ({
  type: types.SET_IMAGE,
  image,
});

export const uploadPercentage = (percentage) => ({
  type: types.SET_UPLOAD_PER,
  percentage,
});

/*********** Modal related Action **********/
// display quickview
export const showQuickViewModal = (productId) => ({
  type: types.SHOW_QUICKVIEW,
  productId,
});

// close quickview modal
export const closeQuickViewModal = () => ({
  type: types.CLOSE_QUICKVIEW,
});

// Show Video & Login modal
export const showModal = (modal) => ({
  type: types.SHOW_MODAL,
  modal: modal,
});

// close Video & Login modal
export const closeModal = (modal) => ({
  type: types.CLOSE_MODAL,
  modal: modal,
});

// don't show Newsletter modal
export const removeNewsletterMdoal = (modal) => ({
  type: types.REMOVE_NEWSLETTER,
});

/************ Cart Action **************/
// add item to cart
export const addToCart = (product, qty, price, sku, skuId, detail) => (
  dispatch
) => {
  toast.success('Item Added to Cart');
  dispatch(addToCartUnsafe(product, qty, price, sku, skuId, detail));
};

// add item to cart : typical action
export const addToCartUnsafe = (product, qty, price, sku, skuId, detail) => ({
  type: types.ADD_TO_CART,
  product,
  qty,
  price,
  sku,
  skuId,
  detail,
});

// remove item from wishlist
export const removeFromWishlist = (productId) => (dispatch) => {
  toast.error('Item removed from Wishlist');
  dispatch({
    type: types.REMOVE_FROM_WISHLIST,
    productId,
  });
};

// add item to cart from wishlist
export const addToCartFromWishlist = (product, qty) => (dispatch) => {
  toast.success('Item added to Cart');

  dispatch({
    type: types.REMOVE_FROM_WISHLIST,
    productId: product.id,
  });

  dispatch(addToCartUnsafe(product, qty));
};

// remove item from cart
export const removeFromCart = (skuId) => (dispatch) => {
  toast.error('Item removed from Cart');
  console.log(skuId);
  dispatch({
    type: types.REMOVE_FROM_CART,
    skuId,
  });
};

// change item's qty
export const changeQty = (skuId, qty, price) => ({
  type: types.CHANGE_QTY,
  skuId,
  qty,
  price,
});

// change shipping method
export const changeShipping = (shipping) => ({
  type: types.CHANGE_SHIPPING,
  shipping,
});

/*********** Wishlist Action *********/

// add item to wishlist
export const toggleWishlist = (product) => (dispatch) => {
  dispatch(toggleWishlistUnsafe(product));
};

// add item to wishlist : typical action
export const toggleWishlistUnsafe = (product) => ({
  type: types.TOGGLE_WISHLIST,
  product,
});

/************* Compare Action ***********/
// add to comparelist
export const addToCompare = (product) => (dispatch) => {
  toast.success('Item added to Compare');
  dispatch(addToCompareUnsafe(product));
};

export const addToCompareUnsafe = (product) => ({
  type: types.ADD_TO_COMPARE,
  product,
});

// remove all items from cartlist
export const removeFromCompare = (productId) => (dispatch) => {
  toast.success('Compare item removed');
  dispatch(removeFromCompareUnsafe(productId));
};

export const removeFromCompareUnsafe = (productId) => ({
  type: types.REMOVE_FROM_COMPARE,
  productId,
});

// reset cartlist with intialstate
export const resetCompare = () => ({
  type: types.RESET_COMPARE,
});

/************** Filter Action ***********/

// set order to sort
export const filterSort = (sortBy) => (dispatch) => {
  dispatch({
    type: types.SORT_BY,
    sortBy,
  });
};

// set price range to get suitable products
export const filterPrice = (range) => (dispatch) => {
  dispatch({
    type: types.PRICE_FILTER,
    range,
  });
};

// add/remove category to get suitable products
export const toggleCategoryFilter = (category) => (dispatch) => {
  dispatch({
    type: types.CATEGORY_FILTER,
    category,
  });
};

// add/remove product size to get suitable products
export const toggleSizeFilter = (size) => (dispatch) => {
  dispatch({
    type: types.SIZE_FILTER,
    size,
  });
};

// add/remove color to get suitable products
export const toggleColorFilter = (color) => (dispatch) => {
  dispatch({
    type: types.COLOR_FILTER,
    color,
  });
};

// add/remove brand to get suitable products
export const toggleBrandFilter = (brand) => (dispatch) => {
  dispatch({
    type: types.BRAND_FILTER,
    brand,
  });
};

// add/remove rating to get suitable products
export const toggleRatingFilter = (rating) => (dispatch) => {
  dispatch({
    type: types.RATING_FILTER,
    rating,
  });
};

// reset filter with intialstate
export const resetFilter = () => (dispatch) => {
  dispatch({
    type: types.RESET_FILTER,
  });
};

/************** Newsletter Modal ************/

// hide newsletter modal in homepage
export const hideNewsletterModal = () => ({
  type: types.HIDE_NEWSLETTER_MODAL,
});

/************** AUTHENTICATION *************/
export const signOut = () => ({
  type: types.SIGN_OUT,
});

export const signIn = (userId, email, token) => ({
  type: types.SIGN_IN,
  payload: {
    userId,
    email,
    token,
  },
});

export const authStart = () => {
  return {
    type: types.AUTH_START,
  };
};

export const authSuccess = (token, userId, expires) => {
  return {
    type: types.AUTH_SUCCESS,
    token: token,
    userId: userId,
    expires,
  };
};

export const authFail = (error) => {
  return {
    type: types.AUTH_FAIL,
    error: error,
  };
};

export const LOAD = (cart) => ({
  type: types.LOAD,
  cart,
});

export const CHOICE = (choice) => ({
  type: types.CHOICE,
  choice,
});

/************** Authentication New **************/

export const cognitoSignInCheck = (result) => ({
  type: types.COGNITO_SIGNIN_CHECK,
  payload:{
    isLoggedIn: result.isLoggedIn,
    username: result.username,
    email: result.email,
    mobile: result.mobile,
  }
  
});
