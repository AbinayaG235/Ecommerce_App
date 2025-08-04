import cartReducer from '../src/redux/reducers/cartReducer';
import {
  ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM_QUANTITY,
  CartState, Product
} from '../src/redux/types';

const mockProduct1: Product = { id: 1, title: 'P1', price: 10, description: '', category: '', image: '', rating: {rate:0, count:0} };
const mockProduct2: Product = { id: 2, title: 'P2', price: 20, description: '', category: '', image: '', rating: {rate:0, count:0} };

const initialState: CartState = { items: [] };

describe('Cart Reducer', () => {
  test('should return the initial state', () => {
    expect(cartReducer(undefined, {} as any)).toEqual(initialState);
  });

  test('should handle ADD_TO_CART for new item', () => {
    const action = { type: ADD_TO_CART, payload: mockProduct1 };
    expect(cartReducer(initialState, action)).toEqual({
      items: [{ ...mockProduct1, quantity: 1 }],
    });
  });

  test('adding existing item', () => {
    const stateWithItem: CartState = { items: [{ ...mockProduct1, quantity: 1 }] };
    const action = { type: ADD_TO_CART, payload: mockProduct1 };
    expect(cartReducer(stateWithItem, action)).toEqual({
      items: [{ ...mockProduct1, quantity: 2 }],
    });
  });

  test('should handle REMOVE_FROM_CART', () => {
    const stateWithItems: CartState = { items: [{ ...mockProduct1, quantity: 1 }, { ...mockProduct2, quantity: 1 }] };
    const action = { type: REMOVE_FROM_CART, payload: mockProduct1.id };
    expect(cartReducer(stateWithItems, action)).toEqual({
      items: [{ ...mockProduct2, quantity: 1 }],
    });
  });

  test('should handle UPDATE_CART_ITEM_QUANTITY to increase', () => {
    const stateWithItem: CartState = { items: [{ ...mockProduct1, quantity: 1 }] };
    const action = { type: UPDATE_CART_ITEM_QUANTITY, payload: { productId: mockProduct1.id, quantity: 2 } };
    expect(cartReducer(stateWithItem, action)).toEqual({
      items: [{ ...mockProduct1, quantity: 2 }],
    });
  });

  test('decrease and not remove if > 0', () => {
    const stateWithItem: CartState = { items: [{ ...mockProduct1, quantity: 5 }] };
    const action = { type: UPDATE_CART_ITEM_QUANTITY, payload: { productId: mockProduct1.id, quantity: 2 } };
    expect(cartReducer(stateWithItem, action)).toEqual({
      items: [{ ...mockProduct1, quantity: 2 }],
    });
  });


  test('should handle if quantity is 0 or less by removing item', () => {
    const stateWithItem: CartState = { items: [{ ...mockProduct1, quantity: 1 }] };
    const action = { type: UPDATE_CART_ITEM_QUANTITY, payload: { productId: mockProduct1.id, quantity: 0 } };
    expect(cartReducer(stateWithItem, action)).toEqual({
      items: [],
    });
    const action2 = { type: UPDATE_CART_ITEM_QUANTITY, payload: { productId: mockProduct1.id, quantity: -1 } };
    expect(cartReducer(stateWithItem, action2)).toEqual({
      items: [],
    });
  });
});