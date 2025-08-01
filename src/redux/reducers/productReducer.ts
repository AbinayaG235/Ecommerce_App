import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  SET_ACTIVE_CATEGORY,
  ProductState,
  ProductActionTypes,
  CategoryActionTypes,
} from '../types';

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  categories: [],
  activeCategory: null,
};

const productReducer = (
  state = initialState,
  action: ProductActionTypes | CategoryActionTypes
): ProductState => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case FETCH_CATEGORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_ACTIVE_CATEGORY:
      return { ...state, activeCategory: action.payload };
    default:
      return state;
  }
};

export default productReducer;