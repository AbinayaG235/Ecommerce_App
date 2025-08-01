import { all } from 'redux-saga/effects';
import { watchProductSagas } from './productSaga';

export default function* rootSaga() {
  console.log('--- Starting all sagas ---');
  yield all([
    watchProductSagas(),
  ]);
}