import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_QTY,
  CHANGE_SHIPPING,
  REFRESH_STORE,
  LOAD,
} from '../constants/action-types';
import { findIndex } from '../utils';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  cart: [],
  shipping: 'free',
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const productId = action.product.id;
      const price = action.price;
      const skus = action.sku;
      const skuId = action.skuId;

      const detail = action.detail;

      if (findIndex(state.cart, (product) => product.skuId === skuId) !== -1) {
        const cart = state.cart.reduce((cartAcc, product) => {
          if (product.skuId === skuId) {
            cartAcc.push({
              ...product,
              qty: parseInt(product.qty) + parseInt(action.qty),
              sum:
                (product.discount ? product.salePrice : product.price) *
                (parseInt(product.qty) + parseInt(action.qty)),
              price,
              skus,
              skuId,
              detail,
            }); // Increment qty
          } else {
            cartAcc.push(product);
          }
          return cartAcc;
        }, []);

        return { ...state, cart };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.product,
            qty: action.qty,
            sum:
              (action.product.discount
                ? action.product.salePrice
                : action.price) * action.qty,
            price,
            skus,
            skuId,
            detail,
          },
        ],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.skuId !== action.skuId),
      };

    case CHANGE_QTY:
      const cart = state.cart.reduce((cartAcc, product) => {
        if (product.skuId === action.skuId) {
          cartAcc.push({
            ...product,
            qty: action.qty,
            sum:
              (product.discount ? product.salePrice : product.price) *
              action.qty,
          }); // Increment qty
        } else {
          cartAcc.push(product);
        }
        return cartAcc;
      }, []);

      return { ...state, cart };

    case REFRESH_STORE:
      return { ...state, cart: [], shipping: 'free' };

    case CHANGE_SHIPPING:
      return { ...state, shipping: action.shipping };

    case LOAD:
      return { ...state, ...action.cart };

    default:
      return state;
  }
}

const persistConfig = {
  keyPrefix: 'kachuwa-',
  key: 'cartlist',
  storage,
};

export default persistReducer(persistConfig, cartReducer);
