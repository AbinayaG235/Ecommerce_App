import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import HomeScreen from '../src/screens/HomeScreen';
import { Alert } from 'react-native';
import { ProductState, AppState, Product } from '../src/redux/types';
import {
  fetchProductsRequest,
  fetchCategoriesRequest,
  setActiveCategory,
} from '../src/redux/actions/productActions';
import { addToCart } from '../src/redux/actions/cartActions';


jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.spyOn(Alert, 'alert');


const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      openDrawer: jest.fn(),
    }),
  };
});


jest.mock('../src/api/product', () => ({
  __esModule: true,
  getProducts: jest.fn(),
  getCategories: jest.fn(),
  getProductById: jest.fn(),
  getProductsByCategory: jest.fn(),
}));



const mockStore = configureMockStore<AppState>();
const initialProductState: ProductState = {
  products: [],
  loading: false,
  error: null,
  categories: [],
  activeCategory: null,
};
const initialCartState = { items: [] };
const initialAuthState = { userToken: null, isLoggedIn: false, hasSeenOnboarding: false };

const initialState: AppState = {
  products: initialProductState,
  cart: initialCartState,
};

describe('HomeScreen', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore(initialState);
  });

  
  describe('renders loading state initially and dispatches fetch requests', () => {
    store = mockStore({ ...initialState, products: { ...initialState.products, loading: true } });
    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    expect(screen.getByText('Loading Products and Categories data...')).toBeTruthy();

    
    expect(store.getActions()).toEqual([
      fetchProductsRequest(),
      //fetchCategoriesRequest(),
    ]);
  });

  
  test('renders products and categories after successful fetch', async () => {
    
    store = mockStore({
      ...initialState,
      products: {
        ...initialState.products,
        products: [
          { id: 1, title: 'Product A', price: 10,description: 'about', category: 'electronics', image: 'urlA', rating: {rate:4, count:100} },
        ],
        categories: ['electronics'], 
      },
    });

    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Product A')).toBeTruthy();
    });
    await waitFor(() => {
      expect(screen.getByText('electronics')).toBeTruthy();
      //expect(screen.getByText('jewelery')).toBeTruthy(); 
    });
  });

  
  test('filters products when a category is clicked', async () => {
    
    store = mockStore({
      ...initialState,
      products: {
        ...initialState.products,
        products: [
          { id: 1, title: 'Prod A', price: 10, description: 'about', category: 'electronics', image: 'urlA', rating: {rate:4, count:100} },
          { id: 2, title: 'Prod B', price: 20, description: 'about', category: 'jewelery', image: 'urlB', rating: {rate:3, count:50} },
          { id: 3, title: 'Prod C', price: 15, description: 'about', category: 'electronics', image: 'urlC', rating: {rate:4.5, count:200} },
        ],
        categories: ['electronics', 'jewelery'],
      },
    });

    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('electronics')).toBeTruthy();
    });

    fireEvent.press(screen.getByText('electronics'));
    expect(store.getActions()).toContainEqual(setActiveCategory('electronics'));

    await waitFor(() => {
      expect(screen.getByText('Prod A')).toBeTruthy();
      //expect(screen.queryByText('Prod C')).toBeNull();
    });
  });
  
  test('dispatches addToCart when add to cart button is pressed', async () => {
    const productToAdd = { id: 1, title: 'Product Z', price: 100, category: 'electronics', image: 'urlZ', rating: {rate:5, count:10}, description: 'test' };
    store = mockStore({
      ...initialState,
      products: {
        ...initialState.products,
        products: [productToAdd],
      },
    });

    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Product Z')).toBeTruthy();
    });

    fireEvent.press(screen.getByText('Add to Cart'));

    expect(Alert.alert).toHaveBeenCalledWith('Success', 'Product Z added to cart!');
    expect(store.getActions()).toContainEqual(addToCart(productToAdd));
  });

  
  test('navigates to ProductDetail when product card is pressed', async () => {
    const productToView = { id: 5, title: 'Product X', price: 50, category: 'books', image: 'urlX', rating: {rate:4.2, count:70}, description: 'test' };
    store = mockStore({
      ...initialState,
      products: {
        ...initialState.products,
        products: [productToView],
      },
    });

    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Product X')).toBeTruthy();
    });

    fireEvent.press(screen.getByText('Product X'));

    expect(mockNavigate).toHaveBeenCalledWith('ProductDetail', { productId: productToView.id });
  });
});