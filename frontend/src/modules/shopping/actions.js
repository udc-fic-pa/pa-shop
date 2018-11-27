import backend from '../../backend';
import * as actionTypes from './actionTypes';

const addToShoppingCartCompleted = shoppingCart => ({
    type: actionTypes.ADD_TO_SHOPPING_CART_COMPLETED,
    shoppingCart
});

export const addToShoppingCart = (shoppingCartId, productId, quantity,
    onSuccess, onErrors) => (dispatch, getState) => {

    backend.shoppingService.addToShoppingCart(shoppingCartId, productId, quantity,
        shoppingCart => {
            dispatch(addToShoppingCartCompleted(shoppingCart));
            onSuccess();
        },
        onErrors);
}
