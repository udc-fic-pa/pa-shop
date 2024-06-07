import {config, appFetch} from './appFetch'; // FIXME: remove when appFetch2 replaces appFetch.
import {appFetch2} from './appFetch';

export const addToShoppingCart = async (shoppingCartId, productId, quantity) =>
    await appFetch2('POST', `/shopping/shoppingcarts/${shoppingCartId}/addToShoppingCart`, 
        {productId, quantity});

export const updateShoppingCartItemQuantity = async (shoppingCartId, productId, quantity) =>
    await appFetch2('POST', `/shopping/shoppingcarts/${shoppingCartId}/updateShoppingCartItemQuantity`, 
        {productId, quantity});

export const removeShoppingCartItem = async (shoppingCartId, productId) =>
    await appFetch2('POST', `/shopping/shoppingcarts/${shoppingCartId}/removeShoppingCartItem`, 
        {productId});

export const buy = (shoppingCartId, postalAddress, postalCode, onSuccess, 
    onErrors) =>
    appFetch(`/shopping/shoppingcarts/${shoppingCartId}/buy`, 
        config('POST', {postalAddress, postalCode}), onSuccess, onErrors);

export const findOrders = ({page}, onSuccess) => 
    appFetch(`/shopping/orders?page=${page}`, config('GET'), onSuccess);

export const findOrder = (orderId, onSuccess) =>
    appFetch(`/shopping/orders/${orderId}`, config('GET'), onSuccess);
