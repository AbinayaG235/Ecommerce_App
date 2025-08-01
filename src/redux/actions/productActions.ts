import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  SET_ACTIVE_CATEGORY,
  Product,
  ProductActionTypes,
  CategoryActionTypes,
} from '../types';

export const fetchProductsRequest = (): ProductActionTypes => {
  return {
    type: FETCH_PRODUCTS_REQUEST,
  };
};

export const fetchProductsSuccess = (products: Product[]): ProductActionTypes => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const fetchProductsFailure = (error: string): ProductActionTypes => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
  };
};

export const fetchCategoriesRequest = (): CategoryActionTypes => {
  return {
    type: FETCH_CATEGORIES_REQUEST,
  };
};

export const fetchCategoriesSuccess = (categories: string[]): CategoryActionTypes => {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categories,
  };
};

export const fetchCategoriesFailure = (error: string): CategoryActionTypes => {
  return {
    type: FETCH_CATEGORIES_FAILURE,
    payload: error,
  };
};

export const setActiveCategory = (category: string | null): CategoryActionTypes => {
  return {
    type: SET_ACTIVE_CATEGORY,
    payload: category,
  };
};