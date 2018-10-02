import {config, appFetch} from './appFetch';

export const findAllCategories = (onSuccess) => 
    appFetch('/categories', config('GET', null), onSuccess);

export const findProducts = ({categoryId, keywords, startIndex, count}, 
    onSuccess) => 
    appFetch(`/products?categoryId=${categoryId}&keywords=${keywords}&` +
        `startIndex=${startIndex}&count=${count}`,
        config('GET', null), onSuccess);

export const findByProductId = (id, onSuccess) => 
    appFetch(`/products/${id}`, config('GET', null), onSuccess);
