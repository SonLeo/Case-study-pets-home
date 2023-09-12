import { all } from 'redux-saga/effects';
import { watchFetchCartItems } from './cartSagas';

export default function* rootSaga() {
    yield all([
        watchFetchCartItems()
    ]);
}
