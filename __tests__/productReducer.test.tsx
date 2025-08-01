import productReducer from '../src/redux/reducers/productReducer';
import {
  FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE,
  FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE,
  SET_ACTIVE_CATEGORY,
  ProductState, Product
} from '../src/redux/types';

const initialState: ProductState = {
  products: [], loading: false, error: null, categories: [], activeCategory: null,
};

describe('Product Reducer', () => {
  test('should return the initial state', () => {
    expect(productReducer(undefined, {} as any)).toEqual(initialState);
  });

  test('should handle FETCH_PRODUCTS_REQUEST', () => {
    expect(productReducer(initialState, { type: FETCH_PRODUCTS_REQUEST })).toEqual({
      ...initialState, loading: true, error: null,
    });
  });

  test('should handle FETCH_PRODUCTS_SUCCESS', () => {
    const mockProducts: Product[] = [{ id: 1, title: 'Test Product', price: 10,description:'about product', category: 'test', image: '', rating: {rate:0, count:0} }];
    expect(productReducer(initialState, { type: FETCH_PRODUCTS_SUCCESS, payload: mockProducts })).toEqual({
      ...initialState, loading: false, products: mockProducts,
    });
  });

  test('should handle FETCH_PRODUCTS_FAILURE', () => {
    const errorMessage = 'Network error';
    expect(productReducer(initialState, { type: FETCH_PRODUCTS_FAILURE, payload: errorMessage })).toEqual({
      ...initialState, loading: false, error: errorMessage,
    });
  });

  test('should handle FETCH_CATEGORIES_REQUEST', () => {
    expect(productReducer(initialState, { type: FETCH_CATEGORIES_REQUEST })).toEqual({
      ...initialState, loading: true, error: null,
    });
  });

  test('should handle FETCH_CATEGORIES_SUCCESS', () => {
    const mockCategories = ['cat1', 'cat2'];
    expect(productReducer(initialState, { type: FETCH_CATEGORIES_SUCCESS, payload: mockCategories })).toEqual({
      ...initialState, loading: false, categories: mockCategories,
    });
  });

  test('should handle FETCH_CATEGORIES_FAILURE', () => {
    const errorMessage = 'Category error';
    expect(productReducer(initialState, { type: FETCH_CATEGORIES_FAILURE, payload: errorMessage })).toEqual({
      ...initialState, loading: false, error: errorMessage,
    });
  });

  test('should handle SET_ACTIVE_CATEGORY', () => {
    expect(productReducer(initialState, { type: SET_ACTIVE_CATEGORY, payload: 'electronics' })).toEqual({
      ...initialState, activeCategory: 'electronics',
    });
    expect(productReducer(initialState, { type: SET_ACTIVE_CATEGORY, payload: null })).toEqual({
      ...initialState, activeCategory: null,
    });
  });
});