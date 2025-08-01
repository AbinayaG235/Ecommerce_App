
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  Product,
} from '../src/redux/types'; 

import { addToCart, removeFromCart, updateCartItemQuantity } from '../src/redux/actions/cartActions';

describe('Cart Actions', () => {
  const mockProduct: Product = {id: 1, title: 'Test Product', price: 100, description: '', category: '', image: '', rating: { rate: 0, count: 0 }};

  test('addToCart should create an ADD_TO_CART action with a product', () => {
    expect(addToCart(mockProduct)).toEqual({
      type: ADD_TO_CART,
      payload: mockProduct,
    });
  });

  test('create a REMOVE_FROM_CART action with id', () => {
    expect(removeFromCart(1)).toEqual({
      type: REMOVE_FROM_CART,
      payload: 1,
    });
  });

  test('should create an UPDATE_CART_ITEM_QUANTITY action with productId and quantity', () => {
    expect(updateCartItemQuantity(1, 5)).toEqual({
      type: UPDATE_CART_ITEM_QUANTITY,
      payload: { productId: 1, quantity: 5 },
    });
  });
});