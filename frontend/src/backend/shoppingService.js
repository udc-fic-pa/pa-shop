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

export const buy = async (shoppingCartId, postalAddress, postalCode) =>
    await appFetch2('POST', `/shopping/shoppingcarts/${shoppingCartId}/buy`, 
        {postalAddress, postalCode});

export const findOrders = async ({page}) => 
    await appFetch2('GET', `/shopping/orders?page=${page}`);

export const findOrder = async (orderId) =>
    await appFetch2('GET', `/shopping/orders/${orderId}`);
