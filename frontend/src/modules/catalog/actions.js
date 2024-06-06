import * as actionTypes from './actionTypes';

export const findAllCategoriesCompleted = categories => ({
    type: actionTypes.FIND_ALL_CATEGORIES_COMPLETED,
    categories
}); 

export const findProductsCompleted = productSearch => ({
    type: actionTypes.FIND_PRODUCTS_COMPLETED,
    productSearch
});

export const clearProductSearch = () => ({
    type: actionTypes.CLEAR_PRODUCT_SEARCH
});

export const findProductByIdCompleted = product => ({
    type: actionTypes.FIND_PRODUCT_BY_ID_COMPLETED,
    product
});

export const clearProduct = () => ({
    type: actionTypes.CLEAR_PRODUCT
});
