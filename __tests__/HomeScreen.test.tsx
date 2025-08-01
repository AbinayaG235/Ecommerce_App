import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import createMockStore from 'redux-mock-store'; 
import { Provider } from 'react-redux';
import HomeScreen from '../src/screens/HomeScreen'; 
import { Alert } from 'react-native';
import { ASYNC_STORAGE_KEYS, ProductState, AppState } from '../src/redux/types'; 
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchCategoriesRequest, 
  fetchCategoriesSuccess, 
  setActiveCategory,
} from '../src/redux/actions/productActions';
import { addToCart } from '../src/redux/actions/cartActions';
import * as Navigation from '@react-navigation/native'; 
import * as ProductAPI from '../src/api/product'; 
import ProductDetailScreen from '../src/screens/ProductDetailScreen';


jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');

jest.spyOn(Alert, 'alert');

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    
    }),
  };
});

jest.mock('../src/api/product', () => ({
  getProducts: jest.fn(() => Promise.resolve([
    { id: 1, title: 'Product A', price: 10, category: 'electronics', image: 'urlA', rating: {rate:4, count:100} },
    { id: 2, title: 'Product B', price: 20, category: 'jewelery', image: 'urlB', rating: {rate:3, count:50} },
    { id: 3, title: 'Product C', price: 15, category: 'electronics', image: 'urlC', rating: {rate:4.5, count:200} },
    { id: 4, title: 'Product D', price: 25, category: 'men\'s clothing', image: 'urlD', rating: {rate:3.8, count:80} },
  ])),
  getCategories: jest.fn(() => Promise.resolve(['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'])),
}));


const mockStore = createMockStore<AppState>();

const initialProductState: ProductState = {
  products: [],
  loading: false,
  error: null,
  categories: [],
  activeCategory: null,
};

const initialCartState = { items: [] }; 

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


  test('renders loading state initially', () => {
    store = mockStore({ ...initialState, products: { ...initialState.products, loading: true } });
    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    expect(screen.getByText('Loading Products and Categories data...')).toBeTruthy();
    expect(store.getActions()).toEqual([
      fetchProductsRequest(),
      
    ]);
  });

  test('renders products and categories after successful fetch', async () => {
    (ProductAPI.getProducts as jest.Mock).mockResolvedValue([
      { id: 1, title: 'Fetched Product 1', price: 10, category: 'electronics', image: 'url1', rating: {rate:4, count:100} },
    ]);
    (ProductAPI.getCategories as jest.Mock).mockResolvedValue(['electronics']);

    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Fetched Product 1')).toBeTruthy();
    });
    await waitFor(() => {
      expect(screen.getByText('electronics')).toBeTruthy(); 
    });


    expect(store.getActions()).toContainEqual(fetchProductsRequest());
    expect(store.getActions()).toContainEqual(fetchCategoriesRequest());



    expect(ProductAPI.getProducts).toHaveBeenCalledTimes(1);
    expect(ProductAPI.getCategories).toHaveBeenCalledTimes(1);

  });

  // test('filters products when a category is clicked', async () => {
  //   store = mockStore({
  //     ...initialState,
  //     products: {
  //       ...initialState.products,
  //       products: [
  //         { id: 1, title: 'Prod A', price: 10, category: 'electronics', image: 'urlA', rating: {rate:4, count:100} },
  //         { id: 2, title: 'Prod B', price: 20, category: 'jewelery', image: 'urlB', rating: {rate:3, count:50} },
  //         { id: 3, title: 'Prod C', price: 15, category: 'electronics', image: 'urlC', rating: {rate:4.5, count:200} },
  //       ],
  //       categories: ['electronics', 'jewelery'],
  //     },
  //   });

  //   render(
  //     <Provider store={store}>
  //       <HomeScreen />
  //     </Provider>
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText('electronics')).toBeTruthy();
  //     expect(screen.getByText('jewelery')).toBeTruthy();
  //   });

  //   fireEvent.press(screen.getByText('jewelery'));

  //   expect(store.getActions()).toContainEqual(setActiveCategory('jewelery'));

  //   await waitFor(() => {
  //     expect(screen.getByText('Prod B')).toBeTruthy();
  //     expect(screen.queryByText('Prod A')).toBeNull(); 
  //     expect(screen.queryByText('Prod C')).toBeNull(); 
  //   });

  //   fireEvent.press(screen.getByText('All'));

  //   expect(store.getActions()).toContainEqual(setActiveCategory(null)); 

  //   await waitFor(() => {
  //     expect(screen.getByText('Prod A')).toBeTruthy();
  //     expect(screen.getByText('Prod B')).toBeTruthy();
  //     expect(screen.getByText('Prod C')).toBeTruthy();
  //   });
  // });

  test('dispatches addToCart', async () => {
    const productToAdd = { id: 1, title: 'Product', price: 100, category: 'electronics', image: 'url', rating: {rate:5, count:10}, 'description' : 'about this product' };
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
      expect(screen.getByText('Product')).toBeTruthy();
    });

    fireEvent.press(screen.getByText('Add to Cart')); 

    expect(Alert.alert).toHaveBeenCalledWith('Success', 'Product added to cart!');

    expect(store.getActions()).toContainEqual(addToCart(productToAdd));
  });

//   test('navigates to ProductDetail when product card is pressed', async () => {
//     const productToView = { id: 5, title: 'Product', price: 50, category: 'books', image: 'urlX', rating: {rate:4.2, count:70} };
//     store = mockStore({
//       ...initialState,
//       products: {
//         ...initialState.products,
//         products: [productToView],
//       },
//     });

//     render(
//       <Provider store={store}>
//         <ProductDetailScreen/>
//       </Provider>
//     );

//     await waitFor(() => {
//       expect(screen.getByText('Product')).toBeTruthy();
//     });

//     fireEvent.press(screen.getByText('Product'));

//     expect(mockNavigate).toHaveBeenCalledWith('ProductDetail', { productId: productToView.id });
// });
});