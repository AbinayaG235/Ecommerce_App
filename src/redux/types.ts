export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM_QUANTITY = 'UPDATE_CART_ITEM_QUANTITY';

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FetchProductsRequestAction {
  type: typeof FETCH_PRODUCTS_REQUEST;
}

export interface FetchProductsSuccessAction {
  type: typeof FETCH_PRODUCTS_SUCCESS;
  payload: Product[];
}

export interface FetchProductsFailureAction {
  type: typeof FETCH_PRODUCTS_FAILURE;
  payload: string;
}

export interface FetchCategoriesRequestAction {
  type: typeof FETCH_CATEGORIES_REQUEST;
}

export interface FetchCategoriesSuccessAction {
  type: typeof FETCH_CATEGORIES_SUCCESS;
  payload: string[];
}

export interface FetchCategoriesFailureAction {
  type: typeof FETCH_CATEGORIES_FAILURE;
  payload: string;
}

export interface SetActiveCategoryAction {
  type: typeof SET_ACTIVE_CATEGORY;
  payload: string | null;
}

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: Product;
}

export interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: number;
}

export interface UpdateCartItemQuantityAction {
  type: typeof UPDATE_CART_ITEM_QUANTITY;
  payload: {
    productId: number;
    quantity: number;
  };
}

export type ProductActionTypes =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailureAction;

export type CategoryActionTypes =
  | FetchCategoriesRequestAction
  | FetchCategoriesSuccessAction
  | FetchCategoriesFailureAction
  | SetActiveCategoryAction;

export type CartActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | UpdateCartItemQuantityAction;


export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
  activeCategory: string | null;
}

export interface CartState {
  items: CartItem[];
}

export interface AppState {
  products: ProductState;
  cart: CartState;
}

export interface User {
  email: string;
  password: string;
}

export const LOGOUT = 'LOGOUT';

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes = LogoutAction;
export const ASYNC_STORAGE_KEYS = {
  USERS: 'Registered_users',
  USER_TOKEN: 'userToken',
  ONBOARDING_COMPLETE: 'onboarding_complete',
};

import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  MainApp: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  ProductDetail: { productId: number };
  Cart: undefined;
  Search: undefined;
  Profile : undefined;
};

export type BottomTabParamList = {
  HomeTab: undefined;
  CartTab: undefined;
  SearchTab: undefined;
  ProfileTab: undefined;
};

export type DrawerParamList = {
  MainTabs: undefined;
  ProfileFromDrawer: undefined;
  CartFromDrawer: undefined;
  SearchFromDrawer: undefined;
  Settings: undefined;
};



export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_ = 'LOGOUT';
export const SET_ONBOARDING_STATUS = 'SET_ONBOARDING_STATUS';


export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: string; // The user token
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface SetOnboardingStatusAction {
  type: typeof SET_ONBOARDING_STATUS;
  payload: boolean;
}



export interface AuthState {
  userToken: string | null;
  isLoggedIn: boolean;
  hasSeenOnboarding: boolean;
}