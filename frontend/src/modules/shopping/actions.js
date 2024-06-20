import backend from '../../backend';
import * as actionTypes from './actionTypes';

export const shoppingCartUpdated = shoppingCart => ({
    type: actionTypes.SHOPPING_CART_UPDATED,
    shoppingCart
});

export const buyCompleted = (orderId) => ({
    type: actionTypes.BUY_COMPLETED,
    orderId
});

const findOrdersCompleted = orderSearch => ({
    type: actionTypes.FIND_ORDERS_COMPLETED,
    orderSearch
});

const clearOrderSearch = () => ({
    type: actionTypes.CLEAR_ORDER_SEARCH
});

export const findOrders = criteria => dispatch => {

    dispatch(clearOrderSearch());
    backend.shoppingService.findOrders(criteria, 
        result => dispatch(findOrdersCompleted({criteria, result})));

}    

export const previousFindOrdersResultPage = criteria => 
    findOrders({page: criteria.page-1});

export const nextFindOrdersResultPage = criteria => 
    findOrders({page: criteria.page+1});

const findOrderCompleted = order => ({
    type: actionTypes.FIND_ORDER_COMPLETED,
    order
});

export const clearOrder = () => ({
    type: actionTypes.CLEAR_ORDER
});

export const findOrder = orderId => dispatch => {
    backend.shoppingService.findOrder(orderId, order => {
        dispatch(findOrderCompleted(order));
    });
}