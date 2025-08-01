import { combineReducers } from 'redux';
import productReducer from './productReducer';
import cartReducer from './cartReducer';     
import { AppState } from '../types';  
import authReducer from './authReducer';

const rootReducer = combineReducers({
  //const rootReducer = combineReducers<AppState>({
  products: productReducer,
  cart: cartReducer,   
   auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;