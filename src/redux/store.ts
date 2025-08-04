import { createStore, applyMiddleware, Dispatch } from 'redux';
import rootReducer from './reducers';
//import createSagaMiddleware from 'redux-saga';
const createSagaMiddleware = require('redux-saga').default;
import rootSaga from './saga';

import { ProductActionTypes, CartActionTypes, CategoryActionTypes, AuthActionTypes } from './types';

export type AppActions = ProductActionTypes | CartActionTypes | CategoryActionTypes | AuthActionTypes;

const sagaMiddleware = createSagaMiddleware();


const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;

export type AppDispatch = Dispatch<AppActions>;


