import {config, appFetch} from './appFetch';

export const findAllCategories = (onSuccess) => 
    appFetch('/catalog/categories', config('GET'), onSuccess);

export const findProducts = ({categoryId, keywords, page}, 
    onSuccess) => {

    let path = `/catalog/products?page=${page}`;

    if (categoryId !== '') {
        path += `&categoryId=${categoryId}`;
    }

    if (keywords.trim() !== '') {
        path += `&keywords=${keywords.trim()}`;
    }

    appFetch(path, config('GET'), onSuccess);

}

export const findByProductId = (id, onSuccess) => 
    appFetch(`/catalog/products/${id}`, config('GET'), onSuccess);
