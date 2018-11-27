import {combineReducers} from 'redux';

import users from '../users';
import * as actionTypes from './actionTypes';

const initialState = {
    shoppingCart: null
};

const shoppingCart = (state = initialState.shoppingCart, action) => {

    switch (action.type) {

        case users.actionTypes.LOGIN_COMPLETED:
            return action.authenticatedUser.shoppingCart;

        case users.actionTypes.SIGN_UP_COMPLETED:
            return action.authenticatedUser.shoppingCart;

        case actionTypes.ADD_TO_SHOPPING_CART_COMPLETED:
            return action.shoppingCart;

        default:
            return state;

    }

}

const reducer = combineReducers({
    shoppingCart
});

export default reducer;


