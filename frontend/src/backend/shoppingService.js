import {config, appFetch} from './appFetch';

export const addToShoppingCart = (shoppingCartId, productId, quantity, onSuccess, 
    onErrors) => {

    appFetch(`/shopping/shoppingcarts/${shoppingCartId}/addToShoppingCart`, 
        config('POST', {productId, quantity}), onSuccess, onErrors);

}
