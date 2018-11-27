import {config, appFetch} from './appFetch';

export const addToShoppingCart = (shoppingCartId, productId, quantity, onSuccess, 
    onErrors) => {

    const parameters = new FormData();

    parameters.append("productId", productId);
    parameters.append("quantity", quantity);

    appFetch(`/shopping/shoppingcarts/${shoppingCartId}/addToShoppingCart`, 
        config('POST', parameters), onSuccess, onErrors);

}
