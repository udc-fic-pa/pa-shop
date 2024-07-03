import {combineReducers} from 'redux';

import users from '../users';
import * as actionTypes from './actionTypes';

const initialState = {
    shoppingCart: null,
    lastOrderId: null,
    orderSearch: null,
};

const shoppingCart = (state = initialState.shoppingCart, action) => {

    switch (action.type) {

        case users.actionTypes.LOGIN_COMPLETED:
            return action.authenticatedUser.shoppingCart;

        case users.actionTypes.SIGN_UP_COMPLETED:
            return action.authenticatedUser.shoppingCart;

        case actionTypes.SHOPPING_CART_UPDATED:
            return action.shoppingCart;

        case actionTypes.BUY_COMPLETED:
            return {id: state.id, items: [], totalPrice: 0, totalQuantity: 0};

        default:
            return state;

    }

}

const lastOrderId = (state = initialState.lastOrderId, action) => {

    switch (action.type) {

        case actionTypes.BUY_COMPLETED:
            return action.orderId;

        default:
            return state;

    }

}

const orderSearch = (state = initialState.orderSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_ORDERS_COMPLETED:
            return action.orderSearch;

        case actionTypes.CLEAR_ORDER_SEARCH:
            return initialState.orderSearch;

        default:
            return state;

    }

}

const reducer = combineReducers({
    shoppingCart,
    lastOrderId,
    orderSearch
});

export default reducer;


