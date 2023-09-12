import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { API_URLS } from '~/utils/commonUtils';
import { 
    DELETE_FROM_CART, 
    FETCH_CART_SUCCESS, 
    FETCH_CART_ERROR, 
    FETCH_CART_ITEMS
} from '../actions/cartActions';

function* handleError(error, errorMessage) {
    console.error(errorMessage, error);
    yield put(FETCH_CART_ERROR(errorMessage + error.toString()));
}

function* fetchCartItems(action) {
    try {
        const response = yield call(axios.get, `${API_URLS.CARTS}?userId=${action.payload.userId}`);
        
        if (response.data && response.data.length > 0) {
            yield put({ type: 'SET_CART_ITEMS', payload: response.data[0].cartItems });
        }
    } catch (error) {
        yield* handleError(error, 'Error fetching cart items: ');
    }
}

function* deleteFromCartSaga(action) {
    try {
        const cartId = action.payload.cartId;
        const updatedCartItems = action.payload.cartItems.filter(item => item.id !== action.payload.itemId);
        const response = yield call(axios.put, `${API_URLS.CARTS}/${cartId}`, {
            cartItems: updatedCartItems
        });

        if (response.status === 200) {
            yield put(FETCH_CART_SUCCESS(updatedCartItems));
        } else {
            yield* handleError(new Error(`Response status: ${response.status}`), "Error updating the cart items: ");
        }
    } catch (error) {
        yield* handleError(error, 'Error updating cart items: ');
    }
}

export function* watchFetchCartItems() {
    yield takeLatest(FETCH_CART_ITEMS, fetchCartItems);
}

export function* watchDeleteFromCart() {
    yield takeLatest(DELETE_FROM_CART, deleteFromCartSaga);
}
