import { expectSaga } from 'redux-saga-test-plan';
import { call, put } from 'redux-saga/effects';
import {FETCH_PRODUCTS_REQUEST,FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE,} from '../src/redux/types';
import {
  fetchProductsSuccess, fetchProductsFailure,
  fetchCategoriesSuccess, fetchCategoriesFailure,
} from '../src/redux/actions/productActions';
import { getProducts, getCategories } from '../src/api/product'; 
import { fetchProductsSaga, fetchCategoriesSaga } from '../src/redux/saga/productSaga'; 



describe('Product Sagas', () => {
    
  test('fetchProductsSaga should fetch products successfully', () => {
    const mockProducts = [{ id: 1, title: 'Mock Product', price: 10,description : 'description', category: 'test', image: '', rating: {rate:0, count:0} }];
    return expectSaga(fetchProductsSaga)
      .provide([
        [call(getProducts), mockProducts], 
      ])
      .put(fetchProductsSuccess(mockProducts)) 
      .dispatch({ type: FETCH_PRODUCTS_REQUEST }) 
      .run();
  });


  test('fetchProductsSaga should handle product fetch failure', () => {
    const errorMessage = 'Network error';
    return expectSaga(fetchProductsSaga)
      .provide([
        [call(getProducts), Promise.reject(new Error(errorMessage))], 
      ])
      .put(fetchProductsFailure(errorMessage)) 
      .dispatch({ type: FETCH_PRODUCTS_REQUEST })
      .run();
  });

  test('fetchCategoriesSaga should fetch categories successfully', () => {
    const mockCategories = ['electronics', 'books'];
    return expectSaga(fetchCategoriesSaga)
      .provide([
        [call(getCategories), mockCategories], 
      ])
      .put(fetchCategoriesSuccess(mockCategories)) 
      .dispatch({ type: FETCH_CATEGORIES_REQUEST }) 
      .run();
  });

  test('fetchCategoriesSaga should handle category fetch failure', () => {
    const errorMessage = 'API error';
    return expectSaga(fetchCategoriesSaga)
      .provide([
        [call(getCategories), Promise.reject(new Error(errorMessage))], 
      ])
      .put(fetchCategoriesFailure(errorMessage)) 
      .dispatch({ type: FETCH_CATEGORIES_REQUEST })
      .run();
  });
});
