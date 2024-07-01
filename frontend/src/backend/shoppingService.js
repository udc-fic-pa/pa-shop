import {appFetch} from './appFetch';

export const addToShoppingCart = async (shoppingCartId, productId, quantity) =>
    await appFetch('POST', `/shopping/shoppingcarts/${shoppingCartId}/addToShoppingCart`, 
        {productId, quantity});

export const updateShoppingCartItemQuantity = async (shoppingCartId, productId, quantity) =>
    await appFetch('POST', `/shopping/shoppingcarts/${shoppingCartId}/updateShoppingCartItemQuantity`, 
        {productId, quantity});

export const removeShoppingCartItem = async (shoppingCartId, productId) =>
    await appFetch('POST', `/shopping/shoppingcarts/${shoppingCartId}/removeShoppingCartItem`, 
        {productId});

export const buy = async (shoppingCartId, postalAddress, postalCode) =>
    await appFetch('POST', `/shopping/shoppingcarts/${shoppingCartId}/buy`, 
        {postalAddress, postalCode});

export const findOrders = async ({page}) => 
    await appFetch('GET', `/shopping/orders?page=${page}`);

export const findOrder = async orderId =>
    await appFetch('GET', `/shopping/orders/${orderId}`);
