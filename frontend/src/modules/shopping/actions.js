import backend from '../../backend';
import * as actionTypes from './actionTypes';

const addToShoppingCartCompleted = shoppingCart => ({
    type: actionTypes.ADD_TO_SHOPPING_CART_COMPLETED,
    shoppingCart
});

export const addToShoppingCart = (shoppingCartId, productId, quantity,
    onSuccess, onErrors) => dispatch =>
    backend.shoppingService.addToShoppingCart(shoppingCartId, productId, quantity,
        shoppingCart => {
            dispatch(addToShoppingCartCompleted(shoppingCart));
            onSuccess();
        },
        onErrors);

const buyCompleted = (orderId) => ({
    type: actionTypes.BUY_COMPLETED,
    orderId
});

export const buy = (shoppingCartId, postalAddress, postalCode, onSuccess, 
    onErrors) => dispatch =>
    backend.shoppingService.buy(shoppingCartId, postalAddress, postalCode, ({id}) => {
        dispatch(buyCompleted(id));
        onSuccess();
    },
    onErrors);

const findOrdersCompleted = orderSearch => ({
    type: actionTypes.FIND_ORDERS_COMPLETED,
    orderSearch
});

export const findOrders = criteria => dispatch =>
    backend.shoppingService.findOrders(criteria, 
        result => dispatch(findOrdersCompleted({criteria, result})));

export const previousOrdersPage = criteria => 
    findOrders({page: criteria.page-1});

export const nextOrdersPage = criteria => 
    findOrders({page: criteria.page+1});

const findOrderCompleted = order => ({
    type: actionTypes.FIND_ORDER_COMPLETED,
    order
});

export const findOrder = (orderId, onSuccess) => dispatch =>
    backend.shoppingService.findOrder(orderId, order => {
        dispatch(findOrderCompleted(order));
        onSuccess();
    })