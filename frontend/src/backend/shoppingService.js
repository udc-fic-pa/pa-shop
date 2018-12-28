import {config, appFetch} from './appFetch';

export const addToShoppingCart = (shoppingCartId, productId, quantity, onSuccess, 
    onErrors) => {

    appFetch(`/shopping/shoppingcarts/${shoppingCartId}/addToShoppingCart`, 
        config('POST', {productId, quantity}), onSuccess, onErrors);

}

export const buy = (shoppingCartId, postalAddress, postalCode, onSuccess, 
    onErrors) => {

    appFetch(`/shopping/shoppingcarts/${shoppingCartId}/buy`, 
        config('POST', {postalAddress, postalCode}), onSuccess, onErrors);

}
