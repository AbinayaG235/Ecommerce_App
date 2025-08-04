import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductDetailScreen from '../src/screens/ProductDetailScreen';
import { Product } from '../src/redux/types';
import * as productApi from '../src/api/product';
import * as cartActions from '../src/redux/actions/cartActions';
import { Alert } from 'react-native';
import { Store, UnknownAction } from 'redux';

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.spyOn(Alert, 'alert');

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useRoute: () => ({
      params: { productId: 1 },
    }),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

jest.mock('../src/api/product', () => ({
  getProductById: jest.fn(),
}));

const mockStore = configureStore([]);
const initialState = {
  cart: {
    items: [],
  },
};
let store: Store<unknown, UnknownAction, unknown>;

describe('ProductDetailScreen', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Detailed Product',
    price: 99.99,
    description: 'This is a long and descriptive text about the product.',
    category: 'electronics',
    image: 'http://example.com/image.jpg',
    rating: { rate: 4.5, count: 123 },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore(initialState);
    (productApi.getProductById as jest.Mock).mockResolvedValue(mockProduct);
    jest.spyOn(cartActions, 'addToCart');
  }
);

  test('renders loading state initially', () => {
    (productApi.getProductById as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(
      <Provider store={store}>
        <ProductDetailScreen />
      </Provider>
    );
    expect(screen.getByText('Loading Product Details...')).toBeTruthy();
  });

  test('renders error state on fetch failure', async () => {
    (productApi.getProductById as jest.Mock).mockRejectedValue(new Error('Failed to fetch!'));
    render(
      <Provider store={store}>
        <ProductDetailScreen />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch!'));
    });
  });

  test('renders product not found state if API returns null', async () => {
    (productApi.getProductById as jest.Mock).mockResolvedValue(null);
    render(
      <Provider store={store}>
        <ProductDetailScreen />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText('Product not found.')).toBeTruthy();
    });
  });

  test('renders product details after successful fetch', async () => {
    render(
      <Provider store={store}>
        <ProductDetailScreen />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText('Detailed Product')).toBeTruthy();
      expect(screen.getByText('$99.99')).toBeTruthy();
      expect(screen.getByText('This is a long and descriptive text about the product.')).toBeTruthy();
      expect(screen.getByText('Rating: 4.5 (123 reviews)')).toBeTruthy();
    });
    expect(productApi.getProductById).toHaveBeenCalledWith(1);
  });

  test('dispatches addToCart action and shows alert when button is pressed', async () => {
    render(
      <Provider store={store}>
        <ProductDetailScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Add to Cart')).toBeTruthy();
    });

    fireEvent.press(screen.getByText('Add to Cart'));

    expect(cartActions.addToCart).toHaveBeenCalledWith(mockProduct);
    expect(Alert.alert).toHaveBeenCalledWith('Success', 'Detailed Product added to cart!');
  });
});