import {config, appFetch} from './appFetch';

export const findAllCategories = (onSuccess) => 
    appFetch('/catalog/categories', config('GET', null), onSuccess);

export const findProducts = ({categoryId, keywords, page, size}, 
    onSuccess) => 
    appFetch(`/catalog/products?categoryId=${categoryId}&keywords=${keywords}&` +
        `page=${page}&size=${size}`,
        config('GET', null), onSuccess);

export const findByProductId = (id, onSuccess) => 
    appFetch(`/catalog/products/${id}`, config('GET', null), onSuccess);
