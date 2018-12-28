import backend from '../../backend';
import * as actionTypes from './actionTypes';

const addToShoppingCartCompleted = shoppingCart => ({
    type: actionTypes.ADD_TO_SHOPPING_CART_COMPLETED,
    shoppingCart
});

export const addToShoppingCart = (shoppingCartId, productId, quantity,
    onSuccess, onErrors) => dispatch => {

    backend.shoppingService.addToShoppingCart(shoppingCartId, productId, quantity,
        shoppingCart => {
            dispatch(addToShoppingCartCompleted(shoppingCart));
            onSuccess();
        },
        onErrors);
}

const buyCompleted = (orderId) => ({
    type: actionTypes.BUY_COMPLETED,
    orderId
});

export const buy = (shoppingCartId, postalAddress, postalCode, onSuccess, 
    onErrors) => dispatch =>{

    backend.shoppingService.buy(shoppingCartId, postalAddress, postalCode, ({id}) => {
        dispatch(buyCompleted(id));
        onSuccess();
    },
    onErrors);

}
