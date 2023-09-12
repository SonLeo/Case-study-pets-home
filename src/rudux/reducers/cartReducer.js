import { FETCH_CART_ERROR, FETCH_CART_SUCCESS, SET_CART_ITEMS, SET_SELECTED_ITEMS, UPDATE_CART_COUNT } from "../actions/cartActions";

const initialState = {
    cartItems: [],
    selectedItems: [],
    count: 0,
    error: null
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CART_SUCCESS:
            return {
                ...state,
                cartItems: action.payload,
                count: action.payload.length
            };
        case FETCH_CART_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case UPDATE_CART_COUNT:
            return {
                ...state,
                count: action.payload
            };
        case SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload
            };
        case SET_SELECTED_ITEMS:
            return {
                ...state,
                selectedItems: action.payload
            };
        default:
            return state;
    }
};

export default cartReducer;
