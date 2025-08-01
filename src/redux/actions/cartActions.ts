import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  Product,
  CartActionTypes,
} from '../types';

export const addToCart = (product: Product): CartActionTypes => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = (productId: number): CartActionTypes => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};

export const updateCartItemQuantity = (
  productId: number,
  quantity: number
): CartActionTypes => {
  return {
    type: UPDATE_CART_ITEM_QUANTITY,
    payload: { productId, quantity },
  };
};