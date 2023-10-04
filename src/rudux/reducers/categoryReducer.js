const { SELECT_SUBCATEGORIES } = require("../actions/categoryActions");

const initialState = {
    selectedSubcategories: []
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_SUBCATEGORIES:
            return { ...state, selectedSubcategories: action.payload };
        default:
            return state;
    }
}

export default categoryReducer;