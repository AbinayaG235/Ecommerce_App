import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import createMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import CartScreen from '../src/screens/CartScreen';
import { CartItem } from '../src/redux/types';
import { AppState } from '../src/redux/types';
import { Alert } from 'react-native';
import * as CartActions from '../src/redux/actions/cartActions'; 


jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.spyOn(Alert, 'alert');


const mockStore = createMockStore<AppState>();
let store;


const mockCartItem1: CartItem = {
  id: 1, title: 'Item 1', price: 10.50, quantity: 2,
  description: '', category: '', image: 'urlA', rating: {rate:4, count:100}
};
const mockCartItem2: CartItem = {
  id: 2, title: 'Item 2', price: 5.00, quantity: 1,
  description: '', category: '', image: 'urlB', rating: {rate:3, count:50}
};

describe('CartScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    jest.spyOn(CartActions, 'removeFromCart');
    jest.spyOn(CartActions, 'updateCartItemQuantity');
  });

  

  test('renders empty cart view correctly', () => {
    const emptyState: AppState = { cart: { items: [] }, products: {} as any};
    store = mockStore(emptyState);
    render(
      <Provider store={store}>
        <CartScreen />
      </Provider>
    );
    expect(screen.getByText('Your cart is empty!')).toBeTruthy();
    expect(screen.getByText('Continue Shopping')).toBeTruthy();
    expect(screen.queryByText('Total:')).toBeNull();
  });

  test('renders cart items and correct total price', () => {
    const filled: AppState = {
      cart: { items: [mockCartItem1, mockCartItem2] },
      products: {} as any
    };
    store = mockStore(filled);
    render(
      <Provider store={store}>
        <CartScreen />
      </Provider>
    );
    expect(screen.getByText('Item 1')).toBeTruthy();
    expect(screen.getByText('Item 2')).toBeTruthy();

    expect(screen.getByText('Total: $26.00')).toBeTruthy();
  });


  test('dispatches updateCartItemQuantity to increase quantity on "+" press', () => {
    const filledState: AppState = {
      cart: { items: [mockCartItem1] },
      products: {} as any
    };
    store = mockStore(filledState);
    render(
      <Provider store={store}>
        <CartScreen />
      </Provider>
    );

    const plusButton = screen.getAllByText('+')[0]; 
    fireEvent.press(plusButton);

    expect(CartActions.updateCartItemQuantity).toHaveBeenCalledWith(
      mockCartItem1.id, 
      mockCartItem1.quantity + 1 
    );
  });

  
  test('dispatches updateCartItemQuantity to decrease quantity on "-" press', () => {
    const filledState: AppState = {
      cart: { items: [mockCartItem1] },
      products: {} as any
    };
    store = mockStore(filledState);
    render(
      <Provider store={store}>
        <CartScreen />
      </Provider>
    );

    const minusButton = screen.getAllByText('-')[0];
    fireEvent.press(minusButton);

    expect(CartActions.updateCartItemQuantity).toHaveBeenCalledWith(
      mockCartItem1.id,
      mockCartItem1.quantity - 1
    );
  });

  test('after user confirms removal from alert remove item', async () => {
    const filledState: AppState = {
      cart: { items: [mockCartItem1] },
      products: {} as any,
    };
    store = mockStore(filledState);
    render(
      <Provider store={store}>
        <CartScreen />
      </Provider>
    );


    const removeButton = screen.getByTestId('remove-item'); 
    fireEvent.press(removeButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Remove Item?',
      'Are you sure you want to remove this item from your cart?',
      expect.arrayContaining([
        expect.objectContaining({ text: 'Yes, Remove', onPress: expect.any(Function) }),
      ])
    );

    const removeButtonInAlert = (Alert.alert as jest.Mock).mock.calls[0][2][1];
    removeButtonInAlert.onPress();

    expect(CartActions.removeFromCart).toHaveBeenCalledWith(mockCartItem1.id);
  });

  test('alert for removing when dec to 0 on "-" press', () => {
    const filledState: AppState = {
      cart: { items: [mockCartItem2] }, 
      products: {} as any
    };
    store = mockStore(filledState);
    render(
      <Provider store={store}>
        <CartScreen />
      </Provider>
    );

    const minusButton = screen.getAllByText('-')[0];
    fireEvent.press(minusButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Remove Item?',
      'Do you want to remove this item from the cart?',
      expect.arrayContaining([
        expect.objectContaining({ text: 'Remove', onPress: expect.any(Function) }),
      ])
    );
    expect(CartActions.updateCartItemQuantity).not.toHaveBeenCalled();
    expect(CartActions.removeFromCart).not.toHaveBeenCalled();
  });

  test('shows alert when checkout button is pressed', () => {
    const filledState: AppState = { cart: { items: [mockCartItem1] }, products: {} as any };
    store = mockStore(filledState);
    render(
      <Provider store={store}>
        <CartScreen />
      </Provider>
    );
    fireEvent.press(screen.getByText('Proceed to Checkout'));
    expect(Alert.alert).toHaveBeenCalledWith('Checkout', 'Proceeding to placeholder checkout...');
  });
});