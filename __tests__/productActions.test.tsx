import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  SET_ACTIVE_CATEGORY,
  Product, 
} from '../src/redux/types'; 



import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  setActiveCategory,
} from '../src/redux/actions/productActions';

describe('Product Actions', () => {
  test('fetchProductsRequest should create a FETCH_PRODUCTS_REQUEST action', () => {
    expect(fetchProductsRequest()).toEqual({
      type: FETCH_PRODUCTS_REQUEST,
    });
  });

  test('create a FETCH_PRODUCTS_SUCCESS action with products payload', () => {
    const mockProducts: Product[] = [
      { id: 1, title: 'Product 1', price: 10, description: '', category: 'electronics', image: '', rating: { rate: 4, count: 100 } },
      { id: 2, title: 'Product 2', price: 20, description: '', category: 'jewelry', image: '', rating: { rate: 3, count: 50 } },
    ];
    expect(fetchProductsSuccess(mockProducts)).toEqual({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: mockProducts,
    });
  });

  test('create a FETCH_PRODUCTS_FAILURE action with an error message ', () => {
    const errorMessage = 'Failed to load products from API.';
    expect(fetchProductsFailure(errorMessage)).toEqual({
      type: FETCH_PRODUCTS_FAILURE,
      payload: errorMessage,
    });
  });

  test('create a FETCH_CATEGORIES_REQUEST action', () => {
    expect(fetchCategoriesRequest()).toEqual({
      type: FETCH_CATEGORIES_REQUEST,
    });
  });

  test('FETCH_CATEGORIES_SUCCESS action with categories payload need to be created', () => {
    const mockCategories: string[] = ['electronics', 'jewelry', 'men\'s clothing'];
    expect(fetchCategoriesSuccess(mockCategories)).toEqual({
      type: FETCH_CATEGORIES_SUCCESS,
      payload: mockCategories,
    });
  });
  
  test('create a FETCH_CATEGORIES_FAILURE action with an error message payload', () => {
    const errorMessage = 'Failed to load categories.';
    expect(fetchCategoriesFailure(errorMessage)).toEqual({
      type: FETCH_CATEGORIES_FAILURE,
      payload: errorMessage,
    });
  });

  
  test('setActiveCategory should create a SET_ACTIVE_CATEGORY action with a category name', () => {
    const categoryName = 'electronics';
    expect(setActiveCategory(categoryName)).toEqual({
      type: SET_ACTIVE_CATEGORY,
      payload: categoryName,
    });
  });

  test('setActiveCategory should create a SET_ACTIVE_CATEGORY action with null for "All Products"', () => {
    expect(setActiveCategory(null)).toEqual({
      type: SET_ACTIVE_CATEGORY,
      payload: null,
    });
  });
});