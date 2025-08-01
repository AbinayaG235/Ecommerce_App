import { call, put, takeEvery, all } from 'redux-saga/effects';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_CATEGORIES_REQUEST,
  Product,
} from '../types';
import {
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from '../actions/productActions';
import { getProducts, getCategories, getProductById, getProductsByCategory } from '../../api/product';

export function* fetchProductsSaga(): Generator<any, void, Product[]> {
  try {
    const products = yield call(getProducts);
    yield put(fetchProductsSuccess(products));
  } catch (e: any) {
    yield put(fetchProductsFailure(e.message || 'Failed to fetch products'));
  }
}

export function* fetchCategoriesSaga(): Generator<any, void, string[]> {
  try {
    const categories = yield call(getCategories);
    yield put(fetchCategoriesSuccess(categories));
  } catch (e: any) {
    yield put(fetchCategoriesFailure(e.message || 'Failed to fetch categories'));
  }
}

export function* watchProductSagas() {
  yield all([
    takeEvery(FETCH_PRODUCTS_REQUEST, fetchProductsSaga),
    takeEvery(FETCH_CATEGORIES_REQUEST, fetchCategoriesSaga),
  ]);
}